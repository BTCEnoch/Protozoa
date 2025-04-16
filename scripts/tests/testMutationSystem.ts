/**
 * Test script for the mutation system
 * 
 * This script tests the mutation system by simulating mutations at different confirmation milestones.
 */

import { createRNGFromBlockNonce } from '../lib/rngSystem';
import { checkForMutation, MutationRarity } from '../lib/mutationSystem';

// Test function
function testMutationSystem() {
  console.log('Testing Mutation System\n');
  
  // Create an RNG system with a fixed seed for reproducibility
  const rngSystem = createRNGFromBlockNonce(12345);
  const mutationRNG = rngSystem.getStream('mutation');
  
  // Test different confirmation milestones
  const milestones = [5000, 10000, 50000, 100000, 250000, 500000, 1000000];
  
  // Track mutation statistics
  const stats = {
    total: 0,
    byRarity: {
      [MutationRarity.Common]: 0,
      [MutationRarity.Uncommon]: 0,
      [MutationRarity.Rare]: 0,
      [MutationRarity.Epic]: 0,
      [MutationRarity.Legendary]: 0
    }
  };
  
  // Run 1000 tests for each milestone
  for (const milestone of milestones) {
    console.log(`Testing ${milestone} confirmations:`);
    
    let mutationCount = 0;
    const iterations = 1000;
    
    for (let i = 0; i < iterations; i++) {
      const mutation = checkForMutation(milestone, mutationRNG);
      
      if (mutation) {
        mutationCount++;
        stats.total++;
        stats.byRarity[mutation.rarity]++;
      }
    }
    
    const percentage = (mutationCount / iterations) * 100;
    console.log(`  Mutations occurred in ${mutationCount}/${iterations} tests (${percentage.toFixed(2)}%)`);
  }
  
  // Print overall statistics
  console.log('\nOverall Mutation Statistics:');
  console.log(`  Total mutations: ${stats.total}`);
  console.log('  By rarity:');
  for (const [rarity, count] of Object.entries(stats.byRarity)) {
    const percentage = (count / stats.total) * 100;
    console.log(`    ${MutationRarity[Number(rarity)]}: ${count} (${percentage.toFixed(2)}%)`);
  }
}

// Run the test
testMutationSystem();
