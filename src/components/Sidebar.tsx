/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AudioLines, House, Search, Library, Heart, Plus, Disc3 } from 'lucide-react';
import { Playlist } from '../types';
import { PLAYLISTS, getPlaylistArt } from '../data';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectPlaylist: (id: string) => void;
  activePlaylistId: string | null;
  likedCount: number;
  totalSongsCount: number;
  onShuffleMix: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onSelectPlaylist,
  activePlaylistId,
  likedCount,
  totalSongsCount,
  onShuffleMix,
}) => {
  return (
    <aside className="hidden md:flex flex-col gap-6 bg-bg-sidebar border border-border-app rounded-2xl p-5 w-[268px] overflow-y-auto shrink-0 select-none">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 pl-1">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_22px_rgba(16,185,129,0.3)]">
          <AudioLines className="w-[18px] h-[18px] text-white" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight text-text-primary">Sonora</span>
      </div>

      {/* Primary Navigation */}
      <nav className="flex flex-col gap-1.5">
        <button
          onClick={() => {
            setActiveTab('home');
            onSelectPlaylist('');
          }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border ${
            activeTab === 'home' && !activePlaylistId
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover border-transparent'
          }`}
        >
          <House className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('search');
            onSelectPlaylist('');
          }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border ${
            activeTab === 'search' && !activePlaylistId
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover border-transparent'
          }`}
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('library');
            onSelectPlaylist('');
          }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border ${
            activeTab === 'library' && !activePlaylistId
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover border-transparent'
          }`}
        >
          <Library className="w-5 h-5" />
          <span>Your Library</span>
        </button>
      </nav>

      {/* Decorative Divider */}
      <div className="h-[1px] bg-border-app my-1" />

      {/* Liked Songs Short-link */}
      <button
        onClick={() => {
          setActiveTab('liked');
          onSelectPlaylist('');
        }}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border ${
          activeTab === 'liked'
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover border-transparent'
        }`}
      >
        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
          <Heart className="w-3 h-3 text-white fill-white" />
        </div>
        <span>Liked Songs</span>
      </button>

      {/* Playlist Section Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-3">
          <span className="text-[10px] font-bold tracking-widest text-text-muted uppercase">Playlists</span>
          <button
            onClick={onShuffleMix}
            title="Generate a custom random mix"
            className="w-[26px] h-[26px] rounded-lg flex items-center justify-center text-text-muted hover:text-emerald-400 hover:bg-bg-card-hover transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Playlists List */}
        <div className="flex flex-col gap-1 overflow-y-auto max-h-[190px]">
          {PLAYLISTS.map((pl) => (
            <button
              key={pl.id}
              onClick={() => onSelectPlaylist(pl.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 text-left border ${
                activePlaylistId === pl.id
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-semibold'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover border-transparent'
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg shrink-0 bg-cover bg-center border border-border-app"
                style={{ backgroundImage: `url("${getPlaylistArt(pl)}")` }}
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-medium text-inherit">{pl.name}</div>
                <div className="text-[10px] text-text-muted truncate">{pl.songIds.length} tracks</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar Footer Upgrade Promo + Metrics Box */}
      <div className="mt-auto p-4 bg-bg-card-hover rounded-2xl border border-border-medium flex flex-col gap-2.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-md border border-border-app overflow-hidden">
            <img
              src="/profile.jpg"
              alt="Member"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="absolute">GC</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Premium Level</span>
            <span className="text-xs font-semibold text-text-primary">Geofferson Co</span>
          </div>
        </div>
        <div className="text-xs text-text-secondary leading-snug">
          <b className="text-text-primary font-semibold font-display">{totalSongsCount}</b> High-Fidelity Tracks · <b className="text-pink-400 font-semibold font-display">{likedCount}</b> Saved
        </div>
        <button
          onClick={onShuffleMix}
          className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-[10px] font-bold rounded-lg tracking-wider transition-all duration-200 shadow-md active:scale-95"
        >
          SHUFFLE PLAYLIST
        </button>
      </div>
    </aside>
  );
};
