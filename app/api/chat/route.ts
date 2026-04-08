import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a Star Wars expert assistant. Answer questions about the Star Wars universe in character. Keep responses concise.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || "Groq API request failed");
    }

    return NextResponse.json({ text: data.choices[0].message.content });
  } catch (error: any) {
    console.error("Groq API error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate response" },
      { status: 500 },
    );
  }
}
