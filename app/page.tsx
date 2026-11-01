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
  SlidersHorizontal,
  Flame,
  Swords,
  Play,
  Share2,
  Smartphone,
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

      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 flex-1 flex flex-col gap-12 sm:gap-16">

        {/* ───── 1. CLEAN MODERN ARCADE HERO ───── */}
        <section className="text-center flex flex-col items-center gap-4 sm:gap-6 pt-2 sm:pt-6">
          <div className="inline-flex items-center gap-2 bg-[#FFC928] text-[11px] sm:text-xs font-black uppercase px-4 py-1.5 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            <Sparkles size={14} className="text-[#111111] fill-[#111111]" />
            <span>Multiplayer Browser Game Arcade</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#111111] tracking-tight leading-[1.05] max-w-4xl">
            Free Online Games.{' '}
            <span className="bg-[#FFC928] px-3.5 py-0.5 rounded-2xl border-3 border-[#111111] shadow-[4px_4px_0px_#111111] inline-block">
              Play With Anyone.
            </span>
          </h1>

          <p className="text-sm sm:text-lg font-bold text-[#555555] max-w-xl mx-auto leading-relaxed">
            Fast-paced word battles, RGB color duels, and quick mental challenges. No downloads, no accounts, and 100% free forever.
          </p>

          {/* Quick Universal Room Code Join */}
          <div className="w-full max-w-md mt-2">
            <form onSubmit={handleJoinByCode} className="flex items-center gap-2 bg-white p-2 rounded-2xl border-3 border-[#111111] shadow-[4px_4px_0px_#111111]">
              <input
                type="text"
                maxLength={6}
                value={roomCodeInput}
                onChange={e => setRoomCodeInput(e.target.value.toUpperCase())}
                placeholder="ENTER 6-LETTER ROOM CODE"
                className="flex-1 min-w-0 bg-transparent px-3 py-1.5 font-mono text-xs sm:text-sm font-black tracking-widest text-[#111111] focus:outline-none uppercase placeholder:text-neutral-400 placeholder:tracking-normal placeholder:font-bold text-center"
              />
              <button
                type="submit"
                disabled={roomCodeInput.trim().length !== 6}
                className="doodle-btn py-2 px-5 text-xs sm:text-sm shrink-0 disabled:opacity-40 flex items-center gap-1.5"
              >
                <Search size={14} />
                <span>Join</span>
              </button>
            </form>
          </div>
        </section>

        {/* ───── 2. GAME CATALOGUE SHOWCASE (HERO CARDS) ───── */}
        <section className="space-y-6">
          <div className="text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-[#111111]/10 pb-3">
            <div>
              <span className="text-xs font-black uppercase tracking-wider bg-[#111111] text-[#FFC928] px-3 py-1 rounded-full border border-[#111111] inline-flex items-center gap-1.5">
                <Gamepad2 size={13} />
                <span>Arcade Directory</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight mt-1">
                Choose a Game to Play
              </h2>
            </div>
            <span className="text-xs font-bold text-[#666666]">
              2 Games Live &bull; More Coming Soon
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* CARD 1: WORDCHAIN */}
            <div className="doodle-card-yellow p-6 sm:p-8 border-3 border-[#111111] shadow-[5px_5px_0px_#111111] flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white border-2 border-[#111111] rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_#111111]">
                      <Type size={28} className="text-[#111111]" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">WordChain</h3>
                      <span className="text-xs font-black uppercase tracking-wider text-[#333333]">Word Relay Battler</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase bg-white border border-[#111111] px-2.5 py-1 rounded-full shadow-[1px_1px_0px_#111111]">
                    🔥 Active
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-[#333333] leading-relaxed">
                  Chain words by their final letter before the turn timer hits zero! Trap your opponents on rare letters like <strong>X, Z, and Q</strong>.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[11px] font-black bg-white/80 border border-[#111111]/30 px-2.5 py-1 rounded-lg">
                    👥 2–8 Players
                  </span>
                  <span className="text-[11px] font-black bg-white/80 border border-[#111111]/30 px-2.5 py-1 rounded-lg">
                    ⏱️ 10s–30s Clocks
                  </span>
                  <span className="text-[11px] font-black bg-white/80 border border-[#111111]/30 px-2.5 py-1 rounded-lg">
                    ❤️ 3 Lives Elimination
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t-2 border-[#111111]/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <Link
                  href="/matchmaking"
                  onClick={() => soundManager.playClick()}
                  className="flex-1 py-3 bg-[#111111] text-[#FFC928] border-2 border-[#111111] rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider text-center shadow-[3px_3px_0px_#FFC928] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Zap size={16} className="fill-[#FFC928]" />
                  <span>Quick Match Online</span>
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
                    className="py-3 px-3.5 bg-white border-2 border-[#111111] rounded-xl font-black text-xs uppercase text-center shadow-[2px_2px_0px_#111111] hover:bg-neutral-50 transition-colors flex items-center justify-center"
                    title="Solo AI Practice"
                  >
                    <Bot size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* CARD 2: COLOR CLASH */}
            <div className="doodle-card p-6 sm:p-8 bg-white border-3 border-[#111111] shadow-[5px_5px_0px_#111111] flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-400 via-green-400 to-blue-400 border-2 border-[#111111] rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_#111111]">
                      <Palette size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">Color Clash</h3>
                      <span className="text-xs font-black uppercase tracking-wider text-[#666666]">RGB Color Matcher</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase bg-[#FFC928] border border-[#111111] px-2.5 py-1 rounded-full shadow-[1px_1px_0px_#111111]">
                    ✨ New Game
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-medium text-[#444444] leading-relaxed">
                  All players view the exact same mystery color. Slide <strong>Red, Green, and Blue (0–255)</strong> to match it. Closest Euclidean distance wins the round!
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[11px] font-black bg-neutral-100 border border-[#111111]/20 px-2.5 py-1 rounded-lg">
                    🎨 RGB Sliders
                  </span>
                  <span className="text-[11px] font-black bg-neutral-100 border border-[#111111]/20 px-2.5 py-1 rounded-lg">
                    🏆 5 Rounds Tourney
                  </span>
                  <span className="text-[11px] font-black bg-neutral-100 border border-[#111111]/20 px-2.5 py-1 rounded-lg">
                    📱 Pass &amp; Play + Online
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
                  <Palette size={16} />
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
                    title="Color Clash Solo AI Practice"
                  >
                    <Bot size={16} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ───── 3. ARCADE PLAY MODES (HOW TO PLAY TOGETHER) ───── */}
        <section className="space-y-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
              Three Ways to Play Every Game
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#666666]">
              Choose the format that fits your mood or group size.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="doodle-card p-5 bg-white space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFC928] border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                <Zap size={20} className="text-[#111111]" />
              </div>
              <h3 className="text-base font-black text-[#111111]">1. Instant Matchmaking</h3>
              <p className="text-xs font-medium text-[#555555] leading-relaxed">
                Jump into real-time global queues. Sub-second pairing with players worldwide.
              </p>
              <div className="pt-1 flex gap-3 text-xs font-black">
                <Link href="/matchmaking" className="underline hover:text-[#FFC928]">WordChain 1v1 &rarr;</Link>
              </div>
            </div>

            <div className="doodle-card p-5 bg-white space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#80ED99] border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                <Users size={20} className="text-[#111111]" />
              </div>
              <h3 className="text-base font-black text-[#111111]">2. Private Squad Rooms</h3>
              <p className="text-xs font-medium text-[#555555] leading-relaxed">
                Host games with friends. Share a simple 6-letter room code on Discord or WhatsApp.
              </p>
              <div className="pt-1 flex gap-3 text-xs font-black">
                <Link href="/create" className="underline hover:text-[#FFC928]">Word Room</Link>
                <span>&bull;</span>
                <Link href="/color-clash/create" className="underline hover:text-[#FFC928]">Color Room &rarr;</Link>
              </div>
            </div>

            <div className="doodle-card p-5 bg-white space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FF5D8F] border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                <Smartphone size={20} className="text-white" />
              </div>
              <h3 className="text-base font-black text-[#111111]">3. Pass &amp; Play Local</h3>
              <p className="text-xs font-medium text-[#555555] leading-relaxed">
                Pass a single phone or tablet back-and-forth on the couch, road trip, or classroom.
              </p>
              <div className="pt-1 flex gap-3 text-xs font-black">
                <Link href="/local" className="underline hover:text-[#FFC928]">Word Local</Link>
                <span>&bull;</span>
                <Link href="/color-clash/local" className="underline hover:text-[#FFC928]">Color Local &rarr;</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ───── 4. STRATEGY GUIDES & SEO ARTICLES ───── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#111111]">Strategy &amp; Guides</h2>
              <p className="text-xs font-bold text-[#666666]">Cheat sheets, letter traps &amp; game tactics</p>
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

        {/* ───── 5. FAQ ACCORDION ───── */}
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
                q: 'What games can I play on WordChain?',
                a: 'WordChain is an online multiplayer game arcade. We currently feature WordChain (the real-time word relay game where you link words by their final letters) and Color Clash (the RGB color matching challenge). Both games offer live matchmaking, private friend lobbies, and offline modes.',
              },
              {
                q: 'How does Color Clash work?',
                a: 'All players see the exact same mystery color swatch. You adjust Red, Green, and Blue sliders (0 to 255) to reproduce the color before the timer runs out. When time expires, all submissions are revealed and the closest match wins!',
              },
              {
                q: 'Do I or my friends need to create an account?',
                a: 'No! WordChain requires zero downloads, accounts, or sign-ups. You can start playing immediately in any browser on phone, tablet, or PC.',
              },
              {
                q: 'Can we play across different devices?',
                a: 'Yes! WordChain is 100% cross-platform. One player can be on an iPhone, another on an Android device, and another on a laptop in the exact same game room.',
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
