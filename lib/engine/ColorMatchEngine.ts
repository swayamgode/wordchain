import {
  ColorMatchSettings,
  ColorMatchPlayer,
  ColorMatchRoomState,
  RGBColor,
  ColorRoundResult,
  PlayerRoundResult,
} from '../types/colorMatch';
import {
  generateRandomRGB,
  calculateColorDistance,
  calculateAccuracy,
  calculateRoundPoints,
  generateBotGuess,
} from '../utils/colorUtils';

export interface ColorEngineEvents {
  onStateChange?: (state: ColorMatchRoomState) => void;
  onRoundEnd?: (result: ColorRoundResult) => void;
  onGameOver?: (winnerId: string | null, winnerName: string | null) => void;
}

export class ColorMatchEngine {
  public state: ColorMatchRoomState;
  private roundTimerId: NodeJS.Timeout | null = null;
  private revealTimerId: NodeJS.Timeout | null = null;
  private listeners: ColorEngineEvents = {};

  constructor(
    code: string,
    hostPlayer: ColorMatchPlayer,
    settings?: Partial<ColorMatchSettings>,
    listeners?: ColorEngineEvents
  ) {
    this.listeners = listeners || {};
    const defaultSettings: ColorMatchSettings = {
      roundTimeLimit: 20,
      totalRounds: 5,
      playerCount: 6,
      isPublic: true,
      allowSpectators: true,
      ...settings,
    };

    this.state = {
      code,
      hostId: hostPlayer.id,
      settings: defaultSettings,
      status: 'lobby',
      players: [hostPlayer],
      spectators: [],
      currentRound: 1,
      totalRounds: defaultSettings.totalRounds,
      targetColor: null,
      roundDeadline: null,
      revealDeadline: null,
      history: [],
      winnerId: null,
      winnerName: null,
    };
  }

  public setListeners(listeners: ColorEngineEvents) {
    this.listeners = { ...this.listeners, ...listeners };
  }

  public getSnapshot(): ColorMatchRoomState {
    return JSON.parse(JSON.stringify(this.state));
  }

  public addPlayer(player: ColorMatchPlayer, asSpectator = false): boolean {
    if (asSpectator) {
      if (!this.state.settings.allowSpectators) return false;
      if (!this.state.spectators.includes(player.id)) {
        this.state.spectators.push(player.id);
        this.emitState();
      }
      return true;
    }

    if (this.state.status !== 'lobby') {
      if (this.state.settings.allowSpectators) {
        return this.addPlayer(player, true);
      }
      return false;
    }

    if (this.state.players.length >= this.state.settings.playerCount) {
      return false;
    }

    const exists = this.state.players.some(p => p.id === player.id);
    if (!exists) {
      this.state.players.push(player);
      this.emitState();
    }
    return true;
  }

  public removePlayer(playerId: string): void {
    this.state.spectators = this.state.spectators.filter(id => id !== playerId);
    const pIndex = this.state.players.findIndex(p => p.id === playerId);
    if (pIndex !== -1) {
      const removed = this.state.players[pIndex];
      this.state.players.splice(pIndex, 1);

      if (removed.isHost && this.state.players.length > 0) {
        this.state.players[0].isHost = true;
        this.state.hostId = this.state.players[0].id;
      }

      // If playing and now less than 1 human player
      if (this.state.status === 'playing') {
        const remainingHumans = this.state.players.filter(p => !p.isBot);
        if (remainingHumans.length === 0) {
          this.endMatch();
        } else {
          // Check if all remaining players have submitted
          this.checkAllSubmitted();
        }
      }

      this.emitState();
    }
  }

  public toggleReady(playerId: string): boolean {
    if (this.state.status !== 'lobby') return false;
    const player = this.state.players.find(p => p.id === playerId);
    if (player && !player.isHost) {
      player.isReady = !player.isReady;
      this.emitState();
      return true;
    }
    return false;
  }

  public updateSettings(hostId: string, newSettings: Partial<ColorMatchSettings>): boolean {
    if (this.state.status !== 'lobby' || this.state.hostId !== hostId) return false;
    this.state.settings = { ...this.state.settings, ...newSettings };
    this.state.totalRounds = this.state.settings.totalRounds;
    this.emitState();
    return true;
  }

  public startGame(hostId: string): boolean {
    if (this.state.status !== 'lobby' || this.state.hostId !== hostId) return false;
    if (this.state.players.length < 1) return false;

    // Reset scores & status
    this.state.players.forEach(p => {
      p.score = 0;
      p.currentGuess = null;
      p.hasSubmitted = false;
      p.lastRoundAccuracy = undefined;
      p.lastRoundPoints = undefined;
    });

    this.state.currentRound = 1;
    this.state.history = [];
    this.state.winnerId = null;
    this.state.winnerName = null;

    this.startRound();
    return true;
  }

