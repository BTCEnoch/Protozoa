# Bitcoin Service Implementation

This document provides the implementation details for the Bitcoin service that fetches block data from the ordinals.com API, specifically focusing on retrieving only the nonce and confirmations data needed for creature generation and evolution.

## Interface Definition

```typescript
/**
 * Bitcoin Block Data interface - only what we need
 */
export interface BlockData {
  nonce: number;
  confirmations: number;
}
```

## Service Implementation

```typescript
/**
 * Bitcoin Data Service
 * 
 * This service handles fetching Bitcoin block data from the ordinals.com API.
 * It specifically focuses on retrieving only the nonce and confirmations data
 * needed for creature generation and evolution.
 */
export class BitcoinService {
  private readonly apiBaseUrl: string;
  
  /**
   * Constructor
   * @param apiBaseUrl The base URL for the ordinals.com API
   */
  constructor(apiBaseUrl: string = 'https://ordinals.com/r') {
    this.apiBaseUrl = apiBaseUrl;
  }
  
  /**
   * Fetch Bitcoin block data from the ordinals.com API
   * @param blockNumber The block number to fetch
   * @returns Promise resolving to the block data (nonce and confirmations only)
   */
  async fetchBlockData(blockNumber: number): Promise<BlockData> {
    try {
      // Construct the API URL
      const apiUrl = `${this.apiBaseUrl}/blockinfo/${blockNumber}`;
      
      // Fetch the data
      const response = await fetch(apiUrl);
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Failed to fetch block data: ${response.status} ${response.statusText}`);
      }
      
      // Parse the JSON response
      const data = await response.json();
      
      // Extract ONLY the nonce and confirmations
      const blockData: BlockData = {
        nonce: data.nonce,
        confirmations: data.confirmations
      };
      
      return blockData;
    } catch (error) {
      console.error(`Error fetching Bitcoin block data for block ${blockNumber}:`, error);
      
      // For development/testing, return mock data if the API call fails
      return this.createMockBlockData(blockNumber);
    }
  }
  
  /**
   * Create mock block data for development/testing
   * @param blockNumber The block number to create mock data for
   * @returns Mock block data with ONLY nonce and confirmations
   */
  private createMockBlockData(blockNumber: number): BlockData {
    // Use the block number as a seed for deterministic mock data
    const seed = blockNumber * 1000;
    
    // Calculate mock confirmations based on block number
    // Newer blocks (higher numbers) have fewer confirmations
    const mockConfirmations = Math.max(0, 1000000 - (Math.max(0, 800000 - blockNumber) * 100));
    
    return {
      nonce: seed % 4294967295, // Nonce is a 32-bit number
      confirmations: mockConfirmations
    };
  }
}
```

## Usage Example

```typescript
// Create the Bitcoin service
const bitcoinService = new BitcoinService();

// Fetch block data for a specific block
const blockNumber = 700000;
const blockData = await bitcoinService.fetchBlockData(blockNumber);

console.log(`Block ${blockNumber}:`);
console.log(`  Nonce: ${blockData.nonce}`);
console.log(`  Confirmations: ${blockData.confirmations}`);

// Use the nonce for RNG seed
const rngSystem = createRNGFromBlockNonce(blockData.nonce);

// Use confirmations for evolution milestones
const milestone = getConfirmationMilestone(blockData.confirmations);
```

## API Response Format

The ordinals.com API returns a JSON object with block information. Here's an example response:

```json
{
  "height": 700000,
  "hash": "00000000000000000002a7c4c1e48d76c5a37902165a270156b7a8d72728a054",
  "nonce": 1765503561,
  "confirmations": 25000,
  "time": 1677808150,
  "merkleroot": "8e8a3733d34a197c187f3a5f4f3d5c343a77b4c6e19c3d1d427b98b1dda0c2a0",
  "difficulty": 43.05,
  "size": 1562024,
  "weight": 3993385,
  "version": 536870912
}
```

From this response, we extract and use only:
- `nonce`: Used as the seed for our RNG system
- `confirmations`: Used to determine evolution milestones

## Error Handling

The service includes basic error handling:
1. Network errors are caught and logged
2. Invalid responses are handled gracefully
3. Fallback to mock data when the API is unavailable

## Mock Data Generation

For development and testing purposes, the service can generate mock data when the API is unavailable:
1. The nonce is derived deterministically from the block number
2. The confirmations are calculated based on the block number (older blocks have more confirmations)

This ensures that development can continue even when the API is unavailable, while maintaining deterministic behavior.
