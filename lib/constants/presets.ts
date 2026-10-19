import { GameSettings, PresetName } from '../types/game';

export const DEFAULT_SETTINGS: GameSettings = {
  preset: 'classic',
  wordLength: 'any',
  anyLengthMin: 2,
  anyLengthMax: 15,
  turnTimeLimit: 10,
  lives: 3,
  playerCount: 4,
  maxMatchDuration: 0,
  allowRepeatedWords: false,
  invalidWordPenalty: 'lose_turn',
  timeoutPenalty: 'lose_life',
  startingWordMode: 'random',
  category: 'all',
  difficulty: 'standard',
  turnOrder: 'clockwise',
  allowSpectators: true,
  isPublic: false,
  language: 'en',
};

export const PRESETS: Record<PresetName, Partial<GameSettings> & { title: string; description: string; icon: string }> = {
  classic: {
    title: 'Classic',
    description: 'Any word length, 10s turns, 3 lives. The definitive chain battle.',
    icon: 'Sparkles',
    wordLength: 'any',
    anyLengthMin: 2,
    anyLengthMax: 15,
    turnTimeLimit: 10,
    lives: 3,
    allowRepeatedWords: false,
    invalidWordPenalty: 'lose_turn',
    timeoutPenalty: 'lose_life',
    difficulty: 'standard',
  },
  quickfire: {
    title: 'Quickfire',
    description: '3-letter words only, 5s sudden death, 1 single life. Rapid adrenaline.',
    icon: 'Zap',
    wordLength: '3',
    turnTimeLimit: 5,
    lives: 1,
    allowRepeatedWords: false,
    invalidWordPenalty: 'lose_life',
    timeoutPenalty: 'lose_life',
    difficulty: 'challenging',
  },
  brain_battle: {
    title: 'Brain Battle',
    description: '5-letter tactical words, 20s turns, 3 lives. Strategic mastery.',
    icon: 'Brain',
    wordLength: '5',
    turnTimeLimit: 20,
    lives: 3,
    allowRepeatedWords: false,
    invalidWordPenalty: 'lose_turn',
    timeoutPenalty: 'lose_life',
    difficulty: 'standard',
  },
  chill: {
    title: 'Chill Mode',
    description: 'Any length, no time pressure, unlimited lives. Casual fun with friends.',
    icon: 'Coffee',
    wordLength: 'any',
    anyLengthMin: 2,
    anyLengthMax: 15,
    turnTimeLimit: 0,
    lives: 0,
    allowRepeatedWords: false,
    invalidWordPenalty: 'none',
    timeoutPenalty: 'lose_turn',
    difficulty: 'casual',
  },
  custom: {
    title: 'Custom Rules',
    description: 'Fine-tune word lengths, penalties, timers, and custom categories.',
    icon: 'Sliders',
  },
};

export function getSettingsForPreset(preset: PresetName, base = DEFAULT_SETTINGS): GameSettings {
  const presetConfig = PRESETS[preset];
  return {
    ...base,
    ...presetConfig,
    preset,
  };
}
