'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { MonsterAvatar } from '../../components/doodles/MonsterAvatars';
import { soundManager } from '../../lib/audio/sounds';
import { RGBSliders } from '../../components/color-clash/RGBSliders';
import { RGBColor } from '../../lib/types/colorMatch';
import { rgbToCss, rgbToHex } from '../../lib/utils/colorUtils';
import {
  Sparkles,
  Users,
  Bot,
  Users2,
  Play,
  LogIn,
  Sliders,
  Palette,
  Trophy,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function ColorClashLandingPage() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState('');
  const [demoColor, setDemoColor] = useState<RGBColor>({ r: 255, g: 107, b: 107 });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = joinCode.trim().toUpperCase();
    if (clean.length >= 4) {
      soundManager.playClick();
      router.push(`/color-clash/room/${clean}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7EE] flex flex-col justify-between selection:bg-[#FFC928]">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-8 sm:space-y-12">
        {/* HERO SECTION */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFC928] border-2 border-[#111111] px-3.5 py-1.5 rounded-full shadow-[2px_2px_0px_#111111]">
            <Palette size={15} />
            <span className="text-xs font-black uppercase tracking-wider text-[#111111]">
              NEW MULTIPLAYER GAME
            </span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black text-[#111111] tracking-tight leading-[1.08]">
            Color Clash <br />
            <span className="bg-[#FFC928] px-3 py-0.5 rounded-2xl border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] inline-block mt-1">
              Multiplayer RGB Matcher
            </span>
          </h1>

          <p className="text-xs sm:text-lg font-bold text-[#555555] max-w-xl mx-auto leading-relaxed">
            All players get the exact same secret color swatch. Drag your Red, Green, and Blue sliders to replicate it.
            The closest color match wins the round!
          </p>
        </section>

        {/* PRIMARY GAME MODES */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* 1. PLAY ONLINE WITH FRIENDS */}
          <div className="doodle-card p-5 bg-white flex flex-col justify-between space-y-4 hover:translate-y-[-2px] transition-transform">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFC928] border-2 border-[#111111] flex items-center justify-center shadow-[3px_3px_0px_#111111]">
                <Users size={24} className="text-[#111111]" />
              </div>
              <h2 className="text-xl font-black text-[#111111]">Play with Friends</h2>
              <p className="text-xs font-bold text-[#666666] leading-relaxed">
                Create a private room, share your 6-letter code, and battle in real-time round eliminations.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                href="/color-clash/create"
                onClick={() => soundManager.playClick()}
                className="w-full py-3 bg-[#FFC928] hover:bg-[#ffcf3e] border-2 border-[#111111] rounded-xl font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#111111] active:translate-y-[1px] flex items-center justify-center gap-1.5 transition-all text-[#111111]"
              >
                <Sparkles size={15} />
                Create Match Room
              </Link>

              {/* Join Input */}
              <form onSubmit={handleJoin} className="flex gap-1.5">
                <input
                  type="text"
                  maxLength={6}
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="ROOM CODE"
                  className="flex-1 px-3 py-2 bg-[#FAF7EE] border-2 border-[#111111] rounded-xl font-mono font-black text-xs uppercase text-center focus:outline-none focus:ring-2 focus:ring-[#FFC928]"
                />
                <button
                  type="submit"
                  disabled={joinCode.trim().length < 4}
                  className="px-3.5 py-2 bg-white border-2 border-[#111111] rounded-xl font-black text-xs uppercase shadow-[2px_2px_0px_#111111] disabled:opacity-40 hover:bg-neutral-100"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* 2. SOLO AI BOT PRACTICE */}
          <div className="doodle-card p-5 bg-white flex flex-col justify-between space-y-4 hover:translate-y-[-2px] transition-transform">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-200 border-2 border-[#111111] flex items-center justify-center shadow-[3px_3px_0px_#111111]">
                <Bot size={24} className="text-[#111111]" />
              </div>
              <h2 className="text-xl font-black text-[#111111]">Solo vs AI Bots</h2>
              <p className="text-xs font-bold text-[#666666] leading-relaxed">
                Train your color recall against AI doodle monsters (Chroma, Huey, Palette) with instant rounds.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/color-clash/practice"
                onClick={() => soundManager.playClick()}
                className="w-full py-3.5 bg-purple-400 hover:bg-purple-300 border-2 border-[#111111] rounded-xl font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#111111] active:translate-y-[1px] flex items-center justify-center gap-1.5 transition-all text-[#111111]"
              >
                <Play size={15} fill="#111111" />
                Start Solo Practice
              </Link>
            </div>
          </div>

          {/* 3. LOCAL 2-PLAYER PASS & PLAY */}
          <div className="doodle-card p-5 bg-white flex flex-col justify-between space-y-4 hover:translate-y-[-2px] transition-transform">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-200 border-2 border-[#111111] flex items-center justify-center shadow-[3px_3px_0px_#111111]">
                <Users2 size={24} className="text-[#111111]" />
              </div>
              <h2 className="text-xl font-black text-[#111111]">Pass & Play</h2>
              <p className="text-xs font-bold text-[#666666] leading-relaxed">
                Two players on the same phone, tablet, or laptop. Take turns matching and reveal the winner.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/color-clash/local"
                onClick={() => soundManager.playClick()}
                className="w-full py-3.5 bg-blue-400 hover:bg-blue-300 border-2 border-[#111111] rounded-xl font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#111111] active:translate-y-[1px] flex items-center justify-center gap-1.5 transition-all text-[#111111]"
              >
                <Users2 size={15} />
                2-Player Local Duel
              </Link>
            </div>
          </div>
        </section>

        {/* INTERACTIVE RGB PLAYGROUND DEMO */}
        <section className="doodle-card p-5 sm:p-8 bg-neutral-50 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-neutral-200 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#FFC928] px-2 py-0.5 rounded border border-[#111111]">
                Interactive Playground
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#111111] mt-1">
                Try the RGB Sliders Right Now
              </h2>
            </div>
            <span className="text-xs font-bold text-[#666666]">
              Drag to see live color calculation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Live swatch showcase */}
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111]">
              <div
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] flex items-center justify-center transition-colors duration-100"
                style={{ backgroundColor: rgbToCss(demoColor) }}
              >
                <MonsterAvatar id="monty" size={56} />
              </div>
              <span className="text-lg font-black font-mono text-[#111111] mt-3">
                {rgbToHex(demoColor)}
              </span>
              <span className="text-xs font-bold text-[#888888] font-mono">
                {rgbToCss(demoColor)}
              </span>
            </div>

            {/* Sliders */}
            <RGBSliders
              color={demoColor}
              onChange={setDemoColor}
              onSubmit={() => {
                setDemoSubmitted(true);
                setTimeout(() => setDemoSubmitted(false), 2000);
              }}
              submitLabel={demoSubmitted ? 'NICE MIX!' : 'TRY LOCKING IN'}
            />
          </div>
        </section>

        {/* HOW TO PLAY GUIDE */}
        <section className="space-y-5">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-wider bg-[#FFC928] px-3 py-1 rounded-full border border-[#111111]">
              Rules & Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] mt-2">
              How Does Color Clash Work?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="doodle-card p-4 bg-white space-y-2">
              <span className="w-8 h-8 rounded-xl bg-[#FFC928] border-2 border-[#111111] font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                1
              </span>
              <h3 className="text-base font-black text-[#111111]">Target Reveal</h3>
              <p className="text-xs font-bold text-[#666666] leading-relaxed">
                At the start of each round, an identical target color swatch appears on every player&apos;s screen.
              </p>
            </div>

            <div className="doodle-card p-4 bg-white space-y-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-400 border-2 border-[#111111] font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                2
              </span>
              <h3 className="text-base font-black text-[#111111]">Adjust RGB Sliders</h3>
              <p className="text-xs font-bold text-[#666666] leading-relaxed">
                Move the Red (0-255), Green (0-255), and Blue (0-255) sliders before the 20-second timer runs out.
              </p>
            </div>

            <div className="doodle-card p-4 bg-white space-y-2">
              <span className="w-8 h-8 rounded-xl bg-purple-400 border-2 border-[#111111] font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                3
              </span>
              <h3 className="text-base font-black text-[#111111]">Closest Match Wins</h3>
              <p className="text-xs font-bold text-[#666666] leading-relaxed">
                Scores are determined by Euclidean distance in RGB color space. The player closest to the target gets 100 points!
              </p>
            </div>
          </div>
        </section>

        {/* COLOR THEORY CHEAT SHEET */}
        <section className="doodle-card p-5 sm:p-6 bg-white space-y-4">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-[#111111]" />
            <h3 className="text-base sm:text-lg font-black text-[#111111]">
              Pro Color Matcher Cheat Sheet
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl border-2 border-[#111111] bg-yellow-100">
              <span className="text-xs font-black block text-[#111111]">Red + Green</span>
              <span className="text-[11px] font-bold text-[#555555]">= Yellow / Orange</span>
            </div>
            <div className="p-3 rounded-xl border-2 border-[#111111] bg-cyan-100">
              <span className="text-xs font-black block text-[#111111]">Green + Blue</span>
              <span className="text-[11px] font-bold text-[#555555]">= Cyan / Teal</span>
            </div>
            <div className="p-3 rounded-xl border-2 border-[#111111] bg-fuchsia-100">
              <span className="text-xs font-black block text-[#111111]">Red + Blue</span>
              <span className="text-[11px] font-bold text-[#555555]">= Magenta / Purple</span>
            </div>
            <div className="p-3 rounded-xl border-2 border-[#111111] bg-neutral-100">
              <span className="text-xs font-black block text-[#111111]">Equal R + G + B</span>
              <span className="text-[11px] font-bold text-[#555555]">= Neutral Grey / White</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

