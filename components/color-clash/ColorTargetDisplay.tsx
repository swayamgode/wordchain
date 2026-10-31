'use client';

import React from 'react';
import { RGBColor } from '../../lib/types/colorMatch';
import { rgbToCss } from '../../lib/utils/colorUtils';
import { Clock } from 'lucide-react';
import { MonsterAvatar } from '../doodles/MonsterAvatars';

interface ColorTargetDisplayProps {
  targetColor: RGBColor | null;
  playerColor?: RGBColor;
  currentRound: number;
  totalRounds: number;
  timeLeft: number;
  totalTime: number;
  avatarId?: string;
}

export const ColorTargetDisplay: React.FC<ColorTargetDisplayProps> = ({
  targetColor,
  playerColor,
  currentRound,
  totalRounds,
  timeLeft,
  totalTime,
  avatarId = 'monty',
}) => {
  const targetCss = targetColor ? rgbToCss(targetColor) : '#E5E5E5';
  const playerCss = playerColor ? rgbToCss(playerColor) : '#FFFFFF';
  const percentLeft = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));
  const isUrgent = timeLeft <= 5 && timeLeft > 0;

  return (
    <div className="w-full space-y-3">
      {/* Top Status: Round & Countdown */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider bg-[#FFC928] border-2 border-[#111111] px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_#111111]">
            ROUND {currentRound} / {totalRounds}
          </span>
        </div>

        {/* Countdown Pill */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-[#111111] font-mono font-black text-xs sm:text-sm shadow-[2px_2px_0px_#111111] transition-colors ${
            isUrgent
              ? 'bg-red-500 text-white animate-bounce'
              : 'bg-white text-[#111111]'
          }`}
        >
          <Clock size={15} />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full h-2.5 bg-neutral-200 border-2 border-[#111111] rounded-full overflow-hidden shadow-[1px_1px_0px_#111111]">
        <div
          className={`h-full transition-all duration-300 ${
            isUrgent ? 'bg-red-500' : 'bg-[#FFC928]'
          }`}
          style={{ width: `${percentLeft}%` }}
        />
      </div>

      {/* Swatches Container */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* TARGET COLOR SWATCH */}
        <div className="doodle-card p-3 sm:p-4 bg-white flex flex-col items-center">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[11px] sm:text-xs font-black uppercase text-[#111111] tracking-wider">
              TARGET COLOR
            </span>
          </div>

          <div
            className="w-full aspect-square max-h-36 sm:max-h-44 rounded-xl border-2 sm:border-[3px] border-[#111111] shadow-[3px_3px_0px_#111111] flex items-end justify-center p-2 relative overflow-hidden transition-colors"
            style={{ backgroundColor: targetCss }}
          >
            <div className="bg-white/90 backdrop-blur-sm border border-[#111111] px-2 py-0.5 rounded text-[10px] sm:text-xs font-black text-[#111111] shadow-[1px_1px_0px_#111111]">
              Match Me!
            </div>
          </div>
        </div>

        {/* YOUR CURRENT MIX SWATCH */}
        <div className="doodle-card p-3 sm:p-4 bg-white flex flex-col items-center">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[11px] sm:text-xs font-black uppercase text-[#111111] tracking-wider">
              YOUR LIVE MIX
            </span>
          </div>

          <div
            className="w-full aspect-square max-h-36 sm:max-h-44 rounded-xl border-2 sm:border-[3px] border-[#111111] shadow-[3px_3px_0px_#111111] flex items-end justify-center p-2 relative overflow-hidden transition-colors"
            style={{ backgroundColor: playerCss }}
          >
            <div className="bg-white/90 backdrop-blur-sm border border-[#111111] px-2 py-0.5 rounded text-[10px] sm:text-xs font-black text-[#111111] shadow-[1px_1px_0px_#111111] flex items-center gap-1">
              <MonsterAvatar id={avatarId} size={16} />
              <span>You</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

