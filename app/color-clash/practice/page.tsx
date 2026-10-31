'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from '../../../components/Navbar';
import { ColorTargetDisplay } from '../../../components/color-clash/ColorTargetDisplay';
import { RGBSliders } from '../../../components/color-clash/RGBSliders';
import { RoundReveal } from '../../../components/color-clash/RoundReveal';
import { PodiumModal } from '../../../components/color-clash/PodiumModal';
import { ColorMatchPlayer, RGBColor, ColorRoundResult } from '../../../lib/types/colorMatch';
import { generateRandomRGB, calculateColorDistance, calculateAccuracy, calculateRoundPoints, generateBotGuess } from '../../../lib/utils/colorUtils';
import { getLocalGuestProfile } from '../../../lib/supabase/client';
import { soundManager } from '../../../lib/audio/sounds';
import { ArrowLeft, Bot } from 'lucide-react';
import Link from 'next/link';

const TOTAL_ROUNDS = 5;
const ROUND_DURATION = 20;
const REVEAL_DURATION = 5;

export default function ColorClashPracticePage() {
  const [profile, setProfile] = useState<{ displayName: string; avatarId: string }>({
    displayName: 'Hunter',
    avatarId: 'monty',
  });

  const [currentRound, setCurrentRound] = useState(1);
  const [status, setStatus] = useState<'playing' | 'round_reveal' | 'game_over'>('playing');
  const [targetColor, setTargetColor] = useState<RGBColor>({ r: 255, g: 107, b: 107 });
  const [playerGuess, setPlayerGuess] = useState<RGBColor>({ r: 128, g: 128, b: 128 });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION);
  const [revealTimeLeft, setRevealTimeLeft] = useState(REVEAL_DURATION);
  const [lastRoundResult, setLastRoundResult] = useState<ColorRoundResult | null>(null);
  const [players, setPlayers] = useState<ColorMatchPlayer[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Refs to avoid stale closures in intervals
  const currentRoundRef = useRef(1);
  const playersRef = useRef<ColorMatchPlayer[]>([]);
  const targetColorRef = useRef<RGBColor>({ r: 255, g: 107, b: 107 });
  const playerGuessRef = useRef<RGBColor>({ r: 128, g: 128, b: 128 });
  const evaluatingRef = useRef(false);

  // Keep refs in sync
  useEffect(() => { currentRoundRef.current = currentRound; }, [currentRound]);
  useEffect(() => { playersRef.current = players; }, [players]);
  useEffect(() => { targetColorRef.current = targetColor; }, [targetColor]);
  useEffect(() => { playerGuessRef.current = playerGuess; }, [playerGuess]);

  const clearTimers = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (revealTimerRef.current) { clearInterval(revealTimerRef.current); revealTimerRef.current = null; }
  }, []);

  const startNewRound = useCallback((roundNum: number, currentPlayers: ColorMatchPlayer[]) => {
    evaluatingRef.current = false;
    const newTarget = generateRandomRGB();
    setTargetColor(newTarget);
    targetColorRef.current = newTarget;
    setPlayerGuess({ r: 128, g: 128, b: 128 });
    playerGuessRef.current = { r: 128, g: 128, b: 128 };
    setHasSubmitted(false);
    setStatus('playing');
    setTimeLeft(ROUND_DURATION);

    const resetPlayers = currentPlayers.map(p => ({
      ...p,
      currentGuess: null,
      hasSubmitted: false,
    }));
    setPlayers(resetPlayers);
    playersRef.current = resetPlayers;

    clearTimers();
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
          // Defer evaluation to avoid setState-in-setState
          setTimeout(() => doEvaluate(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimers]);

  const doEvaluate = useCallback((submittedGuess?: RGBColor) => {
    if (evaluatingRef.current) return;
    evaluatingRef.current = true;

    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }

    const target = targetColorRef.current;
    const userGuess = submittedGuess || playerGuessRef.current;
    const bot1Guess = generateBotGuess(target, 'medium');
    const bot2Guess = generateBotGuess(target, 'easy');
    const round = currentRoundRef.current;
    const currentPlayers = playersRef.current;

    const guesses = [
      { id: 'player-1', guess: userGuess },
      { id: 'bot-1', guess: bot1Guess },
      { id: 'bot-2', guess: bot2Guess },
    ];

    const evaluated = guesses.map(g => {
      const p = currentPlayers.find(x => x.id === g.id)!;
      const diff = calculateColorDistance(target, g.guess);
      const accuracy = calculateAccuracy(diff);
      return { player: { ...p }, guess: g.guess, diff, accuracy };
    });

    evaluated.sort((a, b) => a.diff - b.diff);

    const updatedPlayers = [...currentPlayers];
    const results = evaluated.map((item, rank) => {
      const pts = calculateRoundPoints(rank, item.accuracy);
      const idx = updatedPlayers.findIndex(p => p.id === item.player.id);
      if (idx !== -1) {
        updatedPlayers[idx] = {
          ...updatedPlayers[idx],
          score: updatedPlayers[idx].score + pts,
          lastRoundAccuracy: item.accuracy,
          lastRoundPoints: pts,
        };
      }

      return {
        playerId: item.player.id,
        playerName: item.player.name,
        avatarId: item.player.avatarId,
        guess: item.guess,
        diff: Math.round(item.diff * 10) / 10,
        accuracy: item.accuracy,
        pointsEarned: pts,
        totalScore: updatedPlayers[idx]?.score ?? 0,
        isWinner: rank === 0,
      };
    });

    setPlayers(updatedPlayers);
    playersRef.current = updatedPlayers;

    const roundSummary: ColorRoundResult = {
      roundNumber: round,
      targetColor: target,
      results,
      winnerId: results[0]?.playerId || null,
      winnerName: results[0]?.playerName || null,
    };

    setLastRoundResult(roundSummary);
    setStatus('round_reveal');
    setRevealTimeLeft(REVEAL_DURATION);

    if (results[0]?.playerId === 'player-1') {
      soundManager.playCorrect();
    }

    if (revealTimerRef.current) { clearInterval(revealTimerRef.current); revealTimerRef.current = null; }
    revealTimerRef.current = setInterval(() => {
      setRevealTimeLeft(prev => {
        if (prev <= 1) {
          if (revealTimerRef.current) { clearInterval(revealTimerRef.current); revealTimerRef.current = null; }
          const r = currentRoundRef.current;
          const p = playersRef.current;
          if (r >= TOTAL_ROUNDS) {
            setStatus('game_over');
          } else {
            const nextRound = r + 1;
            setCurrentRound(nextRound);
            currentRoundRef.current = nextRound;
            // Defer to avoid nested setState
            setTimeout(() => startNewRound(nextRound, p), 0);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [startNewRound]);

  const handleSubmitGuess = useCallback(() => {
    if (hasSubmitted || status !== 'playing') return;
    setHasSubmitted(true);

    const guess = playerGuessRef.current;
    setPlayers(prev =>
      prev.map(p => (p.id === 'player-1' ? { ...p, currentGuess: guess, hasSubmitted: true } : p))
    );

    doEvaluate(guess);
  }, [hasSubmitted, status, doEvaluate]);

  useEffect(() => {
    const prof = getLocalGuestProfile();
    setProfile(prof);

    const initialPlayers: ColorMatchPlayer[] = [
      {
        id: 'player-1',
        name: prof.displayName || 'You',
        avatarId: prof.avatarId || 'monty',
        isHost: true,
        isReady: true,
        score: 0,
        currentGuess: null,
        hasSubmitted: false,
        isConnected: true,
      },
      {
        id: 'bot-1',
        name: 'Chroma Bot',
        avatarId: 'cyclops',
        isHost: false,
        isReady: true,
        isBot: true,
        botAccuracyTier: 'medium',
        score: 0,
        currentGuess: null,
        hasSubmitted: false,
        isConnected: true,
      },
      {
        id: 'bot-2',
        name: 'Huey',
        avatarId: 'zippy',
        isHost: false,
        isReady: true,
        isBot: true,
        botAccuracyTier: 'easy',
        score: 0,
        currentGuess: null,
        hasSubmitted: false,
        isConnected: true,
      },
    ];

    playersRef.current = initialPlayers;
    setPlayers(initialPlayers);
    startNewRound(1, initialPlayers);

    return () => clearTimers();
  }, []);

  const handleRestart = () => {
    const resetPlayers = playersRef.current.map(p => ({
      ...p,
      score: 0,
      currentGuess: null,
      hasSubmitted: false,
    }));
    setPlayers(resetPlayers);
    playersRef.current = resetPlayers;
    setCurrentRound(1);
    currentRoundRef.current = 1;
    startNewRound(1, resetPlayers);
  };

  return (
    <div className="min-h-screen bg-[#FAF7EE] flex flex-col justify-between selection:bg-[#FFC928]">
      <Navbar />

      <main className="flex-1 w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4">
        {/* Top Back bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/color-clash"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#111111] bg-white border-2 border-[#111111] px-3 py-1.5 rounded-full shadow-[2px_2px_0px_#111111] hover:bg-neutral-50 transition-colors"
          >
            <ArrowLeft size={14} />
            Exit Practice
          </Link>

          <div className="flex items-center gap-1.5 bg-purple-100 border-2 border-purple-600 text-purple-900 px-3 py-1 rounded-full text-xs font-black">
            <Bot size={14} />
            Solo AI Practice
          </div>
        </div>

        {status === 'playing' && (
          <div className="space-y-4">
            <ColorTargetDisplay
              targetColor={targetColor}
              playerColor={playerGuess}
              currentRound={currentRound}
              totalRounds={TOTAL_ROUNDS}
              timeLeft={timeLeft}
              totalTime={ROUND_DURATION}
              avatarId={profile.avatarId}
            />

            <RGBSliders
              color={playerGuess}
              onChange={(c) => { setPlayerGuess(c); playerGuessRef.current = c; }}
              onSubmit={handleSubmitGuess}
              hasSubmitted={hasSubmitted}
            />
          </div>
        )}

        {status === 'round_reveal' && lastRoundResult && (
          <div className="space-y-4">
            <RoundReveal
              result={lastRoundResult}
              revealTimeLeft={revealTimeLeft}
              currentRound={currentRound}
              totalRounds={TOTAL_ROUNDS}
            />
          </div>
        )}

        {status === 'game_over' && (
          <PodiumModal
            players={players}
            winnerId={
              [...players].sort((a, b) => b.score - a.score)[0]?.id || null
            }
            onPlayAgain={handleRestart}
            isHost={true}
          />
        )}
      </main>
    </div>
  );
}
