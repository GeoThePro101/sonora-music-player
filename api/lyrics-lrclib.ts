import type { VercelRequest, VercelResponse } from "@vercel/node";
import { parseLrc } from "./lib/shared";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
}
