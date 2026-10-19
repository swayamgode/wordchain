'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Sparkles,
  Zap,
  Brain,
  Coffee,
  Sliders,
  Timer,
  Heart,
  Users,
  Shield,
  Clock,
  ArrowRight,
  Globe,
  Lock,
  Layers,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { TopoDoodlePattern } from '../../components/doodles/DoodleBackground';
import { MonsterAvatar } from '../../components/doodles/MonsterAvatars';
import {
  GameSettings,
  PresetName,
  WordLengthOption,
  TurnTimerOption,
  LivesOption,
  PlayerCountOption,
  MatchDurationOption,
  WordCategory,
  InvalidWordPenalty,
  TimeoutPenalty,
  StartingWordOption,
  TurnOrderOption,
} from '../../lib/types/game';
import { DEFAULT_SETTINGS, PRESETS, getSettingsForPreset } from '../../lib/constants/presets';
import { soundManager } from '../../lib/audio/sounds';
import { getLocalGuestProfile } from '../../lib/supabase/client';
import { getSocket } from '../../lib/socket/client';

function CreateMatchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPreset = (searchParams.get('preset') as PresetName) || 'classic';

  const [settings, setSettings] = useState<GameSettings>(() => {
    return getSettingsForPreset(initialPreset);
  });
  const [profile, setProfile] = useState<{ displayName: string; avatarId: string } | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const prof = getLocalGuestProfile();
    setProfile(prof);
  }, []);

  const handleSelectPreset = (preset: PresetName) => {
    soundManager.playClick();
    const updated = getSettingsForPreset(preset, settings);
    setSettings(updated);
  };

  const handleCreateRoom = (asPublic = false) => {
    soundManager.playClick();
    setIsCreating(true);
    setErrorMessage(null);

    const prof = profile || getLocalGuestProfile();
    const finalSettings: GameSettings = {
      ...settings,
      isPublic: asPublic,
    };

    const socket = getSocket();
    socket.emit(
      'create_room',
      {
        playerName: prof.displayName,
        avatarId: prof.avatarId,
        settings: finalSettings,
      },
      (response: { error?: string; roomCode?: string }) => {
        setIsCreating(false);
        if (response.error) {
          setErrorMessage(response.error);
          return;
        }
        if (response.roomCode) {
          router.push(`/room/${response.roomCode}`);
        }
      }
    );
  };

  const wordLengths: { value: WordLengthOption; label: string }[] = [
    { value: '3', label: '3 Letters' },
    { value: '4', label: '4 Letters' },
    { value: '5', label: '5 Letters' },
    { value: '6', label: '6 Letters' },
    { value: '7', label: '7 Letters' },
    { value: '8', label: '8 Letters' },
    { value: 'any', label: 'Any Length' },
  ];

  const timers: { value: TurnTimerOption; label: string }[] = [
    { value: 5, label: '5s' },
    { value: 10, label: '10s' },
    { value: 15, label: '15s' },
    { value: 20, label: '20s' },
    { value: 30, label: '30s' },
    { value: 45, label: '45s' },
    { value: 60, label: '60s' },
    { value: 0, label: 'No Limit' },
  ];

  const livesOptions: { value: LivesOption; label: string }[] = [
    { value: 1, label: '1 Life' },
    { value: 2, label: '2 Lives' },
    { value: 3, label: '3 Lives' },
    { value: 5, label: '5 Lives' },
    { value: 10, label: '10 Lives' },
    { value: 0, label: 'Unlimited' },
  ];

  const playerCounts: PlayerCountOption[] = [2, 3, 4, 5, 6, 8, 10, 12];

  const categories: { value: WordCategory; label: string }[] = [
    { value: 'all', label: 'All Words' },
    { value: 'animals', label: 'Animals' },
    { value: 'food', label: 'Food & Cuisine' },
    { value: 'countries', label: 'Countries' },
    { value: 'technology', label: 'Technology' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 py-6 sm:py-10 flex-1">
        {/* Title row */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FFC928] text-xs font-black px-3 py-1 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111] mb-2">
              <Sliders size={14} />
              ROOM CUSTOMIZER
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">Create Match</h1>
            <p className="text-xs sm:text-sm font-bold text-[#666666]">
              Choose a preset or fine-tune exact word lengths, turn timers, and elimination rules.
            </p>
          </div>
        </div>

        {/* PRESET PICKER ROW */}
        <div className="mb-6 sm:mb-8">
          <span className="text-xs font-extrabold uppercase text-[#777777] block mb-2">
            Step 1: Choose a Starting Preset
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {(Object.keys(PRESETS) as PresetName[]).map(key => {
              const p = PRESETS[key];
              const isSelected = settings.preset === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelectPreset(key)}
                  className={`p-3 sm:p-3.5 rounded-2xl border-[2.5px] sm:border-[3px] border-[#111111] text-left transition-all ${
                    isSelected
                      ? 'bg-[#FFC928] shadow-[3px_3px_0px_#111111] -translate-y-1'
                      : 'bg-white shadow-[2px_2px_0px_#111111] hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-black text-[#111111]">{p.title}</span>
                    {isSelected && <span className="text-xs font-black">✓</span>}
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#555555] mt-1 line-clamp-2">
                    {p.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* SETTINGS FORM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* A. WORD LENGTH SELECTOR */}
            <div className="doodle-card p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                <span className="text-sm font-black text-[#111111]">Word Length</span>
                <span className="text-[11px] sm:text-xs font-bold font-mono bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
                  {settings.wordLength === 'any'
                    ? `${settings.anyLengthMin} - ${settings.anyLengthMax} letters`
                    : `${settings.wordLength} letters`}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
                {wordLengths.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      soundManager.playClick();
                      setSettings({ ...settings, wordLength: opt.value, preset: 'custom' });
                    }}
                    className={`py-2 px-1 text-center font-bold text-[11px] sm:text-xs rounded-xl border-2 border-[#111111] transition-all ${
                      settings.wordLength === opt.value
                        ? 'bg-[#FFC928] shadow-[2px_2px_0px_#111111] font-black'
                        : 'bg-neutral-50 hover:bg-neutral-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Any Length min/max sub-controls */}
              {settings.wordLength === 'any' && (
                <div className="mt-4 pt-3 border-t border-neutral-200 grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-[#666666] block mb-1">
                      Minimum Letters ({settings.anyLengthMin})
                    </label>
                    <input
                      type="range"
                      min={2}
                      max={settings.anyLengthMax}
                      value={settings.anyLengthMin}
                      onChange={e => {
                        const val = parseInt(e.target.value, 10);
                        setSettings({ ...settings, anyLengthMin: val, preset: 'custom' });
                      }}
                      className="w-full accent-[#111111] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#666666] block mb-1">
                      Maximum Letters ({settings.anyLengthMax})
                    </label>
                    <input
                      type="range"
                      min={settings.anyLengthMin}
                      max={20}
                      value={settings.anyLengthMax}
                      onChange={e => {
                        const val = parseInt(e.target.value, 10);
                        setSettings({ ...settings, anyLengthMax: val, preset: 'custom' });
                      }}
                      className="w-full accent-[#111111] cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* B. TURN TIME LIMIT */}
            <div className="doodle-card p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Timer size={16} />
                  <span className="text-sm font-black text-[#111111]">Turn Time Limit</span>
                </div>
                <span className="text-[11px] sm:text-xs font-bold font-mono bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
                  {settings.turnTimeLimit === 0 ? 'No countdown' : `${settings.turnTimeLimit}s`}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
                {timers.map(t => (
                  <button
                    key={t.value}
                    onClick={() => {
                      soundManager.playClick();
                      setSettings({ ...settings, turnTimeLimit: t.value, preset: 'custom' });
                    }}
                    className={`py-2 px-1 text-center font-bold text-[11px] sm:text-xs rounded-xl border-2 border-[#111111] transition-all ${
                      settings.turnTimeLimit === t.value
                        ? 'bg-[#FFC928] shadow-[2px_2px_0px_#111111] font-black'
                        : 'bg-neutral-50 hover:bg-neutral-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* C. LIVES & ELIMINATION */}
            <div className="doodle-card p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Heart size={16} className="text-[#FF5D8F]" />
                  <span className="text-sm font-black text-[#111111]">Lives & Elimination</span>
                </div>
                <span className="text-[11px] sm:text-xs font-bold font-mono bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
                  {settings.lives === 0 ? 'Unlimited Lives' : `${settings.lives} Lives`}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
                {livesOptions.map(l => (
                  <button
                    key={l.value}
                    onClick={() => {
                      soundManager.playClick();
                      setSettings({ ...settings, lives: l.value, preset: 'custom' });
                    }}
                    className={`py-2 px-1 text-center font-bold text-[11px] sm:text-xs rounded-xl border-2 border-[#111111] transition-all ${
                      settings.lives === l.value
                        ? 'bg-[#FFC928] shadow-[2px_2px_0px_#111111] font-black'
                        : 'bg-neutral-50 hover:bg-neutral-100'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* D. PLAYER COUNT */}
            <div className="doodle-card p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Users size={16} />
                  <span className="text-sm font-black text-[#111111]">Max Player Count</span>
                </div>
                <span className="text-[11px] sm:text-xs font-bold font-mono bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
                  {settings.playerCount} Players Max
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
                {playerCounts.map(count => (
                  <button
                    key={count}
                    onClick={() => {
                      soundManager.playClick();
                      setSettings({ ...settings, playerCount: count, preset: 'custom' });
                    }}
                    className={`py-2 px-1 text-center font-bold text-[11px] sm:text-xs rounded-xl border-2 border-[#111111] transition-all ${
                      settings.playerCount === count
                        ? 'bg-[#FFC928] shadow-[2px_2px_0px_#111111] font-black'
                        : 'bg-neutral-50 hover:bg-neutral-100'
                    }`}
                  >
                    {count}P
                  </button>
                ))}
              </div>
            </div>

            {/* E. ADVANCED RULES */}
            <div className="doodle-card p-5 space-y-4">
              <span className="text-xs font-black uppercase text-[#888888] tracking-wider block">
                Additional Rules & Dictionaries
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="text-xs font-bold text-[#444444] block mb-1">
                    Word Category
                  </label>
                  <select
                    value={settings.category}
                    onChange={e => {
                      soundManager.playClick();
                      setSettings({ ...settings, category: e.target.value as WordCategory, preset: 'custom' });
                    }}
                    className="w-full bg-white border-2 border-[#111111] rounded-xl px-3 py-2 text-xs font-bold shadow-[2px_2px_0px_#111111] focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* Invalid word penalty */}
                <div>
                  <label className="text-xs font-bold text-[#444444] block mb-1">
                    Invalid Word Penalty
                  </label>
                  <select
                    value={settings.invalidWordPenalty}
                    onChange={e => {
                      soundManager.playClick();
                      setSettings({ ...settings, invalidWordPenalty: e.target.value as InvalidWordPenalty, preset: 'custom' });
                    }}
                    className="w-full bg-white border-2 border-[#111111] rounded-xl px-3 py-2 text-xs font-bold shadow-[2px_2px_0px_#111111] focus:outline-none"
                  >
                    <option value="none">No Penalty (Re-try until time)</option>
                    <option value="lose_turn">Lose Turn</option>
                    <option value="lose_life">Lose Life</option>
                  </select>
                </div>

                {/* Timeout penalty */}
                <div>
                  <label className="text-xs font-bold text-[#444444] block mb-1">
                    Timeout Penalty
                  </label>
                  <select
                    value={settings.timeoutPenalty}
                    onChange={e => {
                      soundManager.playClick();
                      setSettings({ ...settings, timeoutPenalty: e.target.value as TimeoutPenalty, preset: 'custom' });
                    }}
                    className="w-full bg-white border-2 border-[#111111] rounded-xl px-3 py-2 text-xs font-bold shadow-[2px_2px_0px_#111111] focus:outline-none"
                  >
                    <option value="lose_turn">Lose Turn</option>
                    <option value="lose_life">Lose Life</option>
                  </select>
                </div>

                {/* Repeated words */}
                <div>
                  <label className="text-xs font-bold text-[#444444] block mb-1">
                    Allow Repeated Words
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSettings({ ...settings, allowRepeatedWords: !settings.allowRepeatedWords, preset: 'custom' });
                    }}
                    className={`w-full py-2 px-3 rounded-xl border-2 border-[#111111] text-xs font-bold flex items-center justify-between shadow-[2px_2px_0px_#111111] ${
                      settings.allowRepeatedWords ? 'bg-[#80ED99]' : 'bg-neutral-100'
                    }`}
                  >
                    <span>{settings.allowRepeatedWords ? 'Allowed' : 'Disabled (No duplicates)'}</span>
                    <span className="font-black">{settings.allowRepeatedWords ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY & LAUNCH CARD */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 doodle-card-yellow p-6 flex flex-col justify-between gap-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-full border border-[#111111]">
                    Match Preview
                  </span>
                  <span className="font-mono text-xs font-black uppercase">{settings.preset}</span>
                </div>

                <div className="flex items-center gap-3 my-3">
                  <div className="w-14 h-14 bg-white border-2 border-[#111111] rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                    <MonsterAvatar id={profile?.avatarId || 'monty'} size={44} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#444444]">Host Player</span>
                    <h4 className="text-base font-black text-[#111111] leading-tight">
                      {profile?.displayName || 'WordHunter'}
                    </h4>
                  </div>
                </div>

                {/* Rules List */}
                <div className="bg-white/80 rounded-2xl border-2 border-[#111111] p-3.5 space-y-2 text-xs font-bold text-[#222222]">
                  <div className="flex justify-between">
                    <span>Length</span>
                    <span className="font-black font-mono">
                      {settings.wordLength === 'any'
                        ? `${settings.anyLengthMin}-${settings.anyLengthMax} chars`
                        : `${settings.wordLength} chars`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Turn Timer</span>
                    <span className="font-black font-mono">{settings.turnTimeLimit === 0 ? 'Off' : `${settings.turnTimeLimit}s`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lives</span>
                    <span className="font-black font-mono">{settings.lives === 0 ? 'Unlimited' : settings.lives}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capacity</span>
                    <span className="font-black font-mono">{settings.playerCount} Players</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category</span>
                    <span className="font-black font-mono uppercase">{settings.category}</span>
                  </div>
                </div>
              </div>

              {errorMessage && (
                <p className="text-xs font-black text-red-700 bg-red-100 p-2.5 rounded-xl border border-red-300">
                  {errorMessage}
                </p>
              )}

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => handleCreateRoom(false)}
                  disabled={isCreating}
                  className="w-full doodle-btn py-3.5 text-sm disabled:opacity-50"
                >
                  <Lock size={16} />
                  <span>{isCreating ? 'Creating Room...' : 'Create Private Room'}</span>
                </button>

                <button
                  onClick={() => handleCreateRoom(true)}
                  disabled={isCreating}
                  className="w-full bg-white text-[#111111] border-2 border-[#111111] rounded-full py-3 text-xs font-extrabold shadow-[2px_2px_0px_#111111] hover:bg-neutral-50 flex items-center justify-center gap-2"
                >
                  <Globe size={15} />
                  <span>Create Public Room</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CreateMatchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-bold">Loading match creator...</div>}>
      <CreateMatchContent />
    </Suspense>
  );
}
