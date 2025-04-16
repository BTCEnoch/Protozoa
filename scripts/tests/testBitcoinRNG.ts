/**
 * Test script for Bitcoin service and RNG system
 * 
 * This script tests the Bitcoin service and RNG system by fetching block data
 * and generating random numbers using the block nonce as a seed.
 */

import { BitcoinService } from '../services/bitcoinService';
import { createRNGFromBlockNonce, RNGSystem } from '../lib/rngSystem';

// Test block numbers
const testBlocks = [
  { number: 100000, description: 'Block 100,000 (old block)' },
  { number: 500000, description: 'Block 500,000 (middle-aged block)' },
  { number: 700000, description: 'Block 700,000 (recent block)' }
];

// Bitcoin service
const bitcoinService = new BitcoinService();

/**
 * Test the Bitcoin service
 */
async function testBitcoinService() {
  console.log('Testing Bitcoin Service\n');
  
  for (const block of testBlocks) {
    console.log(`Fetching data for ${block.description}...`);
    
    try {
      const blockData = await bitcoinService.fetchBlockData(block.number);
      
      console.log(`Block ${block.number}:`);
      console.log(`  Nonce: ${blockData.nonce}`);
      console.log(`  Confirmations: ${blockData.confirmations}`);
      
      const milestone = bitcoinService.getConfirmationMilestone(blockData.confirmations);
      const mutationChance = bitcoinService.getMutationChance(milestone);
      
      console.log(`  Milestone: ${milestone} confirmations`);
      console.log(`  Mutation Chance: ${mutationChance * 100}%`);
      
      console.log('');
    } catch (error) {
      console.error(`Error fetching block ${block.number}:`, error);
    }
  }
}

/**
 * Test the RNG system
 */
async function testRNGSystem() {
  console.log('Testing RNG System\n');
  
  for (const block of testBlocks) {
    console.log(`Testing RNG for ${block.description}...`);
    
    try {
      // Fetch block data
      const blockData = await bitcoinService.fetchBlockData(block.number);
      
      // Create RNG system from block nonce
      const rngSystem = createRNGFromBlockNonce(blockData.nonce);
      
      // Test different RNG streams
      testRNGStream(rngSystem, 'traits', 'Attribute values');
      testRNGStream(rngSystem, 'subclass', 'Subclass selection');
      testRNGStream(rngSystem, 'ability', 'Ability selection');
      testRNGStream(rngSystem, 'mutation', 'Mutation determination');
      
      console.log('');
    } catch (error) {
      console.error(`Error testing RNG for block ${block.number}:`, error);
    }
  }
}

/**
 * Test an RNG stream
 * @param rngSystem The RNG system
 * @param streamName The stream name
 * @param description Description of what the stream is used for
 */
function testRNGStream(rngSystem: RNGSystem, streamName: string, description: string) {
  console.log(`  Stream: ${streamName} (${description})`);
  
  const stream = rngSystem.getStream(streamName);
  
  // Generate 5 random numbers
  console.log('    Random numbers:');
  for (let i = 0; i < 5; i++) {
    console.log(`      ${stream.next().toFixed(6)}`);
  }
  
  // Generate 5 random integers between 1 and 100
  console.log('    Random integers (1-100):');
  for (let i = 0; i < 5; i++) {
    console.log(`      ${stream.nextInt(1, 100)}`);
  }
  
  // Test array selection
  const testArray = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  console.log('    Random item from array:');
  console.log(`      ${stream.nextItem(testArray)}`);
  
  // Test array shuffling
  console.log('    Shuffled array:');
  console.log(`      ${stream.shuffle([...testArray]).join(', ')}`);
}

/**
 * Test determinism of the RNG system
 */
async function testRNGDeterminism() {
  console.log('Testing RNG Determinism\n');
  
  // Use a fixed block for determinism testing
  const blockNumber = 500000;
  
  try {
    // Fetch block data
    const blockData = await bitcoinService.fetchBlockData(blockNumber);
    
    console.log(`Using block ${blockNumber} with nonce ${blockData.nonce}\n`);
    
    // Create two RNG systems with the same seed
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
    
    if (!match) {
      console.log('Sequence 1:', numbers1.map(n => n.toFixed(6)).join(', '));
      console.log('Sequence 2:', numbers2.map(n => n.toFixed(6)).join(', '));
    } else {
      console.log('Both sequences produced identical results, confirming determinism.');
    }
  } catch (error) {
    console.error('Error testing RNG determinism:', error);
  }
}

// Main function
async function main() {
  console.log('Bitcoin Service and RNG System Test\n');
  
  await testBitcoinService();
  console.log('-----------------------------------\n');
  
  await testRNGSystem();
  console.log('-----------------------------------\n');
  
  await testRNGDeterminism();
}

// Run the main function
main().catch(console.error);
