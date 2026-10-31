export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export type ColorRoundTimerOption = 10 | 15 | 20 | 30 | 45 | 60;
export type ColorTotalRoundsOption = 3 | 5 | 7 | 10;
export type ColorPlayerCountOption = 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

export interface ColorMatchSettings {
  roundTimeLimit: ColorRoundTimerOption;
  totalRounds: ColorTotalRoundsOption;
  playerCount: ColorPlayerCountOption;
  isPublic: boolean;
  allowSpectators: boolean;
}

export interface ColorMatchPlayer {
  id: string;
  name: string;
  avatarId: string;
  isHost: boolean;
  isReady: boolean;
  isBot?: boolean;
  botAccuracyTier?: 'easy' | 'medium' | 'hard';
  score: number;
  currentGuess: RGBColor | null;
  hasSubmitted: boolean;
  submittedAt?: number;
  lastRoundAccuracy?: number;
  lastRoundPoints?: number;
  isConnected: boolean;
}

export interface PlayerRoundResult {
  playerId: string;
  playerName: string;
  avatarId: string;
  guess: RGBColor;
  diff: number;
  accuracy: number;
  pointsEarned: number;
  totalScore: number;
  isWinner: boolean;
}

export interface ColorRoundResult {
  roundNumber: number;
  targetColor: RGBColor;
  results: PlayerRoundResult[];
  winnerId: string | null;
  winnerName: string | null;
}

export type ColorGameStatus = 'lobby' | 'playing' | 'round_reveal' | 'game_over';

export interface ColorMatchRoomState {
  code: string;
  hostId: string;
  settings: ColorMatchSettings;
  status: ColorGameStatus;
  players: ColorMatchPlayer[];
  spectators: string[];
  currentRound: number;
  totalRounds: number;
  targetColor: RGBColor | null;
  roundDeadline: number | null;
  revealDeadline: number | null;
  history: ColorRoundResult[];
  winnerId: string | null;
  winnerName: string | null;
}

