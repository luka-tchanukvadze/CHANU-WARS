// Groq speaks the OpenAI request shape, so this is fetch and no sdk.
const BASE_URL = "https://api.groq.com/openai/v1";

// Free tier models get retired on somebody else's schedule, so this is a
// starting point and not a promise. Overriding it is one line in .env.local
// and a restart, with no code change.
const DEFAULT_MODEL = "openai/gpt-oss-120b";

// Time to the first token, not the whole answer. A long reply is fine; an
// upstream that never responds is not, and without a deadline it holds the
// request open until the browser gives up, which reads as the site being broken.
const FIRST_TOKEN_TIMEOUT_MS = 12_000;

// Only read at boot and from the health route, where a slower answer costs
// nobody anything.
const BOOT_TIMEOUT_MS = 5_000;

export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

// Carries the upstream status so the route can map it to something honest.
// A 404 and a 429 are different problems with different advice.
export class GroqError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = "GroqError";
  }
}

export function groqModel(): string {
  // || rather than ??, because a deploy platform passes an unset variable
  // through as an empty string and ?? would hand that to the api as the model name.
  return process.env.GROQ_MODEL?.trim() || DEFAULT_MODEL;
}

export function isConfigured(): boolean {
  return Boolean(process.env.GROQ_API?.trim());
}

function apiKey(): string {
  const key = process.env.GROQ_API?.trim();

  if (!key) {
    throw new GroqError("GROQ_API is not set", 500, "not_configured");
  }

  return key;
}

// Proves the key works and the model id exists, and nothing beyond that.
// A listed model can still refuse a completion, which is a separate endpoint
// with a quota of its own.
export async function listModels(): Promise<string[]> {
  const response = await send("/models", undefined, BOOT_TIMEOUT_MS);
  const body = (await response.json()) as { data?: { id?: string }[] };

  return (body.data ?? [])
    .map((entry) => entry.id)
    .filter((id): id is string => typeof id === "string");
}

// Models that answer chat. The roster carries speech and safety models too,
// and telling somebody to put whisper-large-v3 in GROQ_MODEL is worse than
// telling them nothing.
export function chatModels(ids: string[]): string[] {
  return ids.filter(
    (id) => !/whisper|orpheus|prompt-guard|safeguard|tts|embed/i.test(id),
  );
}

// Streams tokens as they arrive, rather than holding the whole answer back
// behind a spinner for the several seconds it takes to finish.
export async function streamChat(
  messages: ChatMessage[],
  signal?: AbortSignal,
): Promise<ReadableStream<Uint8Array>> {
  const response = await send(
    "/chat/completions",
    {
      model: groqModel(),
      messages,
      temperature: 0.7,
      max_completion_tokens: 800,
      stream: true,
    },
    FIRST_TOKEN_TIMEOUT_MS,
    signal,
  );

  if (!response.body) {
    throw new GroqError("groq returned no body", 502, "empty_body");
  }

  return toTextStream(response.body);
}

// Unwraps server-sent events into plain text, so the client reads the response
// body directly and needs no event parser of its own.
function toTextStream(source: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  return new ReadableStream({
    async start(controller) {
      const reader = source.getReader();

      try {
        for (;;) {
          const { done, value } = await reader.read();

          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Events are newline delimited, and the tail of the buffer is very
          // often half a line, so only whole lines are parsed on each pass.
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();

            if (!trimmed.startsWith("data:")) continue;

            const payload = trimmed.slice(5).trim();

            if (payload === "[DONE]") {
              controller.close();
              return;
            }

            try {
              const parsed = JSON.parse(payload) as {
                choices?: { delta?: { content?: string } }[];
              };
              const text = parsed.choices?.[0]?.delta?.content;

              if (text) {
                controller.enqueue(encoder.encode(text));
              }
            } catch {
              // A single malformed event is not worth killing a live answer over.
            }
          }
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      } finally {
        reader.releaseLock();
      }
    },
  });
}

async function send(
  path: string,
  payload: unknown,
  timeoutMs: number,
  external?: AbortSignal,
): Promise<Response> {
  const key = apiKey();

  // A manual controller rather than AbortSignal.timeout, because the deadline
  // covers the handshake only. timeout() would keep counting and cut a long
  // answer off mid sentence.
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(new Error(`groq did not respond in ${timeoutMs}ms`)),
    timeoutMs,
  );

  const onExternalAbort = () => controller.abort();
  external?.addEventListener("abort", onExternalAbort, { once: true });

  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method: payload ? "POST" : "GET",
      headers: {
        authorization: `Bearer ${key}`,
        ...(payload ? { "content-type": "application/json" } : {}),
      },
      body: payload ? JSON.stringify(payload) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (error) {
    if (controller.signal.aborted && !external?.aborted) {
      throw new GroqError(`groq timed out after ${timeoutMs}ms`, 504, "timeout");
    }

    throw error;
  } finally {
    clearTimeout(timer);
    external?.removeEventListener("abort", onExternalAbort);
  }

  if (!response.ok) {
    // The body carries the real reason, and throwing it away is how a retired
    // model turns into an unexplained 500.
    const detail = await response.text().catch(() => "");
    let message = detail.slice(0, 300);
    let code: string | undefined;

    try {
      const parsed = JSON.parse(detail) as {
        error?: { message?: string; code?: string };
      };
      message = parsed.error?.message ?? message;
      code = parsed.error?.code;
    } catch {
      // Not json. The raw text is still better than discarding it.
    }

    throw new GroqError(message || `groq ${response.status}`, response.status, code);
  }

  return response;
}
