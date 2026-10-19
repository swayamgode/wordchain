export type WordLengthOption = '3' | '4' | '5' | '6' | '7' | '8' | 'any';

export type TurnTimerOption = 5 | 10 | 15 | 20 | 30 | 45 | 60 | 0; // 0 = No time limit

export type LivesOption = 1 | 2 | 3 | 5 | 10 | 0; // 0 = Unlimited lives

export type PlayerCountOption = 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

export type MatchDurationOption = 2 | 5 | 10 | 15 | 0; // minutes, 0 = unlimited

export type InvalidWordPenalty = 'none' | 'lose_turn' | 'lose_life';

export type TimeoutPenalty = 'lose_turn' | 'lose_life';

export type StartingWordOption = 'random' | 'first_player';

export type WordCategory = 'all' | 'animals' | 'food' | 'countries' | 'technology';

export type GameDifficulty = 'casual' | 'standard' | 'challenging';

export type TurnOrderOption = 'clockwise' | 'randomized';

export type PresetName = 'classic' | 'quickfire' | 'brain_battle' | 'chill' | 'custom';

export interface GameSettings {
  preset: PresetName;
  wordLength: WordLengthOption;
  anyLengthMin: number;
  anyLengthMax: number;
  turnTimeLimit: TurnTimerOption;
  lives: LivesOption;
  playerCount: PlayerCountOption;
  maxMatchDuration: MatchDurationOption;
  allowRepeatedWords: boolean;
  invalidWordPenalty: InvalidWordPenalty;
  timeoutPenalty: TimeoutPenalty;
  startingWordMode: StartingWordOption;
  category: WordCategory;
  difficulty: GameDifficulty;
  turnOrder: TurnOrderOption;
  allowSpectators: boolean;
  isPublic: boolean;
  language: 'en';
}

export interface Player {
  id: string;
  name: string;
  avatarId: string; // 'monty' | 'gloop' | 'fang' | 'cyclops' | 'zippy' | 'chomp'
  isHost: boolean;
  isReady: boolean;
  isBot?: boolean;
  botDifficulty?: GameDifficulty;
  lives: number;
  score: number;
  wordsSubmitted: number;
  isEliminated: boolean;
  eliminatedAt?: number;
  isConnected: boolean;
  lastActive: number;
}

export interface PlayedWord {
  word: string;
  playerId: string;
  playerName: string;
  avatarId: string;
  timestamp: number;
  turnNumber: number;
}

export type GameStatus = 'lobby' | 'countdown' | 'in_progress' | 'ended';

export interface RoomState {
  code: string;
  hostId: string;
  settings: GameSettings;
  status: GameStatus;
  players: Player[];
  spectators: string[];
  activePlayerIndex: number;
  currentTurnDeadline: number | null; // server timestamp in ms
  matchStartedAt: number | null;
  matchEndsAt: number | null;
  currentRequiredLetter: string;
  chain: PlayedWord[];
  roundNumber: number;
  winnerId: string | null;
  winnerName: string | null;
  lastActionFeedback: {
    type: 'valid' | 'invalid' | 'timeout' | 'eliminated';
    message: string;
    playerId?: string;
  } | null;
}

export interface MatchmakingRequest {
  playerId: string;
  playerName: string;
  avatarId: string;
  preset: PresetName;
  joinedAt: number;
}

export interface UserProfile {
  id: string;
  displayName: string;
  avatarId: string;
  gamesPlayed: number;
  wins: number;
  longestChain: number;
  totalWords: number;
  preferredPreset: PresetName;
  createdAt: string;
}
