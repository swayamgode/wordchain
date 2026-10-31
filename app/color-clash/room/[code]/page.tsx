'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '../../../../components/Navbar';
import { ColorClashLobby } from '../../../../components/color-clash/ColorClashLobby';
import { ColorTargetDisplay } from '../../../../components/color-clash/ColorTargetDisplay';
import { RGBSliders } from '../../../../components/color-clash/RGBSliders';
import { RoundReveal } from '../../../../components/color-clash/RoundReveal';
import { PodiumModal } from '../../../../components/color-clash/PodiumModal';
import { ColorMatchRoomState, ColorRoundResult, RGBColor, ColorRoundTimerOption, ColorTotalRoundsOption } from '../../../../lib/types/colorMatch';
import { getSocket } from '../../../../lib/socket/client';
import { getLocalGuestProfile } from '../../../../lib/supabase/client';
import { soundManager } from '../../../../lib/audio/sounds';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

function ColorClashMultiplayerRoomContent() {
  const params = useParams();
  const router = useRouter();
  const roomCode = ((params?.code as string) || '').toUpperCase();

  const [socketConnected, setSocketConnected] = useState(false);
  const [roomState, setRoomState] = useState<ColorMatchRoomState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [myPlayerId, setMyPlayerId] = useState<string>('');

  const [currentGuess, setCurrentGuess] = useState<RGBColor>({ r: 128, g: 128, b: 128 });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [revealTimeLeft, setRevealTimeLeft] = useState(5);
  const [lastRoundResult, setLastRoundResult] = useState<ColorRoundResult | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!roomCode) return;

    const socket = getSocket();
    const prof = getLocalGuestProfile();

    const onConnect = () => {
      setSocketConnected(true);
      setMyPlayerId(socket.id || '');

      // Attempt to join the room
      socket.emit(
        'color_join_room',
        {
          roomCode,
          playerName: prof.displayName || 'Guest',
          avatarId: prof.avatarId || 'monty',
        },
        (res: { error?: string; state?: ColorMatchRoomState }) => {
          if (res.error) {
            setError(res.error);
          } else if (res.state) {
            setRoomState(res.state);
          }
        }
      );
    };

    if (socket.connected) {
      onConnect();
    } else {
      socket.on('connect', onConnect);
    }

    socket.on('color_room_state', (state: ColorMatchRoomState) => {
      setRoomState(state);
      if (state.history.length > 0) {
        setLastRoundResult(state.history[state.history.length - 1]);
      }
    });

    socket.on('color_round_end', (result: ColorRoundResult) => {
      setLastRoundResult(result);
      soundManager.playCorrect();
    });

    socket.on('color_game_over', () => {
      soundManager.playVictory();
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('color_room_state');
      socket.off('color_round_end');
      socket.off('color_game_over');
      socket.emit('color_leave_room', { roomCode });
      if (timerRef.current) clearInterval(timerRef.current);
      if (revealTimerRef.current) clearInterval(revealTimerRef.current);
    };
  }, [roomCode]);

  // Round Deadline Timer
  useEffect(() => {
    if (roomState?.status === 'playing' && roomState.roundDeadline) {
      setHasSubmitted(false);
      setCurrentGuess({ r: 128, g: 128, b: 128 });

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((roomState.roundDeadline! - Date.now()) / 1000));
        setTimeLeft(remaining);
        if (remaining <= 0 && timerRef.current) {
          clearInterval(timerRef.current);
        }
      }, 500);
    } else if (roomState?.status === 'round_reveal' && roomState.revealDeadline) {
      if (revealTimerRef.current) clearInterval(revealTimerRef.current);
      revealTimerRef.current = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((roomState.revealDeadline! - Date.now()) / 1000));
        setRevealTimeLeft(remaining);
        if (remaining <= 0 && revealTimerRef.current) {
          clearInterval(revealTimerRef.current);
        }
      }, 500);
    }
  }, [roomState?.status, roomState?.roundDeadline, roomState?.revealDeadline]);

  const handleToggleReady = () => {
    const socket = getSocket();
    socket.emit('color_toggle_ready', { roomCode });
  };

  const handleStartGame = () => {
    const socket = getSocket();
    socket.emit('color_start_game', { roomCode });
  };

  const handleUpdateSettings = (settings: { roundTimeLimit?: ColorRoundTimerOption; totalRounds?: ColorTotalRoundsOption }) => {
    const socket = getSocket();
    socket.emit('color_update_settings', { roomCode, settings });
  };

  const handleSubmitGuess = () => {
    if (hasSubmitted || roomState?.status !== 'playing') return;
    setHasSubmitted(true);
    const socket = getSocket();
    socket.emit('color_submit_guess', { roomCode, guess: currentGuess });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF7EE] flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="doodle-card p-6 bg-white max-w-sm text-center space-y-3">
            <AlertCircle size={36} className="text-red-500 mx-auto" />
            <h2 className="text-xl font-black text-[#111111]">Unable to Join Room</h2>
            <p className="text-xs font-bold text-[#666666]">{error}</p>
            <Link
              href="/color-clash"
              className="inline-block w-full py-3 bg-[#FFC928] border-2 border-[#111111] rounded-xl font-black text-xs uppercase shadow-[2px_2px_0px_#111111] hover:bg-[#ffcf3e]"
            >
              Back to Color Clash Hub
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!roomState) {
    return (
      <div className="min-h-screen bg-[#FAF7EE] flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="flex items-center gap-2 text-sm font-black text-[#111111]">
            <Loader2 className="animate-spin" size={18} />
            Connecting to Color Room {roomCode}...
          </div>
        </main>
      </div>
    );
  }

  const me = roomState.players.find(p => p.id === myPlayerId);

  return (
    <div className="min-h-screen bg-[#FAF7EE] flex flex-col justify-between selection:bg-[#FFC928]">
      <Navbar />

      <main className="flex-1 w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4">
        {/* Lobby Mode */}
        {roomState.status === 'lobby' && (
          <ColorClashLobby
            state={roomState}
            myPlayerId={myPlayerId}
            onToggleReady={handleToggleReady}
            onStartGame={handleStartGame}
            onUpdateSettings={handleUpdateSettings}
          />
        )}

        {/* Playing Round */}
        {roomState.status === 'playing' && (
          <div className="space-y-4">
            <ColorTargetDisplay
              targetColor={roomState.targetColor}
              playerColor={currentGuess}
              currentRound={roomState.currentRound}
              totalRounds={roomState.totalRounds}
              timeLeft={timeLeft}
              totalTime={roomState.settings.roundTimeLimit}
              avatarId={me?.avatarId || 'monty'}
            />

            <RGBSliders
              color={currentGuess}
              onChange={setCurrentGuess}
              onSubmit={handleSubmitGuess}
              hasSubmitted={hasSubmitted || me?.hasSubmitted}
            />
          </div>
        )}

        {/* Round Reveal */}
        {roomState.status === 'round_reveal' && lastRoundResult && (
          <div className="space-y-4">
            <RoundReveal
              result={lastRoundResult}
              revealTimeLeft={revealTimeLeft}
              currentRound={roomState.currentRound}
              totalRounds={roomState.totalRounds}
            />
          </div>
        )}

        {/* Game Over */}
        {roomState.status === 'game_over' && (
          <PodiumModal
            players={roomState.players}
            winnerId={roomState.winnerId}
            onPlayAgain={handleStartGame}
            isHost={me?.isHost || false}
          />
        )}
      </main>
    </div>
  );
}

export default function ColorClashMultiplayerRoom() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-bold">
          <p>Connecting to room...</p>
        </div>
      }
    >
      <ColorClashMultiplayerRoomContent />
    </Suspense>
  );
}

