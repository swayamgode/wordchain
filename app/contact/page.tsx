import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TopoDoodlePattern } from '../../components/doodles/DoodleBackground';
import { Mail, MessageSquare, Bug, HelpCircle, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact WordChain Support & Feedback',
  description:
    'Get in touch with the WordChain team. Inquire about educational partnerships, report bugs, suggest word dictionary additions, or submit game feedback.',
  alternates: {
    canonical: 'https://wordchain.in/contact',
  },
  openGraph: {
    title: 'Contact WordChain Support',
    description: 'Get in touch with the WordChain team for support, feature requests, or partnerships.',
    url: 'https://wordchain.in/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#FAF7EE]">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex-1 space-y-8">
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFC928] text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            <Sparkles size={14} />
            <span>Community &amp; Support</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
            Contact WordChain
          </h1>
          <p className="text-base sm:text-lg font-bold text-[#555555] max-w-xl mx-auto leading-relaxed">
            Have a question, feedback, or found a missing word in our dictionary? We would love to hear from you.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* General Inquiries */}
          <div className="doodle-card p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC928] border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111]">
              <Mail size={20} className="text-[#111111]" />
            </div>
            <h2 className="text-lg font-black text-[#111111]">General Inquiries</h2>
            <p className="text-xs sm:text-sm font-medium text-[#555555] leading-relaxed">
              For general questions, collaborations, school &amp; ESL classroom use, or press inquiries, reach out directly via email:
            </p>
            <div className="pt-2">
              <a
                href="mailto:contact@wordchain.in"
                className="inline-block text-sm font-black text-[#111111] bg-neutral-100 hover:bg-neutral-200 border-2 border-[#111111] px-4 py-2 rounded-xl shadow-[2px_2px_0px_#111111] transition-all"
              >
                contact@wordchain.in
              </a>
            </div>
          </div>

          {/* Dictionary & Bug Reports */}
          <div className="doodle-card p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00F5D4] border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111]">
              <Bug size={20} className="text-[#111111]" />
            </div>
            <h2 className="text-lg font-black text-[#111111]">Dictionary &amp; Bug Reports</h2>
            <p className="text-xs sm:text-sm font-medium text-[#555555] leading-relaxed">
              If a valid English word was rejected, or if you encountered a room sync or timer glitch, please include the room code, device details, and word in your report.
            </p>
            <div className="pt-2">
              <a
                href="mailto:support@wordchain.in"
                className="inline-block text-sm font-black text-[#111111] bg-[#FFC928] hover:bg-[#ffcf3e] border-2 border-[#111111] px-4 py-2 rounded-xl shadow-[2px_2px_0px_#111111] transition-all"
              >
                support@wordchain.in
              </a>
            </div>
          </div>
        </div>

        {/* Helpful links */}
        <section className="doodle-card-yellow p-6 sm:p-8 space-y-3">
          <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
            <HelpCircle size={20} />
            Quick Answers Before You Message
          </h2>
          <p className="text-xs sm:text-sm font-bold text-[#333333] leading-relaxed">
            Many common questions regarding turn timers, invalid words, multiplayer room hosting, and dictionary rules are answered in our official resources:
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/rules" className="doodle-btn py-2 px-3 text-xs bg-white">
              Official Rules →
            </Link>
            <Link href="/how-to-play" className="doodle-btn py-2 px-3 text-xs bg-white">
              How to Play Guide →
            </Link>
            <Link href="/faq" className="doodle-btn py-2 px-3 text-xs bg-white">
              FAQ Section →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

