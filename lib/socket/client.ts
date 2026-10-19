'use client';

import { io, Socket } from 'socket.io-client';
import { RoomState } from '../types/game';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    // Supports dedicated backend server (e.g. Render) or same origin
    const socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL ||
      (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

    socket = io(socketUrl, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 10000,
    });
  }

  if (socket && !socket.connected) {
    socket.connect();
  }

  return socket;
}

export interface SocketCallbackResponse<T = unknown> {
  error?: string;
  roomCode?: string;
  playerId?: string;
  state?: RoomState;
  success?: boolean;
  queueSize?: number;
  data?: T;
}
