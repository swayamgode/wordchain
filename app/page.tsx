'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Zap,
  Users,
  ArrowRight,
  Sparkles,
  Search,
  Palette,
  Type,
  Trophy,
  Timer,
  ChevronDown,
  Bot,
  Gamepad2,
  Flame,
  HelpCircle,
  Play,
  Swords,
  Radio,
  SlidersHorizontal,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MonsterAvatar } from '../components/doodles/MonsterAvatars';
import { TopoDoodlePattern, DoodleCrowdBanner } from '../components/doodles/DoodleBackground';
import { soundManager } from '../lib/audio/sounds';
import { getLocalGuestProfile } from '../lib/supabase/client';

export default function LandingPage() {
  const router = useRouter();
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [profile, setProfile] = useState<{ displayName: string; avatarId: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setProfile(getLocalGuestProfile());
  }, []);

  const handleJoinByCode = (e: React.FormEvent) => {
    e.preventDefault();
    const code = roomCodeInput.trim().toUpperCase();
    if (code.length === 6) {
      soundManager.playClick();
      router.push(`/room/${code}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#FAF7EE] selection:bg-[#FFC928]">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-10 flex-1 flex flex-col gap-10 sm:gap-14">

        {/* ───── ARCADE HERO HUB ───── */}
        <section className="relative overflow-hidden doodle-card-yellow p-6 sm:p-10 border-3 border-[#111111] shadow-[5px_5px_0px_#111111]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Arcade Headline & Universal Join */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5">
              <div className="inline-flex items-center gap-2 bg-white text-[11px] sm:text-xs font-black uppercase px-3.5 py-1.5 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
                <Sparkles size={14} className="text-[#111111] fill-[#FFC928]" />
                <span>Multiplayer Web Arcade &bull; 100% Free</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111111] tracking-tight leading-[1.08]">
                Real-Time Battles.<br />
                <span className="bg-white px-3 py-0.5 rounded-2xl border-2 sm:border-[3px] border-[#111111] shadow-[3px_3px_0px_#111111] inline-block mt-1">
                  Instant Fun.
                </span>
              </h1>

              <p className="text-xs sm:text-base font-bold text-[#333333] max-w-lg leading-relaxed">
                Word relay duels, RGB color challenges, and brain battles. Play live multiplayer with friends or practice solo vs smart bots — right in your browser.
              </p>

              {/* Instant Room Code Jump */}
              <div className="w-full max-w-md pt-2">
                <form onSubmit={handleJoinByCode} className="flex items-center gap-2 bg-white p-2 rounded-2xl border-2 sm:border-[3px] border-[#111111] shadow-[3px_3px_0px_#111111]">
                  <input
                    type="text"
                    maxLength={6}
                    value={roomCodeInput}
                    onChange={e => setRoomCodeInput(e.target.value.toUpperCase())}
                    placeholder="HAVE A 6-LETTER ROOM CODE?"
                    className="flex-1 min-w-0 bg-transparent px-3 py-1 font-mono text-xs sm:text-sm font-black tracking-widest text-[#111111] focus:outline-none uppercase placeholder:text-neutral-400 placeholder:tracking-normal placeholder:font-bold"
                  />
                  <button
                    type="submit"
                    disabled={roomCodeInput.trim().length !== 6}
                    className="doodle-btn py-2 px-4 sm:px-5 text-xs sm:text-sm shrink-0 disabled:opacity-40 flex items-center gap-1.5"
                  >
                    <Search size={14} />
                    <span>Join</span>
                  </button>
                </form>
                <div className="flex items-center justify-center lg:justify-start gap-4 mt-2 text-[11px] font-bold text-[#444444]">
                  <span>✨ Zero downloads</span>
                  <span>&bull;</span>
                  <span>🎮 Cross-device</span>
                  <span>&bull;</span>
                  <span>⚡ Sub-second sync</span>
                </div>
              </div>
            </div>

            {/* Right Column: Arcade Mascot & Quick Stats */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 bg-white border-3 border-[#111111] rounded-3xl flex items-center justify-center shadow-[5px_5px_0px_#111111] overflow-hidden">
                <MonsterAvatar id="monty" size={130} mood="happy" />
                <div className="absolute top-3 left-3 bg-[#80ED99] border-2 border-[#111111] px-2 py-0.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                  <Radio size={10} className="animate-pulse text-green-800" />
                  <span>Rooms Active</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-[#FF5D8F] text-white border-2 border-[#111111] px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">
                  Arcade V2
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ───── MULTI-GAME ARCADE SHOWCASE ───── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-[#111111]/10 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-[#111111] text-[#FFC928] px-3 py-1 rounded-full border border-[#111111]">
                <Gamepad2 size={13} />
                <span>Choose Your Game</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight mt-1">
                Featured Arcade Games
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#666666]">
              All games support 1v1 matchmaking, private squad rooms &amp; offline practice.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* GAME 1: WordChain */}
            <div className="doodle-card p-6 sm:p-8 bg-white border-3 border-[#111111] shadow-[4px_4px_0px_#111111] flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-[#FFC928] border-2 border-[#111111] rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_#111111]">
                      <Type size={28} className="text-[#111111]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-black text-[#111111]">WordChain</h3>
                        <span className="text-[10px] font-black uppercase bg-[#80ED99] border border-[#111111] px-2 py-0.5 rounded-md">
                          Popular
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#666666]">Rapid Last-Letter Relay Battle</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-medium text-[#444444] leading-relaxed">
                  Every word you enter must begin with the final letter of the previous word. Outwit opponents with deadly letter traps like <strong>X, Z, and Q</strong> before the turn timer hits zero!
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black bg-[#FAF7EE] border border-[#111111]/30 px-2.5 py-1 rounded-lg text-[#333333]">
                    <Users size={12} /> 2–8 Players
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-black bg-[#FAF7EE] border border-[#111111]/30 px-2.5 py-1 rounded-lg text-[#333333]">
                    <Timer size={12} /> 10s–30s Clocks
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-black bg-[#FAF7EE] border border-[#111111]/30 px-2.5 py-1 rounded-lg text-[#333333]">
                    <Trophy size={12} /> Heart Elimination
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t-2 border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <Link
                  href="/matchmaking"
                  onClick={() => soundManager.playClick()}
                  className="flex-1 py-3 bg-[#111111] text-[#FFC928] border-2 border-[#111111] rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider text-center shadow-[2px_2px_0px_#FFC928] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Zap size={15} className="fill-[#FFC928]" />
                  <span>Quick Match</span>
                  <ArrowRight size={14} />
                </Link>

                <div className="flex gap-2">
                  <Link
                    href="/create"
                    onClick={() => soundManager.playClick()}
                    className="flex-1 sm:flex-none py-3 px-4 bg-white border-2 border-[#111111] rounded-xl font-black text-xs uppercase text-center shadow-[2px_2px_0px_#111111] hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Users size={14} />
                    <span>Create Room</span>
                  </Link>

                  <Link
                    href="/practice"
                    onClick={() => soundManager.playClick()}
                    className="py-3 px-3.5 bg-neutral-100 border-2 border-[#111111] rounded-xl font-black text-xs uppercase text-center shadow-[2px_2px_0px_#111111] hover:bg-neutral-200 transition-colors flex items-center justify-center"
                    title="Solo AI Bot Practice"
                  >
                    <Bot size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* GAME 2: Color Clash */}
            <div className="doodle-card p-6 sm:p-8 bg-white border-3 border-[#111111] shadow-[4px_4px_0px_#111111] flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-400 via-green-400 to-blue-400 border-2 border-[#111111] rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_#111111]">
                      <Palette size={28} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-black text-[#111111]">Color Clash</h3>
                        <span className="text-[10px] font-black uppercase bg-[#FFC928] border border-[#111111] px-2 py-0.5 rounded-md">
                          New Game
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#666666]">Live RGB Color Matching Duel</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-medium text-[#444444] leading-relaxed">
                  All players get the same secret target color swatch. Adjust your <strong>Red, Green, and Blue sliders (0-255)</strong> to reproduce the hue. Closest Euclidean match wins the round!
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black bg-[#FAF7EE] border border-[#111111]/30 px-2.5 py-1 rounded-lg text-[#333333]">
                    <SlidersHorizontal size={12} /> RGB Sliders
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-black bg-[#FAF7EE] border border-[#111111]/30 px-2.5 py-1 rounded-lg text-[#333333]">
                    <Swords size={12} /> Solo &bull; Local &bull; Online
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-black bg-[#FAF7EE] border border-[#111111]/30 px-2.5 py-1 rounded-lg text-[#333333]">
                    <Trophy size={12} /> 5-Round Tourney
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t-2 border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <Link
                  href="/color-clash"
                  onClick={() => soundManager.playClick()}
                  className="flex-1 py-3 bg-[#FFC928] text-[#111111] border-2 border-[#111111] rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider text-center shadow-[2px_2px_0px_#111111] hover:bg-[#ffcf3e] transition-colors flex items-center justify-center gap-2"
                >
                  <Palette size={15} />
                  <span>Play Color Clash</span>
                  <ArrowRight size={14} />
                </Link>

                <div className="flex gap-2">
                  <Link
                    href="/color-clash/create"
                    onClick={() => soundManager.playClick()}
                    className="flex-1 sm:flex-none py-3 px-4 bg-white border-2 border-[#111111] rounded-xl font-black text-xs uppercase text-center shadow-[2px_2px_0px_#111111] hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Users size={14} />
                    <span>Create Room</span>
                  </Link>

                  <Link
                    href="/color-clash/practice"
                    onClick={() => soundManager.playClick()}
                    className="py-3 px-3.5 bg-neutral-100 border-2 border-[#111111] rounded-xl font-black text-xs uppercase text-center shadow-[2px_2px_0px_#111111] hover:bg-neutral-200 transition-colors flex items-center justify-center"
                    title="Color Clash AI Practice"
                  >
                    <Bot size={16} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ───── ARCADE PLAY MODES (HOW TO PLAY TOGETHER) ───── */}
        <section className="space-y-4">
          <div className="text-center sm:text-left">
            <span className="text-xs font-black uppercase tracking-wider bg-[#FFC928] px-2.5 py-0.5 rounded-full border border-[#111111]">
              Flexible Ways to Play
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
              Play With Anyone, Anywhere
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="doodle-card p-5 bg-white space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFC928] border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                <Zap size={20} className="text-[#111111]" />
              </div>
              <h3 className="text-base font-black text-[#111111]">Online Matchmaking</h3>
              <p className="text-xs font-medium text-[#555555] leading-relaxed">
                Jump into real-time public queues against players globally. Sub-second pairing with tournament rules.
              </p>
              <div className="pt-2 flex gap-3 text-xs font-black">
                <Link href="/matchmaking" className="underline hover:text-[#FFC928]">WordChain 1v1 &rarr;</Link>
              </div>
            </div>

            <div className="doodle-card p-5 bg-white space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#80ED99] border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                <Users size={20} className="text-[#111111]" />
              </div>
              <h3 className="text-base font-black text-[#111111]">Private Squad Rooms</h3>
              <p className="text-xs font-medium text-[#555555] leading-relaxed">
                Create a private room in seconds. Share the simple 6-letter room code on Discord, WhatsApp, or Zoom.
              </p>
              <div className="pt-2 flex gap-3 text-xs font-black">
                <Link href="/create" className="underline hover:text-[#FFC928]">Word Room</Link>
                <span>&bull;</span>
                <Link href="/color-clash/create" className="underline hover:text-[#FFC928]">Color Room &rarr;</Link>
              </div>
            </div>

            <div className="doodle-card p-5 bg-white space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FF5D8F] border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                <Gamepad2 size={20} className="text-white" />
              </div>
              <h3 className="text-base font-black text-[#111111]">Pass &amp; Play Local</h3>
              <p className="text-xs font-medium text-[#555555] leading-relaxed">
                Share a single phone or laptop with a friend on the couch, in a classroom, or during road trips.
              </p>
              <div className="pt-2 flex gap-3 text-xs font-black">
                <Link href="/local" className="underline hover:text-[#FFC928]">Word Local</Link>
                <span>&bull;</span>
                <Link href="/color-clash/local" className="underline hover:text-[#FFC928]">Color Local &rarr;</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ───── HOW IT WORKS VISUAL STRIP ───── */}
        <section className="doodle-card p-6 sm:p-8 bg-white space-y-5 border-3 border-[#111111] shadow-[4px_4px_0px_#111111]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase text-[#888888]">Game Mechanics Preview</span>
              <h2 className="text-xl sm:text-3xl font-black text-[#111111]">The Classic Last-Letter Rule</h2>
            </div>
            <Link
              href="/how-to-play"
              className="text-xs font-black uppercase text-[#111111] bg-[#FFC928] border-2 border-[#111111] px-3.5 py-1.5 rounded-full shadow-[2px_2px_0px_#111111] hover:bg-[#ffcf3e] transition-colors w-fit"
            >
              Full Rules Guide &rarr;
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3 bg-[#FAF7EE] rounded-2xl border-2 border-[#111111] p-4">
            {[
              { word: 'TIGE', last: 'R', player: 'P1' },
              { word: 'RABBI', last: 'T', player: 'P2' },
              { word: 'TURTL', last: 'E', player: 'P3' },
              { word: 'ELEPHAN', last: 'T', player: 'P1' },
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase text-[#666666] mb-1">{step.player}</span>
                  <div className="bg-white border-2 sm:border-[2.5px] border-[#111111] rounded-xl px-3 py-1.5 font-mono text-sm sm:text-base font-black shadow-[2px_2px_0px_#111111] flex items-center">
                    <span>{step.word}</span>
                    <span className="bg-[#FFC928] px-1 rounded border border-[#111111] ml-0.5">{step.last}</span>
                  </div>
                </div>
                {idx < 3 && (
                  <ArrowRight size={16} className="text-[#111111] stroke-[3] shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-center text-xs sm:text-sm font-bold text-[#555555] max-w-lg mx-auto">
            Submissions must be valid dictionary words. Repeat a word or run out of time? You lose a life!
          </p>
        </section>

        {/* ───── STRATEGY GUIDES & SEO ARTICLES ───── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#111111]">Guides &amp; Strategies</h2>
              <p className="text-xs font-bold text-[#666666]">Cheat sheets, letter traps &amp; game theory</p>
            </div>
            <Link
              href="/blog"
              className="text-xs font-black uppercase text-[#111111] bg-white border-2 border-[#111111] px-3 py-1.5 rounded-full shadow-[2px_2px_0px_#111111] hover:translate-y-[-1px] transition-transform"
            >
              All Articles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              {
                href: '/blog/word-games-like-wordle-unlimited',
                tag: 'Trending',
                title: 'Best Games Like Wordle Unlimited Times',
                desc: 'Tired of 1 puzzle a day? Play continuous word battles.',
              },
              {
                href: '/blog/words-starting-with-x-word-chain',
                tag: 'Cheat Sheet',
                title: 'Words Starting with X: Survival Guide',
                desc: 'Never freeze under the timer when handed an X.',
              },
              {
                href: '/blog/rgb-color-match-game-guide',
                tag: 'Color Clash',
                title: 'RGB Matching: Euclidean Distance & Tricks',
                desc: 'How to score 95%+ precision using additive light.',
              },
              {
                href: '/blog/fun-word-games-for-couples',
                tag: 'Couples',
                title: 'Fun 2-Player Word Games for Date Night',
                desc: 'Low-stress, engaging pass-and-play games for two.',
              },
            ].map((guide, i) => (
              <Link
                key={i}
                href={guide.href}
                className="doodle-card p-4 bg-white hover:bg-neutral-50 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-[#FFC928] px-2 py-0.5 rounded border border-[#111111]">
                    {guide.tag}
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-[#111111] mt-2 leading-snug group-hover:text-[#FFC928] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-[11px] font-medium text-[#666666] mt-1 line-clamp-2">
                    {guide.desc}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-[#111111] mt-3 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  Read Guide <ArrowRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ───── FAQ ACCORDION ───── */}
        <section className="space-y-4 border-t-2 border-[#111111]/10 pt-8">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-wider bg-[#FFC928] px-3 py-1 rounded-full border border-[#111111]">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] mt-2">
              Everything You Need to Know
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-2.5">
            {[
              {
                q: 'What games are available on WordChain?',
                a: 'WordChain is an online multiplayer arcade. We currently host WordChain (real-time last-letter word relay battle) and Color Clash (an RGB color perception matching game). Both support live online multiplayer, solo practice against bots, and local pass-and-play.',
              },
              {
                q: 'How do you play Color Clash?',
                a: 'In Color Clash, all players look at the same secret color swatch. You adjust Red, Green, and Blue sliders (0 to 255) to match the exact shade before time runs out. The player with the lowest Euclidean distance wins the round!',
              },
              {
                q: 'Do I or my friends need to create an account to play?',
                a: 'No! WordChain is completely frictionless. You can jump directly into public matchmaking or share a 6-letter room code with friends without any accounts, downloads, or sign-ups.',
              },
              {
                q: 'Can we play across different devices (Phones, Tablets, Laptops)?',
                a: 'Yes! All games are built on modern responsive web technologies. One friend can play on an iPhone, another on an Android tablet, and another on a PC laptop in the same room.',
              },
            ].map((faq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full doodle-card p-4 sm:p-5 bg-white text-left transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm sm:text-base font-black text-[#111111]">{faq.q}</h3>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-[#111111] transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </div>
                {openFaq === i && (
                  <p className="text-xs sm:text-sm font-medium text-[#555555] mt-2.5 leading-relaxed border-t border-neutral-100 pt-2.5">
                    {faq.a}
                  </p>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Monster Crowd Decorative Strip */}
        <div className="w-full pt-2">
          <DoodleCrowdBanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}
