import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, targetLang } = await req.json();

    // Call LibreTranslate
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "auto",       // auto-detect language
        target: targetLang,   // target language from user
        format: "text",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LibreTranslate API error:", errorText);
      throw new Error("LibreTranslate API returned an error");
    }

    const data = await response.json();
    return NextResponse.json({ translated: data.translatedText });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { translated: "Translation failed. Try again." },
      { status: 500 }
    );
  }
}
