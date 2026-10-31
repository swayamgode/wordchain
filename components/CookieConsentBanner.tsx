'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

const CONSENT_STORAGE_KEY = 'wordchain_cookie_consent_v1';

export const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) {
        setShowBanner(true);
      }
    } catch {
      // LocalStorage might be disabled in private/restricted browsing
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ status: 'accepted', timestamp: new Date().toISOString() })
      );
    } catch {}
    setShowBanner(false);
  };

  const handleRejectNonEssential = () => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ status: 'essential_only', timestamp: new Date().toISOString() })
      );
    } catch {}
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-[#FAF7EE] border-3 border-[#111111] rounded-2xl p-4 sm:p-5 shadow-[5px_5px_0px_#111111] animate-in fade-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-xl bg-[#FFC928] border-2 border-[#111111] flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#111111]">
          <ShieldCheck size={18} className="text-[#111111]" />
        </div>
        <div>
          <h3 className="text-sm font-black text-[#111111]">Privacy &amp; Cookie Choices</h3>
          <p className="text-xs font-medium text-[#444444] mt-1 leading-relaxed">
            We use essential local storage to remember your avatar, mute settings, and room codes. We also use analytics and advertising partners to support free gameplay.
          </p>
        </div>
      </div>

      <div className="text-[11px] font-bold text-[#666666] mb-3">
        Learn more in our{' '}
        <Link href="/privacy-policy" className="underline font-black text-[#111111] hover:text-[#FFC928]">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link href="/terms" className="underline font-black text-[#111111] hover:text-[#FFC928]">
          Terms of Service
        </Link>.
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleRejectNonEssential}
          className="flex-1 py-2 px-3 text-xs font-black uppercase tracking-wider bg-white border-2 border-[#111111] rounded-xl hover:bg-neutral-100 shadow-[2px_2px_0px_#111111] active:translate-y-0.5 transition-all text-[#111111]"
        >
          Essential Only
        </button>
        <button
          type="button"
          onClick={handleAcceptAll}
          className="flex-1 py-2 px-3 text-xs font-black uppercase tracking-wider bg-[#FFC928] border-2 border-[#111111] rounded-xl hover:bg-[#ffcf3e] shadow-[2px_2px_0px_#111111] active:translate-y-0.5 transition-all text-[#111111]"
        >
          Accept All
        </button>
      </div>
    </aside>
  );
};

