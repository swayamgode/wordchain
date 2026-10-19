'use client';

import React, { useState, useEffect } from 'react';
import { Download, Share2, X, Smartphone, Sparkles } from 'lucide-react';
import { soundManager } from '../lib/audio/sounds';
import { MonsterAvatar } from './doodles/MonsterAvatars';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPwaPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.warn('SW register error', err);
      });
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as unknown as { standalone?: boolean }).standalone) {
      setIsStandalone(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  if (isStandalone) return null; // Already running as installed app

  const handleInstallClick = async () => {
    soundManager.playClick();
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="doodle-btn-yellow py-1.5 px-3 text-xs font-black shadow-[2px_2px_0px_#111111] hover:scale-105 transition-transform flex items-center gap-1.5"
        title="Install WordChain App"
      >
        <Smartphone size={14} />
        <span>Install App</span>
      </button>

      {/* Manual Install Instructions Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm doodle-card p-6 relative text-center">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-[#111111] flex items-center justify-center hover:bg-neutral-100"
            >
              <X size={16} />
            </button>

            <div className="w-16 h-16 mx-auto bg-[#FFC928] border-2 border-[#111111] rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_#111111] mb-3">
              <MonsterAvatar id="monty" size={48} />
            </div>

            <h3 className="text-xl font-black text-[#111111]">Install WordChain</h3>
            <p className="text-xs font-bold text-[#666666] mt-1 mb-4">
              Add WordChain to your phone's Home Screen for the full fullscreen native app experience!
            </p>

            {isIOS ? (
              <div className="bg-[#FAF7EE] border-2 border-[#111111] rounded-xl p-3 text-left space-y-2 text-xs font-bold text-[#222222]">
                <p className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#FFC928] rounded-full flex items-center justify-center text-[10px] font-black border border-[#111111]">1</span>
                  Tap the <Share2 size={14} className="inline mx-1" /> <strong>Share</strong> button in Safari toolbar.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#FFC928] rounded-full flex items-center justify-center text-[10px] font-black border border-[#111111]">2</span>
                  Scroll down and tap <strong>"Add to Home Screen"</strong>.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#FFC928] rounded-full flex items-center justify-center text-[10px] font-black border border-[#111111]">3</span>
                  Tap <strong>Add</strong> in top right. Enjoy!
                </p>
              </div>
            ) : (
              <div className="bg-[#FAF7EE] border-2 border-[#111111] rounded-xl p-3 text-left space-y-2 text-xs font-bold text-[#222222]">
                <p className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#FFC928] rounded-full flex items-center justify-center text-[10px] font-black border border-[#111111]">1</span>
                  Tap the <strong>⋮ (Menu)</strong> icon in your browser.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#FFC928] rounded-full flex items-center justify-center text-[10px] font-black border border-[#111111]">2</span>
                  Select <strong>"Install app"</strong> or <strong>"Add to Home Screen"</strong>.
                </p>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full doodle-btn py-2.5 text-xs justify-center"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
