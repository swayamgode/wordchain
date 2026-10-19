'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Sparkles, User, Sword } from 'lucide-react';
import { soundManager } from '../lib/audio/sounds';
import { getLocalGuestProfile } from '../lib/supabase/client';
import { MonsterAvatar } from './doodles/MonsterAvatars';
import { InstallPwaPrompt } from './InstallPwaPrompt';

export const Navbar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [profile, setProfile] = useState<{ displayName: string; avatarId: string } | null>(null);

  useEffect(() => {
    setIsMuted(soundManager.getIsMuted());
    const prof = getLocalGuestProfile();
    setProfile(prof);
  }, []);

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playClick();
    }
  };

  return (
    <header className="relative z-30 w-full max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-6 flex items-center justify-between">
      {/* Brand Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 sm:gap-3 group select-none"
        onClick={() => soundManager.playClick()}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFC928] border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] group-hover:rotate-6 transition-transform">
          <MonsterAvatar id="monty" size={30} />
        </div>
        <div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#111111]">WORD</span>
            <span className="text-xl sm:text-2xl font-black tracking-tight bg-[#FFC928] px-1.5 py-0.5 rounded-lg border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
              CHAIN
            </span>
          </div>
          <p className="hidden sm:block text-xs font-bold text-[#666666] tracking-wide">Think fast. Chain words.</p>
        </div>
      </Link>

      {/* Nav Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Install PWA Button */}
        <InstallPwaPrompt />

        {/* Practice Mode Link */}
        <Link
          href="/practice"
          onClick={() => soundManager.playClick()}
          className="hidden md:flex items-center gap-1.5 bg-white border-2 border-[#111111] rounded-full px-3.5 py-1.5 text-xs font-extrabold shadow-[2px_2px_0px_#111111] hover:translate-y-[-1px] transition-transform"
        >
          <Sword size={14} />
          Practice vs Bot
        </Link>

        {/* Sound toggle */}
        <button
          onClick={handleToggleMute}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          className="w-10 h-10 bg-white border-2 border-[#111111] rounded-full flex items-center justify-center shadow-[2px_2px_0px_#111111] hover:bg-neutral-100 transition-colors"
        >
          {isMuted ? <VolumeX size={18} className="text-red-500" /> : <Volume2 size={18} className="text-[#111111]" />}
        </button>

        {/* Player Profile */}
        <Link
          href="/profile"
          onClick={() => soundManager.playClick()}
          className="flex items-center gap-2 bg-white border-2 border-[#111111] rounded-full pl-1.5 pr-3 py-1 shadow-[2px_2px_0px_#111111] hover:bg-neutral-50 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#FFC928] border border-[#111111] flex items-center justify-center overflow-hidden">
            <MonsterAvatar id={profile?.avatarId || 'monty'} size={26} />
          </div>
          <span className="text-xs font-black text-[#111111] max-w-[90px] truncate">
            {profile?.displayName || 'Hunter'}
          </span>
        </Link>
      </div>
    </header>
  );
};
