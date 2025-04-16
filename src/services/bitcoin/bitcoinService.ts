/**
 * Bitcoin Data Service
 *
 * This service handles fetching Bitcoin block data from the ordinals.com API.
 * It specifically focuses on retrieving ONLY the nonce and confirmations data
 * needed for creature generation and evolution.
 */

import { BlockData, getConfirmationMilestone, getMutationChance } from '../types/bitcoin';

// Cache interface for storing fetched block data
interface BlockDataCache {
  [blockNumber: number]: {
    data: BlockData;
    timestamp: number;
  };
}

/**
 * Bitcoin Data Service class
 */
export class BitcoinService {
  private static instance: BitcoinService;

  /**
   * Get the singleton instance
   * @param apiBaseUrl Optional API base URL
   * @param cacheExpiryTime Optional cache expiry time
   * @returns The singleton instance
   */
  public static getInstance(apiBaseUrl?: string, cacheExpiryTime?: number): BitcoinService {
    if (!BitcoinService.instance) {
      BitcoinService.instance = new BitcoinService(apiBaseUrl, cacheExpiryTime);
    }
    return BitcoinService.instance;
  }
  private cache: BlockDataCache = {};
  private readonly cacheExpiryTime: number;
  private readonly apiBaseUrl: string;

  /**
   * Constructor
   * @param apiBaseUrl The base URL for the ordinals.com API
   * @param cacheExpiryTime Cache expiry time in milliseconds (default: 1 hour)
   */
  constructor(
    apiBaseUrl: string = 'https://ordinals.com',
    cacheExpiryTime: number = 60 * 60 * 1000
  ) {
    this.apiBaseUrl = apiBaseUrl;
    this.cacheExpiryTime = cacheExpiryTime;
  }

  /**
   * Fetch Bitcoin block data from the ordinals.com API
   * @param blockNumber The block number to fetch
   * @param forceRefresh Whether to force a refresh from the API (bypass cache)
   * @returns Promise resolving to the block data
   */
  async fetchBlockData(blockNumber: number, forceRefresh: boolean = false): Promise<BlockData> {
    // Validate block number
    this.validateBlockNumber(blockNumber);

    // Check cache if not forcing refresh
    if (!forceRefresh && this.isCacheValid(blockNumber)) {
      return this.cache[blockNumber].data;
    }

    try {
      // Construct the API URL
      const apiUrl = `${this.apiBaseUrl}/r/blockinfo/${blockNumber}`;

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
      const blockData: BlockData = {
        nonce: data.nonce,
        confirmations: data.confirmations
      };

      // Cache the data
      this.cacheBlockData(blockNumber, blockData);

      return blockData;
    } catch (error) {
      console.error(`Error fetching Bitcoin block data for block ${blockNumber}:`, error);

      // If we have cached data, return it even if it's expired
      if (blockNumber in this.cache) {
        console.warn(`Using expired cache data for block ${blockNumber}`);
        return this.cache[blockNumber].data;
      }

      // Otherwise, return mock data
      return this.createMockBlockData(blockNumber);
    }
  }



  /**
   * Check if the cached data for a block is still valid
   * @param blockNumber The block number to check
   * @returns Whether the cache is valid
   */
  private isCacheValid(blockNumber: number): boolean {
    // If the block is not in the cache, it's not valid
    if (!(blockNumber in this.cache)) {
      return false;
    }

    const cachedData = this.cache[blockNumber];
    const currentTime = Date.now();

    // If the block has over 1M confirmations, it's fully evolved and the cache never expires
    if (cachedData.data.confirmations >= 1000000) {
      return true;
    }

    // Otherwise, check if the cache has expired
    return (currentTime - cachedData.timestamp) < this.cacheExpiryTime;
  }

  /**
   * Cache block data
   * @param blockNumber The block number
   * @param data The block data to cache
   */
  private cacheBlockData(blockNumber: number, data: BlockData): void {
    this.cache[blockNumber] = {
      data,
      timestamp: Date.now()
    };
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

    // Return ONLY nonce and confirmations - nothing else
    return {
      nonce: seed % 4294967295, // Nonce is a 32-bit number
      confirmations: mockConfirmations
    };
  }

  /**
   * Validate a block number
   * @param blockNumber The block number to validate
   * @throws Error if the block number is invalid
   */
  private validateBlockNumber(blockNumber: number): void {
    if (!Number.isInteger(blockNumber)) {
      throw new Error('Block number must be an integer');
    }

    if (blockNumber < 0) {
      throw new Error('Block number must be non-negative');
    }

    // Current Bitcoin block height is around 800,000 as of 2023
    // This is a loose validation to catch obvious errors
    if (blockNumber > 1000000) {
      throw new Error('Block number is unrealistically high');
    }
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache = {};
  }

  /**
   * Remove a specific block from the cache
   * @param blockNumber The block number to remove
   */
  removeFromCache(blockNumber: number): void {
    delete this.cache[blockNumber];
  }

  /**
   * Fetch content from an inscription ID
   * @param inscriptionId The inscription ID
   * @returns Promise resolving to the content
   */
  async fetchInscriptionContent(inscriptionId: string): Promise<any> {
    try {
      // Construct the API URL
      const apiUrl = `${this.apiBaseUrl}/content/${inscriptionId}`;

      // Fetch the data
      const response = await fetch(apiUrl);

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Failed to fetch inscription content: ${response.status} ${response.statusText}`);
      }

      // Parse the response based on content type
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      } else if (contentType?.includes('text/')) {
        return await response.text();
      } else {
        // For binary data, return as blob
        return await response.blob();
      }
    } catch (error) {
      console.error(`Error fetching inscription content for ID ${inscriptionId}:`, error);
      throw error;
    }
  }
}

/**
 * Get the BitcoinService instance
 * @param apiBaseUrl Optional API base URL
 * @param cacheExpiryTime Optional cache expiry time
 * @returns The BitcoinService instance
 */
export function getBitcoinService(apiBaseUrl?: string, cacheExpiryTime?: number): BitcoinService {
  return BitcoinService.getInstance(apiBaseUrl, cacheExpiryTime);
}
