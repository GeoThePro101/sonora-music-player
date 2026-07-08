/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { NowPlaying } from './components/NowPlaying';
import { PlaybackControls } from './components/PlaybackControls';
import { audioEngine } from './audio';
import { SONGS, PLAYLISTS, getProceduralArt } from './data';
import { Song, RepeatMode } from './types';
import { House, Search, Library, Heart, Sparkles, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // --- Global Persistence & Settings State ---
  const isLightTheme = false;
  const [likedSongIds, setLikedSongIds] = useState<Set<number>>(new Set());
  const [recentlyPlayed, setRecentlyPlayed] = useState<number[]>([]);

  // --- Active Player Controls State ---
  const [activeSongId, setActiveSongId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  // --- Queue / Playlists State ---
  const [activeQueue, setActiveQueue] = useState<number[]>(SONGS.map((s) => s.id));
  const [activeQueueName, setActiveQueueName] = useState('All songs');
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');

  // --- Visual Utilities State ---
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);

  // --- Toast Alert Notification ---
  const [toast, setToast] = useState<{
    title: string;
    subtitle: string;
    artUrl: string;
    visible: boolean;
  }>({
    title: '',
    subtitle: '',
    artUrl: '',
    visible: false,
  });

  const toastTimerRef = useRef<any>(null);

  // --- 1. Initialize State from LocalStorage ---
  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem('sonora_likes');
      if (storedLikes) {
        setLikedSongIds(new Set(JSON.parse(storedLikes)));
      }

      const storedRecent = localStorage.getItem('sonora_recent');
      if (storedRecent) {
        setRecentlyPlayed(JSON.parse(storedRecent));
      }

      document.documentElement.setAttribute('data-theme', 'dark');

      const storedVol = localStorage.getItem('sonora_volume');
      if (storedVol) {
        const v = parseFloat(storedVol);
        setVolume(v);
        audioEngine.setVolume(v);
      }
    } catch (e) {
      console.warn('LocalStorage reads restricted or unavailable:', e);
    }

    // Small delay to simulate loaded cover visualizer
    const t = setTimeout(() => {
      setIsAppLoading(false);
      // Prime the YouTube API and player in the background
      if (typeof window !== 'undefined') {
        audioEngine.ensureYtPlayer().catch((err) => {
          console.warn('Error priming YT player on mount:', err);
        });
      }
    }, 900);

    return () => clearTimeout(t);
  }, []);

  // --- 2. Synchronize Audio Engine Listeners ---
  const handleNextRef = useRef<any>(null);

  useEffect(() => {
    audioEngine.onTimeUpdate = (time) => {
      setCurrentTime(time);
    };

    audioEngine.onDurationChange = (dur) => {
      setDuration(dur);
    };

    audioEngine.onEnded = () => {
      if (handleNextRef.current) {
        handleNextRef.current(true); // Trigger ended check
      }
    };

    // No destructive cleanup of global singleton on dependency changes!
  }, []);

  // --- 3. Core Song Player Dispatchers ---
  const playSongById = (songId: number, overrideQueue?: number[], overrideQueueName?: string) => {
    const s = SONGS.find((x) => x.id === songId);
    if (!s) return;

    setActiveSongId(songId);
    setIsPlaying(true);
    setDuration(s.duration);
    setCurrentTime(0);

    // If an explicit queue is passed (e.g. from a playlist click), override the active queue context
    if (overrideQueue) {
      setActiveQueue(overrideQueue);
      if (overrideQueueName) setActiveQueueName(overrideQueueName);
    }

    audioEngine.play(s);

    // Auto-reveal the now playing drawer to display the video player immediately
    setIsNowPlayingOpen(true);

    // Trigger visual toast banner
    showToastAlert(s.title, s.artist, s.cover || getProceduralArt(s));

    // Append to recently played history
    setRecentlyPlayed((prev) => {
      const updated = [songId, ...prev.filter((x) => x !== songId)].slice(0, 12);
      try {
        localStorage.setItem('sonora_recent', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handlePlayPause = () => {
    if (activeSongId === null) {
      // Play first song in queue if nothing is active
      if (activeQueue.length > 0) {
        playSongById(activeQueue[0]);
      } else {
        playSongById(0);
      }
      return;
    }

    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      audioEngine.resume();
      setIsPlaying(true);
    }
  };

  const handleNext = (autoEnded = false) => {
    if (activeQueue.length === 0) return;

    if (autoEnded && repeatMode === 'one' && activeSongId !== null) {
      // Repeat current song from beginning
      audioEngine.seek(0);
      setCurrentTime(0);
      const s = SONGS.find((x) => x.id === activeSongId);
      if (s) {
        audioEngine.play(s);
        setIsPlaying(true);
      }
      return;
    }

    let nextSongId: number | null = null;

    if (isShuffle) {
      const remaining = activeQueue.filter((id) => id !== activeSongId);
      if (remaining.length > 0) {
        nextSongId = remaining[Math.floor(Math.random() * remaining.length)];
      } else {
        nextSongId = activeQueue[0];
      }
    } else {
      const currentIdx = activeSongId !== null ? activeQueue.indexOf(activeSongId) : -1;
      const nextIdx = (currentIdx + 1) % activeQueue.length;
      nextSongId = activeQueue[nextIdx];
    }

    if (nextSongId !== null) {
      playSongById(nextSongId);
    }
  };

  const handlePrev = () => {
    if (activeQueue.length === 0) return;

    let prevSongId: number | null = null;

    if (isShuffle) {
      const remaining = activeQueue.filter((id) => id !== activeSongId);
      if (remaining.length > 0) {
        prevSongId = remaining[Math.floor(Math.random() * remaining.length)];
      } else {
        prevSongId = activeQueue[0];
      }
    } else {
      const currentIdx = activeSongId !== null ? activeQueue.indexOf(activeSongId) : -1;
      const prevIdx = (currentIdx - 1 + activeQueue.length) % activeQueue.length;
      prevSongId = activeQueue[prevIdx];
    }

    if (prevSongId !== null) {
      playSongById(prevSongId);
    }
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    audioEngine.seek(time);
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    setIsMuted(false);
    audioEngine.setVolume(vol);
    audioEngine.setMute(false);
    try {
      localStorage.setItem('sonora_volume', vol.toString());
    } catch (e) {}
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioEngine.setMute(nextMute);
  };

  // --- 4. User Interaction State Adjusters ---
  const handleToggleLike = (id?: number) => {
    const targetId = id !== undefined ? id : activeSongId;
    if (targetId === null) return;

    setLikedSongIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(targetId)) {
        updated.delete(targetId);
        showToastAlert('Removed from Library', SONGS.find((x) => x.id === targetId)?.title || '', '');
      } else {
        updated.add(targetId);
        showToastAlert('Saved to Liked Songs', SONGS.find((x) => x.id === targetId)?.title || '', '');
      }
      try {
        localStorage.setItem('sonora_likes', JSON.stringify([...updated]));
      } catch (e) {}
      return updated;
    });
  };

  const handlePlaylistClick = (playlistId: string) => {
    const pl = PLAYLISTS.find((p) => p.id === playlistId);
    if (!pl) return;

    setActivePlaylistId(playlistId);
    setActiveQueue(pl.songIds);
    setActiveQueueName(pl.name);

    if (pl.songIds.length > 0) {
      playSongById(pl.songIds[0], pl.songIds, pl.name);
      setIsNowPlayingOpen(true); // Auto-reveal now playing card panel
    }
  };

  const handleClearRecent = () => {
    setRecentlyPlayed([]);
    try {
      localStorage.removeItem('sonora_recent');
    } catch (e) {}
    showToastAlert('History Cleared', 'Recents have been emptied.', '');
  };

  const handleShuffleMix = () => {
    // Generate an instant customized shuffled deck of songs
    const shuffledDeck = [...SONGS].sort(() => Math.random() - 0.5);
    const subsetIds = shuffledDeck.slice(0, 10).map((s) => s.id);

    setActiveQueue(subsetIds);
    setActiveQueueName('Custom Sonora Mix');
    setActivePlaylistId(null);
    setActiveTab('home');

    playSongById(subsetIds[0], subsetIds, 'Custom Sonora Mix');
    setIsNowPlayingOpen(true);
    showToastAlert('New Mix Generated', 'Custom shuffle mix active.', '');
  };

  const handleToggleTheme = () => {
    // Theme selection disabled - dark mode only
  };

  const handleCycleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const handleToggleShuffle = () => {
    setIsShuffle((prev) => {
      const nextShuffle = !prev;
      showToastAlert(nextShuffle ? 'Shuffle enabled' : 'Shuffle disabled', 'Queue order randomized', '');
      return nextShuffle;
    });
  };

  // --- 5. Visual Notification Logic ---
  const showToastAlert = (title: string, subtitle: string, artUrl: string) => {
    setToast({ title, subtitle, artUrl, visible: true });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  handleNextRef.current = handleNext;
  const currentSong = activeSongId !== null ? SONGS.find((x) => x.id === activeSongId) || null : null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg-app text-text-primary flex flex-col p-2.5 md:p-3 gap-2 font-sans select-none antialiased">
      {/* Dynamic Aurora Ambient lighting backdrops */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-50 select-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,var(--aurora-1)_0%,transparent_60%)] filter blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,var(--aurora-2)_0%,transparent_62%)] filter blur-3xl" />
      </div>

      {/* --- Interactive Loader Overlay --- */}
      <AnimatePresence>
        {isAppLoading && (
          <motion.div
            id="loader"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[100] bg-bg-app flex flex-col items-center justify-center select-none"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-1.5 items-end h-11 select-none">
                <span className="w-1.5 bg-emerald-400 rounded-full animate-[equalizer_1s_ease_infinite]" />
                <span className="w-1.5 bg-emerald-400 rounded-full animate-[equalizer_1s_ease_infinite_0.15s]" />
                <span className="w-1.5 bg-emerald-400 rounded-full animate-[equalizer_1s_ease_infinite_0.3s]" />
                <span className="w-1.5 bg-emerald-400 rounded-full animate-[equalizer_1s_ease_infinite_0.45s]" />
              </div>
              <b className="font-display text-lg uppercase tracking-[0.3em] text-text-primary font-bold">Sonora</b>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main Application Frame --- */}
      <div className="flex-1 flex gap-2 overflow-hidden min-h-0 select-none">
        {/* Sidebar Component (Desktop only) */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSelectPlaylist={(id) => {
            setActivePlaylistId(id || null);
            if (id) {
              const pl = PLAYLISTS.find((p) => p.id === id);
              if (pl) {
                setActiveQueue(pl.songIds);
                setActiveQueueName(pl.name);
              }
            } else {
              setActiveQueue(SONGS.map((s) => s.id));
              setActiveQueueName('All songs');
            }
          }}
          activePlaylistId={activePlaylistId}
          likedCount={likedSongIds.size}
          totalSongsCount={SONGS.length}
          onShuffleMix={handleShuffleMix}
        />

        {/* Central Scrollable Area */}
        <MainContent
          songs={SONGS}
          activeSongId={activeSongId}
          isPlaying={isPlaying}
          onSongClick={(id) => playSongById(id)}
          onPlaylistClick={handlePlaylistClick}
          likedSongIds={likedSongIds}
          onToggleLike={handleToggleLike}
          recentlyPlayed={recentlyPlayed}
          onClearRecent={handleClearRecent}
          onShuffleMix={handleShuffleMix}
          activePlaylistId={activePlaylistId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLightTheme={isLightTheme}
          onToggleTheme={handleToggleTheme}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Detailed Right Sheet "Now Playing" Component */}
        <NowPlaying
          isOpen={isNowPlayingOpen}
          onClose={() => setIsNowPlayingOpen(false)}
          currentSong={currentSong}
          isPlaying={isPlaying}
          queue={activeQueue}
          queueName={activeQueueName}
          onSongClick={(id) => playSongById(id)}
          likedSongIds={likedSongIds}
          onToggleLike={handleToggleLike}
          currentTime={currentTime}
        />
      </div>

      {/* --- Master Playback Footer Bar --- */}
      <PlaybackControls
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={() => handleNext(false)}
        onPrev={handlePrev}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isNowPlayingOpen={isNowPlayingOpen}
        onToggleNowPlaying={() => setIsNowPlayingOpen((prev) => !prev)}
        isLiked={currentSong ? likedSongIds.has(currentSong.id) : false}
        onToggleLike={() => handleToggleLike()}
        isShuffle={isShuffle}
        onToggleShuffle={handleToggleShuffle}
        repeatMode={repeatMode}
        onToggleRepeat={handleCycleRepeat}
      />

      {/* --- Bottom Navigation Tab Bar (Mobile only) --- */}
      <nav className="h-[60px] bg-bg-sidebar border border-border-app rounded-2xl z-40 flex items-center justify-around md:hidden select-none shrink-0 px-4 shadow-lg">
        <button
          onClick={() => {
            setActiveTab('home');
            setActivePlaylistId(null);
          }}
          className={`flex flex-col items-center justify-center gap-1.5 text-[10px] font-semibold tracking-wider cursor-pointer ${
            activeTab === 'home' && !activePlaylistId ? 'text-emerald-400' : 'text-text-muted'
          }`}
        >
          <House className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('search');
            setActivePlaylistId(null);
          }}
          className={`flex flex-col items-center justify-center gap-1.5 text-[10px] font-semibold tracking-wider cursor-pointer ${
            activeTab === 'search' && !activePlaylistId ? 'text-emerald-400' : 'text-text-muted'
          }`}
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('library');
            setActivePlaylistId(null);
          }}
          className={`flex flex-col items-center justify-center gap-1.5 text-[10px] font-semibold tracking-wider cursor-pointer ${
            activeTab === 'library' && !activePlaylistId ? 'text-emerald-400' : 'text-text-muted'
          }`}
        >
          <Library className="w-5 h-5" />
          <span>Library</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('liked');
            setActivePlaylistId(null);
          }}
          className={`flex flex-col items-center justify-center gap-1.5 text-[10px] font-semibold tracking-wider cursor-pointer ${
            activeTab === 'liked' ? 'text-emerald-400' : 'text-text-muted'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>Liked</span>
        </button>
      </nav>

      {/* --- Notification Toast Banner Alert --- */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 15, x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed left-1/2 bottom-28 md:bottom-28 z-50 bg-bg-sidebar/95 border border-border-medium rounded-full px-4 py-2 flex items-center gap-3 shadow-2xl shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-xl"
          >
            {toast.artUrl ? (
              <img
                src={toast.artUrl}
                alt=""
                className="w-9 h-9 rounded-full object-cover shrink-0 border border-border-medium"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                ✓
              </div>
            )}
            <div className="min-w-0 pr-2">
              <h5 className="font-semibold text-xs text-text-primary truncate max-w-[180px] leading-snug">
                {toast.title}
              </h5>
              <p className="text-[10px] text-text-secondary truncate max-w-[180px] mt-0.5">{toast.subtitle}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
