import { NextRequest, NextResponse } from "next/server";
import { availability } from "@/lib/ai/availability";
import { ChatMessage, GroqError, groqModel, isConfigured, streamChat } from "@/lib/ai/groq";
import { MAX_HISTORY_TURNS, MAX_MESSAGE_CHARS, SYSTEM_PROMPT } from "@/lib/ai/persona";
import { callerKey, rateLimit } from "@/lib/ai/rate-limit";

export const runtime = "nodejs";
// Nothing here is cacheable and a cached answer would be the wrong one.
export const dynamic = "force-dynamic";

// Comfortably above a full transcript, far below anything worth buffering.
const MAX_BODY_BYTES = 128 * 1024;

interface ChatRequest {
  message?: unknown;
  history?: unknown;
}

export async function POST(req: NextRequest) {
  if (!isConfigured()) {
    return fail(503, "The archive is offline: GROQ_API is not set.", "not_configured");
  }

  const limit = rateLimit(callerKey(req));

  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: `Too many questions at once. Try again in ${limit.retryAfterSeconds}s.`,
        code: "rate_limited",
      },
      {
        status: 429,
        headers: { "retry-after": String(limit.retryAfterSeconds) },
      },
    );
  }

  // Checked before parsing, because req.json() buffers whatever it is given
  // before anything downstream can reject it.
  const declared = Number(req.headers.get("content-length") ?? 0);

  if (declared > MAX_BODY_BYTES) {
    return fail(413, "That request is too large.", "body_too_large");
  }

  let body: ChatRequest;

  try {
    const raw = await req.text();

    // content-length is a claim, not a guarantee.
    if (raw.length > MAX_BODY_BYTES) {
      return fail(413, "That request is too large.", "body_too_large");
    }

    body = JSON.parse(raw) as ChatRequest;
  } catch {
    return fail(400, "Malformed request.", "bad_json");
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return fail(400, "Ask something first.", "empty_message");
  }

  if (message.length > MAX_MESSAGE_CHARS) {
    return fail(413, `Keep it under ${MAX_MESSAGE_CHARS} characters.`, "too_long");
  }

  // The breaker only stops a provider we already know is down from being asked
  // again inside the cooldown. It is never consulted before the first call.
  if (!availability.shouldTry()) {
    const { retiredModel } = availability.status();

    // The breaker remembers why it opened, so the actionable message outlives
    // the first failure.
    return retiredModel
      ? fail(
          503,
          `Model "${groqModel()}" no longer exists at Groq. Set GROQ_MODEL to a current one.`,
          "model_retired",
        )
      : fail(
          503,
          "The archive is unreachable right now. Try again in a few minutes.",
          "circuit_open",
        );
  }

  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...sanitizeHistory(body.history),
    { role: "user", content: message },
  ];

  try {
    const stream = await streamChat(messages, req.signal);

    availability.recordSuccess();

    return new Response(stream, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store, no-transform",
        "x-ratelimit-remaining": String(limit.remaining),
      },
    });
  } catch (error) {
    availability.recordFailure(error);

    return fromGroqError(error);
  }
}

// The client sends back what it is showing, which is untrusted input like any
// other. Only the two roles that belong in a transcript survive, so nobody can
// inject a system turn by posting one, and the window is bounded so a long
// session cannot grow the request forever.
function sanitizeHistory(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  const turns: ChatMessage[] = [];

  for (const entry of raw) {
    if (typeof entry !== "object" || entry === null) continue;

    const { role, content } = entry as { role?: unknown; content?: unknown };

    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;

    const trimmed = content.trim();

    if (!trimmed) continue;

    turns.push({ role, content: trimmed.slice(0, MAX_MESSAGE_CHARS) });
  }

  return turns.slice(-MAX_HISTORY_TURNS * 2);
}

// Maps the upstream failure onto something the user can act on, and keeps the
// real reason in the server log. A retired model and a spent quota are not the
// same problem and must not read as the same sentence.
function fromGroqError(error: unknown) {
  if (!(error instanceof GroqError)) {
    if (error instanceof Error && error.name === "AbortError") {
      return fail(499, "Request cancelled.", "aborted");
    }

    console.error("[chat] unexpected failure:", error);

    return fail(502, "The archive could not be reached.", "upstream");
  }

  console.error(`[chat] groq ${error.status} (${error.code ?? "no code"}): ${error.message}`);

  switch (error.status) {
    case 401:
    case 403:
      return fail(503, "The archive rejected its credentials. GROQ_API is invalid or revoked.", "bad_key");

    case 404:
      // Named in the response, so the next person does not have to open a
      // network tab to find it.
      return fail(
        503,
        `Model "${groqModel()}" no longer exists at Groq. Set GROQ_MODEL to a current one.`,
        "model_retired",
      );

    case 413:
      return fail(413, "That conversation grew too long. Clear the chat and start again.", "context_too_long");

    case 429:
      return fail(429, "Groq's quota is spent. Try again in a few minutes.", "upstream_rate_limited");

    case 504:
      return fail(504, "The archive took too long to answer. Try again.", "timeout");

    default:
      // Deliberately generic. Relaying arbitrary upstream text to the browser
      // is how account or infrastructure detail leaks through a proxy route.
      return fail(502, "The archive could not answer. Try again shortly.", "upstream");
  }
}

function fail(status: number, error: string, code: string) {
  return NextResponse.json({ error, code }, { status });
}
