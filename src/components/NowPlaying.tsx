/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { X, Heart, ChevronDown, Music4, Eye, EyeOff, Video, VideoOff } from 'lucide-react';
import { Song } from '../types';
import { SONGS, getProceduralArt } from '../data';

interface NowPlayingProps {
  isOpen: boolean;
  onClose: () => void;
  currentSong: Song | null;
  isPlaying: boolean;
  queue: number[];
  queueName: string;
  onSongClick: (index: number) => void;
  likedSongIds: Set<number>;
  onToggleLike: (id: number) => void;
  currentTime: number;
}

interface LyricLine {
  time: number;
  text: string;
}

export const NowPlaying: React.FC<NowPlayingProps> = ({
  isOpen,
  onClose,
  currentSong,
  isPlaying,
  queue,
  queueName,
  onSongClick,
  likedSongIds,
  onToggleLike,
  currentTime,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  const [activeView, setActiveView] = React.useState<'queue' | 'lyrics'>('queue');
  const [showVideo, setShowVideo] = React.useState(true);
  const [lyrics, setLyrics] = React.useState<LyricLine[]>([]);
  const [isLoadingLyrics, setIsLoadingLyrics] = React.useState(false);
  const [lyricsError, setLyricsError] = React.useState<string | null>(null);

  // Cache lyrics inside ref to prevent unnecessary API re-fetches
  const lyricsCacheRef = useRef<Record<number, LyricLine[]>>({});

  // Auto scroll currently playing song in the queue into view
  useEffect(() => {
    if (isOpen && currentSong && panelRef.current && activeView === 'queue') {
      setTimeout(() => {
        const activeItem = panelRef.current?.querySelector('.np-row-active');
        if (activeItem) {
          activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 300);
    }
  }, [isOpen, currentSong, activeView]);

  // Eagerly fetch/load lyrics whenever currentSong changes
  useEffect(() => {
    if (!currentSong) {
      setLyrics([]);
      setLyricsError(null);
      return;
    }

    const songId = currentSong.id;
    if (lyricsCacheRef.current[songId]) {
      setLyrics(lyricsCacheRef.current[songId]);
      setLyricsError(null);
      return;
    }

    setIsLoadingLyrics(true);
    setLyricsError(null);
    setLyrics([]);

    const fetchLyrics = async () => {
      try {
        // Try Lrclib first (accurate synced lyrics)
        const lrclibRes = await fetch(`/api/lyrics-lrclib?title=${encodeURIComponent(currentSong.title)}&artist=${encodeURIComponent(currentSong.artist)}`);
        const lrclibData = await lrclibRes.json();

        if (lrclibData && lrclibData.lyrics && lrclibData.lyrics.length > 0) {
          const sorted = [...lrclibData.lyrics].sort((a: any, b: any) => a.time - b.time);
          lyricsCacheRef.current[songId] = sorted;
          setLyrics(sorted);
          return;
        }

        // Fall back to existing lyrics endpoint (static + Gemini)
        const fallbackRes = await fetch(`/api/lyrics?title=${encodeURIComponent(currentSong.title)}&artist=${encodeURIComponent(currentSong.artist)}&duration=${currentSong.duration}`);
        const fallbackData = await fallbackRes.json();

        if (fallbackData && fallbackData.lyrics && fallbackData.lyrics.length > 0) {
          const sorted = [...fallbackData.lyrics].sort((a: any, b: any) => a.time - b.time);
          lyricsCacheRef.current[songId] = sorted;
          setLyrics(sorted);
        } else {
          setLyricsError('Lyrics not available for this track');
        }
      } catch (err) {
        console.error('Error loading lyrics:', err);
        setLyricsError('Could not load lyrics. Tap to retry.');
      } finally {
        setIsLoadingLyrics(false);
      }
    };

    fetchLyrics();
  }, [currentSong]);

  const handleRetryLyrics = async () => {
    if (!currentSong) return;
    const songId = currentSong.id;
    setIsLoadingLyrics(true);
    setLyricsError(null);

    try {
      // Try Lrclib first
      const lrclibRes = await fetch(`/api/lyrics-lrclib?title=${encodeURIComponent(currentSong.title)}&artist=${encodeURIComponent(currentSong.artist)}`);
      const lrclibData = await lrclibRes.json();

      if (lrclibData && lrclibData.lyrics && lrclibData.lyrics.length > 0) {
        const sorted = [...lrclibData.lyrics].sort((a: any, b: any) => a.time - b.time);
        lyricsCacheRef.current[songId] = sorted;
        setLyrics(sorted);
        return;
      }

      // Fall back
      const fallbackRes = await fetch(`/api/lyrics?title=${encodeURIComponent(currentSong.title)}&artist=${encodeURIComponent(currentSong.artist)}&duration=${currentSong.duration}`);
      const fallbackData = await fallbackRes.json();

      if (fallbackData && fallbackData.lyrics && fallbackData.lyrics.length > 0) {
        const sorted = [...fallbackData.lyrics].sort((a: any, b: any) => a.time - b.time);
        lyricsCacheRef.current[songId] = sorted;
        setLyrics(sorted);
      } else {
        setLyricsError('Lyrics not available for this track');
      }
    } catch (err) {
      console.error('Error retrying lyrics:', err);
      setLyricsError('Could not load lyrics. Tap to retry.');
    } finally {
      setIsLoadingLyrics(false);
    }
  };

  // Find active lyric line based on currentTime
  const activeLineIndex = lyrics.reduce((acc, line, index) => {
    if (currentTime >= line.time) {
      return index;
    }
    return acc;
  }, -1);

  // Auto-scroll active lyric line to center of container
  useEffect(() => {
    if (activeView === 'lyrics' && activeLineIndex !== -1 && lyricsContainerRef.current) {
      const activeEl = lyricsContainerRef.current.querySelector(`[data-lyric-index="${activeLineIndex}"]`) as HTMLElement;
      if (activeEl) {
        const container = lyricsContainerRef.current;
        const containerHeight = container.clientHeight;
        const elemTop = activeEl.offsetTop;
        const elemHeight = activeEl.clientHeight;
        
        // Calculate the ideal scrollTop so that activeEl is in the vertical center of the container
        const targetScrollTop = elemTop - (containerHeight / 2) + (elemHeight / 2);
        
        container.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: 'smooth'
        });
      }
    }
  }, [activeLineIndex, activeView]);

  // Synchronously overlay the persistent YouTube player iframe container over our placeholder slot
  useEffect(() => {
    const updatePosition = () => {
      const placeholder = document.getElementById('youtube-player-placeholder');
      const container = document.getElementById('youtube-player-hidden-container');
      
      if (placeholder && container && currentSong && showVideo && isOpen) {
        const rect = placeholder.getBoundingClientRect();
        
        // Match geometry exactly
        container.style.display = 'block';
        container.style.position = 'fixed';
        container.style.left = `${rect.left}px`;
        container.style.top = `${rect.top}px`;
        container.style.width = `${rect.width}px`;
        container.style.height = `${rect.height}px`;
        container.style.borderRadius = '12px';
        container.style.overflow = 'hidden';
        container.style.pointerEvents = 'auto';
        container.style.zIndex = '60'; // above the aside drawer (z-50) and below dialog overlays
        container.style.opacity = '1';
        container.style.transform = 'none';
        container.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      } else {
        const container = document.getElementById('youtube-player-hidden-container');
        if (container) {
          container.style.display = 'block';
          container.style.position = 'fixed';
          container.style.left = '-9999px';
          container.style.top = '-9999px';
          container.style.width = '16px';
          container.style.height = '9px';
          container.style.pointerEvents = 'none';
          container.style.opacity = '0.001';
        }
      }
    };

    // Run immediately
    updatePosition();
    
    // Wire up events
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true); // capture scrolls
    
    // Run an interval to ensure flawless tracking during transition transforms or slide animations
    const interval = setInterval(updatePosition, 16); // ~60fps

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      clearInterval(interval);
      
      // Hide container when drawer closes or unmounts
      const container = document.getElementById('youtube-player-hidden-container');
      if (container) {
        container.style.display = 'block';
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.style.top = '-9999px';
        container.style.width = '16px';
        container.style.height = '9px';
        container.style.pointerEvents = 'none';
        container.style.opacity = '0.001';
      }
    };
  }, [currentSong, showVideo, isOpen]);

  if (!isOpen) return null;

  const displayArt = currentSong ? getProceduralArt(currentSong) : '';
  const currentSongLiked = currentSong ? likedSongIds.has(currentSong.id) : false;

  return (
    <>
      {/* Background scrim / overlay (clickable to close, visible on mobile) */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45 md:hidden transition-opacity duration-300"
      />

      {/* The Now Playing Right-hand Drawer */}
      <aside
        ref={panelRef}
        className={`fixed top-2 left-2 bottom-2 right-2 md:top-3 md:right-3 md:bottom-[116px] md:left-auto md:w-[380px] z-50 bg-bg-sidebar border border-border-medium rounded-2xl flex flex-col overflow-hidden shadow-2xl transition-all duration-500 transform ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {/* 1. Header (Static/Fixed at the top) */}
        <div className="relative p-4 md:p-5 pb-3 md:pb-4 shrink-0 overflow-hidden border-b border-border-app bg-bg-sidebar/95 backdrop-blur-sm z-30">
          {currentSong && (
            <div
              className="absolute inset-0 bg-cover bg-center blur-[32px] saturate-[1.4] opacity-25 scale-125 pointer-events-none transition-all duration-700"
              style={{ backgroundImage: `url("${currentSong.cover}"), url("${displayArt}")` }}
            />
          )}

          {/* Header Controls */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest text-text-muted uppercase">Now Playing</span>
            
            <div className="flex items-center gap-2 relative z-20">
              {currentSong && (
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  title={showVideo ? "Hide Video Player (Video ON)" : "Show Video Player (Video OFF)"}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shadow-md cursor-pointer ${
                    showVideo
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25'
                      : 'bg-bg-hover border-border-medium text-text-secondary hover:text-text-primary hover:bg-bg-card-hover'
                  }`}
                >
                  {showVideo ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>
              )}
              <button
                onClick={onClose}
                title="Collapse"
                className="w-8 h-8 rounded-full bg-bg-hover hover:bg-bg-card-hover border border-border-app text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors shadow-md cursor-pointer"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Scrollable Body for all dynamic contents */}
        <div
          ref={lyricsContainerRef}
          className="flex-1 overflow-y-auto custom-scrollbar flex flex-col min-h-0"
        >
          {/* Card Area (Ambient Reflection background, video/artwork, and details) */}
          <div className="relative p-4 md:p-5 flex flex-col items-center">
            {currentSong && (
              <div
                className="absolute inset-0 bg-cover bg-center blur-[32px] saturate-[1.4] opacity-20 scale-125 pointer-events-none transition-all duration-700"
                style={{ backgroundImage: `url("${currentSong.cover}"), url("${displayArt}")` }}
              />
            )}

            {/* YouTube Video Player Embedded Slot Placeholder */}
            <div
              id="youtube-player-placeholder"
              className={`w-full aspect-video rounded-xl overflow-hidden border border-border-medium bg-[#050507] shadow-xl relative transition-all duration-500 z-10 ${
                currentSong && showVideo
                  ? 'opacity-100 scale-100 max-h-[185px] mb-2 w-full'
                  : 'opacity-0 scale-95 max-h-0 select-none pointer-events-none mt-0 border-transparent mb-0'
              }`}
            />

            {/* Detailed Card Area */}
            {currentSong ? (
              activeView === 'lyrics' ? (
                /* Compact horizontal row for Lyrics view to maximize lyrics vertical space */
                <div className="relative z-10 flex items-center gap-3 mt-3 bg-bg-card/40 p-2.5 rounded-xl border border-border-app/40 backdrop-blur-md w-full">
                  {/* Mini Cover Artwork */}
                  <div
                    onClick={() => setShowVideo(true)}
                    className={`relative w-10 h-10 shadow-md border border-border-medium shrink-0 overflow-hidden cursor-pointer ${
                      isPlaying ? 'rounded-full animate-[spin_12s_linear_infinite]' : 'rounded-lg'
                    }`}
                    title="Show Video Player"
                  >
                    <img
                      src={currentSong.cover}
                      alt={currentSong.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = displayArt;
                      }}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#050507] border-[2px] border-white/5 flex items-center justify-center">
                          <div className="w-0.5 h-0.5 rounded-full bg-white/10" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Title & Artist */}
                  <div className="min-w-0 flex-1 text-left">
                    <h2 className="font-display font-bold text-xs text-text-primary truncate leading-tight">
                      {currentSong.title}
                    </h2>
                    <p className="text-[10px] text-text-secondary truncate mt-0.5">{currentSong.artist}</p>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => onToggleLike(currentSong.id)}
                    className={`w-7 h-7 rounded-full bg-bg-hover hover:bg-bg-card-hover border border-border-medium flex items-center justify-center shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
                      currentSongLiked ? 'text-pink-500' : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${currentSongLiked ? 'fill-pink-500' : ''}`} />
                  </button>
                </div>
              ) : (
                /* Standard Large Detailed Card Area */
                <div className="relative z-10 flex flex-col items-center w-full mt-3">
                  {/* Cover Artwork - Only show if video is not showing */}
                  {!showVideo && (
                    <div
                      onClick={() => setShowVideo(true)}
                      className={`relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] shadow-[0_20px_45px_rgba(0,0,0,0.6)] border border-border-medium transition-all duration-500 overflow-hidden cursor-pointer group ${
                        isPlaying ? 'rounded-full animate-[spin_12s_linear_infinite]' : 'rounded-2xl'
                      }`}
                      title="Click to show video player"
                    >
                      <img
                        src={currentSong.cover}
                        alt={currentSong.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = displayArt;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      {/* Vinyl Record Centerpiece visual */}
                      {isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-12 h-12 rounded-full bg-[#050507] border-[6px] border-white/5 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          </div>
                        </div>
                      )}
                      {/* Hover Show Video overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-[10px] font-bold tracking-wider text-white bg-emerald-500 px-2 py-1 rounded-full">WATCH VIDEO</span>
                      </div>
                    </div>
                  )}

                  {/* Title & Actions row */}
                  <div className="w-full mt-3 flex items-start justify-between gap-3 text-left">
                    <div className="min-w-0 flex-1">
                      <h2 className="font-display font-bold text-sm md:text-base text-text-primary truncate leading-snug">
                        {currentSong.title}
                      </h2>
                      <p className="text-xs text-text-secondary truncate mt-0.5">{currentSong.artist}</p>
                      {!showVideo && (
                        <p className="text-[10px] text-text-muted truncate mt-1">
                          Album: <span className="text-text-secondary italic">{currentSong.album}</span>
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleLike(currentSong.id)}
                      className={`w-8 h-8 rounded-full bg-bg-hover hover:bg-bg-card-hover border border-border-medium flex items-center justify-center shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
                        currentSongLiked ? 'text-pink-500' : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${currentSongLiked ? 'fill-pink-500' : ''}`} />
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-text-muted">
                <Music4 className="w-10 h-10 animate-bounce text-text-muted/30" />
                <p className="text-xs mt-3">Select a song to display info</p>
              </div>
            )}
          </div>

          {/* 3. Tab Switcher & Dynamic Content Lists */}
          <div className="flex-1 flex flex-col px-4 md:px-5 pb-5">
            {/* Sticky Switcher inside the scrollable view */}
            <div className="sticky top-0 bg-bg-sidebar/95 backdrop-blur-md py-3 z-20 border-b border-border-app/30 mb-4 select-none">
              <div className="flex bg-bg-hover/80 p-1 rounded-xl border border-border-app">
                <button
                  onClick={() => setActiveView('queue')}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    activeView === 'queue'
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  Up Next
                </button>
                <button
                  onClick={() => setActiveView('lyrics')}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    activeView === 'lyrics'
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  Lyrics
                </button>
              </div>
            </div>

            {/* Render selected tab list */}
            {activeView === 'lyrics' ? (
              <div className="space-y-6 pb-12 text-center select-text">
                {isLoadingLyrics ? (
                  <div className="h-40 flex flex-col items-center justify-center text-text-muted space-y-3">
                    <div className="flex gap-1 items-end h-6 select-none animate-pulse">
                      <span className="w-1 bg-emerald-400 rounded-full h-3 animate-[equalizer_0.8s_ease_infinite]" />
                      <span className="w-1 bg-emerald-400 rounded-full h-5 animate-[equalizer_0.6s_ease_infinite_0.15s]" />
                      <span className="w-1 bg-emerald-400 rounded-full h-4 animate-[equalizer_1s_ease_infinite_0.3s]" />
                    </div>
                    <p className="text-xs font-medium animate-pulse">Tuning in real-time lyrics...</p>
                  </div>
                ) : lyricsError ? (
                  <div
                    onClick={handleRetryLyrics}
                    className="h-40 flex flex-col items-center justify-center text-text-muted cursor-pointer hover:text-text-primary p-4 text-center"
                  >
                    <p className="text-xs mb-2">{lyricsError}</p>
                    <span className="text-[10px] text-emerald-400 underline font-bold">Tap to Retry</span>
                  </div>
                ) : lyrics.length > 0 ? (
                  lyrics.map((line, index) => {
                    const isActive = index === activeLineIndex;
                    const isPast = index < activeLineIndex;

                    return (
                      <p
                        key={index}
                        data-lyric-index={index}
                        className={`text-base md:text-lg font-medium transition-all duration-500 px-4 leading-loose tracking-wide cursor-default ${
                          isActive
                            ? 'text-emerald-400 font-extrabold scale-105 filter drop-shadow-[0_0_12px_rgba(52,211,153,0.45)]'
                            : isPast
                            ? 'text-text-primary/70 filter blur-[0.2px]'
                            : 'text-text-muted/40'
                        }`}
                      >
                        {line.text}
                      </p>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center text-text-muted/40 text-xs py-8">
                    No lyrics found for this track
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col pb-12">
                {/* Label Header */}
                <div className="flex items-center gap-2 mb-3 select-none">
                  <span className="text-[10px] font-bold tracking-widest text-text-muted uppercase">Up Next</span>
                  <span className="text-xs text-text-muted font-bold">·</span>
                  <span className="text-xs font-semibold text-emerald-400 truncate max-w-[200px]" title={queueName}>
                    {queueName}
                  </span>
                </div>

                {/* Queue list items */}
                <div className="space-y-1">
                  {queue.length > 0 ? (
                    queue.map((songId, index) => {
                      const s = SONGS.find((x) => x.id === songId);
                      if (!s) return null;
                      const isCurrent = currentSong?.id === s.id;
                      const songArt = getProceduralArt(s);

                      return (
                        <div
                          key={`${songId}_${index}`}
                          onClick={() => onSongClick(s.id)}
                          className={`group flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all duration-200 border ${
                            isCurrent
                              ? 'bg-emerald-500/10 border-emerald-500/20 np-row-active font-semibold'
                              : 'hover:bg-bg-card-hover border-transparent'
                          }`}
                        >
                          <div className="w-7 text-center shrink-0 flex items-center justify-center">
                            {isCurrent && isPlaying ? (
                              <div className="flex items-end gap-0.5 h-4 justify-center select-none">
                                <span className="w-0.5 bg-emerald-400 rounded-full animate-[equalizer_0.8s_ease_infinite]" />
                                <span className="w-0.5 bg-emerald-400 rounded-full animate-[equalizer_0.6s_ease_infinite_0.15s]" />
                                <span className="w-0.5 bg-emerald-400 rounded-full animate-[equalizer_1s_ease_infinite_0.3s]" />
                                <span className="w-0.5 bg-emerald-400 rounded-full animate-[equalizer_0.7s_ease_infinite_0.45s]" />
                              </div>
                            ) : (
                              <span className="text-[11px] text-text-muted font-mono font-bold group-hover:text-emerald-400">
                                {index + 1}
                              </span>
                            )}
                          </div>

                          <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-border-app shadow-md">
                            <img
                              src={s.cover}
                              alt={s.title}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = songArt;
                              }}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4
                              className={`text-xs truncate ${
                                isCurrent ? 'text-emerald-400' : 'text-text-secondary group-hover:text-text-primary'
                              }`}
                            >
                              {s.title}
                            </h4>
                            <p className="text-[10px] text-text-muted truncate leading-snug mt-0.5">{s.artist}</p>
                          </div>

                          <span className="text-[10px] text-text-muted font-mono font-medium">
                            {Math.floor(s.duration / 60)}:{String(s.duration % 60).padStart(2, '0')}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center text-text-muted/40 text-xs py-8">
                      No songs in active queue
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
