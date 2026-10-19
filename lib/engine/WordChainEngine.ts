import {
  GameSettings,
  Player,
  PlayedWord,
  RoomState,
  GameStatus,
  GameDifficulty,
} from '../types/game';
import { DictionaryService } from '../dictionary';

export interface GameEngineEvents {
  onStateChange?: (state: RoomState) => void;
  onTurnTimeout?: (timedOutPlayerId: string) => void;
  onGameOver?: (winnerId: string | null, winnerName: string | null) => void;
}

export class WordChainEngine {
  public state: RoomState;
  private usedWords: Set<string> = new Set();
  private turnTimerId: NodeJS.Timeout | null = null;
  private matchTimerId: NodeJS.Timeout | null = null;
  private listeners: GameEngineEvents = {};

  constructor(code: string, hostPlayer: Player, settings: GameSettings, listeners?: GameEngineEvents) {
    this.listeners = listeners || {};
    this.state = {
      code,
      hostId: hostPlayer.id,
      settings,
      status: 'lobby',
      players: [hostPlayer],
      spectators: [],
      activePlayerIndex: 0,
      currentTurnDeadline: null,
      matchStartedAt: null,
      matchEndsAt: null,
      currentRequiredLetter: '',
      chain: [],
      roundNumber: 1,
      winnerId: null,
      winnerName: null,
      lastActionFeedback: null,
    };
  }

  public setListeners(listeners: GameEngineEvents) {
    this.listeners = { ...this.listeners, ...listeners };
  }

  public getSnapshot(): RoomState {
    return JSON.parse(JSON.stringify(this.state));
  }

  /**
   * Adds a player or spectator to the room
   */
  public addPlayer(player: Player, asSpectator = false): boolean {
    if (asSpectator) {
      if (!this.state.settings.allowSpectators) return false;
      if (!this.state.spectators.includes(player.id)) {
        this.state.spectators.push(player.id);
        this.emitState();
      }
      return true;
    }

    if (this.state.status !== 'lobby') {
      // If match already started, join as spectator if allowed
      if (this.state.settings.allowSpectators) {
        return this.addPlayer(player, true);
      }
      return false;
    }

    // Check player limit
    if (this.state.players.length >= this.state.settings.playerCount) {
      return false;
    }

    // Check if player ID already exists (reconnection)
    const existingIndex = this.state.players.findIndex(p => p.id === player.id);
    if (existingIndex >= 0) {
      this.state.players[existingIndex].isConnected = true;
      this.state.players[existingIndex].lastActive = Date.now();
    } else {
      this.state.players.push(player);
    }

    this.emitState();
    return true;
  }

  /**
   * Removes player from room and handles host migration / elimination
   */
  public removePlayer(playerId: string): void {
    // Check spectators
    const specIndex = this.state.spectators.indexOf(playerId);
    if (specIndex >= 0) {
      this.state.spectators.splice(specIndex, 1);
      this.emitState();
      return;
    }

    const playerIndex = this.state.players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) return;

    if (this.state.status === 'lobby') {
      this.state.players.splice(playerIndex, 1);
      // Migrate host if host left
      if (this.state.hostId === playerId && this.state.players.length > 0) {
        this.state.hostId = this.state.players[0].id;
        this.state.players[0].isHost = true;
      }
      this.emitState();
      return;
    }

    // During active match: mark as disconnected and eliminated
    const player = this.state.players[playerIndex];
    player.isConnected = false;
    player.isEliminated = true;
    player.eliminatedAt = Date.now();

    // Check if it was this player's active turn
    if (this.state.status === 'in_progress' && this.state.activePlayerIndex === playerIndex) {
      this.advanceTurn('timeout');
    }

