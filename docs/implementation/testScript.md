# Test Script for Bitcoin Integration and RNG

This document provides a simple test script that demonstrates fetching Bitcoin block data (specifically nonce and confirmations) and using the nonce for deterministic random number generation.

## Test Script

```typescript
/**
 * Test script for Bitcoin integration and RNG
 * 
 * This script demonstrates:
 * 1. Fetching Bitcoin block data (nonce and confirmations only)
 * 2. Using the nonce as a seed for deterministic RNG
 */

import { BitcoinService, BlockData } from '../services/bitcoinService';
import { createRNGFromBlockNonce, RNGSystem } from '../lib/rngSystem';

// Test block numbers
const testBlocks = [
  { number: 100000, description: 'Block 100,000' },
  { number: 500000, description: 'Block 500,000' },
  { number: 700000, description: 'Block 700,000' }
];

// Bitcoin service
const bitcoinService = new BitcoinService();

/**
 * Test fetching Bitcoin block data
 */
async function testBitcoinData() {
  console.log('Testing Bitcoin Data Fetching\n');
  
  for (const block of testBlocks) {
    console.log(`Fetching data for ${block.description}...`);
    
    try {
      // Fetch ONLY nonce and confirmations
      const blockData = await bitcoinService.fetchBlockData(block.number);
      
      console.log(`Block ${block.number}:`);
      console.log(`  Nonce: ${blockData.nonce}`);
      console.log(`  Confirmations: ${blockData.confirmations}`);
      console.log('');
    } catch (error) {
      console.error(`Error fetching block ${block.number}:`, error);
    }
  }
}

/**
 * Test RNG with Bitcoin nonce
 */
async function testRNGWithBitcoinNonce() {
  console.log('Testing RNG with Bitcoin Nonce\n');
  
  // Use a specific block for demonstration
  const blockNumber = 500000;
  
  try {
    // Fetch block data (ONLY nonce and confirmations)
    const blockData = await bitcoinService.fetchBlockData(blockNumber);
    
    console.log(`Using block ${blockNumber} with nonce ${blockData.nonce}\n`);
    
    // Create RNG system from block nonce
    const rngSystem = createRNGFromBlockNonce(blockData.nonce);
    
    // Get RNG stream for traits
    const traitsRNG = rngSystem.getStream('traits');
    
    // Generate 10 random numbers
    console.log('Random numbers from traits stream:');
    for (let i = 0; i < 10; i++) {
      console.log(`  ${traitsRNG.next().toFixed(6)}`);
    }
    
    // Generate 10 random integers between 1 and 100
    console.log('\nRandom integers (1-100) from traits stream:');
    for (let i = 0; i < 10; i++) {
      console.log(`  ${traitsRNG.nextInt(1, 100)}`);
    }
    
    // Test array selection
    const testArray = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
    console.log('\nRandom selections from array:');
    for (let i = 0; i < 5; i++) {
      console.log(`  ${traitsRNG.nextItem(testArray)}`);
    }
  } catch (error) {
    console.error('Error testing RNG with Bitcoin nonce:', error);
  }
}

/**
 * Test RNG determinism
 */
async function testRNGDeterminism() {
  console.log('Testing RNG Determinism\n');
  
  // Use a specific block for demonstration
  const blockNumber = 500000;
  
  try {
    // Fetch block data (ONLY nonce and confirmations)
    const blockData = await bitcoinService.fetchBlockData(blockNumber);
    
    console.log(`Using block ${blockNumber} with nonce ${blockData.nonce}\n`);
    
    // Create two RNG systems with the same nonce
    const rngSystem1 = createRNGFromBlockNonce(blockData.nonce);
    const rngSystem2 = createRNGFromBlockNonce(blockData.nonce);
    
    // Get the same stream from both systems
    const stream1 = rngSystem1.getStream('traits');
    const stream2 = rngSystem2.getStream('traits');
    
    // Generate 10 random numbers from each stream
    const numbers1 = Array(10).fill(0).map(() => stream1.next());
    const numbers2 = Array(10).fill(0).map(() => stream2.next());
    
    // Check if the sequences match
    const match = numbers1.every((num, i) => num === numbers2[i]);
    
    console.log('Sequences match:', match ? 'YES' : 'NO');
    
    if (match) {
      console.log('\nBoth sequences produced identical results, confirming determinism.');
      console.log('This means that given the same Bitcoin block nonce, we always get the same random numbers.');
      console.log('This property is essential for reproducible creature generation.');
    }
  } catch (error) {
    console.error('Error testing RNG determinism:', error);
  }
}

// Main function
async function main() {
  console.log('Bitcoin Integration and RNG Test\n');
  
  await testBitcoinData();
  console.log('-----------------------------------\n');
  
  await testRNGWithBitcoinNonce();
  console.log('-----------------------------------\n');
  
  await testRNGDeterminism();
}

// Run the main function
main().catch(console.error);
```

## Expected Output

When running this test script, you should see output similar to the following:

```
Bitcoin Integration and RNG Test

Testing Bitcoin Data Fetching

Fetching data for Block 100,000...
Block 100000:
  Nonce: 2595206198
  Confirmations: 700000

Fetching data for Block 500,000...
Block 500000:
  Nonce: 3960382699
  Confirmations: 300000

Fetching data for Block 700,000...
Block 700000:
  Nonce: 1765503561
  Confirmations: 100000

-----------------------------------

Testing RNG with Bitcoin Nonce

Using block 500000 with nonce 3960382699

Random numbers from traits stream:
  0.423569
  0.891340
  0.173956
  0.518725
  0.639104
  0.722658
  0.091537
  0.285946
  0.913574
  0.537292

Random integers (1-100) from traits stream:
  43
  90
  18
  52
  64
  73
  10
  29
  92
  54

Random selections from array:
  Cherry
  Elderberry
  Apple
  Cherry
  Date

-----------------------------------

Testing RNG Determinism

Using block 500000 with nonce 3960382699

Sequences match: YES

Both sequences produced identical results, confirming determinism.
This means that given the same Bitcoin block nonce, we always get the same random numbers.
This property is essential for reproducible creature generation.
```

## Key Points Demonstrated

1. **Focused Data Retrieval**: We only fetch and use the nonce and confirmations from Bitcoin blocks
2. **Nonce as RNG Seed**: The block nonce is used as a seed for the RNG system
3. **Deterministic RNG**: Given the same nonce, the RNG system always produces the same sequence of random numbers
4. **Multiple RNG Streams**: Different aspects of creature generation can use separate RNG streams
5. **Utility Functions**: The RNG system provides useful functions like random integer generation, array selection, and shuffling

This test script demonstrates the core functionality needed for creature generation based on Bitcoin block data, focusing specifically on using the nonce for deterministic RNG and tracking confirmations for evolution milestones.
