import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TopoDoodlePattern } from '../../components/doodles/DoodleBackground';
import { AdContainer } from '../../components/ads/AdContainer';
import { AdUnit } from '../../components/ads/AdUnit';
import { BookOpen, Sparkles, ArrowRight, Zap, Target, Brain, Award, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Word Game Strategy Guides Hub — WordChain',
  description:
    'Master competitive word games with in-depth tactical guides. Learn offensive letter traps, vocabulary expansion techniques, blitz timer management, and color matching mathematics.',
  alternates: {
    canonical: 'https://wordchain.in/guides',
  },
  openGraph: {
    title: 'Word Game Strategy Guides Hub — WordChain',
    description: 'Master word games and RGB challenges with expert strategy guides.',
    url: 'https://wordchain.in/guides',
    type: 'website',
  },
};

const GUIDES_LIST = [
  {
    slug: 'word-chain-strategies-to-win',
    title: '10 Strategies to Win Word Chain Games',
    category: 'Advanced Tactics',
    description: 'Master offensive last-letter traps, psychological pacing, and rapid vocabulary recall under strict countdowns.',
    readTime: '6 min read',
    icon: <Target size={20} className="text-[#111111]" />,
  },
  {
    slug: 'what-is-word-chain-game',
    title: 'What Is a Word Chain Game? Complete History & Rules',
    category: 'Fundamentals',
    description: 'Explore the global origins of word chaining, from Shiritori to modern digital multiplayer tournaments.',
    readTime: '5 min read',
    icon: <BookOpen size={20} className="text-[#111111]" />,
  },
  {
    slug: 'hard-letters-word-chain-q-x-z-j',
    title: 'Words Ending in Q, X, Z & J: The Ultimate Trap Word List',
    category: 'Cheat Sheet',
    description: 'Memorize high-impact killer words that leave opponents scrambling against the turn countdown timer.',
    readTime: '8 min read',
    icon: <Zap size={20} className="text-[#111111]" />,
  },
  {
    slug: 'vocabulary-building-word-games',
    title: 'How to Improve Vocabulary Through Word Games',
    category: 'Education & ESL',
    description: 'How regular word chaining enhances lexical access speed, spelling retention, and linguistic fluency.',
    readTime: '7 min read',
    icon: <Brain size={20} className="text-[#111111]" />,
  },
  {
    slug: 'multiplayer-word-games-with-friends',
    title: 'Multiplayer Word Games: Complete Guide for Groups & Parties',
    category: 'Social Play',
    description: 'How to host engaging word game sessions, classroom tournaments, and remote team building games.',
    readTime: '6 min read',
    icon: <Users size={20} className="text-[#111111]" />,
  },
  {
    slug: 'rgb-color-match-game-guide',
    title: 'RGB Color Matching Game: Strategy & Hex Formula Guide',
    category: 'Color Clash',
    description: 'Understand 3D Euclidean color distance, primary additive mixing, and how to conquer Color Clash.',
    readTime: '7 min read',
    icon: <Award size={20} className="text-[#111111]" />,
  },
];

export default function GuidesHubPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#FAF7EE]">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex-1 space-y-10">
        <section className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#FFC928] text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            <Sparkles size={14} />
            <span>Master the Arena</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
            Word Game Strategy Guides Hub
          </h1>
          <p className="text-base sm:text-lg font-bold text-[#555555] max-w-2xl mx-auto leading-relaxed">
            Curated playbooks, tactics, and vocabulary lists designed to turn casual spellers into undisputed WordChain grandmasters.
          </p>
        </section>

        {/* Ad Placement Top */}
        <AdContainer minHeight="100px">
          <AdUnit slot="guides-hub-top" />
        </AdContainer>

        {/* Guides Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GUIDES_LIST.map((guide) => (
            <Link
              key={guide.slug}
              href={`/blog/${guide.slug}`}
              className="doodle-card p-5 sm:p-6 bg-white hover:bg-neutral-50 transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#FFC928] px-2.5 py-0.5 rounded-full border border-[#111111]">
                    {guide.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#888888]">{guide.readTime}</span>
                </div>

                <h2 className="text-base sm:text-lg font-black text-[#111111] leading-snug group-hover:text-[#FFC928] transition-colors">
                  {guide.title}
                </h2>

                <p className="text-xs font-medium text-[#666666] leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-black text-[#111111]">
                <span>Read Full Guide</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </section>

        {/* Ad Placement Bottom */}
        <AdContainer minHeight="100px">
          <AdUnit slot="guides-hub-bottom" />
        </AdContainer>

        {/* Interactive Practice Callout */}
        <section className="doodle-card-yellow p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-black text-[#111111]">Ready to Put These Tactics to the Test?</h3>
            <p className="text-xs sm:text-sm font-bold text-[#333333]">
              Jump into our solo bot practice arena to test your trap letters under realistic countdown timers.
            </p>
          </div>
          <Link href="/practice" className="doodle-btn py-3 px-5 text-xs sm:text-sm shrink-0 bg-white">
            Practice Solo &rarr;
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

