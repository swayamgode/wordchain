'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Zap,
  Search,
  X,
  Users,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { TopoDoodlePattern } from '../../components/doodles/DoodleBackground';
import { MonsterAvatar } from '../../components/doodles/MonsterAvatars';
import { PresetName } from '../../lib/types/game';
import { PRESETS } from '../../lib/constants/presets';
import { getSocket } from '../../lib/socket/client';
import { getLocalGuestProfile } from '../../lib/supabase/client';
import { soundManager } from '../../lib/audio/sounds';

export default function MatchmakingPage() {
  const router = useRouter();
  const [selectedPreset, setSelectedPreset] = useState<PresetName>('classic');
  const [isQueuing, setIsQueuing] = useState(false);
  const [queueCounts, setQueueCounts] = useState<{ total: number; classic: number; quickfire: number; brain_battle: number; chill: number }>({
    total: 0,
    classic: 0,
    quickfire: 0,
    brain_battle: 0,
    chill: 0,
  });
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const socket = getSocket();

    const handleMatchStatus = (counts: { total: number; classic: number; quickfire: number; brain_battle: number; chill: number }) => {
      setQueueCounts(counts);
    };

    const handleMatchFound = ({ roomCode }: { roomCode: string }) => {
      soundManager.playWordAccepted();
      router.push(`/room/${roomCode}`);
    };

    socket.on('matchmaking_status', handleMatchStatus);
    socket.on('match_found', handleMatchFound);

    return () => {
      socket.off('matchmaking_status', handleMatchStatus);
      socket.off('match_found', handleMatchFound);
      if (isQueuing) {
        socket.emit('leave_matchmaking');
      }
    };
  }, [isQueuing, router]);

  // Queue elapsed timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isQueuing) {
      setElapsedSeconds(0);
      timer = setInterval(() => {
        setElapsedSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isQueuing]);

  const handleJoinQueue = () => {
    soundManager.playClick();
    const profile = getLocalGuestProfile();
    const socket = getSocket();

    setIsQueuing(true);
    socket.emit('join_matchmaking', {
      playerName: profile.displayName,
      avatarId: profile.avatarId,
      preset: selectedPreset,
    });
  };

  const handleCancelQueue = () => {
    soundManager.playClick();
    const socket = getSocket();
    socket.emit('leave_matchmaking');
    setIsQueuing(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col items-center justify-center">
        {!isQueuing ? (
          /* PRESET SELECTOR BEFORE QUEUE */
          <div className="w-full doodle-card p-6 sm:p-8 space-y-6">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto bg-[#FFC928] border-2 border-[#111111] rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_#111111] mb-3">
                <Zap size={32} className="fill-[#111111]" />
              </div>
              <h1 className="text-3xl font-black text-[#111111]">Quick Matchmaking</h1>
              <p className="text-xs sm:text-sm font-bold text-[#666666] mt-1">
                Select your preferred mode. You will be matched with the next compatible online player.
              </p>
            </div>

            {/* Presets options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(['classic', 'quickfire', 'brain_battle', 'chill'] as PresetName[]).map(presetKey => {
                const p = PRESETS[presetKey];
                const isSelected = selectedPreset === presetKey;
                const activeCount = queueCounts[presetKey as keyof typeof queueCounts] || 0;

                return (
                  <button
                    key={presetKey}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedPreset(presetKey);
                    }}
                    className={`p-4 rounded-2xl border-[3px] border-[#111111] text-left transition-all ${
                      isSelected
                        ? 'bg-[#FFC928] shadow-[3px_3px_0px_#111111] -translate-y-1'
                        : 'bg-white shadow-[2px_2px_0px_#111111] hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black text-[#111111]">{p.title}</span>
                      <span className="text-[10px] font-black uppercase bg-white px-2 py-0.5 rounded-full border border-[#111111]">
                        {activeCount} queuing
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#555555] mt-1.5">{p.description}</p>
                  </button>
                );
              })}
            </div>

            {/* Real online queue status disclosure */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-center text-xs font-bold text-[#666666]">
              Genuine queue: {queueCounts.total} player{queueCounts.total === 1 ? '' : 's'} currently in queue.
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleJoinQueue}
                className="flex-1 doodle-btn-yellow py-3.5 text-base"
              >
                <Search size={18} />
                <span>Search for Opponent</span>
              </button>

              <Link
                href="/create"
                className="doodle-btn py-3.5 text-base justify-center"
              >
                <span>Host Private Room</span>
              </Link>
            </div>
          </div>
        ) : (
          /* ACTIVE SEARCH RADAR */
          <div className="w-full max-w-md doodle-card-yellow p-8 text-center relative overflow-hidden">
            <div className="w-28 h-28 mx-auto bg-white border-[3px] border-[#111111] rounded-full flex items-center justify-center shadow-[4px_4px_0px_#111111] mb-5 relative">
              <MonsterAvatar id="monty" size={72} mood="focused" />
              <div className="absolute inset-0 rounded-full border-4 border-[#111111] border-t-transparent animate-spin" />
            </div>

            <span className="text-xs font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-[#111111]">
              Searching for Match...
            </span>

            <h2 className="text-2xl font-black text-[#111111] mt-3">
              Mode: {PRESETS[selectedPreset].title}
            </h2>

            <p className="text-sm font-mono font-bold text-[#333333] mt-2">
              Time elapsed: {Math.floor(elapsedSeconds / 60)}:{(elapsedSeconds % 60).toString().padStart(2, '0')}
            </p>

            <p className="text-xs font-bold text-[#444444] mt-3 max-w-xs mx-auto">
              Looking for another player queuing {PRESETS[selectedPreset].title}...
            </p>

            <button
              onClick={handleCancelQueue}
              className="mt-6 doodle-btn w-full py-3 text-sm justify-center"
            >
              <X size={16} />
              <span>Cancel Search</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
