// Mirrors the wire shape the route expects, so the transcript on screen is the
// same object that gets posted back as history. Two shapes would drift.
export interface Turn {
  role: "user" | "assistant";
  content: string;
}
