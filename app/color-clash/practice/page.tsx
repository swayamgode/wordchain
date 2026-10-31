'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '../../../components/Navbar';
import { ColorTargetDisplay } from '../../../components/color-clash/ColorTargetDisplay';
import { RGBSliders } from '../../../components/color-clash/RGBSliders';
import { RoundReveal } from '../../../components/color-clash/RoundReveal';
import { PodiumModal } from '../../../components/color-clash/PodiumModal';
import { ColorMatchPlayer, RGBColor, ColorRoundResult } from '../../../lib/types/colorMatch';
import { generateRandomRGB, calculateColorDistance, calculateAccuracy, calculateRoundPoints, generateBotGuess } from '../../../lib/utils/colorUtils';
import { getLocalGuestProfile } from '../../../lib/supabase/client';
import { soundManager } from '../../../lib/audio/sounds';
import { ArrowLeft, Bot, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ColorClashPracticePage() {
  const [profile, setProfile] = useState<{ displayName: string; avatarId: string }>({
    displayName: 'Hunter',
    avatarId: 'monty',
  });

  const [currentRound, setCurrentRound] = useState(1);
  const totalRounds = 5;
  const roundDuration = 20;

  const [status, setStatus] = useState<'playing' | 'round_reveal' | 'game_over'>('playing');
  const [targetColor, setTargetColor] = useState<RGBColor>({ r: 255, g: 107, b: 107 });
  const [playerGuess, setPlayerGuess] = useState<RGBColor>({ r: 128, g: 128, b: 128 });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(roundDuration);
  const [revealTimeLeft, setRevealTimeLeft] = useState(5);
  const [lastRoundResult, setLastRoundResult] = useState<ColorRoundResult | null>(null);

  const [players, setPlayers] = useState<ColorMatchPlayer[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);

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

    setPlayers(initialPlayers);
    startNewRound(1, initialPlayers);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (revealTimerRef.current) clearInterval(revealTimerRef.current);
    };
  }, []);

  const startNewRound = (roundNum: number, currentPlayers: ColorMatchPlayer[]) => {
    const newTarget = generateRandomRGB();
    setTargetColor(newTarget);
    setPlayerGuess({ r: 128, g: 128, b: 128 });
    setHasSubmitted(false);
    setStatus('playing');
    setTimeLeft(roundDuration);

    setPlayers(prev =>
      (currentPlayers || prev).map(p => ({
        ...p,
        currentGuess: null,
        hasSubmitted: false,
      }))
    );

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          evaluateRoundEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmitGuess = () => {
    if (hasSubmitted || status !== 'playing') return;
    setHasSubmitted(true);

    setPlayers(prev =>
      prev.map(p => (p.id === 'player-1' ? { ...p, currentGuess: playerGuess, hasSubmitted: true } : p))
    );

    // Auto evaluate if user submitted
    evaluateRoundEnd(playerGuess);
  };

  const evaluateRoundEnd = (submittedGuess?: RGBColor) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const userGuess = submittedGuess || playerGuess;
    const bot1Guess = generateBotGuess(targetColor, 'medium');
    const bot2Guess = generateBotGuess(targetColor, 'easy');

    const guesses = [
      { id: 'player-1', guess: userGuess },
      { id: 'bot-1', guess: bot1Guess },
      { id: 'bot-2', guess: bot2Guess },
    ];

    // Compute diffs and accuracy
    const evaluated = guesses.map(g => {
      const p = players.find(x => x.id === g.id)!;
      const diff = calculateColorDistance(targetColor, g.guess);
      const accuracy = calculateAccuracy(diff);
      return {
        player: p,
        guess: g.guess,
        diff,
        accuracy,
      };
    });

    evaluated.sort((a, b) => a.diff - b.diff);

    const results = evaluated.map((item, rank) => {
      const pts = calculateRoundPoints(rank, item.accuracy);
      item.player.score += pts;
      item.player.lastRoundAccuracy = item.accuracy;
      item.player.lastRoundPoints = pts;

      return {
        playerId: item.player.id,
        playerName: item.player.name,
        avatarId: item.player.avatarId,
        guess: item.guess,
        diff: Math.round(item.diff * 10) / 10,
        accuracy: item.accuracy,
        pointsEarned: pts,
        totalScore: item.player.score,
        isWinner: rank === 0,
      };
    });

    const roundSummary: ColorRoundResult = {
      roundNumber: currentRound,
      targetColor,
      results,
      winnerId: results[0]?.playerId || null,
      winnerName: results[0]?.playerName || null,
    };

    setLastRoundResult(roundSummary);
    setStatus('round_reveal');
    setRevealTimeLeft(5);

    if (results[0]?.playerId === 'player-1') {
      soundManager.playCorrect();
    }

    if (revealTimerRef.current) clearInterval(revealTimerRef.current);
    revealTimerRef.current = setInterval(() => {
      setRevealTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(revealTimerRef.current!);
          if (currentRound >= totalRounds) {
            setStatus('game_over');
          } else {
            setCurrentRound(r => {
              const nextRound = r + 1;
              startNewRound(nextRound, players);
              return nextRound;
            });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRestart = () => {
    const resetPlayers = players.map(p => ({
      ...p,
      score: 0,
      currentGuess: null,
      hasSubmitted: false,
    }));
    setPlayers(resetPlayers);
    setCurrentRound(1);
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
              totalRounds={totalRounds}
              timeLeft={timeLeft}
              totalTime={roundDuration}
              avatarId={profile.avatarId}
            />

            <RGBSliders
              color={playerGuess}
              onChange={setPlayerGuess}
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
              totalRounds={totalRounds}
            />
          </div>
        )}

        {status === 'game_over' && (
          <PodiumModal
            players={players}
            winnerId={players[0]?.id || null}
            onPlayAgain={handleRestart}
            isHost={true}
          />
        )}
      </main>
    </div>
  );
}
