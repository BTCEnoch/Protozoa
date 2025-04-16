/**
 * Bitcoin Types for Bitcoin Protozoa
 * 
 * This file contains the types related to Bitcoin block data.
 */

/**
 * BlockData interface
 * Defines the data structure for Bitcoin block data
 */
export interface BlockData {
  height: number;
  nonce: string;
  confirmations: number;
  hash: string;
  timestamp: number;
}

/**
 * BlockInfo interface
 * Defines the data structure for Bitcoin block info
 */
export interface BlockInfo {
  height: number;
  hash: string;
  confirmations: number;
  timestamp: number;
  nonce: string;
  difficulty: number;
  merkleRoot: string;
  version: number;
  bits: string;
  size: number;
  weight: number;
  transactions: number;
}