    this.checkWinner();
    this.emitState();
  }

  /**
   * Handle player reconnect
   */
  public reconnectPlayer(playerId: string): boolean {
    const player = this.state.players.find(p => p.id === playerId);
    if (!player) return false;
    player.isConnected = true;
    player.lastActive = Date.now();
    this.emitState();
    return true;
  }

  /**
   * Updates game settings (host only in lobby)
   */
  public updateSettings(hostId: string, newSettings: GameSettings): boolean {
    if (this.state.status !== 'lobby') return false;
    if (this.state.hostId !== hostId) return false;

    this.state.settings = { ...newSettings };
    // Synchronize initial player lives to new settings
    for (const player of this.state.players) {
      player.lives = newSettings.lives === 0 ? Infinity : newSettings.lives;
    }

    this.emitState();
    return true;
  }

  /**
   * Toggle player ready status in lobby
   */
  public toggleReady(playerId: string): boolean {
    if (this.state.status !== 'lobby') return false;
    const player = this.state.players.find(p => p.id === playerId);
    if (!player) return false;
    player.isReady = !player.isReady;
    this.emitState();
    return true;
  }

  /**
   * Start the match
   */
  public startMatch(requestingPlayerId?: string): boolean {
    if (requestingPlayerId && requestingPlayerId !== this.state.hostId) {
      return false;
    }
    if (this.state.status !== 'lobby') return false;
    if (this.state.players.length < 2) return false;

    // Reset game counters
    this.usedWords.clear();
    this.state.chain = [];
    this.state.roundNumber = 1;
    this.state.winnerId = null;
    this.state.winnerName = null;

    // Turn order
    if (this.state.settings.turnOrder === 'randomized') {
      this.state.players.sort(() => Math.random() - 0.5);
    }

    // Set lives and status
    for (const p of this.state.players) {
      p.lives = this.state.settings.lives === 0 ? Infinity : this.state.settings.lives;
      p.score = 0;
      p.wordsSubmitted = 0;
      p.isEliminated = false;
      p.eliminatedAt = undefined;
    }

    this.state.status = 'in_progress';
    this.state.activePlayerIndex = 0;
    this.state.matchStartedAt = Date.now();

    // Match max duration
    if (this.state.settings.maxMatchDuration > 0) {
      const durationMs = this.state.settings.maxMatchDuration * 60 * 1000;
      this.state.matchEndsAt = Date.now() + durationMs;
      if (this.matchTimerId) clearTimeout(this.matchTimerId);
      this.matchTimerId = setTimeout(() => {
        this.handleMatchDurationExpired();
      }, durationMs);
    } else {
      this.state.matchEndsAt = null;
    }

    // Initial word logic
    if (this.state.settings.startingWordMode === 'random') {
      const startingWord = DictionaryService.getRandomStartingWord(this.state.settings);
      this.usedWords.add(startingWord.toLowerCase());
      const lastChar = startingWord.slice(-1).toLowerCase();
      this.state.currentRequiredLetter = lastChar;
      this.state.chain.push({
        word: startingWord.toUpperCase(),
        playerId: 'system',
        playerName: 'Game Engine',
        avatarId: 'monty',
        timestamp: Date.now(),
        turnNumber: 0,
      });
    } else {
      // First player chooses any valid word
      this.state.currentRequiredLetter = '';
    }

    this.startTurnTimer();
    this.emitState();
    return true;
  }

  /**
   * Submit a word for the current active player
   */
  public submitWord(playerId: string, rawWord: string): { success: boolean; message: string } {
    if (this.state.status !== 'in_progress') {
      return { success: false, message: 'Game is not in progress.' };
    }

    const activePlayer = this.state.players[this.state.activePlayerIndex];
    if (!activePlayer || activePlayer.id !== playerId) {
      return { success: false, message: 'It is not your turn.' };
    }

    if (activePlayer.isEliminated) {
      return { success: false, message: 'You have been eliminated.' };
    }

    // Validate submission
    const validation = DictionaryService.validateSubmission(
      rawWord,
      this.state.currentRequiredLetter || null,
      this.usedWords,
      this.state.settings
    );

    if (!validation.isValid) {
      return this.handleInvalidWord(activePlayer, rawWord, validation.message || 'Invalid word.');
    }

    // Word is valid!
    const validWord = validation.normalizedWord;
    this.usedWords.add(validWord);

    // Update active player score & stats
    activePlayer.score += validWord.length * 10;
    activePlayer.wordsSubmitted += 1;

    // Add to chain
    const playedWord: PlayedWord = {
      word: validWord.toUpperCase(),
      playerId: activePlayer.id,
      playerName: activePlayer.name,
      avatarId: activePlayer.avatarId,
      timestamp: Date.now(),
      turnNumber: this.state.chain.length + 1,
    };
    this.state.chain.push(playedWord);

    // Update required letter for next player
    this.state.currentRequiredLetter = validWord.slice(-1).toLowerCase();

    this.state.lastActionFeedback = {
      type: 'valid',
      message: `+${validWord.length * 10} pts: "${validWord.toUpperCase()}" chained!`,
      playerId: activePlayer.id,
    };

    // Advance turn to next active player
    this.advanceTurn('valid');
    return { success: true, message: 'Word accepted!' };
  }

  /**
   * Handles invalid word submissions according to settings
   */
  private handleInvalidWord(player: Player, word: string, reasonMessage: string): { success: boolean; message: string } {
    const penalty = this.state.settings.invalidWordPenalty;

    this.state.lastActionFeedback = {
      type: 'invalid',
      message: reasonMessage,
      playerId: player.id,
    };

    if (penalty === 'none') {
      // Re-try allowed before timer runs out
      this.emitState();
      return { success: false, message: reasonMessage };
    }

    if (penalty === 'lose_turn') {
      this.state.lastActionFeedback.message += ' (Lost turn)';
      this.advanceTurn('invalid');
      return { success: false, message: reasonMessage };
    }

    if (penalty === 'lose_life') {
      if (this.state.settings.lives > 0) {
        player.lives -= 1;
        if (player.lives <= 0) {
          player.isEliminated = true;
          player.eliminatedAt = Date.now();
          this.state.lastActionFeedback = {
            type: 'eliminated',
            message: `${player.name} lost their last life! Eliminated.`,
            playerId: player.id,
          };
        } else {
          this.state.lastActionFeedback.message += ` (-1 Life: ${player.lives} left)`;
        }
      }
      this.advanceTurn('invalid');
      return { success: false, message: reasonMessage };
    }

    return { success: false, message: reasonMessage };
  }

  /**
   * Handle turn timeout
   */
  public handleTimeout(): void {
    if (this.state.status !== 'in_progress') return;

    const activePlayer = this.state.players[this.state.activePlayerIndex];
    if (!activePlayer || activePlayer.isEliminated) return;

    const penalty = this.state.settings.timeoutPenalty;
    if (penalty === 'lose_life' && this.state.settings.lives > 0) {
      activePlayer.lives -= 1;
      if (activePlayer.lives <= 0) {
        activePlayer.isEliminated = true;
        activePlayer.eliminatedAt = Date.now();
        this.state.lastActionFeedback = {
          type: 'eliminated',
          message: `${activePlayer.name} ran out of time and was eliminated!`,
          playerId: activePlayer.id,
        };
      } else {
        this.state.lastActionFeedback = {
          type: 'timeout',
          message: `${activePlayer.name} timed out! (-1 Life: ${activePlayer.lives} left)`,
          playerId: activePlayer.id,
        };
      }
    } else {
      this.state.lastActionFeedback = {
        type: 'timeout',
        message: `${activePlayer.name} timed out! Turn skipped.`,
        playerId: activePlayer.id,
      };
    }

    if (this.listeners.onTurnTimeout) {
      this.listeners.onTurnTimeout(activePlayer.id);
    }

    this.advanceTurn('timeout');
  }

  /**
   * Advance to the next non-eliminated player
   */
  private advanceTurn(_reason: 'valid' | 'invalid' | 'timeout'): void {
    if (this.checkWinner()) return;

    const total = this.state.players.length;
    let nextIndex = (this.state.activePlayerIndex + 1) % total;
    let attempts = 0;

    while (this.state.players[nextIndex].isEliminated && attempts < total) {
      nextIndex = (nextIndex + 1) % total;
      attempts++;
    }

    if (attempts >= total) {
      // Everyone eliminated
      this.checkWinner();
      return;
    }

    // Check if new round started (wrapped around)
    if (nextIndex <= this.state.activePlayerIndex) {
      this.state.roundNumber += 1;
    }

    this.state.activePlayerIndex = nextIndex;
    this.startTurnTimer();
    this.emitState();

    // Check if next player is an AI bot
    const currentActive = this.state.players[this.state.activePlayerIndex];
    if (currentActive && currentActive.isBot && !currentActive.isEliminated) {
      this.triggerBotTurn(currentActive);
    }
  }

  /**
   * Executes AI Bot turn automatically
   */
  private triggerBotTurn(bot: Player): void {
    const delay = Math.min(
      Math.max(1200, (this.state.settings.turnTimeLimit || 10) * 200),
      3500
    );

    setTimeout(() => {
      if (this.state.status !== 'in_progress') return;
      if (this.state.players[this.state.activePlayerIndex]?.id !== bot.id) return;

      const difficulty = bot.botDifficulty || 'standard';
      const word = DictionaryService.findBotWord(
        this.state.currentRequiredLetter || 'c',
        this.usedWords,
        this.state.settings,
        difficulty
      );

      if (word) {
        this.submitWord(bot.id, word);
      } else {
        // Bot fails submission or times out
        this.handleTimeout();
      }
    }, delay);
  }

  /**
   * Starts or restarts server turn timer
   */
  private startTurnTimer(): void {
    if (this.turnTimerId) {
      clearTimeout(this.turnTimerId);
      this.turnTimerId = null;
    }

    if (this.state.settings.turnTimeLimit <= 0) {
      this.state.currentTurnDeadline = null;
      return;
    }

    const durationMs = this.state.settings.turnTimeLimit * 1000;
    this.state.currentTurnDeadline = Date.now() + durationMs;

    this.turnTimerId = setTimeout(() => {
      this.handleTimeout();
    }, durationMs);
  }

  /**
   * Evaluates if match has ended (elimination or score)
   */
  public checkWinner(): boolean {
    const activeNonEliminated = this.state.players.filter(p => !p.isEliminated);

    // In elimination mode (lives > 0)
    if (this.state.settings.lives > 0) {
      if (activeNonEliminated.length === 1 && this.state.players.length > 1) {
        const winner = activeNonEliminated[0];
        this.endGame(winner.id, winner.name);
        return true;
      }

      if (activeNonEliminated.length === 0) {
        // Tie or highest score among all players
        const highestScorer = [...this.state.players].sort((a, b) => b.score - a.score)[0];
        this.endGame(highestScorer ? highestScorer.id : null, highestScorer ? highestScorer.name : 'Tie');
        return true;
      }
    }

    return false;
  }

  /**
   * End game handler
   */
  private endGame(winnerId: string | null, winnerName: string | null): void {
    this.cleanTimers();
    this.state.status = 'ended';
    this.state.winnerId = winnerId;
    this.state.winnerName = winnerName;
    this.state.currentTurnDeadline = null;

    if (this.listeners.onGameOver) {
      this.listeners.onGameOver(winnerId, winnerName);
    }
    this.emitState();
  }

  /**
   * Handle match duration expiration
   */
  private handleMatchDurationExpired(): void {
    if (this.state.status !== 'in_progress') return;

    // Highest score among non-eliminated or all players wins
    const eligible = this.state.players.filter(p => !p.isEliminated);
    const pool = eligible.length > 0 ? eligible : this.state.players;
    const winner = [...pool].sort((a, b) => b.score - a.score)[0];

    this.endGame(winner ? winner.id : null, winner ? winner.name : 'Time Expired');
  }

  /**
   * Reset game state for rematch with same players
   */
  public rematch(): void {
    this.cleanTimers();
    this.state.status = 'lobby';
    this.state.chain = [];
    this.state.roundNumber = 1;
    this.state.winnerId = null;
    this.state.winnerName = null;
    this.state.currentTurnDeadline = null;
    this.state.matchStartedAt = null;
    this.state.matchEndsAt = null;
    this.state.lastActionFeedback = null;
    this.usedWords.clear();

    for (const p of this.state.players) {
      p.isReady = false;
      p.isEliminated = false;
      p.eliminatedAt = undefined;
      p.score = 0;
      p.wordsSubmitted = 0;
      p.lives = this.state.settings.lives === 0 ? Infinity : this.state.settings.lives;
    }

    this.emitState();
  }

  public cleanTimers(): void {
    if (this.turnTimerId) {
      clearTimeout(this.turnTimerId);
      this.turnTimerId = null;
    }
    if (this.matchTimerId) {
      clearTimeout(this.matchTimerId);
      this.matchTimerId = null;
    }
  }

  private emitState(): void {
    if (this.listeners.onStateChange) {
      this.listeners.onStateChange(this.getSnapshot());
    }
  }
}
