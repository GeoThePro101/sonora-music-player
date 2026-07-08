import { GoogleGenAI, Type } from "@google/genai";

export const STATIC_YOUTUBE_IDS: Record<string, string> = {
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
};

export const STATIC_LYRICS: Record<string, { time: number; text: string }[]> = {};

export function generateDynamicFallbackLyrics(title: string, artist: string, duration: number): { time: number; text: string }[] {
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

export function parseLrc(lrc: string): { time: number; text: string }[] {
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

export function getAI() {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}
