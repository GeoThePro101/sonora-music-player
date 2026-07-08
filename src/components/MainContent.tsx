/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Moon,
  Sun,
  History,
  Play,
  RotateCcw,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  User,
  Mail,
  Award,
  Music,
} from 'lucide-react';
import { Song, Playlist } from '../types';
import { ProfilePage } from './ProfilePage';
import { PLAYLISTS, getPlaylistArt, getProceduralArt } from '../data';

interface MainContentProps {
  songs: Song[];
  activeSongId: number | null;
  isPlaying: boolean;
  onSongClick: (id: number) => void;
  onPlaylistClick: (id: string) => void;
  likedSongIds: Set<number>;
  onToggleLike: (id: number) => void;
  recentlyPlayed: number[];
  onClearRecent: () => void;
  onShuffleMix: () => void;
  activePlaylistId: string | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLightTheme: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  songs,
  activeSongId,
  isPlaying,
  onSongClick,
  onPlaylistClick,
  likedSongIds,
  onToggleLike,
  recentlyPlayed,
  onClearRecent,
  onShuffleMix,
  activePlaylistId,
  activeTab,
  setActiveTab,
  isLightTheme,
  onToggleTheme,
  searchQuery,
  onSearchChange,
}) => {
  const [greeting, setGreeting] = useState('Good evening');
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good morning');
    else if (hours < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const clearSearch = () => {
    onSearchChange('');
  };

  // Filter songs based on search query
  const filteredSongs = songs.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      s.album.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 flex flex-col bg-bg-main rounded-2xl overflow-hidden border border-border-app relative">
      {/* Immersive UI Radial Indigo Glow Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(16,185,129,0.15)_0%,transparent_60%)] opacity-35 pointer-events-none z-0" />

      {/* 1. Header Toolbar */}
      <header className="sticky top-0 z-20 h-[68px] border-b border-border-app bg-glass-header backdrop-blur-xl flex items-center justify-between px-4 md:px-6 gap-4 select-none relative">
        {/* Navigation Buttons + Search */}
        <div className="flex items-center gap-2 md:gap-4 flex-1 max-w-[460px] min-w-0">
          {/* Scroll Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => {
                const el = document.getElementById('scroll-viewport');
                if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Back to Top"
              className="w-[34px] h-[34px] rounded-full bg-bg-hover border border-border-app text-text-secondary hover:text-text-primary flex items-center justify-center transition-all active:scale-95 shadow cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 -translate-x-0.5" />
            </button>
            <button
              title="Next"
              className="w-[34px] h-[34px] rounded-full bg-bg-hover border border-border-app text-text-muted/40 cursor-not-allowed flex items-center justify-center shadow"
            >
              <ChevronRight className="w-5 h-5 translate-x-0.5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activeTab !== 'search') setActiveTab('search');
              }}
              className="w-full h-10 pl-11 pr-10 rounded-full bg-bg-hover border border-border-medium text-xs text-text-primary placeholder-text-muted hover:border-border-medium/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-card-hover transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Toolbar Right-hand Controls */}
        <div className="flex items-center gap-3 relative z-10 shrink-0">
          {/* User Profile Emblem */}
          <button
            onClick={() => setShowProfileModal(true)}
            title="View Profile Info"
            className="w-[38px] h-[38px] rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 hover:scale-105 active:scale-95 flex items-center justify-center font-bold text-white text-xs shadow-md cursor-pointer transition-all border border-white/20 hover:brightness-110"
          >
            GC
          </button>
        </div>
      </header>

      {/* 2. Main Viewport Scroll Container */}
      <div id="scroll-viewport" className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 select-none relative z-10">
        {/* Dynamic Context Header Banner */}
        {activePlaylistId ? (
          /* Render Active Playlist Banner details */
          (() => {
            const pl = PLAYLISTS.find((p) => p.id === activePlaylistId);
            if (!pl) return null;
            return (
              <div className="relative rounded-2xl overflow-hidden p-6 md:p-8 bg-gradient-to-br from-emerald-500/10 via-bg-card to-bg-card/20 border border-border-app flex flex-col md:flex-row items-center gap-6 shadow-xl animate-[fadeUp_0.4s_ease-out]">
                {/* Background wash */}
                <div
                  className="absolute inset-0 bg-cover bg-center blur-2xl saturate-[1.4] opacity-20 pointer-events-none scale-110"
                  style={{ backgroundImage: `url("${getPlaylistArt(pl)}")` }}
                />

                <div
                  className="w-36 h-36 rounded-xl bg-cover bg-center shrink-0 border border-border-medium shadow-lg relative group"
                  style={{ backgroundImage: `url("${getPlaylistArt(pl)}")` }}
                >
                  <button
                    onClick={() => onPlaylistClick(pl.id)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl cursor-pointer"
                  >
                    <Play className="w-8 h-8 text-white fill-white animate-[pulse_1.5s_infinite]" />
                  </button>
                </div>
                <div className="text-center md:text-left min-w-0 flex-1 relative z-10">
                  <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase">PLAYLIST</span>
                  <h1 className="font-display font-bold text-2xl md:text-4xl text-text-primary mt-1 leading-tight tracking-tight">
                    {pl.name}
                  </h1>
                  <p className="text-xs text-text-secondary mt-2">{pl.description}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2.5 mt-4 text-xs text-text-muted font-mono">
                    <span className="text-text-secondary">{pl.songIds.length} tracks</span>
                    <span>·</span>
                    <button
                      onClick={() => onPlaylistClick(pl.id)}
                      className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-bold font-sans rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-white" /> Play Mix
                    </button>
                  </div>
                </div>
              </div>
            );
          })()
        ) : activeTab === 'profile' ? (
          /* Render Profile */
          <ProfilePage
            likedCount={likedSongIds.size}
            totalSongsCount={songs.length}
            recentlyPlayedCount={0}
          />
        ) : activeTab === 'liked' ? (
          /* Render Saved Songs Banner details */
          <div className="relative rounded-2xl overflow-hidden p-6 md:p-8 bg-gradient-to-br from-emerald-500/10 via-bg-card to-bg-card/20 border border-border-app flex flex-col md:flex-row items-center gap-6 shadow-xl animate-[fadeUp_0.4s_ease-out]">
            <div className="w-36 h-36 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shrink-0 border border-border-medium shadow-lg select-none">
              <Heart className="w-16 h-16 text-white fill-white drop-shadow-[0_8px_16px_rgba(244,63,94,0.3)]" />
            </div>
            <div className="text-center md:text-left min-w-0 flex-1">
              <span className="text-[10px] font-bold tracking-widest text-indigo-500 uppercase">PLAYLIST</span>
              <h1 className="font-display font-bold text-2xl md:text-4xl text-text-primary mt-1 leading-tight tracking-tight">
                Liked Songs
              </h1>
              <p className="text-xs text-text-secondary mt-2">Your saved favorites library, compiled here automatically.</p>
              <div className="flex items-center justify-center md:justify-start gap-2.5 mt-4 text-xs text-text-muted font-mono">
                <span className="text-text-secondary">{likedSongIds.size} tracks saved</span>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Welcome Greeting */
          <div className="animate-[fadeUp_0.4s_ease-out]">
            <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary leading-tight tracking-tight">
              {greeting}
            </h1>
            <p className="text-xs text-text-secondary mt-1.5">
              Select any song to listen. Synthesizer fallback launches on stream lock.
            </p>
          </div>
        )}

        {/* 3. Featured Playlists Grid (Only on Home view) */}
        {!activePlaylistId && activeTab === 'home' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-lg text-text-primary">Featured Mixes</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {PLAYLISTS.map((pl) => (
                <article
                  key={pl.id}
                  onClick={() => onPlaylistClick(pl.id)}
                  className="group relative rounded-xl overflow-hidden aspect-[4/3] flex flex-col justify-end p-4 cursor-pointer border border-border-app hover:border-border-medium shadow-lg hover:scale-[1.03] transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url("${getPlaylistArt(pl)}")` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  {/* Play Button overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaylistClick(pl.id);
                    }}
                    title={`Play ${pl.name}`}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-lg translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  >
                    <Play className="w-4.5 h-4.5 fill-current text-white translate-x-0.5" />
                  </button>

                  <div className="relative z-10">
                    <h3 className="font-display font-semibold text-xs text-white tracking-tight">{pl.name}</h3>
                    <p className="text-[10px] text-white/60 truncate mt-0.5">{pl.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 4. Recently Played Carousel */}
        {!activePlaylistId && activeTab === 'home' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-text-primary">
                <History className="w-5 h-5 text-emerald-400 animate-pulse" />
                <h2 className="font-display font-bold text-lg">Recently Played</h2>
              </div>
              {recentlyPlayed.length > 0 && (
                <button
                  onClick={onClearRecent}
                  className="text-[10px] font-bold tracking-wider uppercase text-text-muted hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Clear History
                </button>
              )}
            </div>

            {recentlyPlayed.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border-app p-6 text-center text-text-muted text-xs">
                Your recently played tracks will appear here. Start playing some tunes!
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
                {recentlyPlayed.map((songId) => {
                  const s = songs.find((x) => x.id === songId);
                  if (!s) return null;
                  const isCurrent = activeSongId === s.id;
                  const proceduralArt = getProceduralArt(s);

                  return (
                    <article
                      key={s.id}
                      onClick={() => onSongClick(s.id)}
                      className="snap-start w-36 shrink-0 bg-bg-card hover:bg-bg-card-hover rounded-xl p-3 border border-border-app hover:border-border-medium cursor-pointer group hover:-translate-y-1 transition-all duration-300 shadow-md select-none"
                    >
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-sm">
                        <img
                          src={s.cover}
                          alt={s.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = proceduralArt;
                          }}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSongClick(s.id);
                          }}
                          className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-lg translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        >
                          <Play className="w-4 h-4 fill-current translate-x-0.5 text-white animate-[pulse_1.5s_infinite]" />
                        </button>
                      </div>
                      <h4
                        className={`text-xs font-semibold truncate mt-2 leading-tight ${
                          isCurrent ? 'text-emerald-400 animate-pulse font-semibold' : 'text-text-secondary group-hover:text-text-primary'
                        }`}
                      >
                        {s.title}
                      </h4>
                      <p className="text-[10px] text-text-muted truncate mt-0.5">{s.artist}</p>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* 5. Custom Mix Generator (Only on home tab) */}
        {!activePlaylistId && activeTab === 'home' && (
          <section className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-r from-emerald-500/10 via-bg-card to-emerald-500/5 border border-border-app flex flex-col md:flex-row items-center justify-between gap-4 select-none">
            <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
              <div className="w-12 h-12 rounded-xl bg-bg-hover border border-border-app flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm text-text-primary">Create a Custom Sonora Mix</h3>
                <p className="text-[11px] text-text-secondary mt-0.5">Let our shuffle generator bundle a unique combination of songs tailored for you.</p>
              </div>
            </div>
            <button
              onClick={onShuffleMix}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-bold text-xs rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Shuffle mix
            </button>
          </section>
        )}

        {/* 6. Song Table List (Context Dependent: Searched hits, Liked set, Playlist tracks, or general pool) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-text-primary">
              {activePlaylistId
                ? 'Playlist Tracks'
                : activeTab === 'liked'
                ? 'Favorite Tracks'
                : searchQuery
                ? `Search Matches`
                : 'All Tracks'}
            </h2>
          </div>

          <div className="space-y-1">
            {filteredSongs.length === 0 ? (
              <div className="text-center py-12 text-text-muted text-xs">
                No songs match your query. Try searching for other keywords.
              </div>
            ) : (
              filteredSongs.map((s, index) => {
                const isCurrent = activeSongId === s.id;
                const isSaved = likedSongIds.has(s.id);
                const proceduralArt = getProceduralArt(s);

                return (
                  <div
                    key={s.id}
                    onClick={() => onSongClick(s.id)}
                    className={`group flex items-center gap-4 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 border ${
                      isCurrent
                        ? 'bg-emerald-500/10 border-emerald-500/20 shadow-sm font-semibold'
                        : 'hover:bg-bg-card-hover border-transparent'
                    }`}
                  >
                    {/* Index or equalizer indicator */}
                    <div className="w-6 text-center shrink-0 flex items-center justify-center">
                      {isCurrent && isPlaying ? (
                        <div className="flex items-end gap-0.5 h-3.5 justify-center">
                          <span className="w-0.5 bg-emerald-400 rounded-full animate-[equalizer_0.8s_ease_infinite]" />
                          <span className="w-0.5 bg-emerald-400 rounded-full animate-[equalizer_0.6s_ease_infinite_0.2s]" />
                          <span className="w-0.5 bg-emerald-400 rounded-full animate-[equalizer_1s_ease_infinite_0.4s]" />
                        </div>
                      ) : (
                        <span className="text-[11px] text-text-muted font-mono font-bold group-hover:text-emerald-400">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    {/* Artwork cover */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-border-app shadow-md">
                      <img
                        src={s.cover}
                        alt={s.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = proceduralArt;
                        }}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Title + Artist (Tablet friendly) */}
                    <div className="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4 items-center">
                      <div className="min-w-0">
                        <h4
                          className={`text-xs truncate leading-snug ${
                            isCurrent ? 'text-emerald-400 font-semibold' : 'text-text-secondary group-hover:text-text-primary'
                          }`}
                        >
                          {s.title}
                        </h4>
                        <p className="text-[10px] text-text-muted truncate mt-0.5">{s.artist}</p>
                      </div>

                      {/* Album Column (visible on medium & large screens) */}
                      <span className="hidden md:inline text-xs text-text-muted truncate pr-4">{s.album}</span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(s.id);
                      }}
                      className={`p-2 rounded-full transition-all duration-200 shrink-0 cursor-pointer ${
                        isSaved
                          ? 'text-pink-500 opacity-100'
                          : 'text-text-muted opacity-0 group-hover:opacity-100 hover:text-text-primary'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-pink-500' : ''}`} />
                    </button>

                    {/* Duration Column */}
                    <span className="text-[11px] text-text-muted font-mono font-medium shrink-0 min-w-[32px] text-right">
                      {Math.floor(s.duration / 60)}:{String(s.duration % 60).padStart(2, '0')}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      {/* Profile Info Overlay Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div
            className="w-full max-w-md bg-bg-sidebar border border-border-medium rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow inside modal */}
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 filter blur-2xl pointer-events-none" />

            {/* Header / Close button */}
            <div className="flex items-center justify-between pb-4 border-b border-border-app mb-5">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-400" />
                <h3 className="font-display font-bold text-lg text-text-primary">Member Profile</h3>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="w-8 h-8 rounded-full bg-bg-hover hover:bg-bg-card-hover text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors border border-border-app cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Detail Body */}
            <div className="flex flex-col items-center text-center gap-4">
              {/* Giant Badge */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 via-emerald-500 to-teal-500 flex items-center justify-center font-bold text-white text-3xl shadow-[0_0_25px_rgba(16,185,129,0.4)] border border-white/20 animate-pulse">
                GC
              </div>

              <div>
                <h4 className="font-display font-bold text-xl text-text-primary">Geofferson Co</h4>
                <div className="flex items-center justify-center gap-1.5 text-text-secondary text-sm mt-1">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>cogeofferson@gmail.com</span>
                </div>
              </div>

              {/* Status Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Premium Sonora Member</span>
              </div>

              {/* Stats Box */}
              <div className="w-full grid grid-cols-2 gap-3 mt-4">
                <div className="p-3.5 bg-bg-hover rounded-xl border border-border-app text-left">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Total Catalog</div>
                  <div className="text-lg font-bold font-display text-text-primary mt-1 flex items-center gap-1.5">
                    <Music className="w-4 h-4 text-emerald-400" />
                    <span>80 Tracks</span>
                  </div>
                </div>

                <div className="p-3.5 bg-bg-hover rounded-xl border border-border-app text-left">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Favorites Saved</div>
                  <div className="text-lg font-bold font-display text-text-primary mt-1 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                    <span>{likedSongIds.size} Saved</span>
                  </div>
                </div>
              </div>

              {/* Technical System Status */}
              <div className="w-full mt-2 p-3 bg-bg-hover/50 rounded-xl border border-border-app text-left">
                <div className="text-[9px] uppercase font-bold tracking-wider text-text-muted">Playback System</div>
                <div className="text-xs text-text-secondary mt-1 font-mono leading-relaxed">
                  Engine: <span className="text-emerald-400">Active HTML5 Audio</span> <br />
                  Fallback: <span className="text-teal-400">Web Audio Synthesizer</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowProfileModal(false)}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95 mt-2 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
