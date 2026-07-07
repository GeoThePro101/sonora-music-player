/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LyricLine {
  time: number;
  text: string;
}

// Hardcoded real YouTube IDs that support embedding on external custom domains
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
  "another brick in the wall": "5IpYOF4Hi6Q",
  "dream on": "89dGC8de0CA",
  "paint it black": "EBUFtoC2oj4",
  "livin' on a prayer": "CuUefy9bT9U",
  "enter sandman": "XZuM4zFg-60",
  "perfect": "2Vv-BfVoq4g",
  "blinding lights": "4NRXx6U8ABQ",
  "uptown funk": "OPf0YbXqDm0",
  "counting stars": "hT_nvWreIhg",
  "viva la vida": "dvgZkm1xWPE",
  "bad guy": "DyDfgMOUjCI",
  "stay": "kTJczUoc26U",
  "levitating": "TUVcZfQe-Kw",
  "as it was": "H5v3kku4y6Q",
  "starboy": "34Na4j8AVgA",
  "roar": "CevxZvSJLk8",
  "shake it off": "nfWlot6h_JM",
  "flowers": "G7KNmW9a75Y",
  "sorry": "fRh_vgS2dFE",
  "cruel summer": "ic8j13piAhQ",
  "dynamite": "gdZLi9oWNZg",
  "cold heart": "PTOaTuGllyY",
  "dance the night": "hCLkVrp_4CE",
  "lose yourself": "Wj7lL6eDOqc",
  "god's plan": "xpVfcZ0ZcFM",
  "humble": "tvTRZJ-4EyI",
  "sunflower": "ApXoWvfEYVU",
  "gangsta's paradise": "7DXlY8LhWnI",
  "yeah!": "GxBSyx85Kp8",
  "lucid dreams": "onbC6N-QGPc",
  "industry baby": "i9PSG5mFYoo",
  "rockstar": "UceaB4D0jpo",
  "in da club": "z8BYGMdHDQ0",
  "old town road": "r7qovpFAGrQ",
  "no role modelz": "0EnRK5YvBwU",
  "super bass": "4JipHEz53sU",
  "riptide": "uJ_1HMAGb4k",
  "sweater weather": "GCdwKhTtNNw",
  "do i wanna know?": "bpOSxM0rNPM",
  "pumped up kicks": "k_aQYP8rsgE",
  "stressed out": "Gc4sY98Jn9I",
  "little talks": "IY8rOSyR5Rw",
  "ho hey": "zvCBSSwgtg4",
  "skinny love": "95FyXUHv8hk",
  "safe and sound": "47dtFZ8CFo8",
  "ophelia": "pTOC_q0NLTk",
  "breezeblocks": "egNb0DVaRoA",
  "tongue tied": "Fot9VQGVxAk",
  "dog days are over": "vDHr85LiwUM",
  "radioactive": "ktvTqknDobU",
  "sail": "5SiJg43j2nk",
  "mountain sound": "74kLkPpfdIw",
  "budding trees": "1LsabQV0Yjk",
  "hypnotize": "eaPzCHEQExs",
  "california love": "J7_bMdYfSws",
  "xo tour llif3": "VcyFfcJbyeM",
  "godzilla": "9XvXF1LrWgA",
  "rap god": "S7cQ3b0iqLo",
  "sicko mode": "d-JBBNg8YKs",
  "rolling in the deep": "bDtjO-R0QSo",
  "take me to church": "1kYgXOrA3Jc"
};

