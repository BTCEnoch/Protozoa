/**
 * Types for Game Theory calculations
 */

/**
 * Represents a payoff matrix for a 2-player game
 */
export interface PayoffMatrix {
  // Number of rows (player 1 strategies)
  rows: number;
  // Number of columns (player 2 strategies)
  cols: number;
  // Payoffs for player 1
  playerOnePayoffs: number[][];
  // Payoffs for player 2
  playerTwoPayoffs: number[][];
}

/**
 * Represents a Nash equilibrium solution
 */
export interface NashEquilibrium {
  // The type of equilibrium (pure or mixed)
  type: 'pure' | 'mixed';
  // Player 1's equilibrium strategy (probabilities)
  playerOneStrategy: number[];
  // Player 2's equilibrium strategy (probabilities)
  playerTwoStrategy: number[];
  // Expected payoff for player 1
  playerOnePayoff: number;
  // Expected payoff for player 2
  playerTwoPayoff: number;
} 