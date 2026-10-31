'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../../../components/Navbar';
import { ColorTargetDisplay } from '../../../components/color-clash/ColorTargetDisplay';
import { RGBSliders } from '../../../components/color-clash/RGBSliders';
import { RoundReveal } from '../../../components/color-clash/RoundReveal';
import { PodiumModal } from '../../../components/color-clash/PodiumModal';
import { ColorMatchPlayer, RGBColor, ColorRoundResult } from '../../../lib/types/colorMatch';
import { generateRandomRGB, calculateColorDistance, calculateAccuracy, calculateRoundPoints } from '../../../lib/utils/colorUtils';
import { soundManager } from '../../../lib/audio/sounds';
import { ArrowLeft, Users2, Sparkles, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { MonsterAvatar } from '../../../components/doodles/MonsterAvatars';

export default function ColorClashLocalPage() {
  const [currentRound, setCurrentRound] = useState(1);
  const totalRounds = 5;

  const [status, setStatus] = useState<'turn1' | 'pass_device' | 'turn2' | 'round_reveal' | 'game_over'>('turn1');
  const [targetColor, setTargetColor] = useState<RGBColor>({ r: 255, g: 107, b: 107 });

  const [p1Guess, setP1Guess] = useState<RGBColor>({ r: 128, g: 128, b: 128 });
  const [p2Guess, setP2Guess] = useState<RGBColor>({ r: 128, g: 128, b: 128 });
  const [activeGuess, setActiveGuess] = useState<RGBColor>({ r: 128, g: 128, b: 128 });

  const [lastRoundResult, setLastRoundResult] = useState<ColorRoundResult | null>(null);

  const [players, setPlayers] = useState<ColorMatchPlayer[]>([
    {
      id: 'p1',
      name: 'Player 1 (Monty)',
      avatarId: 'monty',
      isHost: true,
      isReady: true,
      score: 0,
      currentGuess: null,
      hasSubmitted: false,
      isConnected: true,
    },
    {
      id: 'p2',
      name: 'Player 2 (Gloop)',
      avatarId: 'gloop',
      isHost: false,
      isReady: true,
      score: 0,
      currentGuess: null,
      hasSubmitted: false,
      isConnected: true,
    },
  ]);

  useEffect(() => {
    startNewRound(1);
  }, []);

  const startNewRound = (roundNum: number) => {
    const newTarget = generateRandomRGB();
    setTargetColor(newTarget);
    setP1Guess({ r: 128, g: 128, b: 128 });
    setP2Guess({ r: 128, g: 128, b: 128 });
    setActiveGuess({ r: 128, g: 128, b: 128 });
    setStatus('turn1');
  };

  const handleP1Submit = () => {
    setP1Guess(activeGuess);
    setActiveGuess({ r: 128, g: 128, b: 128 });
    setStatus('pass_device');
  };

  const handleP2Start = () => {
    setStatus('turn2');
  };

  const handleP2Submit = () => {
    const finalP2Guess = activeGuess;
    setP2Guess(finalP2Guess);

    // Evaluate
    const diff1 = calculateColorDistance(targetColor, p1Guess);
    const acc1 = calculateAccuracy(diff1);
    const diff2 = calculateColorDistance(targetColor, finalP2Guess);
    const acc2 = calculateAccuracy(diff2);

    const evaluated = [
      { id: 'p1', guess: p1Guess, diff: diff1, accuracy: acc1 },
      { id: 'p2', guess: finalP2Guess, diff: diff2, accuracy: acc2 },
    ].sort((a, b) => a.diff - b.diff);

    const updatedPlayers = [...players];
    const results = evaluated.map((item, rank) => {
      const pts = calculateRoundPoints(rank, item.accuracy);
      const idx = updatedPlayers.findIndex(x => x.id === item.id);
      if (idx !== -1) {
        updatedPlayers[idx] = {
          ...updatedPlayers[idx],
          score: updatedPlayers[idx].score + pts,
          lastRoundAccuracy: item.accuracy,
          lastRoundPoints: pts,
        };
      }

      return {
        playerId: item.id,
        playerName: updatedPlayers[idx]?.name ?? '',
        avatarId: updatedPlayers[idx]?.avatarId ?? '',
        guess: item.guess,
        diff: Math.round(item.diff * 10) / 10,
        accuracy: item.accuracy,
        pointsEarned: pts,
        totalScore: updatedPlayers[idx]?.score ?? 0,
        isWinner: rank === 0,
      };
    });

    setPlayers(updatedPlayers);

    const roundSummary: ColorRoundResult = {
      roundNumber: currentRound,
      targetColor,
      results,
      winnerId: results[0]?.playerId || null,
      winnerName: results[0]?.playerName || null,
    };

    setLastRoundResult(roundSummary);
    setStatus('round_reveal');
    soundManager.playCorrect();
  };

  const handleNextRound = () => {
    if (currentRound >= totalRounds) {
      setStatus('game_over');
    } else {
      setCurrentRound(r => {
        const next = r + 1;
        startNewRound(next);
        return next;
      });
    }
  };

  const handleRestart = () => {
    setPlayers(prev =>
      prev.map(p => ({
        ...p,
        score: 0,
        currentGuess: null,
        hasSubmitted: false,
      }))
    );
    setCurrentRound(1);
    startNewRound(1);
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
            Exit Local
          </Link>

          <div className="flex items-center gap-1.5 bg-blue-100 border-2 border-blue-600 text-blue-900 px-3 py-1 rounded-full text-xs font-black">
            <Users2 size={14} />
            2-Player Pass & Play
          </div>
        </div>

        {/* Turn 1: Player 1 */}
        {status === 'turn1' && (
          <div className="space-y-4">
            <div className="p-3 bg-amber-100 border-2 border-[#111111] rounded-xl flex items-center justify-between shadow-[2px_2px_0px_#111111]">
              <div className="flex items-center gap-2">
                <MonsterAvatar id="monty" size={24} />
                <span className="text-xs sm:text-sm font-black text-[#111111]">
                  PLAYER 1&apos;S TURN (Monty)
                </span>
              </div>
              <span className="text-xs font-bold text-[#666666]">Don&apos;t let Player 2 peek!</span>
            </div>

            <ColorTargetDisplay
              targetColor={targetColor}
              playerColor={activeGuess}
              currentRound={currentRound}
              totalRounds={totalRounds}
              timeLeft={30}
              totalTime={30}
              avatarId="monty"
            />

            <RGBSliders
              color={activeGuess}
              onChange={setActiveGuess}
              onSubmit={handleP1Submit}
              submitLabel="LOCK IN & PASS TO PLAYER 2"
            />
          </div>
        )}

        {/* Pass Device Intermission */}
        {status === 'pass_device' && (
          <div className="doodle-card p-6 bg-white text-center space-y-4 my-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 border-2 border-[#111111] flex items-center justify-center mx-auto shadow-[3px_3px_0px_#111111]">
              <MonsterAvatar id="gloop" size={36} />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#111111]">
                Pass Device to Player 2
              </h3>
              <p className="text-xs sm:text-sm font-bold text-[#666666] mt-1">
                Player 1 has locked in their secret guess. Hand the phone or tablet to Player 2!
              </p>
            </div>

            <button
              type="button"
              onClick={handleP2Start}
              className="w-full py-4 bg-[#FFC928] hover:bg-[#ffcf3e] border-2 sm:border-[3px] border-[#111111] rounded-xl font-black text-sm uppercase tracking-wider shadow-[3px_3px_0px_#111111] active:translate-y-[2px] transition-all flex items-center justify-center gap-2"
            >
              <UserCheck size={18} />
              I AM PLAYER 2 — START TURN
            </button>
          </div>
        )}

        {/* Turn 2: Player 2 */}
        {status === 'turn2' && (
          <div className="space-y-4">
            <div className="p-3 bg-blue-100 border-2 border-[#111111] rounded-xl flex items-center justify-between shadow-[2px_2px_0px_#111111]">
              <div className="flex items-center gap-2">
                <MonsterAvatar id="gloop" size={24} />
                <span className="text-xs sm:text-sm font-black text-[#111111]">
                  PLAYER 2&apos;S TURN (Gloop)
                </span>
              </div>
              <span className="text-xs font-bold text-[#666666]">Match the target!</span>
            </div>

            <ColorTargetDisplay
              targetColor={targetColor}
              playerColor={activeGuess}
              currentRound={currentRound}
              totalRounds={totalRounds}
              timeLeft={30}
              totalTime={30}
              avatarId="gloop"
            />

            <RGBSliders
              color={activeGuess}
              onChange={setActiveGuess}
              onSubmit={handleP2Submit}
              submitLabel="LOCK IN & REVEAL RESULTS"
            />
          </div>
        )}

        {/* Round Reveal */}
        {status === 'round_reveal' && lastRoundResult && (
          <div className="space-y-4">
            <RoundReveal
              result={lastRoundResult}
              revealTimeLeft={0}
              currentRound={currentRound}
              totalRounds={totalRounds}
            />

            <button
              type="button"
              onClick={handleNextRound}
              className="w-full py-4 bg-[#FFC928] hover:bg-[#ffcf3e] border-2 sm:border-[3px] border-[#111111] rounded-xl font-black text-sm uppercase tracking-wider shadow-[3px_3px_0px_#111111] active:translate-y-[2px] transition-all"
            >
              {currentRound >= totalRounds ? 'SEE FINAL RESULTS →' : 'NEXT ROUND →'}
            </button>
          </div>
        )}

        {/* Game Over */}
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
