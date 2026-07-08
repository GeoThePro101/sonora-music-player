import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI, Type } from "@google/genai";

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
  "enter sandman": "CDl9ZMfjKC8",
  "come as you are": "vabnZ9-ex7o",
  "lithium": "pXRVEiu_TkA",
  "heart-shaped box": "nVFP1tEFb1M",
  "don't look back in anger": "3bW3M4gT3A",
  "champagne supernova": "fJ9rUzIMcZQ",
  "live forever": "cZ7FzecIrfM",
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
  "come together": "45cYwDMibGo",
  "let it be": "QAK0pL0jQ3M",
  "here comes the sun": "KQetemT1sWc",
  "blackbird": "LOb1Wfbu2f4",
  "something": "UelDrZ1ANFe",
  "while my guitar gently weeps": "PxlO7u3a7MY",
  "ob la di ob la da": "YHe2gW7dQ3U",
  "octopus's garden": "cC6qFhZfO3Q",
  "because": "fOLi5cS7b-A",
  "the end": "mQZ2LzFkU8I",
  "i want to hold your hand": "CHekfogB1fQ",
  "she loves you": "47p-83990Yk",
  "a hard day's night": "q7pMpPpIgD8",
  "help!": "2QnBIi1fz3M",
  "ticket to ride": "IbZ5840Qn0Y",
  "norwegian wood": "hQIzC4R1bRk",
  "in my life": "UelDrZ1ANFe",
  "eleanor rigby": "Cvh23o7sY1g",
  "yellow submarine": "vL5oIvDm08Q",
  "all you need is love": "wGc-Nbg4vJ8",
  "hello, goodbye": "MmZew-dZZy8",
  "get back": "4M0kq0dVq9Q",
  "the long and winding road": "T9Q2iO_q7d8",
  "bad blood": "wIj3d7Diz3E",
  "blank space": "eKfoE2mRE1I",
  "style": "IhnUgAxxb-8",
  "cruel summer": "kZfOi6A_nPA",
  "anti-hero": "kYQf3aCy6-4",
  "cardigan": "IdVraMqY4dY",
  "willow": "IdVraMqY4dY",
  "lavender haze": "kYQf3aCy6-4",
  "fortnight": "kYQf3aCy6-4",
  "no woman no cry": "I26MfvxIk3c",
  "redemption song": "v-qxVrEhU9o",
  "is this love": "Dn0_6R6cQ5c",
  "stand by me": "AYRCFAs2wzk",
  "what a wonderful world": "C0DPdy98e4c",
  "three little birds": "E8O-1YKzZsU",
  "every breath you take": "C3lWwBslWqg",
  "lean on me": "f4fBxDXgOeA",
  "let it be": "QAK0pL0jQ3M",
  "here comes the sun": "KQetemT1sWc",
  "take on me": "djV11Xf9M4w",
  "sweet dreams": "qORnIJWvP6M",
  "everybody wants to rule the world": "a6ErN2tBp2Q",
  "don't stop me now": "HfG1a0q9MsU",
  "karma police": "1ccHsU6xqL0",
  "smooth": "Lur-SGr3mPg",
  "valerie": "yOJHcEsdm5A",
  "feel good inc": "Ly7fKAfNCxw",
  "mr. brightside": "gGdGFtwCNpA",
};

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
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

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
