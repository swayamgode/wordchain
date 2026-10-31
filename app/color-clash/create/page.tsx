'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/Navbar';
import { MonsterAvatar, MONSTER_LIST } from '../../../components/doodles/MonsterAvatars';
import { ColorRoundTimerOption, ColorTotalRoundsOption, ColorMatchRoomState } from '../../../lib/types/colorMatch';
import { getSocket } from '../../../lib/socket/client';
import { getLocalGuestProfile, saveLocalGuestProfile } from '../../../lib/supabase/client';
import { soundManager } from '../../../lib/audio/sounds';
import { Sparkles, Users, Clock, Hash, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CreateColorClashPage() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('Hunter');
  const [selectedAvatar, setSelectedAvatar] = useState('monty');
  const [roundTime, setRoundTime] = useState<ColorRoundTimerOption>(20);
  const [totalRounds, setTotalRounds] = useState<ColorTotalRoundsOption>(5);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const prof = getLocalGuestProfile();
    if (prof.displayName) setPlayerName(prof.displayName);
    if (prof.avatarId) setSelectedAvatar(prof.avatarId);
  }, []);

  const handleCreate = () => {
    if (!playerName.trim()) {
      setError('Please enter a player name');
      return;
    }

    setIsCreating(true);
    setError(null);
    soundManager.playClick();
    saveLocalGuestProfile({ displayName: playerName.trim(), avatarId: selectedAvatar });

    const socket = getSocket();

    const doCreate = () => {
      socket.emit(
        'color_create_room',
        {
          playerName: playerName.trim(),
          avatarId: selectedAvatar,
          settings: {
            roundTimeLimit: roundTime,
            totalRounds: totalRounds,
            playerCount: 6,
            isPublic: true,
            allowSpectators: true,
          },
        },
        (res: { error?: string; roomCode?: string; state?: ColorMatchRoomState }) => {
          setIsCreating(false);
          if (res.error) {
            setError(res.error);
          } else if (res.roomCode) {
            router.push(`/color-clash/room/${res.roomCode}`);
          }
        }
      );
    };

    if (socket.connected) {
      doCreate();
    } else {
      socket.connect();
      socket.once('connect', doCreate);
    }
  };

  const timerOptions: ColorRoundTimerOption[] = [10, 15, 20, 30];
  const roundOptions: ColorTotalRoundsOption[] = [3, 5, 7, 10];

  return (
    <div className="min-h-screen bg-[#FAF7EE] flex flex-col justify-between selection:bg-[#FFC928]">
      <Navbar />

      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/color-clash"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#111111] bg-white border-2 border-[#111111] px-3 py-1.5 rounded-full shadow-[2px_2px_0px_#111111] hover:bg-neutral-50"
          >
            <ArrowLeft size={14} />
            Color Clash Hub
          </Link>
          <span className="text-xs font-black uppercase text-[#888888]">Create Match</span>
        </div>

        <div className="doodle-card p-5 sm:p-6 bg-white space-y-5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-[#FFC928] px-2 py-0.5 rounded border border-[#111111]">
              Host a Game
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111111] mt-1">
              Create Color Clash Room
            </h1>
            <p className="text-xs font-bold text-[#666666] mt-1">
              Configure turn timers and invite friends to test their color matching precision.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border-2 border-red-500 rounded-xl text-xs font-black text-red-700">
              {error}
            </div>
          )}

          {/* Player Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#111111]">
              Your Display Name
            </label>
            <input
              type="text"
              value={playerName}
              maxLength={20}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7EE] border-2 border-[#111111] rounded-xl font-black text-sm text-[#111111] shadow-[2px_2px_0px_#111111] focus:outline-none focus:ring-2 focus:ring-[#FFC928]"
              placeholder="Enter your name..."
            />
          </div>

          {/* Monster Avatar Picker */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#111111]">
              Choose Monster Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {MONSTER_LIST.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => setSelectedAvatar(av.id)}
                  className={`aspect-square rounded-xl border-2 border-[#111111] flex items-center justify-center p-1 transition-all ${
                    selectedAvatar === av.id
                      ? 'bg-[#FFC928] shadow-[2px_2px_0px_#111111] scale-105'
                      : 'bg-white hover:bg-neutral-100'
                  }`}
                >
                  <MonsterAvatar id={av.id} size={28} />
                </button>
              ))}
            </div>
          </div>

          {/* Round Timer Limit */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
              <Clock size={14} />
              Turn Time Limit
            </label>
            <div className="grid grid-cols-4 gap-2">
              {timerOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setRoundTime(t)}
                  className={`py-2 text-xs font-black rounded-xl border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all ${
                    roundTime === t ? 'bg-[#FFC928] -translate-y-0.5' : 'bg-white hover:bg-neutral-50'
                  }`}
                >
                  {t}s
                </button>
              ))}
            </div>
          </div>

          {/* Total Rounds */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
              <Hash size={14} />
              Total Rounds
            </label>
            <div className="grid grid-cols-4 gap-2">
              {roundOptions.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setTotalRounds(r)}
                  className={`py-2 text-xs font-black rounded-xl border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all ${
                    totalRounds === r ? 'bg-[#FFC928] -translate-y-0.5' : 'bg-white hover:bg-neutral-50'
                  }`}
                >
                  {r} Rounds
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleCreate}
            disabled={isCreating}
            className="w-full py-4 bg-[#FFC928] hover:bg-[#ffcf3e] border-2 sm:border-[3px] border-[#111111] rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_#111111] active:translate-y-[2px] transition-all flex items-center justify-center gap-2"
          >
            {isCreating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                CREATING ROOM...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                CREATE COLOR ROOM
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
