'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Award,
  Zap,
  TrendingUp,
  User,
  Check,
  Save,
  LogIn,
  Sliders,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { TopoDoodlePattern } from '../../components/doodles/DoodleBackground';
import { MonsterAvatar, MONSTER_LIST } from '../../components/doodles/MonsterAvatars';
import { UserProfile } from '../../lib/types/game';
import { getLocalGuestProfile, saveLocalGuestProfile } from '../../lib/supabase/client';
import { soundManager } from '../../lib/audio/sounds';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('monty');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const prof = getLocalGuestProfile();
    setProfile(prof);
    setDisplayName(prof.displayName);
    setSelectedAvatar(prof.avatarId);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playWordAccepted();
    const updated = saveLocalGuestProfile({
      displayName: displayName.trim() || 'WordHunter',
      avatarId: selectedAvatar,
    });
    setProfile(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const winRate =
    profile && profile.gamesPlayed > 0
      ? Math.round((profile.wins / profile.gamesPlayed) * 100)
      : 0;

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT AVATAR & NAME EDITOR (5 cols) */}
          <div className="lg:col-span-5">
            <div className="doodle-card-yellow p-6 sm:p-8 text-center space-y-4">
              <div className="w-28 h-28 mx-auto bg-white border-[3px] border-[#111111] rounded-3xl flex items-center justify-center shadow-[4px_4px_0px_#111111] overflow-hidden">
                <MonsterAvatar id={selectedAvatar} size={88} mood="happy" />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-full border border-[#111111]">
                  Guest Player Profile
                </span>
                <h1 className="text-2xl font-black text-[#111111] mt-2">{profile?.displayName}</h1>
                <p className="text-xs font-bold text-[#444444] font-mono">ID: {profile?.id}</p>
              </div>

              {/* Monster Avatar Picker */}
              <div className="pt-2">
                <span className="text-xs font-extrabold uppercase text-[#222222] block mb-2">
                  Choose Monster Mascot
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {MONSTER_LIST.map(m => {
                    const isSelected = selectedAvatar === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedAvatar(m.id);
                        }}
                        className={`p-2 rounded-2xl border-2 border-[#111111] flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-white shadow-[2px_2px_0px_#111111] scale-105'
                            : 'bg-white/50 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <MonsterAvatar id={m.id} size={38} />
                        <span className="text-[10px] font-black mt-1 text-[#111111]">{m.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Display name form */}
              <form onSubmit={handleSave} className="space-y-3 pt-2">
                <div>
                  <label htmlFor="displayInput" className="text-xs font-black text-[#111111] block mb-1 text-left">
                    Display Name
                  </label>
                  <input
                    id="displayInput"
                    type="text"
                    maxLength={20}
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    className="w-full bg-white border-2 border-[#111111] rounded-xl px-3 py-2 text-sm font-bold shadow-[2px_2px_0px_#111111] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full doodle-btn py-2.5 text-xs justify-center"
                >
                  {isSaved ? <Check size={16} /> : <Save size={16} />}
                  <span>{isSaved ? 'Saved!' : 'Save Profile'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT STATS DASHBOARD (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl font-black text-[#111111]">Career Statistics</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Games Played */}
              <div className="doodle-card p-4">
                <span className="text-xs font-bold text-[#666666]">Games Played</span>
                <p className="font-mono text-3xl font-black text-[#111111] mt-1">
                  {profile?.gamesPlayed || 0}
                </p>
              </div>

              {/* Wins */}
              <div className="doodle-card p-4">
                <span className="text-xs font-bold text-[#666666]">Total Wins</span>
                <p className="font-mono text-3xl font-black text-[#111111] mt-1">
                  {profile?.wins || 0}
                </p>
              </div>

              {/* Win Rate */}
              <div className="doodle-card p-4">
                <span className="text-xs font-bold text-[#666666]">Win Rate</span>
                <p className="font-mono text-3xl font-black text-[#111111] mt-1">{winRate}%</p>
              </div>

              {/* Longest Chain */}
              <div className="doodle-card p-4">
                <span className="text-xs font-bold text-[#666666]">Longest Chain</span>
                <p className="font-mono text-3xl font-black text-[#111111] mt-1">
                  {profile?.longestChain || 0}
                </p>
              </div>

              {/* Total Words */}
              <div className="doodle-card p-4">
                <span className="text-xs font-bold text-[#666666]">Words Chained</span>
                <p className="font-mono text-3xl font-black text-[#111111] mt-1">
                  {profile?.totalWords || 0}
                </p>
              </div>

              {/* Preferred Preset */}
              <div className="doodle-card p-4">
                <span className="text-xs font-bold text-[#666666]">Favorite Mode</span>
                <p className="font-mono text-lg font-black text-[#111111] mt-2 capitalize truncate">
                  {profile?.preferredPreset || 'Classic'}
                </p>
              </div>
            </div>

            {/* Supabase Account Notice */}
            <div className="doodle-card p-6 bg-white space-y-3">
              <div className="flex items-center gap-2">
                <Trophy size={18} />
                <h3 className="text-base font-black text-[#111111]">Persistent Cloud Sync</h3>
              </div>
              <p className="text-xs font-bold text-[#666666]">
                Guest sessions automatically save your stats in your browser. Configure Supabase environment
                variables to enable cross-device cloud persistence and global leaderboards.
              </p>
              <div className="pt-2">
                <Link
                  href="/"
                  className="doodle-btn-yellow py-2 px-4 text-xs inline-flex"
                >
                  Play WordChain Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
