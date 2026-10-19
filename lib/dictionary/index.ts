import {
  THREE_LETTER_WORDS,
  FOUR_LETTER_WORDS,
  FIVE_LETTER_WORDS,
  SIX_LETTER_WORDS,
  SEVEN_LETTER_WORDS,
  EIGHT_LETTER_WORDS,
} from './words';
import { CATEGORY_WORDS } from './categories';
import { GameSettings, WordCategory } from '../types/game';

// Aggregate all words into unified set and indexed-by-length maps
const ALL_WORDS_ARRAY: string[] = [
  ...THREE_LETTER_WORDS,
  ...FOUR_LETTER_WORDS,
  ...FIVE_LETTER_WORDS,
  ...SIX_LETTER_WORDS,
  ...SEVEN_LETTER_WORDS,
  ...EIGHT_LETTER_WORDS,
  ...Object.values(CATEGORY_WORDS).flat(),
];

const MASTER_DICTIONARY_SET = new Set<string>(
  ALL_WORDS_ARRAY.map(w => w.trim().toLowerCase())
);

const WORDS_BY_LENGTH = new Map<number, string[]>();
for (const word of MASTER_DICTIONARY_SET) {
  const len = word.length;
  if (!WORDS_BY_LENGTH.has(len)) {
    WORDS_BY_LENGTH.set(len, []);
  }
  WORDS_BY_LENGTH.get(len)!.push(word);
}

// Map for fast first-letter lookup
const WORDS_BY_FIRST_LETTER = new Map<string, string[]>();
for (const word of MASTER_DICTIONARY_SET) {
  const first = word[0];
  if (!WORDS_BY_FIRST_LETTER.has(first)) {
    WORDS_BY_FIRST_LETTER.set(first, []);
  }
  WORDS_BY_FIRST_LETTER.get(first)!.push(word);
}

export interface WordValidationResult {
  isValid: boolean;
  reason?: 'length_mismatch' | 'wrong_start_letter' | 'not_in_dictionary' | 'already_used' | 'wrong_category';
  message?: string;
  normalizedWord: string;
}

export class DictionaryService {
  /**
   * Normalizes input word (lowercase, trims whitespace)
   */
  public static normalize(word: string): string {
    return word.trim().toLowerCase();
  }

  /**
   * Checks if word is in master dictionary
   */
  public static isInDictionary(word: string): boolean {
    const norm = this.normalize(word);
    return MASTER_DICTIONARY_SET.has(norm);
  }

  /**
   * Checks if word belongs to specified category
   */
  public static belongsToCategory(word: string, category: WordCategory): boolean {
    if (category === 'all') return true;
    const catWords = CATEGORY_WORDS[category];
    if (!catWords) return true;
    const norm = this.normalize(word);
    return catWords.includes(norm);
  }

  /**
   * Validates a word submission against all configured game rules
   */
  public static validateSubmission(
    rawWord: string,
    requiredLetter: string | null,
    usedWords: Set<string>,
    settings: GameSettings
  ): WordValidationResult {
    const word = this.normalize(rawWord);

    // 1. Length check
    if (settings.wordLength === 'any') {
      const min = settings.anyLengthMin ?? 2;
      const max = settings.anyLengthMax ?? 15;
      if (word.length < min || word.length > max) {
        return {
          isValid: false,
          reason: 'length_mismatch',
          message: `Word must be between ${min} and ${max} letters long. (Yours was ${word.length})`,
          normalizedWord: word,
        };
      }
    } else {
      const targetLength = parseInt(settings.wordLength, 10);
      if (word.length !== targetLength) {
        return {
          isValid: false,
          reason: 'length_mismatch',
          message: `Word must be exactly ${targetLength} letters long. (Yours was ${word.length})`,
          normalizedWord: word,
        };
      }
    }

    // 2. First letter check (if required)
    if (requiredLetter) {
      const expectedLetter = requiredLetter.toLowerCase();
      if (!word.startsWith(expectedLetter)) {
        return {
          isValid: false,
          reason: 'wrong_start_letter',
          message: `Word must start with letter "${expectedLetter.toUpperCase()}".`,
          normalizedWord: word,
        };
      }
    }

    // 3. Repeated word check
    if (!settings.allowRepeatedWords && usedWords.has(word)) {
      return {
        isValid: false,
        reason: 'already_used',
        message: `"${word.toUpperCase()}" has already been played in this match.`,
        normalizedWord: word,
      };
    }

    // 4. Category check
    if (settings.category !== 'all') {
      if (!this.belongsToCategory(word, settings.category)) {
        return {
          isValid: false,
          reason: 'wrong_category',
          message: `"${word.toUpperCase()}" is not in the ${settings.category} category.`,
          normalizedWord: word,
        };
      }
    }

    // 5. Dictionary existence check
    if (!this.isInDictionary(word)) {
      return {
        isValid: false,
        reason: 'not_in_dictionary',
        message: `"${word.toUpperCase()}" is not in the approved WordChain dictionary.`,
        normalizedWord: word,
      };
    }

    return {
      isValid: true,
      normalizedWord: word,
    };
  }

  /**
   * Gets a valid starting word according to settings
   */
  public static getRandomStartingWord(settings: GameSettings): string {
    let candidates: string[] = [];

    if (settings.category !== 'all') {
      const catWords = CATEGORY_WORDS[settings.category] || [];
      candidates = catWords;
    } else if (settings.wordLength !== 'any') {
      const len = parseInt(settings.wordLength, 10);
      candidates = WORDS_BY_LENGTH.get(len) || [];
    } else {
      const min = settings.anyLengthMin ?? 2;
      const max = settings.anyLengthMax ?? 15;
      candidates = ALL_WORDS_ARRAY.filter(w => w.length >= min && w.length <= max);
    }

    // Apply length filtering if category was used
    if (settings.wordLength !== 'any') {
      const len = parseInt(settings.wordLength, 10);
      candidates = candidates.filter(w => w.length === len);
    }

    if (candidates.length === 0) {
      // Fallback
      return 'chain';
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
  }

  /**
   * Finds a valid word for an AI Bot
   */
  public static findBotWord(
    requiredLetter: string,
    usedWords: Set<string>,
    settings: GameSettings,
    difficulty: 'casual' | 'standard' | 'challenging'
  ): string | null {
    const first = requiredLetter.toLowerCase();
    let pool: string[] = [];

    if (settings.category !== 'all') {
      const catWords = CATEGORY_WORDS[settings.category] || [];
      pool = catWords.filter(w => w.startsWith(first));
    } else {
      pool = (WORDS_BY_FIRST_LETTER.get(first) || []);
    }

    // Filter length
    if (settings.wordLength !== 'any') {
      const targetLen = parseInt(settings.wordLength, 10);
      pool = pool.filter(w => w.length === targetLen);
    } else {
      const min = settings.anyLengthMin ?? 2;
      const max = settings.anyLengthMax ?? 15;
      pool = pool.filter(w => w.length >= min && w.length <= max);
    }

    // Filter used words if repeat not allowed
    if (!settings.allowRepeatedWords) {
      pool = pool.filter(w => !usedWords.has(w));
    }

    if (pool.length === 0) return null;

    // Difficulty factor:
    // 'casual' has a 25% chance to miss/fail, 'standard' 10% chance, 'challenging' 2% chance
    const missChance = difficulty === 'casual' ? 0.25 : difficulty === 'standard' ? 0.08 : 0.02;
    if (Math.random() < missChance && pool.length > 3) {
      return null; // Bot fails turn
    }

    // Pick random from valid pool
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return pick;
  }
}
