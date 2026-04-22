import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // 1. Get topic
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    // 2. System prompt
    const systemPrompt = `You are Satya AI. You verify news and explain it in simple Hindi.
Also generate funny GenZ conversation and viral Instagram reel captions.

Always return response in JSON format:
{
  "explanation": "",
  "realityCheck": {
    "status": "",
    "reason": ""
  },
  "conversation": "",
  "captions": [],
  "branding": "Follow @SatyaAI for more 🔥"
}`;

    // 3. Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this topic: ${topic}` }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7
      })
    });

    const data = await response.json();

    // 4. API error check
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error');
    }

    if (!data.choices || !data.choices[0]) {
      throw new Error("No response from AI");
    }

    // 5. Safe JSON parse
    let resultJson;
    try {
      resultJson = JSON.parse(data.choices[0].message.content);
    } catch (e) {
      return NextResponse.json({
        error: "Invalid AI response",
        raw: data.choices[0].message.content
      }, { status: 500 });
    }

    // 6. Return result
    return NextResponse.json(resultJson);

  } catch (error) {
    console.error('Satya AI API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}