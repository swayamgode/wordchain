'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bot,
  Play,
  RotateCcw,
  Home,
  Sliders,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { TopoDoodlePattern } from '../../components/doodles/DoodleBackground';
import { MonsterAvatar } from '../../components/doodles/MonsterAvatars';
import { GameArena } from '../../components/game/GameArena';
import { WordChainEngine } from '../../lib/engine/WordChainEngine';
import { GameSettings, GameDifficulty, Player, RoomState, PresetName } from '../../lib/types/game';
import { DEFAULT_SETTINGS, getSettingsForPreset } from '../../lib/constants/presets';
import { getLocalGuestProfile } from '../../lib/supabase/client';
import { soundManager } from '../../lib/audio/sounds';

export default function PracticeModePage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState<GameDifficulty>('standard');
  const [preset, setPreset] = useState<PresetName>('classic');
  const [roomState, setRoomState] = useState<RoomState | null>(null);
  const engineRef = useRef<WordChainEngine | null>(null);

  const handleStartPractice = () => {
    soundManager.playClick();
    const profile = getLocalGuestProfile();
    const settings: GameSettings = {
      ...getSettingsForPreset(preset),
      difficulty,
      playerCount: 2,
    };

    const humanPlayer: Player = {
      id: 'human_player',
      name: profile.displayName,
      avatarId: profile.avatarId,
      isHost: true,
      isReady: true,
      lives: settings.lives === 0 ? Infinity : settings.lives,
      score: 0,
      wordsSubmitted: 0,
      isEliminated: false,
      isConnected: true,
      lastActive: Date.now(),
    };

    const botPlayer: Player = {
      id: 'ai_bot',
      name: `Bot ${difficulty === 'casual' ? 'Gloop' : difficulty === 'standard' ? 'Monty' : 'Fang'} [AI]`,
      avatarId: difficulty === 'casual' ? 'gloop' : difficulty === 'standard' ? 'monty' : 'fang',
      isHost: false,
      isReady: true,
      isBot: true,
      botDifficulty: difficulty,
      lives: settings.lives === 0 ? Infinity : settings.lives,
      score: 0,
      wordsSubmitted: 0,
      isEliminated: false,
      isConnected: true,
      lastActive: Date.now(),
    };

    const engine = new WordChainEngine('SOLO01', humanPlayer, settings, {
      onStateChange: state => {
        setRoomState({ ...state });
      },
    });

    engine.addPlayer(botPlayer);
    engineRef.current = engine;
    engine.startMatch('human_player');
    setRoomState(engine.getSnapshot());
    setIsPlaying(true);
  };

  const handleSubmitWord = (word: string) => {
    if (engineRef.current) {
      engineRef.current.submitWord('human_player', word);
      setRoomState(engineRef.current.getSnapshot());
    }
  };

  const handleRematch = () => {
    soundManager.playClick();
    if (engineRef.current) {
      engineRef.current.rematch();
      engineRef.current.startMatch('human_player');
      setRoomState(engineRef.current.getSnapshot());
    }
  };

  const handleLeaveRoom = () => {
    soundManager.playClick();
    if (engineRef.current) {
      engineRef.current.cleanTimers();
    }
    setIsPlaying(false);
  };

  // If match in progress, render GameArena
  if (isPlaying && roomState) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <GameArena
          roomState={roomState}
          currentPlayerId="human_player"
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
            <div className="w-20 h-20 mx-auto bg-[#00F5D4] border-[3px] border-[#111111] rounded-3xl flex items-center justify-center shadow-[3px_3px_0px_#111111] mb-3">
              <Bot size={44} />
            </div>
            <div className="inline-flex items-center gap-1.5 bg-neutral-100 px-3 py-0.5 rounded-full border border-neutral-300 text-xs font-bold mb-2">
              <span>🤖 100% Offline AI Bot</span>
            </div>
            <h1 className="text-3xl font-black text-[#111111]">Practice vs AI Bot</h1>
            <p className="text-xs sm:text-sm font-bold text-[#666666] max-w-md mx-auto mt-1">
              Test your speed and vocabulary against an AI bot that strictly adheres to the approved dictionary and word-chain rules.
            </p>
          </div>

          {/* Difficulty selection */}
          <div>
            <span className="text-xs font-black uppercase text-[#777777] block mb-2">
              Select Bot Difficulty
            </span>
            <div className="grid grid-cols-3 gap-3">
              {(
                [
                  { id: 'casual', label: 'Casual', desc: 'Relaxed, occasional mistakes' },
                  { id: 'standard', label: 'Standard', desc: 'Solid vocabulary, 10s pace' },
                  { id: 'challenging', label: 'Challenging', desc: 'Expert chain master' },
                ] as const
              ).map(d => (
                <button
                  key={d.id}
                  onClick={() => {
                    soundManager.playClick();
                    setDifficulty(d.id);
                  }}
                  className={`p-3 rounded-2xl border-2 border-[#111111] text-left transition-all ${
                    difficulty === d.id
                      ? 'bg-[#FFC928] shadow-[3px_3px_0px_#111111] font-black'
                      : 'bg-white shadow-[1px_1px_0px_#111111] hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-sm font-black text-[#111111] block">{d.label}</span>
                  <span className="text-[10px] font-bold text-[#666666] mt-0.5 block leading-tight">
                    {d.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Preset selection */}
          <div>
            <span className="text-xs font-black uppercase text-[#777777] block mb-2">
              Select Game Mode
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['classic', 'quickfire', 'brain_battle', 'chill'] as PresetName[]).map(key => (
                <button
                  key={key}
                  onClick={() => {
                    soundManager.playClick();
                    setPreset(key);
                  }}
                  className={`py-2 px-3 text-xs font-black rounded-xl border-2 border-[#111111] capitalize transition-all ${
                    preset === key ? 'bg-[#FFC928] shadow-[2px_2px_0px_#111111]' : 'bg-neutral-50'
                  }`}
                >
                  {key.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartPractice}
            className="w-full doodle-btn-yellow py-3.5 text-base justify-center group"
          >
            <Play size={18} className="fill-[#111111]" />
            <span>Start Practice Match</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>
    </div>
  );
}
