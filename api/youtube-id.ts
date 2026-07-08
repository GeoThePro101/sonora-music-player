import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Type } from "@google/genai";
import { STATIC_YOUTUBE_IDS, getAI } from "./lib/shared";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const title = req.query.title as string;
  const artist = req.query.artist as string;
  const fallback = req.query.fallback === "true";

  if (!title || !artist) {
    return res.status(400).json({ error: "Missing title or artist parameters" });
  }

  const normTitle = title.toLowerCase().trim();
  let matchedId: string | null = null;
  if (!fallback) {
    for (const [key, val] of Object.entries(STATIC_YOUTUBE_IDS)) {
      if (normTitle.includes(key) || key.includes(normTitle)) {
        matchedId = val;
        break;
      }
    }
  }

  if (matchedId) {
    return res.json({ youtubeId: matchedId });
  }

  try {
    const ai = getAI();
    let prompt = "";
    if (fallback) {
      prompt = `We need an alternative, highly embed-friendly YouTube upload of the song "${title}" by "${artist}".
Since the primary official video restricts external embedded playback, please find a high-quality, non-VEVO upload that supports external embedding.
Look for:
1. An official lyric video uploaded by the artist, label, or a clean fan channel.
2. A static audio track or auto-generated "Topic" upload.
3. A popular, clean fan upload or live performance with excellent sound quality.
Do NOT return the restricted official music video. Return only the exact 11-character YouTube video ID.`;
    } else {
      prompt = `Search for the official, high-quality YouTube music video, audio track, or official upload of the song "${title}" by "${artist}".
Find and return the exact 11-character YouTube video ID.
Prioritize auto-generated audio tracks on YouTube Topic channels or official lyric videos which allow embedding.
Avoid VEVO videos that block external embed players. Do not return unofficial covers.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            youtubeId: {
              type: Type.STRING,
              description: "The 11-character YouTube video ID."
            }
          },
          required: ["youtubeId"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json({ youtubeId: result.youtubeId || null });
  } catch (error: any) {
    console.warn("Gemini YouTube Search error:", error.message);
    res.json({ youtubeId: null, warning: "Using synthesiser mode due to quota limit" });
  }
}
