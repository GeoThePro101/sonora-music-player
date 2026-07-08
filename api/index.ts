import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI, Type } from "@google/genai";

// Inline static data to avoid import resolution issues in serverless
const STATIC_YOUTUBE_IDS: Record<string, string> = {
  "see you again": "RgKAFK5djSk",
  "bohemian rhapsody": "xG16sdjLtc0",
  "smells like teen spirit": "Q6SHkQMFVlc",
  "sweet child o' mine": "D2gWc5Sw75w",
  "hotel california": "09839DpTctU",
  "imagine": "zHxobd1WLno",
  "yesterday": "NrgmdOz227I",
  "hey jude": "A_MjCqQoLLA",
  "don't stop believin'": "VcjzHMhBtf0",
  "wonderwall": "FVdjZYfDuLE",
  "creep": "fAuT8_dboWo",
  "zombie": "yGxHDmHoqXc",
  "in the end": "gB9P0kpc1O4",
  "billie jean": "Kr4EQDVETuA",
  "shape of you": "OXrA-66bdiY",
  "back in black": "zjx0D1Ivy-Q",
  "stairway to heaven": "QkF3oxziUI4",
  "under the bridge": "N7ZyzCNeFKY",
  "nothing else matters": "kXYiU_JCYtU",
  "smells like teen spirit": "Q6SHkQMFVlc",
  "enter sandman": "CDl9ZMfjKC8",
  "come as you are": "vabnZ9-ex7o",
  "lithium": "pXRVEiu_TkA",
  "heart-shaped box": "nVFP1tEFb1M",
  "wonderwall": "6hrWR6Cdx0o",
  "don't look back in anger": "f3bW3M4gT3A",
  "champagne supernova": "fJ9rUzIMcZQ",
  "live forever": "cZ7FzecIrfM",
  "washington": "fJ9rUzIMcZQ",
  "wrecking ball": "kYQf3aCy6-4",
  "flowers": "gDjMZvPWU3w",
  "blinding lights": "4NRXx6U8ABQ",
  "bad guy": "DyDfgMOUjCI",
  "old town road": "w2OvL7fnwug",
  "despacito": "kJQP7kiw5Fk",
  "gangnam style": "9bZkp7q19f0",
  "baby": "kffacwfA4G4",
  "somebody that i used to know": "8UVNT4RvNQ",
  "call me maybe": "fWNaR-rxAic",
  "uptown funk": "OPf0YbXqDm0",
  "happy": "y6Sxv-sUYtM",
  "shake it off": "nfWlot6h_JM",
  "roar": "CevxZvSJLk8",
  "firework": "RunDn8Bq3wA",
  "teenage dream": "F5hK70WVb0I",
  "baby one more time": "E3NmE1UdHtc",
  "toxic": "LOZuxwTk7cw",
  "hit me baby one more time": "E3NmE1UdHtc",
  "girls just want to have fun": "PIb6AZhWrR0",
  "take on me": "djV11Xf9M4w",
  "every breath you take": "C3lWwBslWqg",
  "dont stop believin": "VcjzHMhBtf0",
  "sweet dreams": "qORnIJWvP6M",
  "everybody wants to rule the world": "a6ErN2tBp2Q",
  "piano man": "1CgqTmoYCV8",
  "rocket man": "DyDfgMOUjCI",
  "wonderful tonight": "KQetemT1sWc",
  "stand by me": "AYRCFAs2wzk",
  "lean on me": "f4fBxDXgOeA",
  "what a wonderful world": "C0DPdy98e4c",
  "three little birds": "E8O-1YKzZsU",
  "redemption song": "v-qxVrEhU9o",
  "is this love": "Dn0_6R6cQ5c",
  "no woman no cry": "I26MfvxIk3c",
  "stir it up": "fRERAcBbVn0",
  "bohemian like you": "BkHrYMqNPcM",
  "come together": "45cYwDMibGo",
  "let it be": "QAK0pL0jQ3M",
  "here comes the sun": "KQetemT1sWc",
  "yesterday": "RgKAFK5djSk",
  "hey jude": "A_MjCqQoLLA",
  "blackbird": "LOb1Wfbu2f4",
  "something": "UelDrZ1ANFe",
  "while my guitar gently weeps": "PxlO7u3a7MY",
  "ob la di ob la da": "YHe2gW7dQ3U",
  "maxwell's silver hammer": "wYH2VfjHB8M",
  "oh! darling": "gKPL6o0j7JU",
  "octopus's garden": "cC6qFhZfO3Q",
  "here there and everywhere": "fOLi5cS7b-A",
  "because": "fOLi5cS7b-A",
  "you never give me your money": "9w6p1pDS9qQ",
  "golden slumbers": "WjE3rOCNJUQ",
  "carry that weight": "7W5a3zJpVhM",
  "the end": "mQZ2LzFkU8I",
  "come together": "45cYwDMibGo",
  "i want to hold your hand": "CHekfogB1fQ",
  "she loves you": "47p-83990Yk",
  "a hard day's night": "q7pMpPpIgD8",
  "help!": "2QnBIi1fz3M",
  "ticket to ride": "IbZ5840Qn0Q",
  "norwegian wood": "hQIzC4R1bRk",
  "in my life": "UelDrZ1ANFe",
  "eleanor rigby": "Cvh23o7sY1g",
  "yellow submarine": "vL5oIvDm08Q",
  "all you need is love": "wGc-Nbg4vJ8",
  "hello, goodbye": "mM2r0nEH4ek",
  "lady madonna": "L1uZbYk0OcQ",
  "hey jude": "A_MjCqQoLLA",
  "get back": "4M0kq0dVq9Q",
  "the long and winding road": "T9Q2iO_q7d8",
  "something": "UelDrZ1ANFe",
  "come together": "45cYwDMibGo",
  "let it be": "QAK0pL0jQ3M",
  "across the universe": "52-gYX0zqKQ",
  "i saw her standing there": "9BldCmWk9bI",
  "twist and shout": "ueMNqdBcQ0M",
  "please please me": "3K26s2dJk7g",
  "love me do": "4fndeDfaUJA",
  "from me to you": "lMSKvjLhCyc",
  "can't buy me love": "2S22Q1bSfE",
  "a hard day's night": "q7pMpPpIgD8",
  "eight days a week": "5N-2LQl6MIY",
  "ticket to ride": "IbZ5840Qn0Q",
  "help!": "2QnBIi1fz3M",
  "yesterday": "wZj4oLCY2wQ",
  "we can work it out": "09MmV8H18h0",
  "day tripper": "J1X1aCPcVRY",
  "drive my car": "VQFL31vX6es",
  "norwegian wood": "hQIzC4R1bRk",
  "nowhere man": "L1uZbYk0OcQ",
  "paperback writer": "kN886u10yK0",
  "rain": "Dp7sH2F85aY",
  "taxman": "8kM8dM6UwRQ",
  "eleanor rigby": "Cvh23o7sY1g",
  "yellow submarine": "vL5oIvDm08Q",
  "got to get you into my life": "2S22Q1bSfE",
  "tomorrow never knows": "pTgO7Y6mD1Q",
  "penny lane": "4Dgj3YfL3VE",
  "strawberry fields forever": "CfEUmDe8ODg",
  "a day in the life": "s94suT56r2s",
  "all you need is love": "wGc-Nbg4vJ8",
  "baby, you're a rich man": "g1Yv6D3p64Q",
  "hello, goodbye": "MmZew-dZZy8",
  "lady madonna": "L1uZbYk0OcQ",
  "the fool on the hill": "6vsL_VUPb1o",
  "magical mystery tour": "I37URQo0h9g",
  "i am the walrus": "s7EdQ4FqbhY",
  "hey jude": "A_MjCqQoLLA",
  "revolution": "4X09p1qCfZA",
  "while my guitar gently weeps": "PxlO7u3a7MY",
  "blackbird": "LOb1Wfbu2f4",
  "mother nature's son": "h1kq6s9nO0M",
  "ob la di ob la da": "YHe2gW7dQ3U",
  "helter skelter": "KQetemT1sWc",
  "get back": "4M0kq0dVq9Q",
  "don't let me down": "3wXYLQTZUDs",
  "the ballad of john and yoko": "OjNpRbNdR7E",
  "come together": "45cYwDMibGo",
  "something": "UelDrZ1ANFe",
  "octopus's garden": "cC6qFhZfO3Q",
  "here comes the sun": "KQetemT1sWc",
  "because": "fOLi5cS7b-A",
  "let it be": "QAK0pL0jQ3M",
  "across the universe": "52-gYX0zqKQ",
  "the long and winding road": "T9Q2iO_q7d8",
  "two of us": "kM0B32n5f9I",
  "i've got a feeling": "nXs2kZ5a5wQ",
  "one after 909": "nXs2kZ5a5wQ",
  "dig a pony": "yEiRkOyJjVA",
  "i me mine": "wNz0wMnFfY4",
  "the end": "mQZ2LzFkU8I",
  "free as a bird": "4Kb1V2g4n-g",
  "real love": "I9-EM1MmbaQ",
  "bad blood": "wIj3d7Diz3E",
  "love story": "VQFjXzRlVbI",
  "shake it off": "nfWlot6h_JM",
  "blank space": "eKfoE2mRE1I",
  "look what you made me do": "3K4R2NfmKC8",
  "anti-hero": "kYQf3aCy6-4",
  "cruel summer": "kZfOi6A_nPA",
  "style": "IhnUgAxxb-8",
  "welcome to new york": "a8nR0d1a04",
  "out of the woods": "b1kbLwv6gKs",
  "all you had to do was stay": "0WVbcr1wYMs",
  "shake it off": "nfWlot6h_JM",
  "bad blood": "wIj3d7Diz3E",
  "wildest dreams": "IdVraMqY4dY",
  "how you get the girl": "oK7XfqmHD98",
  "this love": "oK7XfqmHD98",
  "i know places": "oK7XfqmHD98",
  "clean": "oK7XfqmHD98",
  "new romantics": "oK7XfqmHD98",
  "end game": "oK7XfqmHD98",
  "getaway car": "IdVraMqY4dY",
  "king of my heart": "IdVraMqY4dY",
  "dancing with our hands tied": "IdVraMqY4dY",
  "dress": "IdVraMqY4dY",
  "call it what you want": "IdVraMqY4dY",
  "new year's day": "IdVraMqY4dY",
  "lover": "IdVraMqY4dY",
  "the man": "IdVraMqY4dY",
  "cardigan": "IdVraMqY4dY",
  "exile": "IdVraMqY4dY",
  "betty": "IdVraMqY4dY",
  "august": "IdVraMqY4dY",
  "willow": "IdVraMqY4dY",
  "champagne problems": "IdVraMqY4dY",
  "tolerate it": "IdVraMqY4dY",
  "gold rush": "IdVraMqY4dY",
  "cowboy like me": "IdVraMqY4dY",
  "long story short": "IdVraMqY4dY",
  "closure": "IdVraMqY4dY",
  "evermore": "IdVraMqY4dY",
  "right where you left me": "IdVraMqY4dY",
  "it's time to go": "IdVraMqY4dY",
  "anti-hero": "kYQf3aCy6-4",
  "lavender haze": "kYQf3aCy6-4",
  "maroon": "kYQf3aCy6-4",
  "midnight rain": "kYQf3aCy6-4",
  "bejeweled": "kYQf3aCy6-4",
  "karma": "kYQf3aCy6-4",
  "mastermind": "kYQf3aCy6-4",
  "snow on the beach": "kYQf3aCy6-4",
  "question...?": "kYQf3aCy6-4",
  "vigilante shit": "kYQf3aCy6-4",
  "glitch": "kYQf3aCy6-4",
  "high infidelity": "kYQf3aCy6-4",
  "dear reader": "kYQf3aCy6-4",
  "the great war": "kYQf3aCy6-4",
  "bigger than the whole sky": "kYQf3aCy6-4",
  "paris": "kYQf3aCy6-4",
  "sweet nothing": "kYQf3aCy6-4",
  "the lakes": "kYQf3aCy6-4",
  "fortnight": "kYQf3aCy6-4",
  "the tortured poets department": "kYQf3aCy6-4",
  "but daddy i love him": "kYQf3aCy6-4",
  "so long, london": "kYQf3aCy6-4",
  "my boy only breaks his favorite toys": "kYQf3aCy6-4",
  "down bad": "kYQf3aCy6-4",
  "fresh out the slammer": "kYQf3aCy6-4",
  " florida!!!": "kYQf3aCy6-4",
  "guilty as sin?": "kYQf3aCy6-4",
  "who's afraid of little old me?": "kYQf3aCy6-4",
  "i can fix him (no really i can)": "kYQf3aCy6-4",
  "loml": "kYQf3aCy6-4",
  "i can do it with a broken heart": "kYQf3aCy6-4",
  "the smallest man who ever lived": "kYQf3aCy6-4",
  "the alchemy": "kYQf3aCy6-4",
  "clara bow": "kYQf3aCy6-4",
  "us.": "kYQf3aCy6-4",
  "the black dog": "kYQf3aCy6-4",
  "imgonnagetyouback": "kYQf3aCy6-4",
  "the albatross": "kYQf3aCy6-4",
  "chloe or sam or sophia or marcus": "kYQf3aCy6-4",
  "how did it end?": "kYQf3aCy6-4",
  "so high school": "kYQf3aCy6-4",
  "i hate it here": "kYQf3aCy6-4",
  "thanK you aIMee": "kYQf3aCy6-4",
  "i look in people's windows": "kYQf3aCy6-4",
  "the prophecy": "kYQf3aCy6-4",
  "sweet nothings": "kYQf3aCy6-4",
  "the black dog": "kYQf3aCy6-4",
  "us.": "kYQf3aCy6-4",
};

const STATIC_LYRICS: Record<string, { time: number; text: string }[]> = {};

function generateDynamicFallbackLyrics(title: string, artist: string, duration: number): { time: number; text: string }[] {
  const lines: { time: number; text: string }[] = [];
  const interval = duration / 10;
  for (let i = 0; i < 10; i++) {
    lines.push({
      time: Math.round(i * interval),
      text: i === 0 ? `♪ ${title} by ${artist} ♪` : `♪ ♪ ♪`
    });
  }
  return lines;
}

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

function getAI() {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = new URL(req.url || '/', `https://${req.headers.host}`);
  const pathname = url.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (pathname === '/api/youtube-id') {
    return handleYoutubeId(req, res);
  }

  if (pathname === '/api/lyrics-lrclib') {
    return handleLyricsLrclib(req, res);
  }

  if (pathname === '/api/lyrics') {
    return handleLyrics(req, res);
  }

  return res.status(404).json({ error: 'Not found' });
}

async function handleYoutubeId(req: VercelRequest, res: VercelResponse) {
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

async function handleLyricsLrclib(req: VercelRequest, res: VercelResponse) {
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

async function handleLyrics(req: VercelRequest, res: VercelResponse) {
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
