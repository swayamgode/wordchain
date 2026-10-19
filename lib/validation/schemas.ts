import { z } from 'zod';

export const wordLengthSchema = z.enum(['3', '4', '5', '6', '7', '8', 'any']);
export const turnTimerSchema = z.union([
  z.literal(5),
  z.literal(10),
  z.literal(15),
  z.literal(20),
  z.literal(30),
  z.literal(45),
  z.literal(60),
  z.literal(0),
]);
export const livesSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(5),
  z.literal(10),
  z.literal(0),
]);
export const playerCountSchema = z.union([
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(8),
  z.literal(10),
  z.literal(12),
]);
export const matchDurationSchema = z.union([
  z.literal(2),
  z.literal(5),
  z.literal(10),
  z.literal(15),
  z.literal(0),
]);

export const gameSettingsSchema = z.object({
  preset: z.enum(['classic', 'quickfire', 'brain_battle', 'chill', 'custom']),
  wordLength: wordLengthSchema,
  anyLengthMin: z.number().int().min(2).max(10),
  anyLengthMax: z.number().int().min(3).max(20),
  turnTimeLimit: turnTimerSchema,
  lives: livesSchema,
  playerCount: playerCountSchema,
  maxMatchDuration: matchDurationSchema,
  allowRepeatedWords: z.boolean(),
  invalidWordPenalty: z.enum(['none', 'lose_turn', 'lose_life']),
  timeoutPenalty: z.enum(['lose_turn', 'lose_life']),
  startingWordMode: z.enum(['random', 'first_player']),
  category: z.enum(['all', 'animals', 'food', 'countries', 'technology']),
  difficulty: z.enum(['casual', 'standard', 'challenging']),
  turnOrder: z.enum(['clockwise', 'randomized']),
  allowSpectators: z.boolean(),
  isPublic: z.boolean(),
  language: z.literal('en'),
}).refine(data => {
  if (data.wordLength === 'any') {
    return data.anyLengthMin <= data.anyLengthMax;
  }
  return true;
}, {
  message: 'Minimum length cannot exceed maximum length',
  path: ['anyLengthMin'],
});

export const createRoomSchema = z.object({
  playerName: z.string().trim().min(1).max(20),
  avatarId: z.string().trim().min(1).max(30),
  settings: gameSettingsSchema,
});

export const joinRoomSchema = z.object({
  roomCode: z.string().trim().toUpperCase().length(6),
  playerName: z.string().trim().min(1).max(20),
  avatarId: z.string().trim().min(1).max(30),
  asSpectator: z.boolean().optional(),
});

export const submitWordSchema = z.object({
  roomCode: z.string().trim().toUpperCase().length(6),
  playerId: z.string().min(1),
  word: z.string().trim().min(2).max(30),
});

export const toggleReadySchema = z.object({
  roomCode: z.string().trim().toUpperCase().length(6),
  playerId: z.string().min(1),
});

export const updateSettingsSchema = z.object({
  roomCode: z.string().trim().toUpperCase().length(6),
  hostId: z.string().min(1),
  settings: gameSettingsSchema,
});

export const matchmakingQueueSchema = z.object({
  playerName: z.string().trim().min(1).max(20),
  avatarId: z.string().trim().min(1).max(30),
  preset: z.enum(['classic', 'quickfire', 'brain_battle', 'chill']),
});