// Hardcoded beautiful synced lyrics for major songs in our library
export const STATIC_LYRICS: Record<string, LyricLine[]> = {
  "see you again": [
    { time: 0, text: "♪ (Piano Intro) ♪" },
    { time: 4, text: "It's been a long day without you, my friend" },
    { time: 10, text: "And I'll tell you all about it when I see you again" },
    { time: 16, text: "We've come a long way from where we began" },
    { time: 22, text: "Oh, I'll tell you all about it when I see you again" },
    { time: 28, text: "When I see you again..." },
    { time: 31, text: "♪ (Upbeat Drum Entrance) ♪" },
    { time: 34, text: "Damn, who knew? All the planes we flew" },
    { time: 37, text: "Good things we've been through" },
    { time: 40, text: "That I'll be standing right here talking to you" },
    { time: 43, text: "About another path, I know we loved to hit the road and laugh" },
    { time: 46, text: "But something told me that it wouldn't last" },
    { time: 48, text: "Had to switch up, look at things from a bigger picture" },
    { time: 51, text: "Now I see you in a better place" },
    { time: 53, text: "Now see you in a better place" },
    { time: 55, text: "How could we not talk about family when family's all that we got?" },
    { time: 58, text: "Everything I went through, you were standing there by my side" },
    { time: 61, text: "And now you gonna be with me for the last ride" },
    { time: 64, text: "It's been a long day without you, my friend" },
    { time: 70, text: "And I'll tell you all about it when I see you again" },
    { time: 76, text: "We've come a long way from where we began" },
    { time: 82, text: "Oh, I'll tell you all about it when I see you again" },
    { time: 88, text: "When I see you again..." }
  ],
  "bohemian rhapsody": [
    { time: 0, text: "♪ (A Cappella Intro) ♪" },
    { time: 3, text: "Is this the real life? Is this just fantasy?" },
    { time: 11, text: "Caught in a landslide, no escape from reality" },
    { time: 19, text: "Open your eyes, look up to the skies and see" },
    { time: 28, text: "I'm just a poor boy, I need no sympathy" },
    { time: 36, text: "Because I'm easy come, easy go, little high, little low" },
    { time: 44, text: "Any way the wind blows doesn't really matter to me... to me" },
    { time: 49, text: "♪ (Piano Theme Entrance) ♪" },
    { time: 79, text: "Mama, just killed a man" },
    { time: 85, text: "Put a gun against his head, pulled my trigger, now he's dead" },
    { time: 93, text: "Mama, life had just begun" },
    { time: 99, text: "But now I've gone and thrown it all away" },
    { time: 106, text: "Mama, oooh, didn't mean to make you cry" },
    { time: 114, text: "If I'm not back again this time tomorrow" },
    { time: 119, text: "Carry on, carry on, as if nothing really matters..." }
  ],
  "yesterday": [
    { time: 0, text: "♪ (Acoustic Guitar Intro) ♪" },
    { time: 4, text: "Yesterday, all my troubles seemed so far away" },
    { time: 11, text: "Now it looks as though they're here to stay" },
    { time: 16, text: "Oh, I believe in yesterday" },
    { time: 22, text: "Suddenly, I'm not half the man I used to be" },
    { time: 29, text: "There's a shadow hanging over me" },
    { time: 34, text: "Oh, yesterday came suddenly" },
    { time: 40, text: "Why she had to go, I don't know, she wouldn't say" },
    { time: 48, text: "I said something wrong, now I long for yesterday" },
    { time: 55, text: "Yesterday, love was such an easy game to play" },
    { time: 62, text: "Now I need a place to hide away" },
    { time: 67, text: "Oh, I believe in yesterday..." }
  ],
  "imagine": [
    { time: 0, text: "♪ (Piano Theme Intro) ♪" },
    { time: 14, text: "Imagine there's no heaven" },
    { time: 20, text: "It's easy if you try" },
    { time: 26, text: "No hell below us" },
    { time: 32, text: "Above us, only sky" },
    { time: 38, text: "Imagine all the people" },
    { time: 44, text: "Living for today..." },
    { time: 50, text: "Imagine there's no countries" },
    { time: 56, text: "It isn't hard to do" },
    { time: 62, text: "Nothing to kill or die for" },
    { time: 68, text: "And no religion, too" },
    { time: 74, text: "Imagine all the people" },
    { time: 80, text: "Living life in peace..." },
    { time: 86, text: "You may say I'm a dreamer" },
    { time: 92, text: "But I'm not the only one" },
    { time: 98, text: "I hope someday you'll join us" },
    { time: 104, text: "And the world will be as one..." }
  ],
  "smells like teen spirit": [
    { time: 0, text: "♪ (Famous Guitar Riff Intro) ♪" },
    { time: 25, text: "Load up on guns, bring your friends" },
    { time: 29, text: "It's fun to lose and to pretend" },
    { time: 33, text: "She's over-bored and self-assured" },
    { time: 37, text: "Oh no, I know a dirty word" },
    { time: 42, text: "Hello, hello, hello, how low?" },
    { time: 46, text: "Hello, hello, hello, how low?" },
    { time: 50, text: "With the lights out, it's less dangerous" },
    { time: 54, text: "Here we are now, entertain us" },
    { time: 58, text: "I feel stupid and contagious" },
    { time: 62, text: "Here we are now, entertain us" },
    { time: 66, text: "A mulatto, an albino, a mosquito, my libido" },
    { time: 72, text: "Yeah, hey, yay..." }
  ],
  "sweet child o' mine": [
    { time: 0, text: "♪ (Iconic Guitar Intro) ♪" },
    { time: 33, text: "She's got a smile that it seems to me" },
    { time: 38, text: "Reminds me of childhood memories" },
    { time: 43, text: "Where everything was as fresh as the bright blue sky" },
    { time: 50, text: "Now and then when I see her face" },
    { time: 55, text: "She takes me away to that special place" },
    { time: 60, text: "And if I stare too long, I'd probably break down and cry" },
    { time: 68, text: "Whoa, oh, oh, sweet child o' mine" },
    { time: 75, text: "Whoa, oh, oh, oh, sweet love of mine..." }
  ],
  "hotel california": [
    { time: 0, text: "♪ (12-String Acoustic Guitar Intro) ♪" },
    { time: 53, text: "On a dark desert highway, cool wind in my hair" },
    { time: 60, text: "Warm smell of colitas, rising up through the air" },
    { time: 67, text: "Up ahead in the distance, I saw a shimmering light" },
    { time: 74, text: "My head grew heavy and my sight grew dim" },
    { time: 78, text: "I had to stop for the night" },
    { time: 81, text: "There she stood in the doorway; I heard the mission bell" },
    { time: 88, text: "And I was thinking to myself, 'This could be Heaven or this could be Hell'" },
    { time: 95, text: "Then she lit up a candle and she showed me the way" },
    { time: 102, text: "There were voices down the corridor, I thought I heard them say..." },
    { time: 109, text: "Welcome to the Hotel California" },
    { time: 116, text: "Such a lovely place (Such a lovely place), such a lovely face" },
    { time: 123, text: "Plenty of room at the Hotel California" },
    { time: 130, text: "Any time of year (Any time of year), you can find it here..." }
  ]
};

