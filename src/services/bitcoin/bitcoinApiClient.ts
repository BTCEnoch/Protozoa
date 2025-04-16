/**
 * Bitcoin API Client for Bitcoin Protozoa
 * 
 * This service is responsible for fetching Bitcoin block data from the API.
 * It handles API requests, error handling, and data parsing.
 */

import { BlockData, BlockInfo } from '../../types/bitcoin/bitcoin';

/**
 * Bitcoin API client class
 */
export class BitcoinApiClient {
  private static instance: BitcoinApiClient;
  private baseUrl: string = 'https://ordinals.com';
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
  public static getInstance(): BitcoinApiClient {
    if (!BitcoinApiClient.instance) {
      BitcoinApiClient.instance = new BitcoinApiClient();
    }
    return BitcoinApiClient.instance;
  }

  /**
   * Initialize the Bitcoin API client
   * @param baseUrl Optional base URL for the API
   */
  public initialize(baseUrl?: string): void {
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }
    this.initialized = true;
    console.log('Bitcoin API client initialized with base URL:', this.baseUrl);
  }

  /**
   * Check if the service is initialized
   * @returns True if initialized, false otherwise
   */
  public isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Fetch block info from the API
   * @param blockNumber The block number to fetch
   * @returns A promise resolving to the block info
   */
  public async fetchBlockInfo(blockNumber: number): Promise<BlockInfo> {
    if (!this.initialized) {
      throw new Error('Bitcoin API client not initialized');
    }

    try {
      const response = await fetch(`${this.baseUrl}/r/blockinfo/${blockNumber}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return this.parseBlockResponse(data);
    } catch (error) {
      console.error(`Error fetching block info for block ${blockNumber}:`, error);
      throw this.handleApiError(error);
    }
  }

  /**
   * Fetch block confirmations from the API
   * @param blockNumber The block number to fetch
   * @returns A promise resolving to the confirmation count
   */
  public async fetchBlockConfirmations(blockNumber: number): Promise<number> {
    if (!this.initialized) {
      throw new Error('Bitcoin API client not initialized');
    }

    try {
      const blockInfo = await this.fetchBlockInfo(blockNumber);
      return blockInfo.confirmations;
    } catch (error) {
      console.error(`Error fetching block confirmations for block ${blockNumber}:`, error);
      throw this.handleApiError(error);
    }
  }

  /**
   * Fetch inscription content from the API
   * @param inscriptionId The inscription ID to fetch
   * @returns A promise resolving to the inscription content
   */
  public async fetchInscriptionContent(inscriptionId: string): Promise<any> {
    if (!this.initialized) {
      throw new Error('Bitcoin API client not initialized');
    }

    try {
      const response = await fetch(`${this.baseUrl}/content/${inscriptionId}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching inscription content for inscription ${inscriptionId}:`, error);
      throw this.handleApiError(error);
    }
  }

  /**
   * Handle API errors
   * @param error The error to handle
   * @returns A new error with a more descriptive message
   */
  private handleApiError(error: any): Error {
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return new Error(`Network error: ${error.message}`);
    }
    
    // Check if it's an API error
    if (error instanceof Error && error.message.includes('API request failed')) {
      return new Error(`API error: ${error.message}`);
    }
    
    // Default error
    return new Error(`Bitcoin API error: ${error.message || 'Unknown error'}`);
  }

  /**
   * Parse block response from the API
   * @param data The raw API response data
   * @returns The parsed block info
   */
  private parseBlockResponse(data: any): BlockInfo {
    // Validate required fields
    if (!data.height || !data.hash || !data.nonce) {
      throw new Error('Invalid block data: missing required fields');
    }
    
    // Parse and return block info
    return {
      height: data.height,
      hash: data.hash,
      nonce: data.nonce,
      confirmations: data.confirmations || 0,
      timestamp: data.time || Date.now(),
      difficulty: data.difficulty || 0,
      merkleRoot: data.merkleroot || '',
      version: data.version || 0,
      bits: data.bits || '',
      size: data.size || 0,
      weight: data.weight || 0,
      transactions: data.tx?.length || 0
    };
  }

  /**
   * Reset the Bitcoin API client
   */
  public reset(): void {
    this.baseUrl = 'https://ordinals.com';
    this.initialized = false;
  }
}

/**
 * Get the Bitcoin API client instance
 * @returns The Bitcoin API client instance
 */
export function getBitcoinApiClient(): BitcoinApiClient {
  return BitcoinApiClient.getInstance();
}

