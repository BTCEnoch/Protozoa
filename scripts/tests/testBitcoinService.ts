/**
 * Test script for Bitcoin service
 * 
 * This script demonstrates fetching Bitcoin block data (ONLY nonce and confirmations)
 * from the ordinals.com API.
 */

import { BitcoinService } from '../services/bitcoinService';

// Test block numbers
const testBlocks = [
  { number: 100000, description: 'Block 100,000 (old block)' },
  { number: 500000, description: 'Block 500,000 (middle-aged block)' },
  { number: 700000, description: 'Block 700,000 (recent block)' }
];

// Main function
async function main() {
  console.log('Bitcoin Service Test\n');
  
  // Create the Bitcoin service
  const bitcoinService = new BitcoinService();
  
  // Test fetching block data for each test block
  for (const block of testBlocks) {
    console.log(`Fetching data for ${block.description}...`);
    
    try {
      // Fetch ONLY nonce and confirmations
      const blockData = await bitcoinService.fetchBlockData(block.number);
      
      console.log(`Block ${block.number}:`);
      console.log(`  Nonce: ${blockData.nonce}`);
      console.log(`  Confirmations: ${blockData.confirmations}`);
      
      // Verify that we only have nonce and confirmations
      const keys = Object.keys(blockData);
      console.log(`  Number of properties: ${keys.length}`);
      console.log(`  Properties: ${keys.join(', ')}`);
      
      if (keys.length === 2 && keys.includes('nonce') && keys.includes('confirmations')) {
        console.log('  ✓ Successfully retrieved ONLY nonce and confirmations');
      } else {
        console.log('  ✗ Retrieved additional properties beyond nonce and confirmations');
      }
      
      console.log('');
    } catch (error) {
      console.error(`Error fetching block ${block.number}:`, error);
    }
  }
}

// Run the main function
main().catch(console.error);
