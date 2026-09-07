import { NextRequest, NextResponse } from "next/server";
import { availability } from "@/lib/ai/availability";
import { callerKey, rateLimit } from "@/lib/ai/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Answers the one question worth asking before blaming the key: does the model
// this build is configured for still exist?
//
// Anonymous callers get a boolean and nothing else. The model id, the failure
// reason and the roster of alternatives are operational detail, so they go to
// the server log, and over HTTP only to a caller holding AI_HEALTH_TOKEN.
// Only that caller can force a fresh upstream check, so this cannot be used to
// spend our provider quota by refreshing.
export async function GET(req: NextRequest) {
  const limit = rateLimit(`health:${callerKey(req)}`);

  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "retry-after": String(limit.retryAfterSeconds) } },
    );
  }

  const token = process.env.AI_HEALTH_TOKEN?.trim();
  // Trusted only when a token is actually set: an unset variable must never
  // make every caller privileged.
  const authorized =
    Boolean(token) && safeEqual(req.headers.get("x-health-token"), token);

  const status = await availability.verify(authorized);

  const body = authorized ? status : { ok: status.healthy };

  return NextResponse.json(body, {
    status: status.healthy ? 200 : 503,
    headers: { "cache-control": "no-store" },
  });
}

// Length first, then a constant-time compare, so neither the length nor the
// position of the first wrong character is readable from the timing.
function safeEqual(given: string | null, expected: string | undefined): boolean {
  if (!given || !expected || given.length !== expected.length) {
    return false;
  }

  let diff = 0;

  for (let i = 0; i < given.length; i += 1) {
    diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  }

  return diff === 0;
}
