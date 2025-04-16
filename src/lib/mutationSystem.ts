/**
 * Mutation System for Bitcoin Protozoa
 * 
 * This module handles mutations that can occur as creatures evolve over time.
 * Mutations are triggered by Bitcoin block confirmation milestones and can
 * affect a creature's attributes and abilities.
 */

import { RNGStream } from './rngSystem';
import { getConfirmationMilestone, getMutationChance } from './bitcoinData';

// Mutation rarity enum
export enum MutationRarity {
  Common = 1,
  Uncommon = 2,
  Rare = 3,
  Epic = 4,
  Legendary = 5
}

// Mutation interface
export interface Mutation {
  id: string;
  name: string;
  description: string;
  rarity: MutationRarity;
  attributeBoost: number; // Percentage boost to the base attribute
  abilityEffect?: string; // Description of how this affects abilities
}

// Mutation registry - a collection of all possible mutations
const mutations: Mutation[] = [
  // Common mutations (40% chance)
  {
    id: 'common_strength_1',
    name: 'Minor Strength',
    description: 'A small boost to physical power',
    rarity: MutationRarity.Common,
    attributeBoost: 0.01 // 1% boost
  },
  {
    id: 'common_agility_1',
    name: 'Minor Agility',
    description: 'A small boost to movement speed',
    rarity: MutationRarity.Common,
    attributeBoost: 0.01 // 1% boost
  },
  {
    id: 'common_vitality_1',
    name: 'Minor Vitality',
    description: 'A small boost to health',
    rarity: MutationRarity.Common,
    attributeBoost: 0.01 // 1% boost
  },
  
  // Uncommon mutations (30% chance)
  {
    id: 'uncommon_strength_1',
    name: 'Moderate Strength',
    description: 'A moderate boost to physical power',
    rarity: MutationRarity.Uncommon,
    attributeBoost: 0.02 // 2% boost
  },
  {
    id: 'uncommon_agility_1',
    name: 'Moderate Agility',
    description: 'A moderate boost to movement speed',
    rarity: MutationRarity.Uncommon,
    attributeBoost: 0.02 // 2% boost
  },
  
  // Rare mutations (20% chance)
  {
    id: 'rare_strength_1',
    name: 'Major Strength',
    description: 'A significant boost to physical power',
    rarity: MutationRarity.Rare,
    attributeBoost: 0.05 // 5% boost
  },
  {
    id: 'rare_ability_1',
    name: 'Ability Enhancement',
    description: 'Enhances a random ability',
    rarity: MutationRarity.Rare,
    attributeBoost: 0.03, // 3% boost
    abilityEffect: 'Increases the effectiveness of one ability by 10%'
  },
  
  // Epic mutations (8% chance)
  {
    id: 'epic_strength_1',
    name: 'Epic Strength',
    description: 'A powerful boost to physical power',
    rarity: MutationRarity.Epic,
    attributeBoost: 0.08 // 8% boost
  },
  {
    id: 'epic_ability_1',
    name: 'Major Ability Enhancement',
    description: 'Significantly enhances a random ability',
    rarity: MutationRarity.Epic,
    attributeBoost: 0.05, // 5% boost
    abilityEffect: 'Increases the effectiveness of one ability by 20%'
  },
  
  // Legendary mutations (2% chance)
  {
    id: 'legendary_strength_1',
    name: 'Legendary Strength',
    description: 'An extraordinary boost to physical power',
    rarity: MutationRarity.Legendary,
    attributeBoost: 0.1, // 10% boost
    abilityEffect: 'Unlocks a new powerful ability variant'
  }
];

// Rarity weights for mutation selection
const rarityWeights = {
  [MutationRarity.Common]: 0.4,    // 40%
  [MutationRarity.Uncommon]: 0.3,  // 30%
  [MutationRarity.Rare]: 0.2,      // 20%
  [MutationRarity.Epic]: 0.08,     // 8%
  [MutationRarity.Legendary]: 0.02 // 2%
};

/**
 * Get mutations by rarity
 * @param rarity The mutation rarity
 * @returns An array of mutations of the specified rarity
 */
export function getMutationsByRarity(rarity: MutationRarity): Mutation[] {
  return mutations.filter(mutation => mutation.rarity === rarity);
}

/**
 * Select a random mutation based on rarity weights
 * @param rng The RNG stream to use
 * @returns A randomly selected mutation
 */
export function selectRandomMutation(rng: RNGStream): Mutation {
  // Determine the rarity first
  const rarityRoll = rng.next();
  let cumulativeWeight = 0;
  let selectedRarity = MutationRarity.Common;
  
  for (const [rarity, weight] of Object.entries(rarityWeights)) {
    cumulativeWeight += weight;
    if (rarityRoll < cumulativeWeight) {
      selectedRarity = Number(rarity) as MutationRarity;
      break;
    }
  }
  
  // Get all mutations of the selected rarity
  const rarityMutations = getMutationsByRarity(selectedRarity);
  
  // Select a random mutation from the rarity group
  return rng.nextItem(rarityMutations);
}

/**
 * Check if a mutation should occur based on confirmation milestone
 * @param confirmations The number of confirmations
 * @param rng The RNG stream to use
 * @returns The mutation if one should occur, null otherwise
 */
export function checkForMutation(confirmations: number, rng: RNGStream): Mutation | null {
  // Get the highest milestone reached
  const milestone = getConfirmationMilestone(confirmations);
  
  // Get the mutation chance for this milestone
  const mutationChance = getMutationChance(milestone);
  
  // Check if a mutation should occur
  if (rng.nextBool(mutationChance)) {
    // Select a random mutation
    return selectRandomMutation(rng);
  }
  
  // No mutation
  return null;
}

/**
 * Apply mutations to a creature's attribute value
 * @param baseAttributeValue The base attribute value
 * @param mutations An array of mutations to apply
 * @returns The boosted attribute value
 */
export function applyMutations(baseAttributeValue: number, mutations: Mutation[]): number {
  // Calculate the total boost percentage
  const totalBoostPercentage = mutations.reduce((total, mutation) => total + mutation.attributeBoost, 0);
  
  // Apply the boost
  const boostedValue = baseAttributeValue * (1 + totalBoostPercentage);
  
  // Return the rounded value
  return Math.floor(boostedValue);
}