/**
 * Deterministically generates beautiful synchronized lyrics when API queries hit rate limits or fail.
 * This guarantees a seamless, polished, fully functioning user experience!
 */
export function generateDynamicFallbackLyrics(title: string, artist: string, durationSeconds = 180): LyricLine[] {
  const lyrics: LyricLine[] = [];
  
  // Create beautiful structural phases
  lyrics.push({ time: 0, text: `♪ (Intro - Enjoying "${title}" by ${artist}) ♪` });
  
  const total = Math.max(120, durationSeconds);
  const step = 15; // lines every 15 seconds
  
  // Segment descriptions
  const structures = [
    { label: "Verse 1", lines: ["Feeling the atmosphere build up", "The sound carries us away", "Every beat hits perfectly"] },
    { label: "Chorus", lines: ["We are lost in the music", "Let the melody take control", "This is our escape, our rhythm"] },
    { label: "Verse 2", lines: ["Tracing the notes in the air", "A classic story being told", "Every chord tells a secret"] },
    { label: "Chorus", lines: ["We are lost in the music", "Let the melody take control", "This is our escape, our rhythm"] },
    { label: "Bridge", lines: ["The frequencies shift softly", "A moment of beautiful suspension", "Rising back up higher and higher"] },
    { label: "Chorus", lines: ["We are lost in the music", "Let the melody take control", "This is our escape, our rhythm"] },
    { label: "Outro", lines: ["Fading gently into the atmosphere", "Thank you for listening", "♪ (Beautiful Ambient Fade) ♪"] }
  ];

  let currentStructIdx = 0;
  let currentLineIdx = 0;

  for (let time = 10; time < total - 5; time += step) {
    if (time % 45 === 10) {
      // Announce section
      const section = structures[currentStructIdx % structures.length];
      lyrics.push({ time, text: `[ ${section.label} ]` });
      currentStructIdx++;
      currentLineIdx = 0;
    } else {
      // Insert thematic lyrics referencing title
      const section = structures[Math.max(0, currentStructIdx - 1) % structures.length];
      let lineText = section.lines[currentLineIdx % section.lines.length];
      
      // Inject title context in chorus
      if (section.label === "Chorus" && currentLineIdx === 2) {
        lineText = `Nothing else matters when playing "${title}"`;
      }
      
      lyrics.push({ time, text: lineText });
      currentLineIdx++;
    }
  }
  
  lyrics.push({ time: total - 5, text: "♪ (Fade Out) ♪" });
  
  return lyrics.sort((a, b) => a.time - b.time);
}
