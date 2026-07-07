import express from "express";
import { GoogleGenAI, Type } from "@google/genai";
import { STATIC_YOUTUBE_IDS, STATIC_LYRICS, generateDynamicFallbackLyrics } from "../src/staticDatabase";

const app = express();
app.use(express.json());

// Initialize Gemini server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// LRC format parser
function parseLrc(lrc: string): { time: number; text: string }[] {
  const lines = lrc.split('\n');
  const result: { time: number; text: string }[] = [];
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;

  for (const line of lines) {
    const times: number[] = [];
    let match;
    while ((match = timeRegex.exec(line)) !== null) {
      const min = parseInt(match[1], 10);
      const sec = parseInt(match[2], 10);
      const ms = match[3].length === 2 ? parseInt(match[3], 10) * 10 : parseInt(match[3], 10);
      times.push(min * 60 + sec + ms / 1000);
    }
    const text = line.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/g, '').trim();
    if (times.length > 0 && text) {
      for (const time of times) {
        result.push({ time, text });
      }
    }
  }
  return result.sort((a, b) => a.time - b.time);
}

// YouTube ID resolution endpoint
app.get("/api/youtube-id", async (req, res) => {
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
});

// Lrclib synced lyrics endpoint
app.get("/api/lyrics-lrclib", async (req, res) => {
  const title = req.query.title as string;
  const artist = req.query.artist as string;

  if (!title || !artist) {
    return res.status(400).json({ error: "Missing title or artist parameters" });
  }

  try {
    const searchUrl = `https://lrclib.net/api/search?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(title)}`;
    const response = await fetch(searchUrl, {
      headers: { 'User-Agent': 'SonoraMusicPlayer/1.0' }
    });

    if (!response.ok) {
      return res.json({ lyrics: null });
    }

    const results = await response.json() as any[];

    if (!results || results.length === 0) {
      return res.json({ lyrics: null });
    }

    for (const result of results) {
      if (result.syncedLyrics) {
        const parsed = parseLrc(result.syncedLyrics);
        if (parsed.length > 0) {
          return res.json({ lyrics: parsed });
        }
      }
    }

    res.json({ lyrics: null });
  } catch (error: any) {
    console.warn("[Lrclib] Search error:", error.message);
    res.json({ lyrics: null });
  }
});

// Gemini lyrics endpoint
app.get("/api/lyrics", async (req, res) => {
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
});

export default app;
