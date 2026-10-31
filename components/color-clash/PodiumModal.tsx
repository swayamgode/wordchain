'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ColorMatchPlayer } from '../../lib/types/colorMatch';
import { MonsterAvatar } from '../doodles/MonsterAvatars';
import { Trophy, RotateCcw, Home, Sparkles } from 'lucide-react';
import { soundManager } from '../../lib/audio/sounds';
import Link from 'next/link';

interface PodiumModalProps {
  players: ColorMatchPlayer[];
  winnerId: string | null;
  onPlayAgain?: () => void;
  isHost?: boolean;
}

export const PodiumModal: React.FC<PodiumModalProps> = ({
  players,
  winnerId,
  onPlayAgain,
  isHost = false,
}) => {
  // Sort players by total score
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const champion = sorted[0];

  useEffect(() => {
    soundManager.playVictory();
    // Confetti cannon
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFC928', '#FF6B6B', '#4D96FF', '#6BCB77'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFC928', '#FF6B6B', '#4D96FF', '#6BCB77'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="w-full bg-white border-2 sm:border-[3px] border-[#111111] rounded-2xl p-5 sm:p-8 shadow-[6px_6px_0px_#111111] text-center space-y-6">
      {/* Trophy Badge */}
      <div className="inline-flex items-center gap-2 bg-[#FFC928] border-2 border-[#111111] px-4 py-1.5 rounded-full shadow-[2px_2px_0px_#111111]">
        <Trophy size={16} className="text-[#111111]" />
        <span className="text-xs font-black uppercase tracking-wider text-[#111111]">
          MATCH COMPLETE
        </span>
      </div>

      {/* Champion Banner */}
      <div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
          {champion ? `${champion.name} Wins!` : 'Color Clash Complete!'}
        </h2>
        <p className="text-xs sm:text-sm font-bold text-[#666666] mt-1">
          Master of the Spectrum & Hue Precision
        </p>
      </div>

      {/* Champion Monster Avatar Spotlight */}
      {champion && (
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#FFC928] border-2 sm:border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] flex items-center justify-center relative animate-bounce">
            <MonsterAvatar id={champion.avatarId} size={48} />
            <div className="absolute -top-3 -right-2 bg-amber-400 border-2 border-[#111111] rounded-full p-1 shadow-[2px_2px_0px_#111111]">
              <Trophy size={16} className="text-[#111111]" />
            </div>
          </div>
          <span className="text-sm sm:text-base font-black text-[#111111] mt-2">
            {champion.name}
          </span>
          <span className="text-xs font-black font-mono bg-neutral-100 border border-[#111111] px-2.5 py-0.5 rounded-full mt-1">
            {champion.score} Points
          </span>
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div className="space-y-2 max-w-md mx-auto">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#666666] text-left">
          Final Standings
        </h4>

        {sorted.map((p, idx) => (
          <div
            key={p.id}
            className={`p-3 rounded-xl border-2 border-[#111111] flex items-center justify-between shadow-[2px_2px_0px_#111111] ${
              idx === 0 ? 'bg-[#FFC928]/30 font-black' : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-5 text-center font-black text-xs text-[#888888]">
                #{idx + 1}
              </span>
              <div className="w-8 h-8 rounded-full bg-white border border-[#111111] flex items-center justify-center overflow-hidden">
                <MonsterAvatar id={p.avatarId} size={20} />
              </div>
              <span className="text-xs sm:text-sm font-black text-[#111111] truncate max-w-[140px]">
                {p.name}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs sm:text-sm font-black font-mono text-[#111111]">
                {p.score} pts
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        {onPlayAgain && isHost && (
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-6 py-3 bg-[#FFC928] border-2 border-[#111111] rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-[3px_3px_0px_#111111] hover:bg-[#ffcf3e] active:translate-y-[2px] transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Play Again
          </button>
        )}

        <Link
          href="/color-clash"
          className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-[#111111] rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-[3px_3px_0px_#111111] hover:bg-neutral-100 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 text-[#111111]"
        >
          <Home size={16} />
          Color Clash Hub
        </Link>
      </div>
    </div>
  );
};

