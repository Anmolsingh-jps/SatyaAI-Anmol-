import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are Satya AI. You verify news and explain in simple Hindi. Also generate funny GenZ conversation and viral Instagram reel captions. Always return JSON."
          },
          {
            role: "user",
            content: topic
          }
        ]
      })
    });

    const data = await response.json();

    return NextResponse.json({
      result: data.choices[0].message.content
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}