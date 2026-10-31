import { describe, it, expect, vi } from 'vitest';
import { ColorMatchEngine } from './ColorMatchEngine';
import { ColorMatchPlayer } from '../types/colorMatch';
import { calculateColorDistance, calculateAccuracy, rgbToHex } from '../utils/colorUtils';

describe('ColorMatchEngine', () => {
  const host: ColorMatchPlayer = {
    id: 'p1',
    name: 'Player One',
    avatarId: 'monty',
    isHost: true,
    isReady: true,
    score: 0,
    currentGuess: null,
    hasSubmitted: false,
    isConnected: true,
  };

  it('creates room with default settings', () => {
    const engine = new ColorMatchEngine('TEST01', host);
    expect(engine.state.code).toBe('TEST01');
    expect(engine.state.status).toBe('lobby');
    expect(engine.state.players.length).toBe(1);
    expect(engine.state.settings.roundTimeLimit).toBe(20);
    expect(engine.state.settings.totalRounds).toBe(5);
  });

  it('adds and removes players', () => {
    const engine = new ColorMatchEngine('TEST01', host);
    const p2: ColorMatchPlayer = {
      id: 'p2',
      name: 'Player Two',
      avatarId: 'gloop',
      isHost: false,
      isReady: false,
      score: 0,
      currentGuess: null,
      hasSubmitted: false,
      isConnected: true,
    };
    expect(engine.addPlayer(p2)).toBe(true);
    expect(engine.state.players.length).toBe(2);

    engine.removePlayer('p2');
    expect(engine.state.players.length).toBe(1);
  });

  it('calculates color distance and accuracy correctly', () => {
    const black = { r: 0, g: 0, b: 0 };
    const white = { r: 255, g: 255, b: 255 };
    const dist = calculateColorDistance(black, white);
    expect(dist).toBeCloseTo(441.67, 1);
    expect(calculateAccuracy(dist)).toBe(0);

    const sameDist = calculateColorDistance(black, black);
    expect(sameDist).toBe(0);
    expect(calculateAccuracy(sameDist)).toBe(100);

    expect(rgbToHex({ r: 255, g: 201, b: 40 })).toBe('#FFC928');
  });

  it('handles game start and submission', () => {
    vi.useFakeTimers();
    const engine = new ColorMatchEngine('TEST01', host, { roundTimeLimit: 10, totalRounds: 3 });
    const started = engine.startGame(host.id);
    expect(started).toBe(true);
    expect(engine.state.status).toBe('playing');
    expect(engine.state.targetColor).not.toBeNull();

    // Submit guess
    const target = engine.state.targetColor!;
    const guess = { r: target.r, g: target.g, b: target.b };
    const submitted = engine.submitGuess(host.id, guess);
    expect(submitted).toBe(true);

    // Because only 1 player, allSubmitted triggers evaluateRound() immediately
    expect(engine.state.status).toBe('round_reveal');
    expect(engine.state.history.length).toBe(1);
    expect(engine.state.history[0].results[0].accuracy).toBe(100);
    expect(engine.state.history[0].winnerId).toBe('p1');

    engine.cleanTimers();
    vi.useRealTimers();
  });
});

