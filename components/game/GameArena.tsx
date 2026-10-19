'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Timer,
  Heart,
  Trophy,
  ArrowRight,
  RotateCcw,
  Home,
  Info,
  X,
  Volume2,
  VolumeX,
  Send,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { RoomState, PlayedWord, Player } from '../../lib/types/game';
import { MonsterAvatar, MONSTER_LIST } from '../doodles/MonsterAvatars';
import { TopoDoodlePattern } from '../doodles/DoodleBackground';
import { soundManager } from '../../lib/audio/sounds';
import { recordMatchResult } from '../../lib/supabase/client';

interface GameArenaProps {
  roomState: RoomState;
  currentPlayerId: string;
  onSubmitWord: (word: string) => void;
  onRematch?: () => void;
  onLeaveRoom?: () => void;
}

export const GameArena: React.FC<GameArenaProps> = ({
  roomState,
  currentPlayerId,
  onSubmitWord,
  onRematch,
  onLeaveRoom,
}) => {
  const [wordInput, setWordInput] = useState('');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chainEndRef = useRef<HTMLDivElement>(null);

  const activePlayer = roomState.players[roomState.activePlayerIndex] as Player | undefined;
  const isMyTurn = activePlayer?.id === currentPlayerId;
  const myPlayer = roomState.players.find(p => p.id === currentPlayerId);
  const isEliminated = myPlayer?.isEliminated;

  // Sound & confetti on game end
  useEffect(() => {
    if (roomState.status === 'ended') {
      soundManager.playVictory();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFC928', '#111111', '#FF5D8F', '#00F5D4'],
      });

      // Record local statistics
      if (myPlayer) {
        const isWin = roomState.winnerId === currentPlayerId;
        recordMatchResult(
          isWin,
          myPlayer.wordsSubmitted,
          roomState.chain.length,
          roomState.settings.preset
        );
      }
    }
  }, [roomState.status, roomState.winnerId, currentPlayerId, myPlayer, roomState.chain.length, roomState.settings.preset]);

  // Sound feedback on state changes
  useEffect(() => {
    if (roomState.lastActionFeedback) {
      if (roomState.lastActionFeedback.type === 'valid') {
        soundManager.playWordAccepted();
      } else if (roomState.lastActionFeedback.type === 'invalid' || roomState.lastActionFeedback.type === 'timeout') {
        soundManager.playInvalidWord();
      } else if (roomState.lastActionFeedback.type === 'eliminated') {
        soundManager.playEliminated();
      }
    }
  }, [roomState.lastActionFeedback]);

  // Auto-scroll word chain to bottom
  useEffect(() => {
    chainEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [roomState.chain.length]);

  // Server countdown timer synchronization
  useEffect(() => {
    if (!roomState.currentTurnDeadline || roomState.status !== 'in_progress') {
      setTimeLeft(null);
      return;
    }

    const interval = setInterval(() => {
      const remainingMs = roomState.currentTurnDeadline! - Date.now();
      const sec = Math.max(0, Math.ceil(remainingMs / 1000));
      setTimeLeft(sec);

      // Warning audio tick when 3 seconds or less remaining
      if (sec > 0 && sec <= 3 && isMyTurn) {
        soundManager.playTick();
      }
    }, 250);

    return () => clearInterval(interval);
  }, [roomState.currentTurnDeadline, roomState.status, isMyTurn]);

  // Auto focus input on my turn
  useEffect(() => {
    if (isMyTurn && !isEliminated) {
      inputRef.current?.focus();
      // Pre-fill required letter if empty
      if (roomState.currentRequiredLetter) {
        setWordInput(roomState.currentRequiredLetter.toUpperCase());
      } else {
        setWordInput('');
      }
    }
  }, [isMyTurn, isEliminated, roomState.currentRequiredLetter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMyTurn || isEliminated) return;

    const trimmed = wordInput.trim();
    if (!trimmed) return;

    // Client-side quick check for start letter
    if (roomState.currentRequiredLetter) {
      if (!trimmed.toLowerCase().startsWith(roomState.currentRequiredLetter.toLowerCase())) {
        setInputError(`Must begin with letter "${roomState.currentRequiredLetter.toUpperCase()}"!`);
        soundManager.playInvalidWord();
        return;
      }
    }

    setInputError(null);
    onSubmitWord(trimmed);
  };

  const getMoodForActivePlayer = () => {
    if (!activePlayer) return 'happy';
    if (activePlayer.isEliminated) return 'dizzy';
    if (timeLeft !== null && timeLeft <= 3) return 'worried';
    return 'happy';
  };

  const targetLength = roomState.settings.wordLength;

  return (
    <div className="relative min-h-[90vh] w-full max-w-4xl mx-auto px-4 py-4 flex flex-col justify-between">
      <TopoDoodlePattern opacity={0.06} />

      {/* TOP STATUS ROW (Matching mobile reference pill design) */}
      <div className="relative z-10 w-full flex items-center justify-between gap-1.5 sm:gap-4 mb-3 sm:mb-4">
        {/* Round Badge */}
        <div className="doodle-badge-stat min-w-[56px] sm:min-w-[70px] px-2 py-1 sm:py-2">
          <span className="text-lg sm:text-xl font-black text-[#111111]">{roomState.roundNumber}</span>
          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-[#666666]">Round</span>
        </div>

        {/* Turn Countdown Timer Pill */}
        <div className={`doodle-card px-3 sm:px-5 py-1 sm:py-2 flex items-center gap-1.5 sm:gap-2 ${timeLeft !== null && timeLeft <= 3 ? 'bg-[#FF6868] text-white animate-pulse' : 'bg-white'}`}>
          <Timer size={18} className={`shrink-0 ${timeLeft !== null && timeLeft <= 3 ? 'text-white' : 'text-[#111111]'}`} />
          <div className="flex flex-col items-center">
            <span className="font-mono text-base sm:text-xl font-black leading-none">
              {timeLeft !== null ? `00:0${timeLeft}`.slice(-5) : '∞'}
            </span>
            <span className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider opacity-70">Turn Time</span>
          </div>
        </div>

        {/* Player Score Badge */}
        <div className="doodle-badge-stat min-w-[56px] sm:min-w-[70px] px-2 py-1 sm:py-2">
          <span className="text-lg sm:text-xl font-black text-[#111111]">{myPlayer?.score || 0}</span>
          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-[#666666]">Score</span>
        </div>

        {/* Rules button */}
        <button
          onClick={() => setShowRulesModal(true)}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111] hover:bg-neutral-100 shrink-0"
          title="Match Rules"
        >
          <Info size={16} />
        </button>
      </div>

      {/* ACTIVE TURN HERO CARD */}
      <div className="relative z-10 w-full doodle-card p-3 sm:p-6 mb-3 sm:mb-4 flex flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
          <div className="relative shrink-0">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-[#FAF7EE] border-2 sm:border-[3px] border-[#111111] rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] overflow-hidden">
              <MonsterAvatar
                id={activePlayer?.avatarId || 'monty'}
                size={50}
                mood={getMoodForActivePlayer()}
              />
            </div>
            {/* Crown if Host */}
            {activePlayer?.isHost && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#FFC928] text-[9px] font-black px-1 rounded border border-[#111111] shadow-[1px_1px_0px_#111111]">
                HOST
              </span>
            )}
          </div>

          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs font-black uppercase text-[#888888] tracking-wider truncate block">
              {isMyTurn ? '👉 YOUR TURN!' : `WAITING: ${activePlayer?.name}`}
            </span>
            <h2 className="text-lg sm:text-3xl font-black text-[#111111] tracking-tight truncate">
              {activePlayer?.name}
            </h2>
            {/* Lives Hearts */}
            <div className="flex items-center gap-1 mt-0.5">
              {roomState.settings.lives === 0 ? (
                <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full border border-emerald-400">
                  Unlimited Lives
                </span>
              ) : (
                Array.from({ length: Math.min(roomState.settings.lives, 5) }).map((_, i) => (
                  <Heart
                    key={i}
                    size={14}
                    className={`${i < (activePlayer?.lives ?? 0) ? 'fill-[#FF5D8F] text-[#111111]' : 'text-neutral-300 fill-neutral-200'} transition-all`}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Required Starting Letter Target Pill */}
        <div className="flex flex-col items-center shrink-0">
          <span className="text-[9px] sm:text-[11px] font-extrabold uppercase text-[#777777]">Next Letter</span>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-[#FFC928] border-2 sm:border-[3px] border-[#111111] rounded-xl sm:rounded-2xl flex items-center justify-center font-mono text-2xl sm:text-3xl font-black text-[#111111] shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] animate-doodle-bounce">
              {roomState.currentRequiredLetter ? roomState.currentRequiredLetter.toUpperCase() : '★'}
            </div>
          </div>
        </div>
      </div>

      {/* WORD CHAIN STREAM (Interactive Visual Track) */}
      <div className="relative z-10 w-full flex-1 doodle-card p-4 sm:p-5 mb-4 flex flex-col justify-between overflow-hidden min-h-[220px]">
        <div className="flex items-center justify-between border-b-2 border-neutral-100 pb-2 mb-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#666666]">
            Word Chain History ({roomState.chain.length} words)
          </span>
          {roomState.settings.wordLength !== 'any' ? (
            <span className="text-xs font-black bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-300">
              Exact {roomState.settings.wordLength} Letters
            </span>
          ) : (
            <span className="text-xs font-black bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-300">
              Length {roomState.settings.anyLengthMin} - {roomState.settings.anyLengthMax}
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto max-h-[220px] pr-2 space-y-2.5">
          {roomState.chain.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-6 text-neutral-400">
              <MonsterAvatar id="monty" size={50} mood="happy" />
              <p className="font-bold text-sm mt-2 text-[#777777]">No words played yet. Start the chain!</p>
            </div>
          ) : (
            roomState.chain.map((item, idx) => {
              const isLastWord = idx === roomState.chain.length - 1;
              const firstPart = item.word.slice(0, -1);
              const lastLetter = item.word.slice(-1);

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all ${
                    isLastWord
                      ? 'bg-[#FFC928]/20 border-[#111111] shadow-[2px_2px_0px_#111111]'
                      : 'bg-white border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-neutral-400">#{item.turnNumber}</span>
                    <MonsterAvatar id={item.avatarId} size={28} />
                    <span className="text-xs font-bold text-[#444444]">{item.playerName}</span>
                  </div>

                  {/* Word with highlighted last letter */}
                  <div className="font-mono text-lg font-black tracking-wider flex items-center">
                    <span>{firstPart}</span>
                    <span className="bg-[#FFC928] text-[#111111] px-1.5 py-0.2 rounded-md border border-[#111111] ml-0.5 shadow-[1px_1px_0px_#111111]">
                      {lastLetter}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={chainEndRef} />
        </div>

        {/* Last action feedback alert banner */}
        {roomState.lastActionFeedback && (
          <div
            className={`mt-3 py-2 px-3 rounded-xl border-2 flex items-center gap-2 text-xs font-extrabold ${
              roomState.lastActionFeedback.type === 'valid'
                ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                : 'bg-red-100 border-red-500 text-red-900'
            }`}
          >
            {roomState.lastActionFeedback.type === 'valid' ? (
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-red-600 shrink-0" />
            )}
            <span>{roomState.lastActionFeedback.message}</span>
          </div>
        )}
      </div>

      {/* DYNAMIC WORD SUBMISSION FORM (Sticky on mobile) */}
      <div className="sticky bottom-1 sm:bottom-4 z-20 w-full doodle-card-yellow p-3 sm:p-5 shadow-2xl">
        {isEliminated ? (
          <div className="text-center py-2 sm:py-4">
            <h3 className="text-lg sm:text-xl font-black text-[#111111]">You have been eliminated!</h3>
            <p className="text-xs sm:text-sm font-bold text-[#333333] mt-0.5">Spectating the remaining players...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 sm:gap-2">
            <div className="flex items-center justify-between px-1">
              <label htmlFor="wordInput" className="text-[11px] sm:text-xs font-extrabold uppercase text-[#111111]">
                {isMyTurn ? '⚡ Enter your word:' : 'Thinking of your next word...'}
              </label>
              {targetLength !== 'any' ? (
                <span className="text-[11px] sm:text-xs font-extrabold font-mono">
                  {wordInput.length}/{targetLength} Letters
                </span>
              ) : (
                <span className="text-[11px] sm:text-xs font-extrabold font-mono">
                  {wordInput.length} Letters
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                id="wordInput"
                ref={inputRef}
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
                enterKeyHint="send"
                spellCheck="false"
                disabled={!isMyTurn}
                maxLength={targetLength !== 'any' ? parseInt(targetLength, 10) : 25}
                value={wordInput}
                onChange={e => {
                  setInputError(null);
                  setWordInput(e.target.value.toUpperCase());
                }}
                placeholder={
                  isMyTurn
                    ? `Starts with "${roomState.currentRequiredLetter.toUpperCase() || 'any'}"...`
                    : 'Wait for your turn...'
                }
                className="flex-1 bg-white border-2 sm:border-[3px] border-[#111111] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-lg sm:text-2xl font-black text-[#111111] shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] focus:outline-none focus:ring-4 focus:ring-black/20 disabled:opacity-60 uppercase"
              />

              <button
                type="submit"
                disabled={!isMyTurn || !wordInput.trim()}
                className="doodle-btn py-2.5 sm:py-3.5 px-4 sm:px-6 text-xs sm:text-sm shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Submit</span>
                <Send size={16} />
              </button>
            </div>

            {inputError && (
              <p className="text-[11px] sm:text-xs font-extrabold text-red-700 bg-red-100 px-2.5 py-1 rounded-lg border border-red-300">
                {inputError}
              </p>
            )}
          </form>
        )}
      </div>

      {/* GAME OVER WINNER MODAL */}
      {roomState.status === 'ended' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md doodle-card p-6 sm:p-8 text-center relative">
            <div className="w-24 h-24 mx-auto mb-3 bg-[#FFC928] border-[3px] border-[#111111] rounded-3xl flex items-center justify-center shadow-[4px_4px_0px_#111111] overflow-hidden">
              <MonsterAvatar
                id={roomState.players.find(p => p.id === roomState.winnerId)?.avatarId || 'monty'}
                size={80}
                mood="celebrate"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#FFC928] text-xs font-black px-3 py-1 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111] mb-2">
              <Trophy size={14} />
              WINNER ANNOUNCED
            </div>

            <h2 className="text-3xl font-black text-[#111111] tracking-tight">
              {roomState.winnerName || 'Match Complete!'}
            </h2>
            <p className="text-sm font-bold text-[#666666] mt-1">
              Chain length: {roomState.chain.length} words
            </p>

            {/* Scoreboard recap */}
            <div className="mt-5 space-y-2 max-h-48 overflow-y-auto">
              {[...roomState.players]
                .sort((a, b) => b.score - a.score)
                .map((p, idx) => (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border-2 ${
                      p.id === roomState.winnerId ? 'bg-[#FFC928]/30 border-[#111111]' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold">#{idx + 1}</span>
                      <MonsterAvatar id={p.avatarId} size={28} />
                      <span className="text-xs font-black">{p.name}</span>
                    </div>
                    <span className="font-mono text-sm font-black">{p.score} pts</span>
                  </div>
                ))}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {onRematch && (
                <button
                  onClick={onRematch}
                  className="flex-1 doodle-btn-yellow py-3"
                >
                  <RotateCcw size={18} />
                  <span>Rematch</span>
                </button>
              )}
              {onLeaveRoom && (
                <button
                  onClick={onLeaveRoom}
                  className="flex-1 doodle-btn py-3"
                >
                  <Home size={18} />
                  <span>Return Home</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RULES MODAL */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md doodle-card p-6 relative">
            <button
              onClick={() => setShowRulesModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-[#111111] flex items-center justify-center hover:bg-neutral-100"
            >
              <X size={16} />
            </button>
            <h3 className="text-xl font-black text-[#111111] mb-4">Current Match Rules</h3>
            <div className="space-y-2 text-xs font-bold text-[#333333]">
              <div className="flex justify-between py-1.5 border-b border-neutral-200">
                <span>Preset</span>
                <span className="uppercase font-black text-[#111111]">{roomState.settings.preset}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-200">
                <span>Word Length</span>
                <span className="font-black text-[#111111]">
                  {roomState.settings.wordLength === 'any'
                    ? `${roomState.settings.anyLengthMin} - ${roomState.settings.anyLengthMax} letters`
                    : `${roomState.settings.wordLength} letters`}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-200">
                <span>Turn Timer</span>
                <span className="font-black text-[#111111]">
                  {roomState.settings.turnTimeLimit === 0 ? 'No Limit' : `${roomState.settings.turnTimeLimit}s`}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-200">
                <span>Lives</span>
                <span className="font-black text-[#111111]">
                  {roomState.settings.lives === 0 ? 'Unlimited' : `${roomState.settings.lives} lives`}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-200">
                <span>Category</span>
                <span className="uppercase font-black text-[#111111]">{roomState.settings.category}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-200">
                <span>Invalid Word Penalty</span>
                <span className="uppercase font-black text-[#111111]">{roomState.settings.invalidWordPenalty.replace('_', ' ')}</span>
              </div>
            </div>
            <button
              onClick={() => setShowRulesModal(false)}
              className="mt-6 w-full doodle-btn py-2.5 text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
