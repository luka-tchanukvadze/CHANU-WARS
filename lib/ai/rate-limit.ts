import type { NextRequest } from "next/server";

// /api/chat is a public route holding a private key, which makes it a free
// proxy for anyone who finds it, spending our quota.
//
// In this process only. A second instance builds its own window and neither is
// wrong: this is a brake on one caller hammering one instance, not a billing
// control. Redis is the answer if that stops being enough.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;

// Bounded, so a flood of unique callers cannot grow this without limit.
const MAX_TRACKED = 5_000;

interface Bucket {
  count: number;
  resetAt: number;
}

const windows = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const existing = windows.get(key);

  if (!existing || now >= existing.resetAt) {
    if (windows.size >= MAX_TRACKED) {
      sweep(now);
    }

    windows.set(key, { count: 1, resetAt: now + WINDOW_MS });

    return { allowed: true, remaining: MAX_PER_WINDOW - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;

  return {
    allowed: existing.count <= MAX_PER_WINDOW,
    remaining: Math.max(0, MAX_PER_WINDOW - existing.count),
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

function sweep(now: number): void {
  // forEach rather than for..of, because iterating a Map needs
  // downlevelIteration under this tsconfig target.
  const expired: string[] = [];

  windows.forEach((bucket, key) => {
    if (now >= bucket.resetAt) {
      expired.push(key);
    }
  });

  expired.forEach((key) => windows.delete(key));

  // Everything is still live, so drop the oldest rather than stop tracking.
  if (windows.size >= MAX_TRACKED) {
    const oldest = windows.keys().next().value;

    if (oldest !== undefined) {
      windows.delete(oldest);
    }
  }
}

// Identifying the caller is the whole security of this limiter, and forwarded
// headers are only worth reading when something we trust wrote them.
//
// x-forwarded-for is a list any client can open with a value of its own, so
// neither end of it is trustworthy on its own: with no proxy in front, the
// forged entry is the only entry. A new one per request would reset the window
// every time and the limit would not exist.
function trustProxyHeaders(): boolean {
  return process.env.TRUST_PROXY_HEADERS?.trim() === "true";
}

export function callerKey(req: NextRequest): string {
  // Taken from the connection rather than the request text, so a client cannot
  // put anything here.
  const direct = (req as unknown as { ip?: string }).ip?.trim();

  if (direct) {
    return direct;
  }

  // Vercel sets this itself and strips any inbound copy.
  const vercel = req.headers.get("x-vercel-forwarded-for")?.trim();

  if (vercel) {
    return vercel.split(",")[0].trim();
  }

  // Client-writable unless a trusted proxy is in front, and only the operator
  // knows whether one is.
  if (trustProxyHeaders()) {
    const real = req.headers.get("x-real-ip")?.trim();

    if (real) {
      return real;
    }

    const hops = (req.headers.get("x-forwarded-for") ?? "")
      .split(",")
      .map((hop) => hop.trim())
      .filter(Boolean);

    // Rightmost: the entry our own proxy appended, not the one the client
    // opened the list with.
    if (hops.length > 0) {
      return hops[hops.length - 1];
    }
  }

  // No trustworthy address, so everyone shares one bucket. That is the safe
  // direction to fail: it over-limits rather than handing a fresh allowance to
  // anyone willing to set a header.
  return "shared";
}
