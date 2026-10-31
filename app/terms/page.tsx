import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TopoDoodlePattern } from '../../components/doodles/DoodleBackground';
import { Scale, ShieldAlert, Award, FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions — WordChain',
  description:
    'Terms of service and fair play guidelines for WordChain (wordchain.in). Rules regarding multiplayer conduct, dictionary use, intellectual property, and service availability.',
  alternates: {
    canonical: 'https://wordchain.in/terms',
  },
  openGraph: {
    title: 'Terms of Service — WordChain',
    description: 'Read the terms, conditions, and fair play standards for WordChain.',
    url: 'https://wordchain.in/terms',
    type: 'website',
  },
};

export default function TermsPage() {
  const lastUpdated = 'October 31, 2026';

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#FAF7EE]">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex-1 space-y-8">
        <section className="space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#FFC928] text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            <Scale size={14} />
            <span>Usage Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm font-bold text-[#666666]">
            Last Updated: {lastUpdated}
          </p>
        </section>

        <article className="doodle-card p-6 sm:p-10 bg-white space-y-6 text-sm leading-relaxed text-[#333333]">
          <section className="space-y-2">
            <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
              <FileCheck size={20} /> 1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or playing on <strong>WordChain</strong> (<a href="https://wordchain.in" className="underline font-bold text-[#111111]">wordchain.in</a>), you acknowledge and agree to abide by these Terms of Service, all applicable laws and regulations, and our Privacy Policy. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
              <Award size={20} /> 2. Fair Play &amp; Community Standards
            </h2>
            <p>
              WordChain is built as a friendly, competitive environment for word enthusiasts, students, and families. To preserve the integrity of our matches, you agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-medium">
              <li>Deploy automated scripts, bots, web-scrapers, or programmatic word solvers in public matchmaking games.</li>
              <li>Attempt to disrupt, overload, or flood WebSocket game servers or room lobbies.</li>
              <li>Choose offensive, defamatory, harassing, or hateful player nicknames or avatar identifiers.</li>
              <li>Exploit software glitches or bypass game countdown timers unfairly.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-black text-[#111111]">3. Intellectual Property Rights</h2>
            <p>
              All proprietary code, branding, monster illustrations, visual assets, game designs, sound effects, and curated blog articles are the exclusive property of WordChain. You may not copy, reverse engineer, reproduce, or republish our assets without prior written consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
              <ShieldAlert size={20} /> 4. Disclaimer of Warranties
            </h2>
            <p>
              The materials and games on WordChain are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. WordChain makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-black text-[#111111]">5. Limitation of Liability</h2>
            <p>
              In no event shall WordChain, its creators, or its hosting partners be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials or multiplayer rooms on the website.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-black text-[#111111]">6. Governing Law &amp; Inquiries</h2>
            <p>
              Any claims relating to WordChain shall be governed by the laws of India, without regard to its conflict of law provisions. If you have any inquiries regarding these terms, please contact:
            </p>
            <p className="font-bold">
              WordChain Legal &bull; <a href="mailto:contact@wordchain.in" className="underline">contact@wordchain.in</a>
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

