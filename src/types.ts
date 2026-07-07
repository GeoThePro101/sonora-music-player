/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  file: string;
  cover: string;
  hues: [number, number]; // [hueStart, hueEnd] for beautiful procedural visualizers
  genre: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  hues: [number, number];
  songIds: number[];
  cover?: string;
}

export type RepeatMode = 'off' | 'all' | 'one';
