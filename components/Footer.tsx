import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t-3 border-[#111111] bg-white py-10 px-4 sm:px-6 select-none relative z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-8">
        {/* Brand & Overview */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black text-[#111111]">WORD</span>
            <span className="text-xl font-black bg-[#FFC928] px-2 py-0.5 rounded-lg border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
              CHAIN
            </span>
          </div>
          <p className="text-xs font-medium text-[#555555] max-w-sm leading-relaxed">
            The free multiplayer word relay &amp; brain game arena. Challenge friends in real-time battles, sharpen your vocabulary, and enjoy instant casual web games without downloads or logins.
          </p>
          <div className="text-[11px] font-bold text-[#888888]">
            Proudly free &amp; playable on all mobile, tablet, and desktop devices.
          </div>
        </div>

        {/* Play & Games */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-[#111111] mb-3 border-b-2 border-[#FFC928] pb-1 w-fit">
            Games &amp; Modes
          </h4>
          <ul className="space-y-2 text-xs font-bold text-[#555555]">
            <li><Link href="/" className="hover:text-[#111111] transition-colors">WordChain Home</Link></li>
            <li><Link href="/matchmaking" className="hover:text-[#111111] transition-colors">Quick Play 1v1</Link></li>
            <li><Link href="/create" className="hover:text-[#111111] transition-colors">Custom Room</Link></li>
            <li><Link href="/practice" className="hover:text-[#111111] transition-colors">Solo Bot Practice</Link></li>
            <li><Link href="/local" className="hover:text-[#111111] transition-colors">Pass &amp; Play Local</Link></li>
            <li><Link href="/color-clash" className="hover:text-[#111111] transition-colors">Color Clash (RGB)</Link></li>
          </ul>
        </div>

        {/* Learning & Rules */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-[#111111] mb-3 border-b-2 border-[#FFC928] pb-1 w-fit">
            Guides &amp; Rules
          </h4>
          <ul className="space-y-2 text-xs font-bold text-[#555555]">
            <li><Link href="/how-to-play" className="hover:text-[#111111] transition-colors">How to Play</Link></li>
            <li><Link href="/rules" className="hover:text-[#111111] transition-colors">Official Game Rules</Link></li>
            <li><Link href="/guides" className="hover:text-[#111111] transition-colors">Strategy Guides Hub</Link></li>
            <li><Link href="/blog" className="hover:text-[#111111] transition-colors">Word Game Blog</Link></li>
            <li><Link href="/blog/what-is-word-chain-game" className="hover:text-[#111111] transition-colors">What is Word Chain?</Link></li>
            <li><Link href="/blog/rgb-color-match-game-guide" className="hover:text-[#111111] transition-colors">Color Match Guide</Link></li>
          </ul>
        </div>

        {/* Company & Legal */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-[#111111] mb-3 border-b-2 border-[#FFC928] pb-1 w-fit">
            Transparency
          </h4>
          <ul className="space-y-2 text-xs font-bold text-[#555555]">
            <li><Link href="/about" className="hover:text-[#111111] transition-colors">About WordChain</Link></li>
            <li><Link href="/contact" className="hover:text-[#111111] transition-colors">Contact Support</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-[#111111] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#111111] transition-colors">Terms of Service</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-[#111111] transition-colors">XML Sitemap</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-[#777777] gap-3">
        <p>© 2026 WordChain (wordchain.in). All rights reserved. Free online multiplayer games.</p>
        <div className="flex items-center gap-4 text-xs font-bold">
          <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </footer>
  );
};
