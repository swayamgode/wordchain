'use client';

import React from 'react';
import { ColorRoundResult } from '../../lib/types/colorMatch';
import { rgbToCss, rgbToHex } from '../../lib/utils/colorUtils';
import { MonsterAvatar } from '../doodles/MonsterAvatars';
import { Trophy, Sparkles, Clock } from 'lucide-react';

interface RoundRevealProps {
  result: ColorRoundResult;
  revealTimeLeft: number;
  currentRound: number;
  totalRounds: number;
}

export const RoundReveal: React.FC<RoundRevealProps> = ({
  result,
  revealTimeLeft,
  currentRound,
  totalRounds,
}) => {
  const targetCss = rgbToCss(result.targetColor);
  const targetHex = rgbToHex(result.targetColor);

  return (
    <div className="w-full bg-white border-2 sm:border-[3px] border-[#111111] rounded-2xl p-4 sm:p-6 shadow-[5px_5px_0px_#111111] space-y-5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-neutral-100 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider bg-[#FFC928] px-2 py-0.5 rounded border border-[#111111]">
            ROUND {currentRound} RESULTS
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#111111] mt-1">
            {result.winnerName ? `${result.winnerName} Wins the Round!` : 'Round Complete!'}
          </h3>
        </div>

        {/* Auto next round pill */}
        <div className="flex items-center gap-1.5 bg-neutral-100 border border-[#111111] px-2.5 py-1 rounded-full text-xs font-mono font-black text-[#111111]">
          <Clock size={13} />
          <span>Next in {revealTimeLeft}s</span>
        </div>
      </div>

      {/* Target Color Reveal Banner */}
      <div className="doodle-card p-3 sm:p-4 bg-neutral-50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 border-[#111111] shadow-[2px_2px_0px_#111111] shrink-0"
            style={{ backgroundColor: targetCss }}
          />
          <div>
            <span className="text-[10px] font-black uppercase text-[#666666] tracking-wider block">
              TARGET COLOR
            </span>
            <span className="text-base sm:text-lg font-black font-mono text-[#111111]">
              {targetHex}
            </span>
            <span className="text-xs font-bold text-[#888888] font-mono block">
              {targetCss}
            </span>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[10px] font-black uppercase text-[#666666] tracking-wider block">
            ROUND
          </span>
          <span className="text-xs font-black text-[#111111]">
            {currentRound} of {totalRounds}
          </span>
        </div>
      </div>

      {/* Player Guesses Leaderboard */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#666666]">
          Player Submissions
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {result.results.map((res, index) => {
            const guessCss = rgbToCss(res.guess);
            const guessHex = rgbToHex(res.guess);

            return (
              <div
                key={res.playerId}
                className={`p-3 rounded-xl border-2 border-[#111111] flex items-center justify-between shadow-[2px_2px_0px_#111111] transition-transform ${
                  res.isWinner
                    ? 'bg-[#FFC928]/30 border-2 border-[#111111] -translate-y-0.5'
                    : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {/* Rank badge */}
                  <div className="w-5 text-center font-black text-xs text-[#888888]">
                    #{index + 1}
                  </div>

                  {/* Player Avatar */}
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-white border border-[#111111] flex items-center justify-center overflow-hidden">
                      <MonsterAvatar id={res.avatarId} size={24} />
                    </div>
                    {res.isWinner && (
                      <div className="absolute -top-1.5 -right-1 bg-amber-400 border border-[#111111] rounded-full p-0.5 shadow-[1px_1px_0px_#111111]">
                        <Trophy size={10} className="text-[#111111]" />
                      </div>
                    )}
                  </div>

                  {/* Name and Hex */}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-[#111111] max-w-[100px] truncate">
                        {res.playerName}
                      </span>
                      {res.isWinner && (
                        <span className="text-[9px] font-black bg-amber-400 border border-[#111111] px-1 py-0.2 rounded uppercase">
                          Winner
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#666666]">
                      {guessHex}
                    </span>
                  </div>
                </div>

                {/* Swatch & Accuracy */}
                <div className="flex items-center gap-2.5">
                  <div className="text-right">
                    <span
                      className={`text-xs font-black block font-mono ${
                        res.accuracy >= 95
                          ? 'text-emerald-700'
                          : res.accuracy >= 85
                          ? 'text-blue-700'
                          : 'text-[#111111]'
                      }`}
                    >
                      {res.accuracy}%
                    </span>
                    <span className="text-[10px] font-black text-emerald-600 block">
                      +{res.pointsEarned} pts
                    </span>
                  </div>

                  <div
                    className="w-8 h-8 rounded-lg border border-[#111111] shadow-[1px_1px_0px_#111111] shrink-0"
                    style={{ backgroundColor: guessCss }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

