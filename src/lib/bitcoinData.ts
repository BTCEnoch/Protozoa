/**
 * Bitcoin Data Service
 *
 * This module provides functions to fetch Bitcoin block data from the ordinals.com API.
 * It is used to get ONLY the nonce and confirmations for creature generation and evolution.
 */

// Interface for Bitcoin block data - ONLY what we need
export interface BlockData {
  nonce: number;
  confirmations: number;
}

/**
 * Fetch Bitcoin block data from the ordinals.com API
 * @param blockNumber The block number to fetch
 * @returns Promise resolving to the block data (ONLY nonce and confirmations)
 */
export async function fetchBlockData(blockNumber: number): Promise<BlockData> {
  try {
    // Construct the API URL
    const apiUrl = `https://ordinals.com/r/blockinfo/${blockNumber}`;

    // Fetch the data
    const response = await fetch(apiUrl);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch block data: ${response.status} ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Extract ONLY the nonce and confirmations
    // Deliberately ignore all other fields
    return {
      nonce: data.nonce,
      confirmations: data.confirmations
    };
  } catch (error) {
    console.error('Error fetching Bitcoin block data:', error);

    // For development/testing, return mock data if the API call fails
    return createMockBlockData(blockNumber);
  }
}

/**
 * Create mock block data for development/testing
 * @param blockNumber The block number to create mock data for
 * @returns Mock block data with ONLY nonce and confirmations
 */
function createMockBlockData(blockNumber: number): BlockData {
  // Use the block number as a seed for deterministic mock data
  const seed = blockNumber * 1000;

  // Return ONLY nonce and confirmations - nothing else
  return {
    nonce: seed % 4294967295, // Nonce is a 32-bit number
    confirmations: Math.min(1000000, blockNumber > 700000 ? 1000000 - (800000 - blockNumber) * 100 : 1000000)
  };
}

/**
 * Check if a block has reached a confirmation milestone
 * @param confirmations The number of confirmations
 * @returns The highest milestone reached
 */
export function getConfirmationMilestone(confirmations: number): number {
  if (confirmations >= 1000000) return 1000000; // 1M
  if (confirmations >= 500000) return 500000;   // 500k
  if (confirmations >= 250000) return 250000;   // 250k
  if (confirmations >= 100000) return 100000;   // 100k
  if (confirmations >= 50000) return 50000;     // 50k
  if (confirmations >= 10000) return 10000;     // 10k
  return 0; // No milestone reached
}

/**
 * Get the mutation chance based on confirmation milestone
 * @param milestone The confirmation milestone
 * @returns The mutation chance (0-1)
 */
export function getMutationChance(milestone: number): number {
  switch (milestone) {
    case 1000000: return 1.0;   // 100%
    case 500000: return 0.5;    // 50%
    case 250000: return 0.25;   // 25%
    case 100000: return 0.1;    // 10%
    case 50000: return 0.05;    // 5%
    case 10000: return 0.01;    // 1%
    default: return 0;          // 0%
  }
}
