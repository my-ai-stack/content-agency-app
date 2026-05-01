import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { contentType, topic, industry, audience, tone, goal } =
      await req.json();

    if (!contentType || !topic || !industry || !audience || !tone || !goal) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(contentType, topic, industry, audience, tone, goal);
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Groq API error: ${response.status} — ${err}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({ content });
  } catch (err) {
    console.error("Generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}

function buildPrompt(
  contentType: string,
  topic: string,
  industry: string,
  audience: string,
  tone: string,
  goal: string
): string {
  if (contentType === "blog") {
    return `Write a complete blog post about "${topic}" for ${industry} businesses targeting ${audience}.

Requirements:
- Tone: ${tone}
- Length: 800–1200 words
- Structure: Hook → Introduction → 3-4 main points → Conclusion with a soft CTA
- Include a meta description (150–160 characters)
- Use 2–3 subheadings for scannability
- End with a relevant soft CTA

Audience: ${audience}
Industry: ${industry}
Goal: ${goal}

Write the full blog post now.`;
  }

  if (contentType === "social") {
    return `Generate 5 social media posts for ${industry} businesses targeting ${audience}.

Platform: LinkedIn + Twitter/X
Tone: ${tone}
Goal: ${goal}

For each post include:
- Platform label (LI or X)
- Hook (first line that stops the scroll)
- Body (2–3 sentences max)
- CTA or question to drive engagement
- 3–5 relevant hashtags

Vary the formats:
- Question / engagement post
- Stat / fact post
- Story / anecdote post
- CTA post
- Quote / insight post

Topic: ${topic}

Write all 5 posts now, clearly separated.`;
  }

  return `Write a promotional email for a ${industry} business targeting ${audience}.

Tone: ${tone}
Goal: ${goal}
Topic: ${topic}

Include:
- Subject line + preview text (under 50 characters)
- Personal greeting
- Hook (problem they have)
- Solution (what you're offering)
- Social proof or benefit highlight
- Clear singular CTA
- PS (optional urgency)

Write the complete email now.`;
}
