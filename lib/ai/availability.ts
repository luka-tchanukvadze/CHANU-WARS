import { chatModels, GroqError, groqModel, isConfigured, listModels } from "./groq";

// How long to stop asking after a failure. Long enough that a provider outage
// costs a handful of attempts an hour, short enough that a recovery is noticed
// while somebody is still looking at the page.
const COOLDOWN_MS = 5 * 60_000;

// How long a boot check is trusted before the next call re-verifies.
const CHECK_TTL_MS = 30 * 60_000;

export interface AiStatus {
  configured: boolean;
  healthy: boolean;
  model: string;
  reason: string | null;
  // Set when the breaker opened because the configured model is gone, so the
  // advice survives the cooldown instead of decaying into "unreachable".
  retiredModel: boolean;
  // Populated only when the configured model is missing from the roster, which
  // is the single most common way a free tier feature dies.
  suggestions: string[];
}

// A circuit breaker: closed means the provider is working, open means a call
// just failed so stop asking for a while, half open means the cooldown passed
// so the next real call goes through as a trial.
//
// Lives per instance, so a cold start begins with an unknown state. It never
// blocks a first call, it only stops a known-dead provider from being hammered
// by the same warm instance.
class AiAvailability {
  private healthy = false;
  private openedAt: number | null = null;
  private checkedAt = 0;
  private reason: string | null = null;
  private retiredModel = false;
  private suggestions: string[] = [];

  // Cosmetic only: reports the last thing we learned and gates nothing.
  status(): AiStatus {
    return {
      configured: isConfigured(),
      healthy: this.healthy,
      model: groqModel(),
      reason: this.reason,
      retiredModel: this.retiredModel,
      suggestions: this.suggestions,
    };
  }

  // The mark in the UI must never gate this, or the feature switches itself off
  // for good: a provider down at boot hides the mark, so nobody asks anything,
  // so no call ever happens to find out it came back.
  shouldTry(): boolean {
    if (!isConfigured()) {
      return false;
    }

    if (this.healthy) {
      return true;
    }

    return this.openedAt === null || Date.now() - this.openedAt >= COOLDOWN_MS;
  }

  // Every real question is already a live test of the connection, so nothing
  // needs to poll.
  recordSuccess(): void {
    this.healthy = true;
    this.openedAt = null;
    this.reason = null;
    this.retiredModel = false;
    this.suggestions = [];
  }

  recordFailure(reason: unknown): void {
    this.healthy = false;
    this.openedAt = Date.now();
    this.reason = reason instanceof Error ? reason.message : String(reason);
    // A 404 means the model id is gone, the one failure with a specific fix.
    // Remembering it lets the route keep saying so for the whole cooldown,
    // rather than degrading to a generic "unreachable" that sends the next
    // person looking at the key instead of at GROQ_MODEL.
    this.retiredModel =
      reason instanceof GroqError &&
      (reason.status === 404 || reason.code === "model_not_found");
  }

  // Verifies the key works and, more to the point, that the configured model id
  // still exists. Cached, because this is a network call and the answer only
  // changes when a provider retires something.
  async verify(force = false): Promise<AiStatus> {
    if (!isConfigured()) {
      this.healthy = false;
      this.reason = "GROQ_API is not set";
      return this.status();
    }

    if (!force && Date.now() - this.checkedAt < CHECK_TTL_MS && this.healthy) {
      return this.status();
    }

    this.checkedAt = Date.now();

    try {
      const models = await listModels();
      const model = groqModel();

      if (!models.includes(model)) {
        const usable = chatModels(models);

        // Say what to put in GROQ_MODEL instead, rather than only that it broke.
        this.recordFailure(
          new GroqError(
            `GROQ_MODEL ${model} is not available. Pick a chat model from: ${usable.join(", ")}`,
            404,
            "model_not_found",
          ),
        );
        this.suggestions = usable;
        // The public response body does not carry this, so the log is where
        // the owner reads it.
        console.error(
          `[chat/health] GROQ_MODEL "${model}" is retired. Set it to one of: ${usable.join(", ")}`,
        );

        return this.status();
      }

      this.recordSuccess();
    } catch (error) {
      this.recordFailure(error);
      console.error("[chat/health] groq check failed:", error);
    }

    return this.status();
  }
}

// Module scope, so it is shared by every request this instance serves.
export const availability = new AiAvailability();
