'use client';

import React from 'react';
import { RGBColor } from '../../lib/types/colorMatch';
import { rgbToHex, rgbToCss } from '../../lib/utils/colorUtils';
import { soundManager } from '../../lib/audio/sounds';
import { Check, Lock } from 'lucide-react';

interface RGBSlidersProps {
  color: RGBColor;
  onChange: (color: RGBColor) => void;
  onSubmit: () => void;
  disabled?: boolean;
  hasSubmitted?: boolean;
  submitLabel?: string;
}

export const RGBSliders: React.FC<RGBSlidersProps> = ({
  color,
  onChange,
  onSubmit,
  disabled = false,
  hasSubmitted = false,
  submitLabel = 'LOCK IN COLOR',
}) => {
  const updateChannel = (channel: keyof RGBColor, value: number) => {
    if (disabled || hasSubmitted) return;
    const clamped = Math.max(0, Math.min(255, Math.round(value)));
    onChange({
      ...color,
      [channel]: clamped,
    });
  };

  const nudge = (channel: keyof RGBColor, delta: number) => {
    if (disabled || hasSubmitted) return;
    soundManager.playClick();
    updateChannel(channel, color[channel] + delta);
  };

  const hex = rgbToHex(color);
  const rgbString = rgbToCss(color);

  return (
    <div className="w-full bg-white border-2 sm:border-[3px] border-[#111111] rounded-2xl p-3.5 sm:p-5 shadow-[4px_4px_0px_#111111]">
      {/* Current Guess Color Preview Pill */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
        <div className="flex items-center gap-2.5">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-colors"
            style={{ backgroundColor: rgbString }}
          />
          <div>
            <span className="text-[10px] font-black uppercase text-[#666666] tracking-wider block">
              YOUR MIX
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black font-mono text-[#111111]">
                {hex}
              </span>
              <span className="text-[11px] font-bold text-[#888888] font-mono hidden sm:inline">
                {rgbString}
              </span>
            </div>
          </div>
        </div>

        {hasSubmitted ? (
          <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border-2 border-emerald-600 px-3 py-1.5 rounded-full text-xs font-black animate-pulse">
            <Check size={14} />
            LOCKED IN
          </div>
        ) : (
          <span className="text-xs font-bold text-[#888888]">
            Move sliders to match
          </span>
        )}
      </div>

      {/* R, G, B Slider Controls */}
      <div className="space-y-4">
        {/* RED SLIDER */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-red-500 text-white font-black text-xs flex items-center justify-center border border-[#111111] shadow-[1px_1px_0px_#111111]">
                R
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-[#333333]">
                Red
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => nudge('r', -10)}
                disabled={disabled || hasSubmitted}
                className="px-2 py-0.5 text-xs font-black bg-neutral-100 border border-[#111111] rounded shadow-[1px_1px_0px_#111111] hover:bg-neutral-200 disabled:opacity-40 active:translate-y-[1px]"
              >
                -10
              </button>
              <button
                type="button"
                onClick={() => nudge('r', -1)}
                disabled={disabled || hasSubmitted}
                className="px-1.5 py-0.5 text-xs font-black bg-neutral-100 border border-[#111111] rounded shadow-[1px_1px_0px_#111111] hover:bg-neutral-200 disabled:opacity-40 active:translate-y-[1px]"
              >
                -1
              </button>
              <span className="w-12 text-center font-mono font-black text-sm bg-neutral-50 py-0.5 border border-neutral-300 rounded">
                {color.r}
              </span>
              <button
                type="button"
                onClick={() => nudge('r', 1)}
                disabled={disabled || hasSubmitted}
                className="px-1.5 py-0.5 text-xs font-black bg-neutral-100 border border-[#111111] rounded shadow-[1px_1px_0px_#111111] hover:bg-neutral-200 disabled:opacity-40 active:translate-y-[1px]"
              >
                +1
              </button>
              <button
                type="button"
                onClick={() => nudge('r', 10)}
                disabled={disabled || hasSubmitted}
                className="px-2 py-0.5 text-xs font-black bg-neutral-100 border border-[#111111] rounded shadow-[1px_1px_0px_#111111] hover:bg-neutral-200 disabled:opacity-40 active:translate-y-[1px]"
              >
                +10
              </button>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="255"
            value={color.r}
            disabled={disabled || hasSubmitted}
            onChange={(e) => updateChannel('r', Number(e.target.value))}
            className="w-full h-3.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-red-600 disabled:opacity-50"
            style={{
              background: `linear-gradient(to right, rgb(0, ${color.g}, ${color.b}), rgb(255, ${color.g}, ${color.b}))`,
            }}
          />
        </div>

        {/* GREEN SLIDER */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-500 text-white font-black text-xs flex items-center justify-center border border-[#111111] shadow-[1px_1px_0px_#111111]">
                G
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-[#333333]">
                Green
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => nudge('g', -10)}
                disabled={disabled || hasSubmitted}
                className="px-2 py-0.5 text-xs font-black bg-neutral-100 border border-[#111111] rounded shadow-[1px_1px_0px_#111111] hover:bg-neutral-200 disabled:opacity-40 active:translate-y-[1px]"
              >
                -10
              </button>
              <button
                type="button"
                onClick={() => nudge('g', -1)}
                disabled={disabled || hasSubmitted}
                className="px-1.5 py-0.5 text-xs font-black bg-neutral-100 border border-[#111111] rounded shadow-[1px_1px_0px_#111111] hover:bg-neutral-200 disabled:opacity-40 active:translate-y-[1px]"
              >
                -1
              </button>
              <span className="w-12 text-center font-mono font-black text-sm bg-neutral-50 py-0.5 border border-neutral-300 rounded">
                {color.g}
              </span>
              <button
                type="button"
                onClick={() => nudge('g', 1)}
                disabled={disabled || hasSubmitted}
                className="px-1.5 py-0.5 text-xs font-black bg-neutral-100 border border-[#111111] rounded shadow-[1px_1px_0px_#111111] hover:bg-neutral-200 disabled:opacity-40 active:translate-y-[1px]"
              >
                +1
              </button>
              <button
                type="button"
                onClick={() => nudge('g', 10)}
                disabled={disabled || hasSubmitted}
                className="px-2 py-0.5 text-xs font-black bg-neutral-100 border border-[#111111] rounded shadow-[1px_1px_0px_#111111] hover:bg-neutral-200 disabled:opacity-40 active:translate-y-[1px]"
              >
                +10
              </button>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="255"
            value={color.g}
            disabled={disabled || hasSubmitted}
            onChange={(e) => updateChannel('g', Number(e.target.value))}
            className="w-full h-3.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 disabled:opacity-50"
            style={{
              background: `linear-gradient(to right, rgb(${color.r}, 0, ${color.b}), rgb(${color.r}, 255, ${color.b}))`,
            }}
          />
        </div>

        {/* BLUE SLIDER */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-500 text-white font-black text-xs flex items-center justify-center border border-[#111111] shadow-[1px_1px_0px_#111111]">
                B
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-[#333333]">
                Blue
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => nudge('b', -10)}
                disabled={disabled || hasSubmitted}
                className="px-2 py-0.5 text-xs font-black bg-neutral-100 border border-[#111111] rounded shadow-[1px_1px_0px_#111111] hover:bg-neutral-200 disabled:opacity-40 active:translate-y-[1px]"
              >
                -10
              </button>
              <button
                type="button"
                onClick={() => nudge('b', -1)}
                disabled={disabled || hasSubmitted}
                className="px-1.5 py-0.5 text-xs font-black bg-neutral-100 border border-[#111111] rounded shadow-[1px_1px_0px_#111111] hover:bg-neutral-200 disabled:opacity-40 active:translate-y-[1px]"
              >
                -1
              </button>
              <span className="w-12 text-center font-mono font-black text-sm bg-neutral-50 py-0.5 border border-neutral-300 rounded">
                {color.b}
              </span>
              <button
                type="button"
                onClick={() => nudge('b', 1)}
                disabled={disabled || hasSubmitted}
                className="px-1.5 py-0.5 text-xs font-black bg-neutral-100 border border-[#111111] rounded shadow-[1px_1px_0px_#111111] hover:bg-neutral-200 disabled:opacity-40 active:translate-y-[1px]"
              >
                +1
              </button>
              <button
                type="button"
                onClick={() => nudge('b', 10)}
                disabled={disabled || hasSubmitted}
                className="px-2 py-0.5 text-xs font-black bg-neutral-100 border border-[#111111] rounded shadow-[1px_1px_0px_#111111] hover:bg-neutral-200 disabled:opacity-40 active:translate-y-[1px]"
              >
                +10
              </button>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="255"
            value={color.b}
            disabled={disabled || hasSubmitted}
            onChange={(e) => updateChannel('b', Number(e.target.value))}
            className="w-full h-3.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50"
            style={{
              background: `linear-gradient(to right, rgb(${color.r}, ${color.g}, 0), rgb(${color.r}, ${color.g}, 255))`,
            }}
          />
        </div>
      </div>

      {/* Submit Guess Button */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => {
            soundManager.playCorrect();
            onSubmit();
          }}
          disabled={disabled || hasSubmitted}
          className={`w-full py-3.5 sm:py-4 rounded-xl border-2 sm:border-[3px] border-[#111111] font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-[3px_3px_0px_#111111] transition-all ${
            hasSubmitted
              ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed shadow-none'
              : 'bg-[#FFC928] hover:bg-[#ffcf3e] active:translate-y-[2px] active:shadow-[1px_1px_0px_#111111]'
          }`}
        >
          {hasSubmitted ? (
            <>
              <Lock size={18} />
              SUBMITTED — WAITING FOR PLAYERS
            </>
          ) : (
            <>
              <Check size={18} />
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

