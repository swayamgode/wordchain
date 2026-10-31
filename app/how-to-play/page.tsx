import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TopoDoodlePattern } from '../../components/doodles/DoodleBackground';
import { AdContainer } from '../../components/ads/AdContainer';
import { AdUnit } from '../../components/ads/AdUnit';
import { ArrowRight, Sparkles, CheckCircle2, AlertTriangle, Lightbulb, Zap, Users, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Play WordChain — Step-by-Step Guide & Last-Letter Rules',
  description:
    'Complete beginner to advanced guide on how to play WordChain online. Master the last-letter rule, understand countdown timers, avoid duplicate traps, and discover winning strategies.',
  alternates: {
    canonical: 'https://wordchain.in/how-to-play',
  },
  openGraph: {
    title: 'How to Play WordChain — Step-by-Step Guide',
    description: 'Master the last-letter rule and win real-time multiplayer word chain battles.',
    url: 'https://wordchain.in/how-to-play',
    type: 'article',
  },
};

export default function HowToPlayPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#FAF7EE]">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex-1 space-y-10">
        {/* Header */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFC928] text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            <Sparkles size={14} />
            <span>Official Guide</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
            How to Play WordChain
          </h1>
          <p className="text-base sm:text-lg font-bold text-[#555555] max-w-2xl mx-auto leading-relaxed">
            WordChain is a fast-paced multiplayer vocabulary game where every second counts. Connect words by their last letter, outsmart your rivals, and survive elimination.
          </p>
        </section>

        {/* Step-by-Step 3 Step Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="doodle-card p-6 bg-white space-y-3">
            <span className="text-3xl font-black text-[#FFC928] drop-shadow-[2px_2px_0px_#111111]">
              01
            </span>
            <h2 className="text-lg font-black text-[#111111]">Catch the Final Letter</h2>
            <p className="text-xs sm:text-sm font-medium text-[#555555] leading-relaxed">
              When it is your turn, look closely at the previous word on screen. Your new word <strong>must begin with the exact letter</strong> that the previous word ended with.
            </p>
          </div>

          <div className="doodle-card p-6 bg-white space-y-3">
            <span className="text-3xl font-black text-[#FFC928] drop-shadow-[2px_2px_0px_#111111]">
              02
            </span>
            <h2 className="text-lg font-black text-[#111111]">Beat the Countdown</h2>
            <p className="text-xs sm:text-sm font-medium text-[#555555] leading-relaxed">
              Each turn gives you a strict timer (typically 10 to 30 seconds). Type a valid English dictionary word and press <strong>Enter</strong> before the buzzer sounds.
            </p>
          </div>

          <div className="doodle-card p-6 bg-white space-y-3">
            <span className="text-3xl font-black text-[#FFC928] drop-shadow-[2px_2px_0px_#111111]">
              03
            </span>
            <h2 className="text-lg font-black text-[#111111]">Survive &amp; Eliminate</h2>
            <p className="text-xs sm:text-sm font-medium text-[#555555] leading-relaxed">
              Submitting an invalid word, a duplicate word, or letting the timer expire costs you 1 life. The last player standing wins the championship crown!
            </p>
          </div>
        </section>

        {/* Visual Example Demo Card */}
        <section className="doodle-card-yellow p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-[#111111]">Visual Chaining Example</h2>
            <span className="text-xs font-black bg-white px-2.5 py-1 rounded-full border border-[#111111]">
              Live Relay
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4 bg-white/70 rounded-2xl border-2 border-[#111111] p-4">
            {[
              { word: 'TIGE', last: 'R', player: 'P1' },
              { word: 'RABBI', last: 'T', player: 'P2' },
              { word: 'TURTL', last: 'E', player: 'P3' },
              { word: 'ELEPHAN', last: 'T', player: 'P1' },
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase text-[#666] mb-1">{step.player}</span>
                  <div className="bg-white border-2 border-[#111111] rounded-xl px-3 py-1.5 font-mono text-base font-black shadow-[2px_2px_0px_#111111] flex items-center">
                    <span>{step.word}</span>
                    <span className="bg-[#FFC928] px-1 rounded border border-[#111111] ml-0.5">{step.last}</span>
                  </div>
                </div>
                {idx < 3 && <ArrowRight size={18} className="text-[#111111] stroke-[3]" />}
              </React.Fragment>
            ))}
          </div>

          <p className="text-xs sm:text-sm font-bold text-[#333333] text-center">
            P1 plays <strong>TIGER</strong> &rarr; Ends in <strong>R</strong> &rarr; P2 must start with <strong>R</strong> (plays <strong>RABBIT</strong>) &rarr; Ends in <strong>T</strong> &rarr; P3 plays <strong>TURTLE</strong>.
          </p>
        </section>

        {/* Ad Placement */}
        <AdContainer minHeight="100px">
          <AdUnit slot="how-to-play-mid" />
        </AdContainer>

        {/* Essential Rules to Remember */}
        <article className="doodle-card p-6 sm:p-8 bg-white space-y-5">
          <h2 className="text-2xl font-black text-[#111111]">Important Validation Rules</h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-sm font-black text-[#111111]">Must Be a Real Dictionary Word</h3>
                <p className="text-xs sm:text-sm font-medium text-[#555555]">
                  Proper nouns (names of people, specific cities), hyphenated words, abbreviations, and gibberish are instantly rejected by the engine.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-sm font-black text-[#111111]">No Duplicate Words in the Same Match</h3>
                <p className="text-xs sm:text-sm font-medium text-[#555555]">
                  Once a word has been accepted in a room, it is locked. Nobody can play that exact word again for the remainder of that match.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Lightbulb className="text-purple-600 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-sm font-black text-[#111111]">Strategic Trap Endings</h3>
                <p className="text-xs sm:text-sm font-medium text-[#555555]">
                  Ending your word in uncommon English starting letters like <strong>X, Z, J, or Q</strong> forces the next opponent to scramble under pressure!
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Call to action */}
        <section className="text-center space-y-4 pt-4">
          <h2 className="text-2xl font-black text-[#111111]">Ready to Test Your Lexicon?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/matchmaking" className="doodle-btn-yellow py-3 px-6 text-sm">
              <Zap size={16} /> Quick Match Online
            </Link>
            <Link href="/practice" className="doodle-btn py-3 px-6 text-sm">
              <Trophy size={16} /> Practice Against AI Bot
            </Link>
            <Link href="/rules" className="doodle-btn py-3 px-6 text-xs bg-white">
              View Complete Rules &rarr;
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
