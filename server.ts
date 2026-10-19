import { createServer } from 'http';
import next from 'next';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { WordChainEngine } from './lib/engine/WordChainEngine';
import {
  createRoomSchema,
  joinRoomSchema,
  submitWordSchema,
  toggleReadySchema,
  updateSettingsSchema,
  matchmakingQueueSchema,
} from './lib/validation/schemas';
import {
  MatchmakingRequest,
  Player,
  PresetName,
} from './lib/types/game';
import { getSettingsForPreset } from './lib/constants/presets';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Generate random 6-character room codes
function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// In-memory active game rooms & engines
const rooms = new Map<string, WordChainEngine>();
// Active matchmaking queue
const matchmakingQueue = new Map<string, MatchmakingRequest & { socketId: string }>();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      await handle(req, res);
    } catch (err) {
      console.error('Error handling request:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    pingInterval: 10000,
    pingTimeout: 5000,
  });

  // Broadcast current matchmaking counts
  function broadcastQueueCounts() {
    const counts: Record<string, number> = {
      classic: 0,
      quickfire: 0,
      brain_battle: 0,
      chill: 0,
      total: matchmakingQueue.size,
    };
    for (const req of matchmakingQueue.values()) {
      if (counts[req.preset] !== undefined) {
        counts[req.preset]++;
      }
    }
    io.emit('matchmaking_status', counts);
  }

  // Check and pair matched players in matchmaking queue
  function processMatchmakingQueue() {
    const presets: PresetName[] = ['classic', 'quickfire', 'brain_battle', 'chill'];

    for (const preset of presets) {
      const matching = Array.from(matchmakingQueue.values()).filter(r => r.preset === preset);
      // If we have at least 2 players queuing for this preset
      if (matching.length >= 2) {
        const [p1Req, p2Req] = matching;
        matchmakingQueue.delete(p1Req.socketId);
        matchmakingQueue.delete(p2Req.socketId);
        broadcastQueueCounts();

        const roomCode = generateRoomCode();
        const settings = getSettingsForPreset(preset);
        settings.isPublic = true;
        settings.playerCount = 2;

        const hostPlayer: Player = {
          id: p1Req.playerId,
          name: p1Req.playerName,
          avatarId: p1Req.avatarId,
          isHost: true,
          isReady: true,
          lives: settings.lives === 0 ? Infinity : settings.lives,
          score: 0,
          wordsSubmitted: 0,
          isEliminated: false,
          isConnected: true,
          lastActive: Date.now(),
        };

        const engine = new WordChainEngine(roomCode, hostPlayer, settings, {
          onStateChange: state => {
            io.to(roomCode).emit('room_state', state);
          },
          onGameOver: (winnerId, winnerName) => {
            io.to(roomCode).emit('game_over', { winnerId, winnerName });
          },
        });

        rooms.set(roomCode, engine);

        const guestPlayer: Player = {
          id: p2Req.playerId,
          name: p2Req.playerName,
          avatarId: p2Req.avatarId,
          isHost: false,
          isReady: true,
          lives: settings.lives === 0 ? Infinity : settings.lives,
          score: 0,
          wordsSubmitted: 0,
          isEliminated: false,
          isConnected: true,
          lastActive: Date.now(),
        };

        engine.addPlayer(guestPlayer);

        // Notify both sockets to join match room
        const s1 = io.sockets.sockets.get(p1Req.socketId);
        const s2 = io.sockets.sockets.get(p2Req.socketId);

        if (s1) {
          s1.join(roomCode);
          s1.emit('match_found', { roomCode, state: engine.getSnapshot() });
        }
        if (s2) {
          s2.join(roomCode);
          s2.emit('match_found', { roomCode, state: engine.getSnapshot() });
        }

        // Auto start match after 1.5 seconds countdown
        setTimeout(() => {
          if (rooms.has(roomCode)) {
            engine.startMatch(hostPlayer.id);
          }
        }, 1500);
      }
    }
  }

  io.on('connection', (socket: Socket) => {
    // Synchronize client server clock
    socket.emit('server_time', { timestamp: Date.now() });

    // 1. CREATE ROOM
    socket.on('create_room', (data, callback) => {
      try {
        const parsed = createRoomSchema.safeParse(data);
        if (!parsed.success) {
          return callback?.({ error: parsed.error.issues[0]?.message || 'Invalid parameters' });
        }

        const roomCode = generateRoomCode();
        const { playerName, avatarId, settings } = parsed.data;

        const hostPlayer: Player = {
          id: socket.id,
          name: playerName,
          avatarId,
          isHost: true,
          isReady: true,
          lives: settings.lives === 0 ? Infinity : settings.lives,
          score: 0,
          wordsSubmitted: 0,
          isEliminated: false,
          isConnected: true,
          lastActive: Date.now(),
        };

        const engine = new WordChainEngine(roomCode, hostPlayer, settings, {
          onStateChange: state => {
            io.to(roomCode).emit('room_state', state);
          },
          onGameOver: (winnerId, winnerName) => {
            io.to(roomCode).emit('game_over', { winnerId, winnerName });
          },
        });

        rooms.set(roomCode, engine);
        socket.join(roomCode);

        callback?.({
          roomCode,
          playerId: socket.id,
          state: engine.getSnapshot(),
        });
      } catch (err: unknown) {
        callback?.({ error: err instanceof Error ? err.message : 'Failed to create room' });
      }
    });

    // 2. JOIN ROOM
    socket.on('join_room', (data, callback) => {
      try {
        const parsed = joinRoomSchema.safeParse(data);
        if (!parsed.success) {
          return callback?.({ error: parsed.error.issues[0]?.message || 'Invalid parameters' });
        }

        const { roomCode, playerName, avatarId, asSpectator } = parsed.data;
        const engine = rooms.get(roomCode);

        if (!engine) {
          return callback?.({ error: `Room ${roomCode} does not exist.` });
        }

        const player: Player = {
          id: socket.id,
          name: playerName,
          avatarId,
          isHost: false,
          isReady: false,
          lives: engine.state.settings.lives === 0 ? Infinity : engine.state.settings.lives,
          score: 0,
          wordsSubmitted: 0,
          isEliminated: false,
          isConnected: true,
          lastActive: Date.now(),
        };

        const success = engine.addPlayer(player, asSpectator);
        if (!success) {
          return callback?.({ error: 'Cannot join: room is full or in progress.' });
        }

        socket.join(roomCode);
        callback?.({
          playerId: socket.id,
          state: engine.getSnapshot(),
        });
      } catch (err: unknown) {
        callback?.({ error: err instanceof Error ? err.message : 'Failed to join room' });
      }
    });

    // 3. GET ROOM STATE
    socket.on('get_room_state', ({ roomCode }, callback) => {
      const engine = rooms.get(roomCode);
      if (!engine) {
        return callback?.({ error: 'Room not found' });
      }
      callback?.({ state: engine.getSnapshot() });
    });

    // 4. UPDATE SETTINGS (Host only)
    socket.on('update_settings', (data, callback) => {
      const parsed = updateSettingsSchema.safeParse(data);
      if (!parsed.success) {
        return callback?.({ error: parsed.error.issues[0]?.message || 'Invalid settings' });
      }

      const { roomCode, hostId, settings } = parsed.data;
      const engine = rooms.get(roomCode);
      if (!engine) return callback?.({ error: 'Room not found' });

      const ok = engine.updateSettings(hostId, settings);
      if (!ok) return callback?.({ error: 'Only host can change lobby settings' });

      callback?.({ success: true });
    });

    // 5. TOGGLE READY
    socket.on('toggle_ready', (data, callback) => {
      const parsed = toggleReadySchema.safeParse(data);
      if (!parsed.success) return callback?.({ error: 'Invalid parameters' });

      const { roomCode, playerId } = parsed.data;
      const engine = rooms.get(roomCode);
      if (!engine) return callback?.({ error: 'Room not found' });

      const ok = engine.toggleReady(playerId);
      callback?.({ success: ok });
    });

    // 6. START MATCH (Host only)
    socket.on('start_match', ({ roomCode, playerId }, callback) => {
      const engine = rooms.get(roomCode);
      if (!engine) return callback?.({ error: 'Room not found' });

      const ok = engine.startMatch(playerId);
      if (!ok) {
        return callback?.({ error: 'Cannot start match: Need at least 2 players or you are not host.' });
      }

      callback?.({ success: true });
    });

    // 7. SUBMIT WORD
    socket.on('submit_word', (data, callback) => {
      const parsed = submitWordSchema.safeParse(data);
      if (!parsed.success) {
        return callback?.({ error: parsed.error.issues[0]?.message || 'Invalid word submission' });
      }

      const { roomCode, playerId, word } = parsed.data;
      const engine = rooms.get(roomCode);
      if (!engine) return callback?.({ error: 'Room not found' });

      const result = engine.submitWord(playerId, word);
      callback?.(result);
    });

    // 8. REMATCH
    socket.on('rematch', ({ roomCode }, callback) => {
      const engine = rooms.get(roomCode);
      if (!engine) return callback?.({ error: 'Room not found' });

      engine.rematch();
      callback?.({ success: true });
    });

    // 9. MATCHMAKING QUEUE
    socket.on('join_matchmaking', (data, callback) => {
      const parsed = matchmakingQueueSchema.safeParse(data);
      if (!parsed.success) {
        return callback?.({ error: parsed.error.issues[0]?.message || 'Invalid parameters' });
      }

      const { playerName, avatarId, preset } = parsed.data;
      matchmakingQueue.set(socket.id, {
        socketId: socket.id,
        playerId: socket.id,
        playerName,
        avatarId,
        preset,
        joinedAt: Date.now(),
      });

      broadcastQueueCounts();
      callback?.({ success: true, queueSize: matchmakingQueue.size });
      processMatchmakingQueue();
    });

    socket.on('leave_matchmaking', () => {
      matchmakingQueue.delete(socket.id);
      broadcastQueueCounts();
    });

    // 10. LEAVE ROOM & DISCONNECT
    socket.on('leave_room', ({ roomCode }) => {
      socket.leave(roomCode);
      const engine = rooms.get(roomCode);
      if (engine) {
        engine.removePlayer(socket.id);
        if (engine.state.players.length === 0) {
          engine.cleanTimers();
          rooms.delete(roomCode);
        }
      }
    });

    socket.on('disconnect', () => {
      // Clean from matchmaking queue
      if (matchmakingQueue.has(socket.id)) {
        matchmakingQueue.delete(socket.id);
        broadcastQueueCounts();
      }

      // Check all rooms
      for (const [code, engine] of rooms.entries()) {
        const isPlayer = engine.state.players.some(p => p.id === socket.id);
        const isSpec = engine.state.spectators.includes(socket.id);
        if (isPlayer || isSpec) {
          engine.removePlayer(socket.id);
          if (engine.state.players.length === 0) {
            engine.cleanTimers();
            rooms.delete(code);
          }
        }
      }
    });
  });

  httpServer.listen(port, () => {
    console.log(`> WordChain Server ready on http://${hostname}:${port}`);
  });
});
