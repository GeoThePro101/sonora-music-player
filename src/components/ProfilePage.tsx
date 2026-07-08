/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, Music, Heart, Clock, Settings, LogOut } from 'lucide-react';

interface ProfilePageProps {
  likedCount: number;
  totalSongsCount: number;
  recentlyPlayedCount: number;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  likedCount,
  totalSongsCount,
  recentlyPlayedCount,
}) => {
  return (
    <div className="flex flex-col gap-6 p-1 animate-[fadeUp_0.3s_ease]">
      {/* Profile Header */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          />
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 rounded-full border-2 border-bg-app flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-text-primary">Geofferson Co</h2>
          <p className="text-sm text-text-secondary">Music Enthusiast</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-bg-card-hover rounded-2xl p-4 border border-border-app flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Music className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-lg font-display font-bold text-text-primary">{totalSongsCount}</span>
          <span className="text-[10px] text-text-muted uppercase tracking-wider">Songs</span>
        </div>
        <div className="bg-bg-card-hover rounded-2xl p-4 border border-border-app flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-pink-400" />
          </div>
          <span className="text-lg font-display font-bold text-text-primary">{likedCount}</span>
          <span className="text-[10px] text-text-muted uppercase tracking-wider">Liked</span>
        </div>
        <div className="bg-bg-card-hover rounded-2xl p-4 border border-border-app flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-lg font-display font-bold text-text-primary">{recentlyPlayedCount}</span>
          <span className="text-[10px] text-text-muted uppercase tracking-wider">Recent</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-1">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-bg-card-hover transition-colors text-left">
          <User className="w-5 h-5 text-text-muted" />
          <span className="text-sm text-text-primary">Edit Profile</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-bg-card-hover transition-colors text-left">
          <Settings className="w-5 h-5 text-text-muted" />
          <span className="text-sm text-text-primary">Settings</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-bg-card-hover transition-colors text-left">
          <LogOut className="w-5 h-5 text-text-muted" />
          <span className="text-sm text-text-primary">Sign Out</span>
        </button>
      </div>
    </div>
  );
};
