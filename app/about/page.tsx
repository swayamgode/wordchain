import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TopoDoodlePattern } from '../../components/doodles/DoodleBackground';
import { MonsterAvatar } from '../../components/doodles/MonsterAvatars';
import { AdContainer } from '../../components/ads/AdContainer';
import { AdUnit } from '../../components/ads/AdUnit';
import { Heart, Globe2, ShieldCheck, Zap, Sparkles, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About WordChain — Free Multiplayer Word Games & Mission',
  description:
    'Learn about WordChain, our mission to build fast, accessible, free multiplayer web games, our dictionary validation engine, and the philosophy behind our doodle monster universe.',
  alternates: {
    canonical: 'https://wordchain.in/about',
  },
  openGraph: {
    title: 'About WordChain — Free Multiplayer Word Games',
    description: 'Learn about WordChain, our mission, dictionary verification, and free multiplayer game design.',
    url: 'https://wordchain.in/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#FAF7EE]">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex-1 space-y-10">
        {/* Header */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFC928] text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            <Sparkles size={14} />
            <span>Our Mission &amp; Story</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
            About WordChain
          </h1>
          <p className="text-base sm:text-lg font-bold text-[#555555] max-w-2xl mx-auto leading-relaxed">
            We built WordChain to bring the timeless joy of fast-paced, real-time word relay battles directly to any web browser — completely free, frictionless, and with no barriers.
          </p>
        </section>

        {/* Mascot Banner */}
        <div className="doodle-card-yellow p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white border-3 border-[#111111] rounded-2xl flex items-center justify-center shrink-0 shadow-[4px_4px_0px_#111111] animate-doodle-bounce">
            <MonsterAvatar id="monty" size={70} mood="happy" />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-[#111111]">Simple Rules. Infinite Fun.</h2>
            <p className="text-xs sm:text-sm font-bold text-[#333333] leading-relaxed">
              From classrooms practicing spelling to friends dueling across continents, WordChain is engineered for high-energy vocabulary showdowns. There are no app store downloads, pay-to-win gimmicks, or intrusive interruptions during live games.
            </p>
          </div>
        </div>

        {/* Content Section 1 */}
        <section className="doodle-card p-6 sm:p-8 space-y-4 bg-white">
          <h2 className="text-2xl font-black text-[#111111] flex items-center gap-2">
            <Globe2 className="text-[#111111]" size={22} />
            The Origin of Word Relay
          </h2>
          <p className="text-sm font-medium text-[#444444] leading-relaxed">
            Word chaining has entertained humans for generations under various names: the Japanese tradition of <em>Shiritori</em>, classical French <em>Marabout</em>, and the popular schoolyard last-letter game. In each version, every word submitted must begin with the final sound or letter of the previous word.
          </p>
          <p className="text-sm font-medium text-[#444444] leading-relaxed">
            While traditional verbal games often suffer from disagreements over whether a word exists or who took too long, WordChain solves this through an instant automated English dictionary check, deterministic millisecond timers, and dynamic live rooms.
          </p>
        </section>

        {/* Ad Placement: After Origin */}
        <AdContainer minHeight="100px">
          <AdUnit slot="about-content-mid" />
        </AdContainer>

        {/* Core Principles Grid */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-[#111111] text-center">Our Core Commitments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="doodle-card p-5 bg-white space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#80ED99] border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                <Zap size={20} className="text-[#111111]" />
              </div>
              <h3 className="text-base font-black text-[#111111]">100% Free Forever</h3>
              <p className="text-xs font-medium text-[#555555] leading-relaxed">
                Active multiplayer battles are always free. We believe educational and casual entertainment should remain accessible to everyone worldwide.
              </p>
            </div>

            <div className="doodle-card p-5 bg-white space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#00F5D4] border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                <ShieldCheck size={20} className="text-[#111111]" />
              </div>
              <h3 className="text-base font-black text-[#111111]">Clean Ad-Free Gameplay</h3>
              <p className="text-xs font-medium text-[#555555] leading-relaxed">
                We never place advertisements inside active gameplay rooms, near game controls, or during turn countdowns. Gameplay remains clean, focused, and fair.
              </p>
            </div>

            <div className="doodle-card p-5 bg-white space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FF5D8F] border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                <Heart size={20} className="text-[#111111]" />
              </div>
              <h3 className="text-base font-black text-[#111111]">Educational Value</h3>
              <p className="text-xs font-medium text-[#555555] leading-relaxed">
                Our guides and game mechanics encourage lateral thinking, lexical recall, phonemic awareness, and vocabulary expansion for language learners of all ages.
              </p>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="doodle-card p-6 sm:p-8 space-y-3 bg-white">
          <h2 className="text-2xl font-black text-[#111111] flex items-center gap-2">
            <BookOpen size={22} />
            Dictionary &amp; Technology
          </h2>
          <p className="text-sm font-medium text-[#444444] leading-relaxed">
            WordChain is powered by modern web technologies: Next.js, real-time WebSocket communication, and an optimized trie-based dictionary validator comprising tens of thousands of validated English words. Every submission is analyzed in sub-millisecond time to ensure fast, cheat-resistant matches.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link href="/how-to-play" className="doodle-btn py-2 px-4 text-xs">
              Learn How to Play →
            </Link>
            <Link href="/contact" className="doodle-btn-yellow py-2 px-4 text-xs">
              Contact Team
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

