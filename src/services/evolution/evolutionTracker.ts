/**
 * Evolution Tracker for Bitcoin Protozoa
 * 
 * This service is responsible for tracking the evolution history of creatures.
 * It records mutations and other evolutionary changes over time.
 */

import { Mutation } from '../../types/mutations/mutation';

/**
 * Evolution history interface
 * Tracks the evolution history of a creature
 */
export interface EvolutionHistory {
  creatureId: string;
  blockNumber: number;
  evolutionEvents: EvolutionEvent[];
}

/**
 * Evolution event interface
 * Represents a single evolution event
 */
export interface EvolutionEvent {
  timestamp: number;
  confirmations: number;
  mutations: Mutation[];
}

/**
 * Evolution tracker class
 */
export class EvolutionTracker {
  private static instance: EvolutionTracker;
  private evolutionHistories: Map<string, EvolutionHistory> = new Map();
  private initialized: boolean = false;

  /**
   * Private constructor for singleton pattern
   */
  private constructor() {
    // Initialize with empty state
  }

  /**
   * Get the singleton instance
   * @returns The singleton instance
   */
  public static getInstance(): EvolutionTracker {
    if (!EvolutionTracker.instance) {
      EvolutionTracker.instance = new EvolutionTracker();
    }
    return EvolutionTracker.instance;
  }

  /**
   * Initialize the evolution tracker
   */
  public initialize(): void {
    this.evolutionHistories.clear();
    this.initialized = true;
    console.log('Evolution tracker initialized');
  }

  /**
   * Check if the service is initialized
   * @returns True if initialized, false otherwise
   */
  public isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Track an evolution event
   * @param creatureId The creature ID
   * @param blockNumber The block number
   * @param confirmations The confirmation count
   * @param mutations The mutations applied
   */
  public trackEvolution(
    creatureId: string,
    blockNumber: number,
    confirmations: number,
    mutations: Mutation[]
  ): void {
    if (!this.initialized) {
      throw new Error('Evolution tracker not initialized');
    }

    // Get or create evolution history
    let history = this.evolutionHistories.get(creatureId);
    if (!history) {
      history = {
        creatureId,
        blockNumber,
        evolutionEvents: []
      };
      this.evolutionHistories.set(creatureId, history);
    }

    // Create evolution event
    const event: EvolutionEvent = {
      timestamp: Date.now(),
      confirmations,
      mutations
    };

    // Add event to history
    history.evolutionEvents.push(event);

    console.log(`Tracked evolution for creature ${creatureId} at ${confirmations} confirmations`);
  }

  /**
   * Get the evolution history for a creature
   * @param creatureId The creature ID
   * @returns The evolution history, or undefined if not found
   */
  public getEvolutionHistory(creatureId: string): EvolutionHistory | undefined {
    if (!this.initialized) {
      throw new Error('Evolution tracker not initialized');
    }

    return this.evolutionHistories.get(creatureId);
  }

  /**
   * Get evolution events by milestone
   * @param creatureId The creature ID
   * @param milestone The confirmation milestone
   * @returns The evolution events at the milestone, or an empty array if none
   */
  public getEvolutionByMilestone(
    creatureId: string,
    milestone: number
  ): EvolutionEvent[] {
    if (!this.initialized) {
      throw new Error('Evolution tracker not initialized');
    }

    const history = this.evolutionHistories.get(creatureId);
    if (!history) {
      return [];
    }

    // Find events at the milestone
    return history.evolutionEvents.filter(
      event => event.confirmations === milestone
    );
  }

  /**
   * Get evolution events by confirmation range
   * @param creatureId The creature ID
   * @param minConfirmations The minimum confirmation count
   * @param maxConfirmations The maximum confirmation count
   * @returns The evolution events in the range, or an empty array if none
   */
  public getEvolutionByConfirmation(
    creatureId: string,
    minConfirmations: number,
    maxConfirmations: number
  ): EvolutionEvent[] {
    if (!this.initialized) {
      throw new Error('Evolution tracker not initialized');
    }

    const history = this.evolutionHistories.get(creatureId);
    if (!history) {
      return [];
    }

    // Find events in the confirmation range
    return history.evolutionEvents.filter(
      event => event.confirmations >= minConfirmations && event.confirmations <= maxConfirmations
    );
  }

  /**
   * Save evolution history to local storage
   * @param creatureId The creature ID
   */
  public saveEvolutionHistory(creatureId: string): void {
    if (!this.initialized) {
      throw new Error('Evolution tracker not initialized');
    }

    const history = this.evolutionHistories.get(creatureId);
    if (!history) {
      return;
    }

    // Save to local storage
    try {
      localStorage.setItem(
        `evolution_history_${creatureId}`,
        JSON.stringify(history)
      );
      console.log(`Saved evolution history for creature ${creatureId}`);
    } catch (error) {
      console.error(`Error saving evolution history for creature ${creatureId}:`, error);
    }
  }

  /**
   * Load evolution history from local storage
   * @param creatureId The creature ID
   * @returns True if loaded successfully, false otherwise
   */
  public loadEvolutionHistory(creatureId: string): boolean {
    if (!this.initialized) {
      throw new Error('Evolution tracker not initialized');
    }

    // Load from local storage
    try {
      const historyJson = localStorage.getItem(`evolution_history_${creatureId}`);
      if (!historyJson) {
        return false;
      }

      const history = JSON.parse(historyJson) as EvolutionHistory;
      this.evolutionHistories.set(creatureId, history);
      console.log(`Loaded evolution history for creature ${creatureId}`);
      return true;
    } catch (error) {
      console.error(`Error loading evolution history for creature ${creatureId}:`, error);
      return false;
    }
  }

  /**
   * Reset the evolution tracker
   */
  public reset(): void {
    this.evolutionHistories.clear();
    this.initialized = false;
  }
}

/**
 * Get the evolution tracker instance
 * @returns The evolution tracker instance
 */
export function getEvolutionTracker(): EvolutionTracker {
  return EvolutionTracker.getInstance();
}

