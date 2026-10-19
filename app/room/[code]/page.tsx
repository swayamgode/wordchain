'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Copy,
  Check,
  Share2,
  Users,
  Play,
  RotateCcw,
  LogOut,
  Sliders,
  Sparkles,
  Shield,
  AlertCircle,
} from 'lucide-react';
import { Navbar } from '../../../components/Navbar';
import { TopoDoodlePattern } from '../../../components/doodles/DoodleBackground';
import { MonsterAvatar } from '../../../components/doodles/MonsterAvatars';
import { GameArena } from '../../../components/game/GameArena';
import { RoomState, Player } from '../../../lib/types/game';
import { getSocket } from '../../../lib/socket/client';
import { getLocalGuestProfile } from '../../../lib/supabase/client';
import { soundManager } from '../../../lib/audio/sounds';

function RoomPageContent() {
  const params = useParams();
  const router = useRouter();
  const roomCode = ((params?.code as string) || '').toUpperCase();

  const [roomState, setRoomState] = useState<RoomState | null>(null);
  const [myPlayerId, setMyPlayerId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    if (!roomCode) return;

    const socket = getSocket();
    const profile = getLocalGuestProfile();

    setMyPlayerId(socket.id || '');

    // 1. Join room
    socket.emit(
      'join_room',
      {
        roomCode,
        playerName: profile.displayName,
        avatarId: profile.avatarId,
      },
      (res: { error?: string; playerId?: string; state?: RoomState }) => {
        if (res.error) {
          // If socket already created room, fetch state
          socket.emit('get_room_state', { roomCode }, (stateRes: { error?: string; state?: RoomState }) => {
            if (stateRes.state) {
              setRoomState(stateRes.state);
              setMyPlayerId(socket.id || '');
            } else {
              setErrorMessage(res.error || 'Failed to join room');
            }
          });
        } else {
          if (res.playerId) setMyPlayerId(res.playerId);
          if (res.state) setRoomState(res.state);
        }
      }
    );

    // 2. Listen to authoritative room state broadcasts
    const handleRoomState = (state: RoomState) => {
      setRoomState(state);
    };

    socket.on('room_state', handleRoomState);

    return () => {
      socket.off('room_state', handleRoomState);
    };
  }, [roomCode]);

  const handleCopyCode = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(roomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    soundManager.playClick();
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleToggleReady = () => {
    soundManager.playClick();
    const socket = getSocket();
    socket.emit('toggle_ready', { roomCode, playerId: myPlayerId });
  };

  const handleStartMatch = () => {
    soundManager.playClick();
    setIsStarting(true);
    const socket = getSocket();
    socket.emit('start_match', { roomCode, playerId: myPlayerId }, (res: { error?: string }) => {
      setIsStarting(false);
      if (res?.error) {
        setErrorMessage(res.error);
      }
    });
  };

  const handleSubmitWord = (word: string) => {
    const socket = getSocket();
    socket.emit('submit_word', { roomCode, playerId: myPlayerId, word });
  };

  const handleRematch = () => {
    soundManager.playClick();
    const socket = getSocket();
    socket.emit('rematch', { roomCode });
  };

  const handleLeaveRoom = () => {
    soundManager.playClick();
    const socket = getSocket();
    socket.emit('leave_room', { roomCode });
    router.push('/');
  };

  if (errorMessage && !roomState) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto p-8 text-center doodle-card my-auto">
          <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />
          <h2 className="text-2xl font-black text-[#111111]">Room Error</h2>
          <p className="text-sm font-bold text-[#666666] mt-2">{errorMessage}</p>
          <button onClick={() => router.push('/')} className="mt-6 doodle-btn w-full">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!roomState) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto p-8 text-center my-auto">
          <div className="w-16 h-16 mx-auto bg-[#FFC928] border-2 border-[#111111] rounded-2xl flex items-center justify-center animate-spin mb-4">
            <Sparkles size={28} />
          </div>
          <p className="font-mono text-sm font-black text-[#111111]">Connecting to Room {roomCode}...</p>
        </div>
      </div>
    );
  }

  // If match in progress or ended, render authoritative GameArena
  if (roomState.status === 'in_progress' || roomState.status === 'ended') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <GameArena
          roomState={roomState}
          currentPlayerId={myPlayerId}
          onSubmitWord={handleSubmitWord}
          onRematch={handleRematch}
          onLeaveRoom={handleLeaveRoom}
        />
      </div>
    );
  }

  const isHost = roomState.hostId === myPlayerId;
  const myPlayer = roomState.players.find(p => p.id === myPlayerId);
  const canStart = isHost && roomState.players.length >= 2;

  // LOBBY VIEW
  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex-1">
        {/* ROOM CODE HERO CARD */}
        <div className="doodle-card-yellow p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-black uppercase text-[#111111] bg-white px-3 py-1 rounded-full border border-[#111111] shadow-[1px_1px_0px_#111111]">
              Match Lobby
            </span>
            <div className="flex items-center gap-3 mt-2">
              <h1 className="font-mono text-4xl sm:text-5xl font-black tracking-widest text-[#111111]">
                {roomCode}
              </h1>
              <button
                onClick={handleCopyCode}
                title="Copy Room Code"
                className="w-10 h-10 bg-white border-2 border-[#111111] rounded-xl flex items-center justify-center shadow-[2px_2px_0px_#111111] hover:bg-neutral-50"
              >
                {copiedCode ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
              </button>
            </div>
            <p className="text-xs font-bold text-[#333333] mt-1">
              Share this code or invitation link with friends to join.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleCopyLink}
              className="doodle-btn py-3 px-5 text-xs justify-center"
            >
              {copiedLink ? <Check size={16} /> : <Share2 size={16} />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Invite Link'}</span>
            </button>
          </div>
        </div>

        {/* LOBBY CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* PLAYERS LIST (8 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={18} />
                <h2 className="text-lg font-black text-[#111111]">
                  Players ({roomState.players.length}/{roomState.settings.playerCount})
                </h2>
              </div>
              {roomState.players.length < 2 && (
                <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                  Waiting for min 2 players...
                </span>
              )}
            </div>

            <div className="space-y-2.5">
              {roomState.players.map((p, idx) => (
                <div
                  key={p.id}
                  className="doodle-card p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#FFC928]/40 border-2 border-[#111111] rounded-2xl flex items-center justify-center overflow-hidden">
                      <MonsterAvatar id={p.avatarId} size={40} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-[#111111]">{p.name}</span>
                        {p.isHost && (
                          <span className="text-[10px] font-black bg-[#FFC928] px-1.5 py-0.2 rounded border border-[#111111]">
                            HOST
                          </span>
                        )}
                        {p.id === myPlayerId && (
                          <span className="text-[10px] font-bold text-neutral-500">(You)</span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-[#777777]">
                        {p.isConnected ? '● Connected' : '○ Reconnecting...'}
                      </span>
                    </div>
                  </div>

                  <div>
                    {p.isHost ? (
                      <span className="text-xs font-black text-[#111111] bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-300">
                        Host
                      </span>
                    ) : p.isReady ? (
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-400 flex items-center gap-1">
                        <Check size={14} /> Ready
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-300">
                        Waiting
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Ready / Start Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {!isHost && (
                <button
                  onClick={handleToggleReady}
                  className={`w-full py-3.5 text-sm ${myPlayer?.isReady ? 'doodle-btn-yellow' : 'doodle-btn'}`}
                >
                  <Check size={18} />
                  <span>{myPlayer?.isReady ? 'I am Ready!' : 'Click when Ready'}</span>
                </button>
              )}

              {isHost && (
                <button
                  onClick={handleStartMatch}
                  disabled={!canStart || isStarting}
                  className="w-full doodle-btn-yellow py-3.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed group"
                >
                  <Play size={18} className="fill-[#111111]" />
                  <span>{isStarting ? 'Starting...' : 'Start Match Now'}</span>
                </button>
              )}

              <button
                onClick={handleLeaveRoom}
                className="doodle-btn bg-neutral-800 py-3.5 px-6 text-sm"
              >
                <LogOut size={16} />
                <span>Leave</span>
              </button>
            </div>
          </div>

          {/* SETTINGS SUMMARY (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="doodle-card p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-xs font-black uppercase text-[#888888]">Configured Rules</span>
                <span className="text-xs font-mono font-black uppercase bg-[#FFC928] px-2 py-0.5 rounded border border-[#111111]">
                  {roomState.settings.preset}
                </span>
              </div>

              <div className="space-y-2 text-xs font-bold text-[#333333]">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span>Word Length</span>
                  <span className="font-black">
                    {roomState.settings.wordLength === 'any'
                      ? `${roomState.settings.anyLengthMin}-${roomState.settings.anyLengthMax} Letters`
                      : `${roomState.settings.wordLength} Letters`}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span>Turn Timer</span>
                  <span className="font-black">
                    {roomState.settings.turnTimeLimit === 0 ? 'No countdown' : `${roomState.settings.turnTimeLimit}s`}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span>Lives</span>
                  <span className="font-black">
                    {roomState.settings.lives === 0 ? 'Unlimited' : `${roomState.settings.lives} Lives`}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span>Category</span>
                  <span className="font-black uppercase">{roomState.settings.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span>Invalid Word</span>
                  <span className="font-black uppercase">{roomState.settings.invalidWordPenalty.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Repeated Words</span>
                  <span className="font-black">{roomState.settings.allowRepeatedWords ? 'Allowed' : 'Disabled'}</span>
                </div>
              </div>

              {isHost && (
                <p className="text-[11px] font-bold text-[#777777] pt-2">
                  Tip: You are the Host. Only you can launch the match once 2+ players join.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function RoomPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-bold">
          <p>Connecting to room...</p>
        </div>
      }
    >
      <RoomPageContent />
    </Suspense>
  );
}
