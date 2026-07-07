/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Repeat1,
  Heart,
  Volume2,
  Volume1,
  VolumeX,
  ListMusic,
  Maximize2,
} from 'lucide-react';
import { Song, RepeatMode } from '../types';
import { getProceduralArt } from '../data';

interface PlaybackControlsProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isNowPlayingOpen: boolean;
  onToggleNowPlaying: () => void;
  isLiked: boolean;
  onToggleLike: () => void;
  isShuffle: boolean;
  onToggleShuffle: () => void;
  repeatMode: RepeatMode;
  onToggleRepeat: () => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
  isNowPlayingOpen,
  onToggleNowPlaying,
  isLiked,
  onToggleLike,
  isShuffle,
  onToggleShuffle,
  repeatMode,
  onToggleRepeat,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatTime = (secs: number) => {
    const s = Math.max(0, Math.floor(secs || 0));
    const mins = Math.floor(s / 60);
    const rem = s % 60;
    return `${mins}:${String(rem).padStart(2, '0')}`;
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(parseFloat(e.target.value));
  };

  const displayArt = currentSong ? getProceduralArt(currentSong) : '';

  return (
    <footer className="h-16 md:h-24 bg-bg-sidebar/95 backdrop-blur-md border border-border-app rounded-2xl px-3 md:px-5 flex items-center justify-between gap-4 select-none relative z-40 shadow-xl shrink-0 overflow-hidden">
      {/* Mobile top progress bar line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-border-medium/30 md:hidden overflow-hidden rounded-t-2xl">
        <div
          className="h-full bg-emerald-500 transition-all duration-100"
          style={{ width: `${((currentTime / (duration || 100)) * 100) || 0}%` }}
        />
      </div>

      {/* 1. Track Info Section */}
      <div className="flex items-center gap-2 md:gap-3 min-w-0 shrink-0">
        {currentSong ? (
          <>
            <div
              onClick={onToggleNowPlaying}
              className="relative w-11 h-11 md:w-14 md:h-14 rounded-xl overflow-hidden shrink-0 shadow-lg cursor-pointer group active:scale-95 transition-transform"
            >
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = displayArt;
                }}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 min-w-0 flex-1 md:flex-initial">
              <div className="min-w-0 flex-1">
                <h4
                  onClick={onToggleNowPlaying}
                  className="font-semibold text-xs md:text-xs text-text-primary truncate hover:underline cursor-pointer leading-tight"
                >
                  {currentSong.title}
                </h4>
                <p className="text-[10px] md:text-[10px] text-text-muted truncate mt-0.5">{currentSong.artist}</p>
              </div>

              <button
                onClick={onToggleLike}
                className={`p-1 rounded-full transition-transform hover:scale-110 active:scale-90 cursor-pointer shrink-0 ${
                  isLiked ? 'text-pink-500' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isLiked ? 'fill-pink-500' : ''}`} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-bg-hover border border-border-app flex items-center justify-center text-text-muted/40">
              <Maximize2 className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-xs md:text-xs text-text-muted truncate leading-tight">No active track</h4>
              <p className="text-[10px] md:text-[10px] text-text-muted/60 truncate mt-0.5">Select a song to start</p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Playback Control Section - centered */}
      <div className="flex flex-col items-center justify-center md:flex-1 gap-1 min-w-0 shrink-0">
        {/* Buttons Controls row */}
        <div className="flex items-center gap-1 md:gap-4 shrink-0">
          <button
            onClick={onToggleShuffle}
            title={isShuffle ? 'Shuffle enabled' : 'Shuffle disabled'}
            className={`hidden sm:block p-1.5 md:p-2 rounded-full hover:bg-bg-card-hover transition-colors cursor-pointer ${
              isShuffle ? 'text-emerald-400 font-bold' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>

          <button
            onClick={onPrev}
            title="Previous track"
            className="p-1.5 md:p-2 rounded-full hover:bg-bg-card-hover text-text-secondary hover:text-text-primary active:scale-90 transition-transform cursor-pointer"
          >
            <SkipBack className="w-4 h-4 md:w-5 md:h-5 fill-current" />
          </button>

          <button
            onClick={onPlayPause}
            title={isPlaying ? 'Pause' : 'Play'}
            className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 hover:brightness-110 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] shrink-0 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current text-white" />
            ) : (
              <Play className="w-4 h-4 md:w-5 md:h-5 fill-current text-white translate-x-0.5" />
            )}
          </button>

          <button
            onClick={onNext}
            title="Next track"
            className="p-1.5 md:p-2 rounded-full hover:bg-bg-card-hover text-text-secondary hover:text-text-primary active:scale-90 transition-transform cursor-pointer"
          >
            <SkipForward className="w-4 h-4 md:w-5 md:h-5 fill-current" />
          </button>

          <button
            onClick={onToggleRepeat}
            title={`Repeat mode: ${repeatMode}`}
            className={`hidden sm:block p-1.5 md:p-2 rounded-full hover:bg-bg-card-hover transition-colors cursor-pointer ${
              repeatMode !== 'off' ? 'text-emerald-400 font-bold' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {repeatMode === 'one' ? <Repeat1 className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Repeat className="w-3.5 h-3.5 md:w-4 md:h-4" />}
          </button>

          <button
            onClick={onToggleNowPlaying}
            title="Toggle queue"
            className={`p-1.5 md:hidden rounded-full transition-colors cursor-pointer ${
              isNowPlayingOpen ? 'text-emerald-400' : 'text-text-secondary'
            }`}
          >
            <ListMusic className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile compact progress bar (Hidden because of top indicator) */}
        <div className="hidden items-center gap-2 w-full text-[9px] font-medium text-text-muted font-mono select-none px-1">
          <span className="w-8 text-right">{formatTime(currentTime)}</span>
          <div className="relative flex-1">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleTimelineChange}
              className="w-full h-1 bg-border-medium rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
              style={{
                background: `linear-gradient(to right, rgb(16, 185, 129) ${
                  ((currentTime / (duration || 100)) * 100) || 0
                }%, var(--border-medium) ${((currentTime / (duration || 100)) * 100) || 0}%)`,
              }}
            />
          </div>
          <span className="w-8 text-left">{formatTime(duration)}</span>
        </div>

        {/* Desktop timeline */}
        <div className="hidden md:flex items-center gap-3 w-full text-[10px] font-medium text-text-muted font-mono select-none">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          <div className="relative flex-1 group">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleTimelineChange}
              className="w-full h-1.5 bg-border-medium rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
              style={{
                background: `linear-gradient(to right, rgb(16, 185, 129) ${
                  ((currentTime / (duration || 100)) * 100) || 0
                }%, var(--border-medium) ${((currentTime / (duration || 100)) * 100) || 0}%)`,
              }}
            />
          </div>
          <span className="w-10 text-left">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. Vol & Extra Utilities (Desktop/Tablet layout) */}
      <div className="hidden md:flex items-center justify-end gap-3 justify-self-end w-full max-w-50">
        {/* Toggle Now Playing Panel */}
        <button
          onClick={onToggleNowPlaying}
          title="Toggle queue/card details"
          className={`p-2 rounded-full transition-colors cursor-pointer ${
            isNowPlayingOpen ? 'text-emerald-400 bg-emerald-500/10' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <ListMusic className="w-4.5 h-4.5" />
        </button>

        {/* Volume Icons based on level & mute */}
        <button onClick={onToggleMute} className="text-text-secondary hover:text-text-primary transition-colors p-1 cursor-pointer">
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4.5 h-4.5 text-text-muted" />
          ) : volume < 0.5 ? (
            <Volume1 className="w-4.5 h-4.5" />
          ) : (
            <Volume2 className="w-4.5 h-4.5" />
          )}
        </button>

        {/* Volume Scrubber */}
        <div className="w-20 group relative">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-border-medium rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
            style={{
              background: `linear-gradient(to right, rgb(16, 185, 129) ${
                (isMuted ? 0 : volume) * 100
              }%, var(--border-medium) ${(isMuted ? 0 : volume) * 100}%)`,
            }}
          />
        </div>
      </div>
    </footer>
  );
};
