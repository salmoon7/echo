import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || text.trim() === "") {
      return NextResponse.json({ summary: "No text provided." }, { status: 400 });
    }

    const HF_API_KEY = process.env.HF_API_KEY;

    if (!HF_API_KEY) {
      return NextResponse.json({ summary: "Missing Hugging Face API key." }, { status: 500 });
    }

    const res = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    // Check if response is okay
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Hugging Face API error:", errorText);
      return NextResponse.json(
        { summary: "Failed to summarize. API returned an error." },
        { status: 500 }
      );
    }

    // Parse JSON safely
    let data;
    try {
      data = await res.json();
    } catch (err) {
      console.error("Failed to parse JSON from Hugging Face:", err);
      return NextResponse.json(
        { summary: "Failed to summarize. Invalid response from API." },
        { status: 500 }
      );
    }

    // Extract summary
    const summary = Array.isArray(data) && data[0]?.summary_text
      ? data[0].summary_text
      : "Unable to summarize";

    return NextResponse.json({ summary });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { summary: "Failed to summarize. Try again." },
      { status: 500 }
    );
  }
}
