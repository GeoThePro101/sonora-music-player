/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SongMelody {
  rootFreq: number; // Root frequency in Hz
  scale: number[]; // Semitone offsets for scale degrees
  melody: number[]; // Semitone offsets for the main vocal/instrumental hook
  chords: number[][]; // Multi-note chord offsets
}

// Map of popular songs to their actual recognizable melodic hooks and progressions
export const SONG_MELODIES: Record<string, SongMelody> = {
  // "See You Again" by Wiz Khalifa & Charlie Puth
  "see you again": {
    rootFreq: 233.08, // Bb3
    scale: [0, 2, 4, 7, 9, 12, 14, 16, 19], // Bb Major pentatonic
    // D5, F5, D5, C5, Bb4, Bb4, G4, F4, G4, Bb4, D5, C5, Bb4
    melody: [16, 19, 16, 14, 12, 12, 9, 7, 9, 12, 16, 14, 12, 12, 14, 16],
    chords: [
      [0, 4, 7],      // Bb Major
      [-3, 0, 4],     // G minor
      [-8, -4, 0],    // Eb Major
      [0, 4, 7]       // Bb Major
    ]
  },
  // "Bohemian Rhapsody" by Queen
  "bohemian rhapsody": {
    rootFreq: 233.08, // Bb3
    scale: [0, 2, 3, 5, 7, 8, 10, 12, 14, 15], // Bb Natural Minor/Major blend
    // F4, G4, F4, Eb4, D4, C4, Bb3, C4, D4, Eb4, F4, F4
    melody: [7, 9, 7, 5, 4, 2, 0, 2, 4, 5, 7, 7, 5, 4, 2],
    chords: [
      [0, 4, 7],      // Bb
      [-3, 0, 4],     // Gm
      [2, 5, 9],      // Cm
      [-5, -1, 2]     // F7
    ]
  },
  // "Smells Like Teen Spirit" by Nirvana
  "smells like teen spirit": {
    rootFreq: 174.61, // F3
    scale: [0, 3, 5, 7, 10, 12, 15, 17, 20], // F minor pentatonic
    // F4, F4, F4, Bb4, Bb4, Bb4, Ab4, Ab4, Ab4, Db5, Db5, Db5
    melody: [12, 12, 12, 17, 17, 17, 15, 15, 15, 20, 20, 20, 12, 12, 17, 15],
    chords: [
      [0, 3, 7],      // Fm
      [5, 8, 12],     // Bbm
      [3, 7, 10],     // Ab
      [8, 12, 15]     // Db
    ]
  },
  // "Sweet Child o' Mine" by Guns N' Roses
  "sweet child o' mine": {
    rootFreq: 146.83, // D3
    scale: [0, 2, 4, 7, 9, 11, 12, 14, 16, 18, 19], // D mixolydian
    // D4, D5, A4, G4, G5, F#4, F#5, F#4
    melody: [12, 24, 19, 17, 29, 18, 30, 18, 12, 24, 19, 17, 29, 18, 30, 18],
    chords: [
      [0, 4, 7],      // D
      [-2, 2, 5],     // C
      [-7, -3, 0],    // G
      [0, 4, 7]       // D
    ]
  },
  // "Hotel California" by Eagles
  "hotel california": {
    rootFreq: 123.47, // B2
    scale: [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19], // B minor
    // F#4, F#4, F#4, G4, F#4, E4, D4, C#4, B3, B3
    melody: [19, 19, 19, 20, 19, 17, 15, 14, 12, 12, 14, 15, 17, 15, 14],
    chords: [
      [0, 3, 7],      // Bm
      [7, 11, 14],    // F#
      [10, 14, 17],   // A
      [5, 9, 12],     // E
      [8, 12, 15],    // G
      [3, 7, 10],     // D
      [5, 8, 12],     // Em
      [7, 11, 14]     // F#
    ]
  },
  // "Imagine" by John Lennon
  "imagine": {
    rootFreq: 130.81, // C3
    scale: [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19], // C major
    // G4, E4, G4, E4, G4, A4, G4, F4, E4
    melody: [19, 16, 19, 16, 19, 21, 19, 17, 16, 14, 12, 14, 16, 14, 12],
    chords: [
      [0, 4, 7],      // C
      [0, 4, 7, 11],  // Cmaj7
      [5, 9, 12],     // F
      [0, 4, 7]       // C
    ]
  },
  // "Yesterday" by The Beatles
  "yesterday": {
    rootFreq: 174.61, // F3
    scale: [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19], // F major
    // G4, F4, F4, A4, B4, C#5, D5, E5, F5
    melody: [14, 12, 12, 16, 18, 20, 21, 23, 24, 23, 21, 19, 17, 16, 14, 12],
    chords: [
      [0, 4, 7],      // F
      [-1, 2, 5],     // Em7
      [4, 8, 11],     // A7
      [-3, 0, 4]      // Dm
    ]
  }
};

// Generates a deterministic, beautiful instrumental melody/chords mapping for any unmapped song
export function getSongMelody(title: string, artist: string, id: number): SongMelody {
  const normTitle = title.toLowerCase().trim();
  
  // Try to find exact or partial title match first
  for (const key of Object.keys(SONG_MELODIES)) {
    if (normTitle.includes(key)) {
      return SONG_MELODIES[key];
    }
  }

  // Deterministically seed properties from the song's ID and name
  const seed = id + normTitle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Root frequencies from 130Hz to 240Hz (C3 to B3)
  const roots = [130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65, 220.00, 233.08, 246.94];
  const rootFreq = roots[seed % roots.length];

  // Minor or Major key
  const isMinor = seed % 2 === 0;
  
  // Scale definition
  const scale = isMinor
    ? [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19] // Natural minor
    : [0, 2, 4, 7, 9, 12, 14, 16, 19, 21];       // Major Pentatonic

  // Generate a beautiful, elegant, flowing melody sequence (16 steps)
  const melody: number[] = [];
  let currentDegreeIdx = isMinor ? 4 : 3; // Start near the 5th degree
  
  for (let i = 0; i < 16; i++) {
    // Generate beautiful flowing steps with high musical cohesion
    const stepVal = (seed + i * 3) % 5 - 2; // -2, -1, 0, 1, 2
    currentDegreeIdx = Math.max(0, Math.min(scale.length - 1, currentDegreeIdx + stepVal));
    melody.push(scale[currentDegreeIdx]);
  }

  // Generate chord progression
  const chords: number[][] = [];
  if (isMinor) {
    chords.push([0, 3, 7]);     // i
    chords.push([5, 8, 12]);    // iv
    chords.push([3, 7, 10]);    // III
    chords.push([7, 10, 14]);   // v
  } else {
    chords.push([0, 4, 7]);     // I
    chords.push([9, 12, 16]);   // vi
    chords.push([5, 9, 12]);    // IV
    chords.push([7, 11, 14]);   // V
  }

  return { rootFreq, scale, melody, chords };
}
