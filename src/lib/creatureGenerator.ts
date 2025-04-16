/**
 * Creature Generator for Bitcoin Protozoa
 *
 * This module generates creatures based on Bitcoin block data.
 * It uses the RNG system and subclass generator to create creatures with appropriate abilities.
 */

import { Role, Tier } from '../types/abilities/ability';
import { RNGSystem, createRNGFromBlockNonce } from './rngSystem';
import { getSubclass } from './subclassGenerator';
import { BlockData, fetchBlockData } from './bitcoinData';
import { DynamicSubclass, PredefinedSubclass } from '../../ability_reference';

// Interface for a creature group
interface CreatureGroup {
  role: Role;
  subclass: DynamicSubclass | PredefinedSubclass;
  particles: number;
  attributeValue: number; // The attribute value that determined the tier
}

// Interface for a creature
export interface Creature {
  blockNumber: number;
  blockData: BlockData;
  groups: CreatureGroup[];
}

// Note: fetchBlockData is now imported from bitcoinData.ts

/**
 * Determine the tier for a group based on its attribute value
 * @param attributeValue The attribute value
 * @returns The appropriate tier
 */
function determineTier(attributeValue: number): Tier {
  if (attributeValue >= 1501) return Tier.Mythic;    // 1501+
  if (attributeValue >= 1201) return Tier.Legendary; // 1201-1500
  if (attributeValue >= 901) return Tier.Epic;       // 901-1200
  if (attributeValue >= 601) return Tier.Rare;       // 601-900
  if (attributeValue >= 301) return Tier.Uncommon;   // 301-600
  return Tier.Common;                                // 0-300
}

/**
 * Generate a creature based on a Bitcoin block number
 * @param blockNumber The Bitcoin block number
 * @returns The generated creature
 */
export async function generateCreature(blockNumber: number): Promise<Creature> {
  // Fetch block data
  const blockData = await fetchBlockData(blockNumber);

  // Create RNG system from block nonce
  const rngSystem = createRNGFromBlockNonce(blockData.nonce);

  // Get RNG streams for different purposes
  const attributeRNG = rngSystem.getStream('traits');
  const subclassRNG = rngSystem.getStream('subclass');

  // Create the creature
  const creature: Creature = {
    blockNumber,
    blockData,
    groups: []
  };

  // Generate groups for each role
  for (const role of Object.values(Role).filter(r => typeof r === 'number')) {
    // Calculate base attribute value based on particle count
    // Base range is 43-220 particles, each contributing 5 points
    const baseParticles = attributeRNG.nextInt(43, 220);
    const baseAttributeValue = baseParticles * 5; // 215 to 1100

    // Apply mutations based on confirmations
    // This is a simplified version - in a full implementation, this would be more complex
    let attributeBoost = 0;
    const confirmations = blockData.confirmations;

    // Apply mutation boosts based on confirmation milestones
    if (confirmations >= 1000000) { // 1M confirmations: +50% boost
      attributeBoost = baseAttributeValue * 0.5;
    } else if (confirmations >= 500000) { // 500k confirmations: +30% boost
      attributeBoost = baseAttributeValue * 0.3;
    } else if (confirmations >= 250000) { // 250k confirmations: +20% boost
      attributeBoost = baseAttributeValue * 0.2;
    } else if (confirmations >= 100000) { // 100k confirmations: +10% boost
      attributeBoost = baseAttributeValue * 0.1;
    } else if (confirmations >= 50000) { // 50k confirmations: +5% boost
      attributeBoost = baseAttributeValue * 0.05;
    } else if (confirmations >= 10000) { // 10k confirmations: +1% boost
      attributeBoost = baseAttributeValue * 0.01;
    }

    // Calculate final attribute value
    const attributeValue = Math.floor(baseAttributeValue + attributeBoost);

    // Determine the tier based on the attribute value
    const tier = determineTier(attributeValue);

    // Generate a subclass for this role and tier
    const subclass = getSubclass(role as Role, tier, subclassRNG);

    // Generate a random number of particles within the tier's range
    const particleRange = subclass.particleRange;
    const particles = attributeRNG.nextInt(particleRange[0], particleRange[1]);

    // Add the group to the creature
    creature.groups.push({
      role: role as Role,
      subclass,
      particles,
      attributeValue
    });
  }

  return creature;
}

// Export is already handled by the export keyword on the function

