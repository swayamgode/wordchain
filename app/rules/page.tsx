import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TopoDoodlePattern } from '../../components/doodles/DoodleBackground';
import { AdContainer } from '../../components/ads/AdContainer';
import { AdUnit } from '../../components/ads/AdUnit';
import { BookOpen, ShieldAlert, Award, Sliders, CheckSquare, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Official WordChain Rules & Gameplay Guidelines',
  description:
    'Comprehensive rulebook for WordChain. Learn dictionary validity requirements, turn duration mechanics, life elimination systems, and custom room parameters.',
  alternates: {
    canonical: 'https://wordchain.in/rules',
  },
  openGraph: {
    title: 'WordChain Official Rules & Guidelines',
    description: 'The complete competitive rulebook and scoring mechanics for WordChain.',
    url: 'https://wordchain.in/rules',
    type: 'article',
  },
};

export default function RulesPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#FAF7EE]">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex-1 space-y-8">
        <section className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#FFC928] text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            <Sparkles size={14} />
            <span>Competitive Standard</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
            WordChain Rules Explained
          </h1>
          <p className="text-sm sm:text-base font-bold text-[#555555] max-w-xl mx-auto leading-relaxed">
            The definitive rulebook governing online multiplayer battles, solo trials, and custom tournament rooms.
          </p>
        </section>

        <article className="doodle-card p-6 sm:p-10 bg-white space-y-8 text-sm leading-relaxed text-[#333333]">
          {/* Rule 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#FFC928] border-2 border-[#111111] flex items-center justify-center text-xs font-black shadow-[1.5px_1.5px_0px_#111111]">
                1
              </span>
              The Chaining Rule
            </h2>
            <p>
              Each submission must strictly begin with the final character of the previous accepted word. Case is ignored (e.g., &ldquo;apple&rdquo; and &ldquo;Apple&rdquo; are evaluated identically).
            </p>
            <div className="bg-[#FAF7EE] border-2 border-[#111111] rounded-xl p-3 text-xs font-mono font-bold">
              Valid Example: MONARCH (ends in H) &rarr; HARBOR (ends in R) &rarr; RADAR.
            </div>
          </section>

          {/* Rule 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#FFC928] border-2 border-[#111111] flex items-center justify-center text-xs font-black shadow-[1.5px_1.5px_0px_#111111]">
                2
              </span>
              Dictionary Eligibility &amp; Word Verification
            </h2>
            <p>
              Submissions are checked against an official English lexicon containing over 100,000 standard dictionary terms. The following categories are disqualified:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm font-medium">
              <li>Proper nouns (e.g., &ldquo;London&rdquo;, &ldquo;Sarah&rdquo;).</li>
              <li>Punctuation-inclusive words, hyphens, and apostrophes (e.g., &ldquo;well-being&rdquo;).</li>
              <li>Acronyms and initialisms (e.g., &ldquo;NASA&rdquo;, &ldquo;HTML&rdquo;).</li>
              <li>Slang terms or misspellings not acknowledged in standard dictionaries.</li>
            </ul>
          </section>

          {/* Ad Placement */}
          <AdContainer minHeight="100px">
            <AdUnit slot="rules-page-mid" />
          </AdContainer>

          {/* Rule 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#FFC928] border-2 border-[#111111] flex items-center justify-center text-xs font-black shadow-[1.5px_1.5px_0px_#111111]">
                3
              </span>
              Uniqueness &amp; Duplication
            </h2>
            <p>
              A word may only be used <strong>once per match</strong>. If a word has previously been played by any participant in the active room, subsequent attempts to submit that word will be rejected with an immediate &ldquo;Word Already Used&rdquo; penalty.
            </p>
          </section>

          {/* Rule 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#FFC928] border-2 border-[#111111] flex items-center justify-center text-xs font-black shadow-[1.5px_1.5px_0px_#111111]">
                4
              </span>
              Turn Timers &amp; Life Elimination
            </h2>
            <p>
              WordChain uses an elimination format:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-medium">
              <li>
                <strong>Turn Duration:</strong> Ranges from 10 seconds (blitz) to 30 seconds (casual).
              </li>
              <li>
                <strong>Life Deduction:</strong> A player loses 1 life if their timer reaches zero, or if they submit three consecutive invalid entries.
              </li>
              <li>
                <strong>Elimination:</strong> When a player reaches 0 lives, they are eliminated from active play and enter spectator mode.
              </li>
              <li>
                <strong>Victory:</strong> The last active player with remaining lives wins the match.
              </li>
            </ul>
          </section>

          {/* Rule 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#FFC928] border-2 border-[#111111] flex items-center justify-center text-xs font-black shadow-[1.5px_1.5px_0px_#111111]">
                5
              </span>
              Custom Game Room Variations
            </h2>
            <p>
              Room hosts can customize parameters when creating private games:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
                <span className="text-xs font-black text-[#111111] block mb-0.5">Length Modifiers</span>
                <span className="text-xs text-[#666666]">Enforce minimum word lengths (e.g. 4+ or 5+ letters only).</span>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
                <span className="text-xs font-black text-[#111111] block mb-0.5">Sudden Death</span>
                <span className="text-xs text-[#666666]">1-life elimination mode for high-stakes speed matches.</span>
              </div>
            </div>
          </section>
        </article>

        {/* Action button */}
        <div className="flex justify-center gap-3">
          <Link href="/create" className="doodle-btn-yellow py-3 px-6 text-sm">
            Host a Match with Custom Rules &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

