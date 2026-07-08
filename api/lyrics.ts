import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Type } from "@google/genai";
import { STATIC_LYRICS, generateDynamicFallbackLyrics, getAI } from "./lib/shared";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const title = req.query.title as string;
  const artist = req.query.artist as string;
  const durationStr = req.query.duration as string;
  const duration = durationStr ? parseInt(durationStr, 10) : 180;

  if (!title || !artist) {
    return res.status(400).json({ error: "Missing title or artist parameters" });
  }

  const normTitle = title.toLowerCase().trim();
  let matchedLyrics = null;
  for (const [key, val] of Object.entries(STATIC_LYRICS)) {
    if (normTitle.includes(key) || key.includes(normTitle)) {
      matchedLyrics = val;
      break;
    }
  }

  if (matchedLyrics) {
    return res.json({ lyrics: matchedLyrics });
  }

  try {
    const ai = getAI();
    const prompt = `Provide highly synchronized lyrics for the song "${title}" by "${artist}".
The output MUST be a JSON list of lyrics lines with accurate start times in seconds.
The timestamps must span from 0 up to the song's duration of ${duration} seconds.
Include 15-45 lines. Each line should have "time" (seconds) and "text" (lyrics).
Return only real, accurate lyrics. Ensure the JSON is well-formed.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lyrics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.INTEGER },
                  text: { type: Type.STRING }
                },
                required: ["time", "text"]
              }
            }
          },
          required: ["lyrics"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json({ lyrics: result.lyrics || [] });
  } catch (error: any) {
    console.warn("Gemini Lyrics error:", error.message);
    const fallbackLyrics = generateDynamicFallbackLyrics(title, artist, duration);
    res.json({ lyrics: fallbackLyrics });
  }
}