  private startRound(): void {
    this.cleanTimers();
    this.state.status = 'playing';
    this.state.targetColor = generateRandomRGB();
    this.state.roundDeadline = Date.now() + this.state.settings.roundTimeLimit * 1000;
    this.state.revealDeadline = null;

    this.state.players.forEach(p => {
      p.currentGuess = null;
      p.hasSubmitted = false;
      p.lastRoundAccuracy = undefined;
      p.lastRoundPoints = undefined;
    });

    // If bot players, schedule simulated submissions
    this.state.players.filter(p => p.isBot).forEach(bot => {
      const delay = (1.5 + Math.random() * (this.state.settings.roundTimeLimit - 3)) * 1000;
      setTimeout(() => {
        if (this.state.status === 'playing' && this.state.targetColor) {
          const guess = generateBotGuess(this.state.targetColor, bot.botAccuracyTier || 'medium');
          this.submitGuess(bot.id, guess);
        }
      }, Math.max(1000, delay));
    });

    this.emitState();

    this.roundTimerId = setTimeout(() => {
      this.evaluateRound();
    }, this.state.settings.roundTimeLimit * 1000);
  }

  public submitGuess(playerId: string, guess: RGBColor): boolean {
    if (this.state.status !== 'playing') return false;

    const player = this.state.players.find(p => p.id === playerId);
    if (!player || player.hasSubmitted) return false;

    player.currentGuess = {
      r: Math.max(0, Math.min(255, Math.round(guess.r))),
      g: Math.max(0, Math.min(255, Math.round(guess.g))),
      b: Math.max(0, Math.min(255, Math.round(guess.b))),
    };
    player.hasSubmitted = true;
    player.submittedAt = Date.now();

    this.emitState();
    this.checkAllSubmitted();
    return true;
  }

  private checkAllSubmitted(): void {
    if (this.state.status !== 'playing') return;
    const allSubmitted = this.state.players.every(p => p.hasSubmitted);
    if (allSubmitted) {
      this.evaluateRound();
    }
  }

  public evaluateRound(): void {
    if (this.state.status !== 'playing' || !this.state.targetColor) return;
    this.cleanTimers();

    const target = this.state.targetColor;

    // For players who didn't submit, assign default guess rgb(128,128,128)
    const playerEvaluations = this.state.players.map(p => {
      const guess = p.currentGuess || { r: 128, g: 128, b: 128 };
      const diff = calculateColorDistance(target, guess);
      const accuracy = calculateAccuracy(diff);
      return {
        player: p,
        guess,
        diff,
        accuracy,
      };
    });

    // Sort by smallest distance (highest accuracy)
    playerEvaluations.sort((a, b) => a.diff - b.diff);

    const roundResults: PlayerRoundResult[] = [];
    let roundWinnerId: string | null = null;
    let roundWinnerName: string | null = null;

    playerEvaluations.forEach((evalItem, rank) => {
      const points = calculateRoundPoints(rank, evalItem.accuracy);
      evalItem.player.score += points;
      evalItem.player.lastRoundAccuracy = evalItem.accuracy;
      evalItem.player.lastRoundPoints = points;

      const isWinner = rank === 0;
      if (isWinner) {
        roundWinnerId = evalItem.player.id;
        roundWinnerName = evalItem.player.name;
      }

      roundResults.push({
        playerId: evalItem.player.id,
        playerName: evalItem.player.name,
        avatarId: evalItem.player.avatarId,
        guess: evalItem.guess,
        diff: Math.round(evalItem.diff * 10) / 10,
        accuracy: evalItem.accuracy,
        pointsEarned: points,
        totalScore: evalItem.player.score,
        isWinner,
      });
    });

    const roundSummary: ColorRoundResult = {
      roundNumber: this.state.currentRound,
      targetColor: target,
      results: roundResults,
      winnerId: roundWinnerId,
      winnerName: roundWinnerName,
    };

    this.state.history.push(roundSummary);
    this.state.status = 'round_reveal';
    const REVEAL_DURATION_SEC = 5;
    this.state.revealDeadline = Date.now() + REVEAL_DURATION_SEC * 1000;
    this.emitState();

    if (this.listeners.onRoundEnd) {
      this.listeners.onRoundEnd(roundSummary);
    }

    // Schedule next round or end of game
    this.revealTimerId = setTimeout(() => {
      if (this.state.currentRound >= this.state.totalRounds) {
        this.endMatch();
      } else {
        this.state.currentRound++;
        this.startRound();
      }
    }, REVEAL_DURATION_SEC * 1000);
  }

  private endMatch(): void {
    this.cleanTimers();
    this.state.status = 'game_over';

    // Find player with highest total score
    let highestScore = -1;
    let winner: ColorMatchPlayer | null = null;

    for (const player of this.state.players) {
      if (player.score > highestScore) {
        highestScore = player.score;
        winner = player;
      }
    }

    this.state.winnerId = winner?.id || null;
    this.state.winnerName = winner?.name || null;
    this.emitState();

    if (this.listeners.onGameOver) {
      this.listeners.onGameOver(this.state.winnerId, this.state.winnerName);
    }
  }

  public cleanTimers(): void {
    if (this.roundTimerId) {
      clearTimeout(this.roundTimerId);
      this.roundTimerId = null;
    }
    if (this.revealTimerId) {
      clearTimeout(this.revealTimerId);
      this.revealTimerId = null;
    }
  }

  private emitState(): void {
    if (this.listeners.onStateChange) {
      this.listeners.onStateChange(this.getSnapshot());
    }
  }
}

