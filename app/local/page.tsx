'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Users,
  Play,
  RotateCcw,
  ArrowRight,
  EyeOff,
  UserCheck,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { TopoDoodlePattern } from '../../components/doodles/DoodleBackground';
import { MonsterAvatar, MONSTER_LIST } from '../../components/doodles/MonsterAvatars';
import { GameArena } from '../../components/game/GameArena';
import { WordChainEngine } from '../../lib/engine/WordChainEngine';
import { GameSettings, Player, RoomState, PresetName } from '../../lib/types/game';
import { getSettingsForPreset } from '../../lib/constants/presets';
import { soundManager } from '../../lib/audio/sounds';

export default function LocalMultiplayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerCount, setPlayerCount] = useState<2 | 3 | 4>(2);
  const [playerNames, setPlayerNames] = useState<string[]>(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
  const [playerAvatars, setPlayerAvatars] = useState<string[]>(['monty', 'gloop', 'fang', 'cyclops']);
  const [preset, setPreset] = useState<PresetName>('classic');
  const [showPrivacyCurtain, setShowPrivacyCurtain] = useState(false);

  const [roomState, setRoomState] = useState<RoomState | null>(null);
  const engineRef = useRef<WordChainEngine | null>(null);

  const handleStartMatch = () => {
    soundManager.playClick();
    const settings: GameSettings = {
      ...getSettingsForPreset(preset),
      playerCount,
    };

    const players: Player[] = [];
    for (let i = 0; i < playerCount; i++) {
      players.push({
        id: `local_p_${i + 1}`,
        name: playerNames[i] || `Player ${i + 1}`,
        avatarId: playerAvatars[i] || MONSTER_LIST[i % MONSTER_LIST.length].id,
        isHost: i === 0,
        isReady: true,
        lives: settings.lives === 0 ? Infinity : settings.lives,
        score: 0,
        wordsSubmitted: 0,
        isEliminated: false,
        isConnected: true,
        lastActive: Date.now(),
      });
    }

    const engine = new WordChainEngine('LOCAL01', players[0], settings, {
      onStateChange: state => {
        setRoomState({ ...state });
      },
    });

    for (let i = 1; i < players.length; i++) {
      engine.addPlayer(players[i]);
    }

    engineRef.current = engine;
    engine.startMatch(players[0].id);
    setRoomState(engine.getSnapshot());
    setIsPlaying(true);
    setShowPrivacyCurtain(false);
  };

  const currentActivePlayer = roomState?.players[roomState?.activePlayerIndex ?? 0];

  const handleSubmitWord = (word: string) => {
    if (engineRef.current && currentActivePlayer) {
      const res = engineRef.current.submitWord(currentActivePlayer.id, word);
      const snap = engineRef.current.getSnapshot();
      setRoomState(snap);

      // If game still running and valid submission, briefly trigger pass & play curtain
      if (snap.status === 'in_progress' && res.success) {
        setShowPrivacyCurtain(true);
      }
    }
  };

  const handleRematch = () => {
    soundManager.playClick();
    if (engineRef.current && roomState?.players[0]) {
      engineRef.current.rematch();
      engineRef.current.startMatch(roomState.players[0].id);
      setRoomState(engineRef.current.getSnapshot());
      setShowPrivacyCurtain(false);
    }
  };

  const handleLeaveRoom = () => {
    soundManager.playClick();
    if (engineRef.current) {
      engineRef.current.cleanTimers();
    }
    setIsPlaying(false);
  };

  if (isPlaying && roomState) {
    if (showPrivacyCurtain) {
      const nextPlayer = roomState.players[roomState.activePlayerIndex];
      return (
        <div className="min-h-screen flex flex-col justify-between">
          <TopoDoodlePattern opacity={0.06} />
          <Navbar />
          <div className="max-w-md mx-auto p-8 doodle-card-yellow text-center my-auto space-y-4">
            <div className="w-20 h-20 mx-auto bg-white border-2 border-[#111111] rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_#111111]">
              <EyeOff size={36} />
            </div>
            <h2 className="text-2xl font-black text-[#111111]">Pass Device to {nextPlayer?.name}</h2>
            <p className="text-xs font-bold text-[#444444]">
              Keep your screen hidden until the device is in your hand!
            </p>
            <button
              onClick={() => {
                soundManager.playClick();
                setShowPrivacyCurtain(false);
              }}
              className="doodle-btn w-full py-3"
            >
              <UserCheck size={18} />
              <span>I am {nextPlayer?.name} (Ready)</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <GameArena
          roomState={roomState}
          currentPlayerId={currentActivePlayer?.id || 'local_p_1'}
          onSubmitWord={handleSubmitWord}
          onRematch={handleRematch}
          onLeaveRoom={handleLeaveRoom}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        <div className="doodle-card p-6 sm:p-8 space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-[#FF5D8F] border-[3px] border-[#111111] rounded-3xl flex items-center justify-center shadow-[3px_3px_0px_#111111] mb-3">
              <Users size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-[#111111]">Pass & Play (Local)</h1>
            <p className="text-xs sm:text-sm font-bold text-[#666666] max-w-md mx-auto mt-1">
              Battle on one single device taking turns with an intermission curtain between players.
            </p>
          </div>

          {/* Number of players */}
          <div>
            <span className="text-xs font-black uppercase text-[#777777] block mb-2">
              Select Number of Players
            </span>
            <div className="grid grid-cols-3 gap-3">
              {([2, 3, 4] as const).map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setPlayerCount(num);
                  }}
                  className={`py-3 rounded-2xl border-2 border-[#111111] font-black text-sm transition-all ${
                    playerCount === num ? 'bg-[#FFC928] shadow-[2px_2px_0px_#111111]' : 'bg-neutral-50'
                  }`}
                >
                  {num} Players
                </button>
              ))}
            </div>
          </div>

          {/* Player Names & Avatars */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-[#777777] block">
              Player Names & Mascots
            </span>
            {Array.from({ length: playerCount }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-neutral-100 border-2 border-[#111111] rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                  <MonsterAvatar id={playerAvatars[idx]} size={36} />
                </div>
                <input
                  type="text"
                  maxLength={15}
                  value={playerNames[idx]}
                  onChange={e => {
                    const copy = [...playerNames];
                    copy[idx] = e.target.value;
                    setPlayerNames(copy);
                  }}
                  className="flex-1 bg-white border-2 border-[#111111] rounded-xl px-3 py-2 text-sm font-bold shadow-[2px_2px_0px_#111111] focus:outline-none"
                  placeholder={`Player ${idx + 1}`}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleStartMatch}
            className="w-full doodle-btn-yellow py-3.5 text-base justify-center group"
          >
            <Play size={18} className="fill-[#111111]" />
            <span>Start Pass & Play</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>
    </div>
  );
}
