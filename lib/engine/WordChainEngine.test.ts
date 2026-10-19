import { describe, it, expect, beforeEach } from 'vitest';
import { WordChainEngine } from './WordChainEngine';
import { DEFAULT_SETTINGS, getSettingsForPreset } from '../constants/presets';
import { Player, GameSettings } from '../types/game';

function createMockPlayer(id: string, name: string, isHost = false): Player {
  return {
    id,
    name,
    avatarId: 'monty',
    isHost,
    isReady: true,
    lives: 3,
    score: 0,
    wordsSubmitted: 0,
    isEliminated: false,
    isConnected: true,
    lastActive: Date.now(),
  };
}

describe('WordChainEngine Core Rule Tests', () => {
  let player1: Player;
  let player2: Player;
  let defaultSettings: GameSettings;

  beforeEach(() => {
    player1 = createMockPlayer('p1', 'Alice', true);
    player2 = createMockPlayer('p2', 'Bob', false);
    defaultSettings = { ...DEFAULT_SETTINGS, startingWordMode: 'first_player' };
  });

  it('initializes match in lobby state with host', () => {
    const engine = new WordChainEngine('ROOM01', player1, defaultSettings);
    const snap = engine.getSnapshot();

    expect(snap.code).toBe('ROOM01');
    expect(snap.status).toBe('lobby');
    expect(snap.players.length).toBe(1);
    expect(snap.hostId).toBe('p1');
  });

  it('allows joining and starting with random starting word', () => {
    const randSettings = { ...defaultSettings, startingWordMode: 'random' as const };
    const engine = new WordChainEngine('ROOM01', player1, randSettings);
    expect(engine.addPlayer(player2)).toBe(true);

    const started = engine.startMatch('p1');
    expect(started).toBe(true);
    expect(engine.state.status).toBe('in_progress');
    expect(engine.state.chain.length).toBe(1); // random starting word
    expect(engine.state.currentRequiredLetter.length).toBe(1);
  });

  it('enforces last-letter chain rule', () => {
    const testSettings = { ...defaultSettings, startingWordMode: 'first_player' as const };
    const engine = new WordChainEngine('ROOM01', player1, testSettings);
    engine.addPlayer(player2);
    engine.startMatch('p1');

    // Manually set required letter to 't'
    engine.state.currentRequiredLetter = 't';
    engine.state.activePlayerIndex = 0;

    // Submitting word that starts with 't', e.g. "team"
    const validResult = engine.submitWord('p1', 'team');
    expect(validResult.success).toBe(true);
    expect(engine.state.currentRequiredLetter).toBe('m'); // last letter of team

    // Next player must start with 'm'
    expect(engine.state.activePlayerIndex).toBe(1); // Bob's turn
    const invalidResult = engine.submitWord('p2', 'apple'); // starts with 'a', not 'm'
    expect(invalidResult.success).toBe(false);
  });

  it('enforces fixed word length when configured (e.g. 5 letters)', () => {
    const settings = { ...defaultSettings, wordLength: '5' as const };
    const engine = new WordChainEngine('ROOM01', player1, settings);
    engine.addPlayer(player2);
    engine.startMatch('p1');

    engine.state.currentRequiredLetter = 'c';
    engine.state.activePlayerIndex = 0;

    // 4 letter word should fail and advance turn due to lose_turn penalty
    const shortWord = engine.submitWord('p1', 'cats');
    expect(shortWord.success).toBe(false);

    // Reset turn back to p1 to test valid 5 letter word
    engine.state.activePlayerIndex = 0;
    const fiveLetter = engine.submitWord('p1', 'chair');
    expect(fiveLetter.success).toBe(true);
  });

  it('enforces Any Length mode with min and max bounds', () => {
    const settings = {
      ...defaultSettings,
      wordLength: 'any' as const,
      anyLengthMin: 4,
      anyLengthMax: 6,
    };
    const engine = new WordChainEngine('ROOM01', player1, settings);
    engine.addPlayer(player2);
    engine.startMatch('p1');

    engine.state.currentRequiredLetter = 'c';
    engine.state.activePlayerIndex = 0;

    // 3 letters (too short) - fails and loses turn
    expect(engine.submitWord('p1', 'cat').success).toBe(false);

    // Reset turn back to p1
    engine.state.activePlayerIndex = 0;
    // 4 letters (valid)
    expect(engine.submitWord('p1', 'call').success).toBe(true);
  });

  it('rejects words not in dictionary', () => {
    const engine = new WordChainEngine('ROOM01', player1, defaultSettings);
    engine.addPlayer(player2);
    engine.startMatch('p1');

    engine.state.currentRequiredLetter = 'z';
    engine.state.activePlayerIndex = 0;

    const fakeWord = engine.submitWord('p1', 'zzzzzz');
    expect(fakeWord.success).toBe(false);
  });

  it('prevents repeated words when allowRepeatedWords is false', () => {
    const engine = new WordChainEngine('ROOM01', player1, defaultSettings);
    engine.addPlayer(player2);
    engine.startMatch('p1');

    engine.state.currentRequiredLetter = 'b';
    engine.state.activePlayerIndex = 0;

    // First play "boat"
    expect(engine.submitWord('p1', 'boat').success).toBe(true);

    // Set Bob's turn back to 'b'
    engine.state.currentRequiredLetter = 'b';
    const repeatResult = engine.submitWord('p2', 'boat');
    expect(repeatResult.success).toBe(false);
  });

  it('eliminates player when lives reach 0 and declares winner', () => {
    const settings = {
      ...defaultSettings,
      lives: 1 as const,
      invalidWordPenalty: 'lose_life' as const,
    };
    const engine = new WordChainEngine('ROOM01', player1, settings);
    engine.addPlayer(player2);
    engine.startMatch('p1');

    engine.state.currentRequiredLetter = 't';
    engine.state.activePlayerIndex = 0;

    // Player 1 submits invalid word and loses their only life
    engine.submitWord('p1', 'zzzz');

    expect(player1.isEliminated).toBe(true);
    expect(engine.state.status).toBe('ended');
    expect(engine.state.winnerId).toBe('p2');
    expect(engine.state.winnerName).toBe('Bob');
  });

  it('handles timeout penalty correctly', () => {
    const settings = {
      ...defaultSettings,
      lives: 2 as const,
      timeoutPenalty: 'lose_life' as const,
    };
    const engine = new WordChainEngine('ROOM01', player1, settings);
    engine.addPlayer(player2);
    engine.startMatch('p1');

    engine.state.activePlayerIndex = 0;
    engine.handleTimeout();

    expect(player1.lives).toBe(1);
    expect(engine.state.activePlayerIndex).toBe(1); // turn advanced to Bob
  });

  it('supports Unlimited Lives (lives = 0) without elimination', () => {
    const settings = getSettingsForPreset('chill');
    const engine = new WordChainEngine('ROOM01', player1, settings);
    engine.addPlayer(player2);
    engine.startMatch('p1');

    expect(player1.lives).toBe(Infinity);
    engine.handleTimeout();
    expect(player1.isEliminated).toBe(false);
  });

  it('performs clean rematch state reset', () => {
    const engine = new WordChainEngine('ROOM01', player1, defaultSettings);
    engine.addPlayer(player2);
    engine.startMatch('p1');

    // Advance and end
    engine.state.status = 'ended';
    engine.state.winnerId = 'p1';

    engine.rematch();

    expect(engine.state.status).toBe('lobby');
    expect(engine.state.chain.length).toBe(0);
    expect(engine.state.winnerId).toBeNull();
    expect(player1.score).toBe(0);
    expect(player1.isEliminated).toBe(false);
  });
});
