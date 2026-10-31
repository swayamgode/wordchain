'use client';

import React, { useState } from 'react';
import { ColorMatchRoomState, ColorRoundTimerOption, ColorTotalRoundsOption } from '../../lib/types/colorMatch';
import { MonsterAvatar } from '../doodles/MonsterAvatars';
import { Copy, Check, Play, Crown, Clock, Hash, Users, Sparkles } from 'lucide-react';
import { soundManager } from '../../lib/audio/sounds';

interface ColorClashLobbyProps {
  state: ColorMatchRoomState;
  myPlayerId: string;
  onToggleReady: () => void;
  onStartGame: () => void;
  onUpdateSettings?: (settings: { roundTimeLimit?: ColorRoundTimerOption; totalRounds?: ColorTotalRoundsOption }) => void;
}

export const ColorClashLobby: React.FC<ColorClashLobbyProps> = ({
  state,
  myPlayerId,
  onToggleReady,
  onStartGame,
  onUpdateSettings,
}) => {
  const [copied, setCopied] = useState(false);
  const me = state.players.find(p => p.id === myPlayerId);
  const isHost = me?.isHost || false;

  const copyRoomCode = () => {
    navigator.clipboard.writeText(state.code);
    soundManager.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const timerOptions: ColorRoundTimerOption[] = [10, 15, 20, 30];
  const roundOptions: ColorTotalRoundsOption[] = [3, 5, 7, 10];

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Room Code Card */}
      <div className="doodle-card p-5 bg-[#FFC928] text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-[#111111]/80">
          ROOM CODE
        </span>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl sm:text-4xl font-black font-mono tracking-widest text-[#111111] bg-white border-2 sm:border-[3px] border-[#111111] px-4 py-1 rounded-xl shadow-[3px_3px_0px_#111111]">
            {state.code}
          </span>
          <button
            type="button"
            onClick={copyRoomCode}
            className="p-3 bg-white border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] hover:bg-neutral-100 active:translate-y-[1px] transition-all"
            title="Copy Code"
          >
            {copied ? <Check size={20} className="text-emerald-600" /> : <Copy size={20} />}
          </button>
        </div>
        <p className="text-xs font-bold text-[#111111]/70">
          Share this 6-letter code with friends to join!
        </p>
      </div>

      {/* Settings (Editable by host, read-only for guests) */}
      <div className="doodle-card p-4 sm:p-5 bg-white space-y-3">
        <div className="flex items-center justify-between border-b-2 border-neutral-100 pb-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-[#111111]">
            Match Settings
          </span>
          {isHost && (
            <span className="text-[10px] font-black uppercase bg-[#FFC928] px-2 py-0.5 rounded border border-[#111111]">
              Host Settings
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Round Timer Limit */}
          <div>
            <label className="text-xs font-bold text-[#666666] flex items-center gap-1 mb-1.5">
              <Clock size={13} />
              Turn Time Limit
            </label>
            {isHost && onUpdateSettings ? (
              <div className="grid grid-cols-4 gap-1">
                {timerOptions.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => onUpdateSettings({ roundTimeLimit: t })}
                    className={`py-1.5 text-xs font-black rounded border-2 border-[#111111] shadow-[1px_1px_0px_#111111] ${
                      state.settings.roundTimeLimit === t
                        ? 'bg-[#FFC928]'
                        : 'bg-white hover:bg-neutral-100'
                    }`}
                  >
                    {t}s
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-sm font-black text-[#111111]">
                {state.settings.roundTimeLimit} Seconds
              </span>
            )}
          </div>

          {/* Total Rounds */}
          <div>
            <label className="text-xs font-bold text-[#666666] flex items-center gap-1 mb-1.5">
              <Hash size={13} />
              Total Rounds
            </label>
            {isHost && onUpdateSettings ? (
              <div className="grid grid-cols-4 gap-1">
                {roundOptions.map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => onUpdateSettings({ totalRounds: r })}
                    className={`py-1.5 text-xs font-black rounded border-2 border-[#111111] shadow-[1px_1px_0px_#111111] ${
                      state.settings.totalRounds === r
                        ? 'bg-[#FFC928]'
                        : 'bg-white hover:bg-neutral-100'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-sm font-black text-[#111111]">
                {state.settings.totalRounds} Rounds
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Players List */}
      <div className="doodle-card p-4 sm:p-5 bg-white space-y-3">
        <div className="flex items-center justify-between border-b-2 border-neutral-100 pb-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
            <Users size={14} />
            Players ({state.players.length} / {state.settings.playerCount})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {state.players.map(p => (
            <div
              key={p.id}
              className={`p-2.5 rounded-xl border-2 border-[#111111] flex items-center justify-between shadow-[2px_2px_0px_#111111] ${
                p.id === myPlayerId ? 'bg-amber-50' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white border border-[#111111] flex items-center justify-center overflow-hidden shrink-0">
                  <MonsterAvatar id={p.avatarId} size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-[#111111] truncate max-w-[110px]">
                      {p.name}
                    </span>
                    {p.isHost && (
                      <Crown size={12} className="text-amber-500 fill-amber-500 shrink-0" />
                    )}
                  </div>
                  {p.id === myPlayerId && (
                    <span className="text-[10px] font-bold text-[#888888] block">You</span>
                  )}
                </div>
              </div>

              <div>
                {p.isHost ? (
                  <span className="text-[10px] font-black uppercase bg-neutral-100 border border-[#111111] px-2 py-0.5 rounded">
                    Host
                  </span>
                ) : p.isReady ? (
                  <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-600 px-2 py-0.5 rounded">
                    Ready
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase bg-neutral-100 text-[#888888] border border-neutral-300 px-2 py-0.5 rounded">
                    Waiting
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2">
        {isHost ? (
          <button
            type="button"
            onClick={() => {
              soundManager.playCorrect();
              onStartGame();
            }}
            className="w-full py-4 bg-[#FFC928] hover:bg-[#ffcf3e] border-2 sm:border-[3px] border-[#111111] rounded-xl font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0px_#111111] active:translate-y-[2px] active:shadow-[1px_1px_0px_#111111] transition-all"
          >
            <Play size={18} fill="#111111" />
            START COLOR CLASH
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onToggleReady();
            }}
            className={`w-full py-4 border-2 sm:border-[3px] border-[#111111] rounded-xl font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0px_#111111] active:translate-y-[2px] transition-all ${
              me?.isReady
                ? 'bg-neutral-200 text-[#111111]'
                : 'bg-emerald-400 hover:bg-emerald-300 text-[#111111]'
            }`}
          >
            <Check size={18} />
            {me?.isReady ? 'CANCEL READY' : "I'M READY!"}
          </button>
        )}
      </div>
    </div>
  );
};

