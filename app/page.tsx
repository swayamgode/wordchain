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
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      <TopoDoodlePattern opacity={0.07} />
      <Navbar />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12 flex-1 flex flex-col gap-10 sm:gap-16">

        {/* ───── HERO ───── */}
        <section className="text-center flex flex-col items-center gap-5 sm:gap-6">
          <div className="inline-flex items-center gap-2 bg-[#FFC928] text-[11px] sm:text-xs font-black uppercase px-3.5 py-1.5 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            <Sparkles size={13} className="shrink-0" />
            <span>Free Multiplayer Game Arcade</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#111111] tracking-tight leading-[1.05]">
            Play Games,{' '}
            <span className="bg-[#FFC928] px-3 py-0.5 rounded-2xl border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] inline-block">
              Beat Friends.
            </span>
          </h1>

          <p className="text-sm sm:text-lg font-bold text-[#555555] max-w-xl leading-relaxed">
            Word battles, color duels &amp; more — real-time multiplayer games you can play instantly in your browser. No downloads, no accounts.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-md">
            <Link
              href="/matchmaking"
              onClick={() => soundManager.playClick()}
              className="doodle-btn-yellow py-3.5 px-7 text-sm sm:text-base group justify-center text-center flex-1"
            >
              <Zap size={18} className="fill-[#111111] shrink-0" />
              <span>Quick Play</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/create"
              onClick={() => soundManager.playClick()}
              className="doodle-btn py-3.5 px-6 text-sm sm:text-base group justify-center text-center flex-1"
            >
              <Users size={18} className="shrink-0" />
              <span>Create Room</span>
            </Link>
          </div>

          {/* Room Code Join */}
          <form onSubmit={handleJoinByCode} className="flex items-center gap-2 w-full max-w-xs">
            <input
              type="text"
              maxLength={6}
              value={roomCodeInput}
              onChange={e => setRoomCodeInput(e.target.value.toUpperCase())}
              placeholder="ROOM CODE"
              className="flex-1 min-w-0 bg-white border-2 border-[#111111] rounded-full px-4 py-2 font-mono text-xs font-black tracking-widest text-[#111111] shadow-[2px_2px_0px_#111111] focus:outline-none uppercase text-center"
            />
            <button
              type="submit"
              disabled={roomCodeInput.trim().length !== 6}
              className="doodle-btn py-2 px-4 text-xs shrink-0 disabled:opacity-40"
            >
              <Search size={14} />
              <span>Join</span>
            </button>
          </form>

          {/* Bouncing mascot */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-white border-[3px] border-[#111111] rounded-3xl flex items-center justify-center shadow-[4px_4px_0px_#111111] overflow-hidden animate-doodle-bounce">
            <MonsterAvatar id="monty" size={64} mood="happy" />
          </div>
        </section>

        {/* ───── FEATURED GAMES ───── */}
        <section className="space-y-5">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-wider bg-[#FFC928] px-3 py-1 rounded-full border border-[#111111]">
              Game Arcade
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight mt-2">
              Pick Your Battle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* WordChain Card */}
            <div className="doodle-card-yellow p-5 sm:p-7 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] relative overflow-hidden">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-[#111111] rounded-xl flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                    <Type size={22} className="text-[#111111]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#111111] leading-tight">WordChain</h3>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#555]">Word Relay Battle</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#333] leading-relaxed">
                  Chain words by their last letter before time runs out. Trap opponents with killer letters like X, Z, Q!
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {[
                    { icon: <Users size={11} />, label: '2-8 Players' },
                    { icon: <Timer size={11} />, label: '10-30s Turns' },
                    { icon: <Trophy size={11} />, label: 'Elimination' },
                  ].map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[10px] font-black bg-white/70 border border-[#111]/20 px-2 py-0.5 rounded-full">
                      {tag.icon} {tag.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Link
                  href="/matchmaking"
                  onClick={() => soundManager.playClick()}
                  className="flex-1 py-2.5 sm:py-3 bg-[#111111] text-white border-2 border-[#111111] rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider text-center shadow-[2px_2px_0px_#FFC928] hover:bg-neutral-800 transition-colors"
                >
                  Play Now →
                </Link>
                <Link
                  href="/practice"
                  onClick={() => soundManager.playClick()}
                  className="py-2.5 sm:py-3 px-4 bg-white border-2 border-[#111111] rounded-xl font-black text-xs uppercase text-center shadow-[2px_2px_0px_#111111] hover:bg-neutral-50 transition-colors"
                >
                  <Bot size={14} />
                </Link>
              </div>
            </div>

            {/* Color Clash Card */}
            <div className="doodle-card p-5 sm:p-7 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] relative overflow-hidden bg-gradient-to-br from-white via-white to-red-50/40">
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-black uppercase bg-[#FFC928] border-2 border-[#111111] px-2.5 py-1 rounded-full shadow-[1px_1px_0px_#111]">
                  NEW
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-400 via-green-400 to-blue-400 border-2 border-[#111111] rounded-xl flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                    <Palette size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#111111] leading-tight">Color Clash</h3>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#555]">RGB Matching Duel</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#555] leading-relaxed">
                  All players see a secret target color. Slide R, G, B to match it — closest match wins the round!
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {[
                    { icon: <Palette size={11} />, label: 'RGB Sliders' },
                    { icon: <Gamepad2 size={11} />, label: 'Solo / Local / Online' },
                    { icon: <Trophy size={11} />, label: '5 Rounds' },
                  ].map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[10px] font-black bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-full">
                      {tag.icon} {tag.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Link
                  href="/color-clash"
                  onClick={() => soundManager.playClick()}
                  className="flex-1 py-2.5 sm:py-3 bg-[#FFC928] text-[#111111] border-2 border-[#111111] rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider text-center shadow-[2px_2px_0px_#111111] hover:bg-[#ffcf3e] transition-colors"
                >
                  Play Color Clash →
                </Link>
                <Link
                  href="/color-clash/practice"
                  onClick={() => soundManager.playClick()}
                  className="py-2.5 sm:py-3 px-4 bg-white border-2 border-[#111111] rounded-xl font-black text-xs uppercase text-center shadow-[2px_2px_0px_#111111] hover:bg-neutral-50 transition-colors"
                >
                  <Bot size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ───── HOW WORDCHAIN WORKS ───── */}
        <section className="doodle-card p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase text-[#888]">Simple Rules. Deep Strategy.</span>
              <h2 className="text-xl sm:text-3xl font-black text-[#111111]">How WordChain Works</h2>
            </div>
            <span className="text-[10px] sm:text-xs font-bold bg-[#FFC928] px-3 py-1 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111] w-fit">
              The Last-Letter Rule
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2">
            {[
              { word: 'CAT', last: 'T' },
              { word: 'TOP', last: 'P' },
              { word: 'PEN', last: 'N' },
              { word: 'NET', last: 'T' },
              { word: 'TAP', last: 'P' },
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="bg-white border-2 sm:border-[3px] border-[#111111] rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2.5 font-mono text-base sm:text-xl font-black shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] flex items-center">
                  <span>{step.word.slice(0, -1)}</span>
                  <span className="bg-[#FFC928] px-1 rounded border border-[#111111] ml-0.5">
                    {step.last}
                  </span>
                </div>
                {idx < 4 && (
                  <ArrowRight size={14} className="text-[#111111] stroke-[3] sm:w-[18px] sm:h-[18px] shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-center text-xs sm:text-sm font-bold text-[#555] max-w-lg mx-auto mt-3">
            Every word must start with the final letter of the previous word. Use trap letters (X, Z, Q) to eliminate opponents!
          </p>
        </section>

        {/* ───── GUIDES ───── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-[#111111]">Strategy Guides</h2>
            <Link
              href="/blog"
              className="text-xs font-black uppercase text-[#111] bg-white border-2 border-[#111] px-3 py-1.5 rounded-full shadow-[2px_2px_0px_#111] hover:translate-y-[-1px] transition-transform"
            >
              All Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { href: '/blog/word-chain-game-online-free', tag: 'Play Guide', title: 'Word Chain Game Online — Play Free' },
              { href: '/blog/word-chain-words-a-to-z-dictionary', tag: 'Cheat Sheet', title: 'A to Z Word Chain Dictionary' },
              { href: '/blog/hard-letters-word-chain-q-x-z-j', tag: 'Tactics', title: 'Words Ending in Q, X, Z & J' },
              { href: '/blog/rgb-color-match-game-guide', tag: 'Color Clash', title: 'RGB Color Match Game Guide' },
            ].map((guide, i) => (
              <Link
                key={i}
                href={guide.href}
                className="doodle-card p-4 bg-white hover:bg-neutral-50 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-[#FFC928] px-2 py-0.5 rounded border border-[#111]">
                    {guide.tag}
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-[#111] mt-2 leading-snug">
                    {guide.title}
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-[#111] mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read <ArrowRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="space-y-4 border-t-2 border-[#111]/10 pt-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#111111] text-center">FAQ</h2>

          <div className="max-w-2xl mx-auto space-y-2">
            {[
              {
                q: 'What is a Word Chain game?',
                a: 'Word Chain (also known as Shiritori or Word Relay) is a vocabulary battle where each player submits a word beginning with the last letter of the previous word.',
              },
              {
                q: 'How do you win at WordChain?',
                a: 'Outlast your opponents! Force them into rare starting letters like X, Z, and Q using trap words, or wait for their timer to run out.',
              },
              {
                q: 'What is Color Clash?',
                a: 'Color Clash is an RGB color matching game. All players see a secret target color and adjust Red, Green, Blue sliders to match it. The closest match (by Euclidean distance) wins!',
              },
              {
                q: 'Is everything free?',
                a: '100% free with no downloads, accounts, or paywalls. Play right inside your browser on mobile, tablet, or desktop.',
              },
            ].map((faq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full doodle-card p-4 bg-white text-left"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm sm:text-base font-black text-[#111]">{faq.q}</h3>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-[#111] transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </div>
                {openFaq === i && (
                  <p className="text-xs sm:text-sm font-medium text-[#555] mt-2 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Monster crowd */}
        <div className="w-full">
          <DoodleCrowdBanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}
