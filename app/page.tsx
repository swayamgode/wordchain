'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Zap,
  Users,
  Bot,
  Play,
  ArrowRight,
  Sparkles,
  Trophy,
  Coffee,
  Brain,
  Sliders,
  Check,
  Search,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { MonsterAvatar, MONSTER_LIST } from '../components/doodles/MonsterAvatars';
import { TopoDoodlePattern, DoodleCrowdBanner } from '../components/doodles/DoodleBackground';
import { PRESETS } from '../lib/constants/presets';
import { soundManager } from '../lib/audio/sounds';
import { getLocalGuestProfile } from '../lib/supabase/client';

export default function LandingPage() {
  const router = useRouter();
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [profile, setProfile] = useState<{ displayName: string; avatarId: string } | null>(null);

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

      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 py-6 sm:py-10 flex-1 flex flex-col gap-10 sm:gap-14">
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Hero Card */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 bg-[#FFC928] text-xs font-black uppercase px-3.5 py-1.5 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111] w-fit">
              <Sparkles size={14} />
              Real-time Multiplayer Word Battler
            </div>

            <h1 className="text-3xl sm:text-6xl font-black text-[#111111] tracking-tight leading-[1.08]">
              Think fast. <br />
              <span className="bg-[#FFC928] px-3 py-0.5 rounded-2xl border-[2.5px] sm:border-[3px] border-[#111111] shadow-[3px_3px_0px_#111111] sm:shadow-[4px_4px_0px_#111111] inline-block mt-1">
                Chain words.
              </span>
            </h1>

            <p className="text-sm sm:text-lg font-bold text-[#555555] max-w-xl">
              Connect words by their final letters before the clock strikes zero.
              Challenge friends with custom lengths, rapid turn limits, and elimination rules.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/matchmaking"
                onClick={() => soundManager.playClick()}
                className="doodle-btn-yellow py-3.5 px-7 text-base group justify-center text-center"
              >
                <Zap size={20} className="fill-[#111111]" />
                <span>Play Quick Match</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/create"
                onClick={() => soundManager.playClick()}
                className="doodle-btn py-3.5 px-6 text-base group justify-center text-center"
              >
                <Users size={18} />
                <span>Create Match</span>
              </Link>
            </div>

            {/* Direct Join by Room Code */}
            <form onSubmit={handleJoinByCode} className="flex items-center gap-2 max-w-sm pt-2">
              <input
                type="text"
                maxLength={6}
                value={roomCodeInput}
                onChange={e => setRoomCodeInput(e.target.value.toUpperCase())}
                placeholder="ENTER 6-CHAR CODE"
                className="flex-1 bg-white border-2 border-[#111111] rounded-full px-4 py-2 font-mono text-sm font-black tracking-widest text-[#111111] shadow-[2px_2px_0px_#111111] focus:outline-none uppercase"
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
          </div>

          {/* Right Featured Hero Card (Inspired by reference mockup central yellow card) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm doodle-card-yellow p-6 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#111111] bg-white px-3 py-1 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
                  Featured Preset
                </span>
                <span className="text-xs font-black font-mono">10s TURNS</span>
              </div>

              {/* Monster Mascot Illustration */}
              <div className="my-auto text-center py-4 relative">
                <div className="w-32 h-32 mx-auto bg-white border-[3px] border-[#111111] rounded-3xl flex items-center justify-center shadow-[4px_4px_0px_#111111] overflow-hidden animate-doodle-bounce">
                  <MonsterAvatar id="monty" size={110} mood="happy" />
                </div>
                <h3 className="text-2xl font-black text-[#111111] mt-3">CLASSIC CHAIN</h3>
                <p className="text-xs font-bold text-[#333333] max-w-[220px] mx-auto mt-1">
                  Any length words, 3 lives, last letter chaining.
                </p>
              </div>

              <Link
                href="/create?preset=classic"
                onClick={() => soundManager.playClick()}
                className="w-full doodle-btn py-3 text-sm justify-between group"
              >
                <span>Launch Classic Room</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* GAME MODES GRID */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">Game Modes</h2>
              <p className="text-xs sm:text-sm font-bold text-[#666666]">Choose how you want to battle</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Quick Match */}
            <div className="doodle-card p-5 flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
              <div>
                <div className="w-12 h-12 bg-[#FFC928] border-2 border-[#111111] rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_#111111] mb-3">
                  <Zap size={24} className="fill-[#111111]" />
                </div>
                <h3 className="text-lg font-black text-[#111111]">Quick Play</h3>
                <p className="text-xs font-bold text-[#666666] mt-1">
                  Jump into genuine matchmaking against active online players with compatible settings.
                </p>
              </div>
              <Link
                href="/matchmaking"
                onClick={() => soundManager.playClick()}
                className="mt-4 doodle-btn py-2 text-xs justify-center"
              >
                Find Match →
              </Link>
            </div>

            {/* 2. Play with Friends */}
            <div className="doodle-card p-5 flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
              <div>
                <div className="w-12 h-12 bg-[#80ED99] border-2 border-[#111111] rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_#111111] mb-3">
                  <Users size={24} />
                </div>
                <h3 className="text-lg font-black text-[#111111]">Play with Friends</h3>
                <p className="text-xs font-bold text-[#666666] mt-1">
                  Create a custom room, share your 6-letter room code, and battle your squad.
                </p>
              </div>
              <Link
                href="/create"
                onClick={() => soundManager.playClick()}
                className="mt-4 doodle-btn py-2 text-xs justify-center"
              >
                Create Room →
              </Link>
            </div>

            {/* 3. Solo Practice vs Bot */}
            <div className="doodle-card p-5 flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
              <div>
                <div className="w-12 h-12 bg-[#00F5D4] border-2 border-[#111111] rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_#111111] mb-3">
                  <Bot size={24} />
                </div>
                <h3 className="text-lg font-black text-[#111111]">Practice Mode</h3>
                <p className="text-xs font-bold text-[#666666] mt-1">
                  Train against AI monsters (Casual, Standard, Challenging) offline anytime.
                </p>
              </div>
              <Link
                href="/practice"
                onClick={() => soundManager.playClick()}
                className="mt-4 doodle-btn py-2 text-xs justify-center"
              >
                Play Solo →
              </Link>
            </div>

            {/* 4. Local Multiplayer */}
            <div className="doodle-card p-5 flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
              <div>
                <div className="w-12 h-12 bg-[#FF5D8F] border-2 border-[#111111] rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_#111111] mb-3">
                  <Trophy size={24} />
                </div>
                <h3 className="text-lg font-black text-[#111111]">Pass & Play</h3>
                <p className="text-xs font-bold text-[#666666] mt-1">
                  Multiple players taking turns on 1 shared device with privacy intermission.
                </p>
              </div>
              <Link
                href="/local"
                onClick={() => soundManager.playClick()}
                className="mt-4 doodle-btn py-2 text-xs justify-center"
              >
                Local Match →
              </Link>
            </div>
          </div>
        </section>

        {/* HOW TO PLAY DEMO CHAIN */}
        <section className="doodle-card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-black uppercase text-[#888888]">Simple Rules. Deep Strategy.</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">How WordChain Works</h2>
            </div>
            <span className="text-xs font-bold bg-[#FFC928] px-3 py-1 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
              The Last-Letter Rule
            </span>
          </div>

          {/* Word Chain Visual Example */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-4">
            {[
              { word: 'CAT', nextLetter: 'T' },
              { word: 'TOP', nextLetter: 'P' },
              { word: 'PEN', nextLetter: 'N' },
              { word: 'NET', nextLetter: 'T' },
              { word: 'TAP', nextLetter: 'P' },
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="bg-white border-[3px] border-[#111111] rounded-2xl px-4 py-3 font-mono text-xl sm:text-2xl font-black shadow-[3px_3px_0px_#111111] flex items-center">
                  <span>{step.word.slice(0, -1)}</span>
                  <span className="bg-[#FFC928] px-1 rounded border border-[#111111] ml-0.5">
                    {step.word.slice(-1)}
                  </span>
                </div>
                {idx < 4 && (
                  <ArrowRight size={22} className="text-[#111111] stroke-[3]" />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-center text-xs sm:text-sm font-bold text-[#555555] max-w-xl mx-auto mt-4">
            Every submission must start with the final letter of the previous word.
            Reject non-dictionary words, duplicate submissions, and wrong lengths!
          </p>
        </section>

        {/* PRESET SHOWCASE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">One-Click Presets</h2>
              <p className="text-xs sm:text-sm font-bold text-[#666666]">Instant setups tested for balance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(PRESETS).map(([key, p]) => (
              <Link
                key={key}
                href={`/create?preset=${key}`}
                onClick={() => soundManager.playClick()}
                className="doodle-card p-5 flex flex-col justify-between hover:translate-y-[-2px] transition-transform group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-black text-[#111111]">{p.title}</span>
                    <span className="text-xs font-mono font-bold bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300 uppercase">
                      {key}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#666666]">{p.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-black">
                  <span>Configure</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO FAQ & WORD GAME EXPLANATION */}
        <section className="space-y-6 pt-4 border-t-2 border-[#111111]/10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-[#111111] bg-[#FFC928] px-3 py-1 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
              Word Game Guide
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#111111] mt-3">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#666666] mt-1">
              Everything you need to know about playing WordChain online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="doodle-card p-5 bg-white">
              <h3 className="text-base font-black text-[#111111] mb-1.5">What is a Word Chain game?</h3>
              <p className="text-xs sm:text-sm font-medium text-[#555555] leading-relaxed">
                Word Chain (also known as Shiritori, Word Relay, or Last Letter game) is a sequential vocabulary battle where each player submits a word beginning with the last letter of the previous word.
              </p>
            </div>

            <div className="doodle-card p-5 bg-white">
              <h3 className="text-base font-black text-[#111111] mb-1.5">How do you win at WordChain?</h3>
              <p className="text-xs sm:text-sm font-medium text-[#555555] leading-relaxed">
                Outlast your opponents! Force them into rare starting letters like X, Z, and Q using trap words (like MATRIX or TOPAZ), or wait for their timer to run out.
              </p>
            </div>

            <div className="doodle-card p-5 bg-white">
              <h3 className="text-base font-black text-[#111111] mb-1.5">Can I play WordChain with friends?</h3>
              <p className="text-xs sm:text-sm font-medium text-[#555555] leading-relaxed">
                Yes! Simply click <Link href="/create" className="font-bold underline text-[#111111]">Create Match</Link> to generate a 6-character room code. Send the link to friends to play real-time elimination battles.
              </p>
            </div>

            <div className="doodle-card p-5 bg-white">
              <h3 className="text-base font-black text-[#111111] mb-1.5">Is WordChain completely free?</h3>
              <p className="text-xs sm:text-sm font-medium text-[#555555] leading-relaxed">
                100% free with no downloads, accounts, or paywalls required. Play right inside your web browser on mobile, tablet, or desktop.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM MONSTER CROWD (From mockup) */}
        <div className="w-full pt-4">
          <DoodleCrowdBanner />
        </div>
      </main>

      {/* RICH SEO FOOTER */}
      <footer className="w-full border-t-2 border-[#111111] bg-white py-10 px-4 select-none">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-lg font-black text-[#111111]">WORD</span>
              <span className="text-lg font-black bg-[#FFC928] px-1.5 py-0.2 rounded border border-[#111111]">CHAIN</span>
            </div>
            <p className="text-xs font-bold text-[#666666] leading-relaxed">
              The #1 real-time multiplayer word chain game. Powered by official English dictionary validation.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#111111] mb-3">Game Modes</h4>
            <ul className="space-y-1.5 text-xs font-bold text-[#555555]">
              <li><Link href="/matchmaking" className="hover:text-[#111111]">Quick Play Matchmaking</Link></li>
              <li><Link href="/create" className="hover:text-[#111111]">Create Custom Room</Link></li>
              <li><Link href="/practice" className="hover:text-[#111111]">Solo vs AI Bot</Link></li>
              <li><Link href="/local" className="hover:text-[#111111]">Local Pass & Play</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#111111] mb-3">Strategy & Guides</h4>
            <ul className="space-y-1.5 text-xs font-bold text-[#555555]">
              <li><Link href="/blog/hard-letters-word-chain-q-x-z-j" className="hover:text-[#111111]">Hard Letters Trap List (Q, X, Z)</Link></li>
              <li><Link href="/blog/word-chain-strategies-to-win" className="hover:text-[#111111]">10 Strategies to Win</Link></li>
              <li><Link href="/blog/best-word-chain-words" className="hover:text-[#111111]">100+ Best Words Arsenal</Link></li>
              <li><Link href="/blog/word-chain-rules-variations" className="hover:text-[#111111]">Official Game Rules</Link></li>
              <li><Link href="/blog" className="hover:text-[#111111]">All Blog Articles →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#111111] mb-3">Word Game Culture</h4>
            <ul className="space-y-1.5 text-xs font-bold text-[#555555]">
              <li><Link href="/blog/shiritori-vs-word-chain" className="hover:text-[#111111]">Shiritori vs Word Chain</Link></li>
              <li><Link href="/blog/what-is-word-chain-game" className="hover:text-[#111111]">Beginner Word Chain Guide</Link></li>
              <li><Link href="/blog/vocabulary-building-word-games" className="hover:text-[#111111]">Cognitive Benefits</Link></li>
              <li><Link href="/blog/best-online-word-games-2025" className="hover:text-[#111111]">Top Word Games 2025</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-[#777777] gap-3">
          <p>© 2026 WordChain. Free online multiplayer word game.</p>
          <div className="flex gap-4">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/create" className="hover:underline">Play Now</Link>
            <Link href="/sitemap.xml" className="hover:underline">Sitemap</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
