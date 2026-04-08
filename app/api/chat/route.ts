import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API;
  console.log("API key starts with:", apiKey?.substring(0, 10));

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

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const result = await model.generateContent(message);
    const response = result.response;

    return NextResponse.json({ text: response.text() });
  } catch (error: any) {
    console.error("Gemini API error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate response" },
      { status: 500 },
    );
  }
}
