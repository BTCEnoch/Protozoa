/**
 * Creature Factory
 * 
 * This factory is responsible for creating creature instances with appropriate
 * defaults and validation.
 */

import { v4 as uuidv4 } from 'uuid';
import { Creature, CreatureGroup } from '../../types/creature';
import { Role, Tier } from '../../types/core';
import { BlockData } from '../../types/bitcoin';
import { getCreatureGenerator } from './creatureGenerator';

/**
 * Create a new creature
 * @param blockNumber The Bitcoin block number
 * @param blockData The Bitcoin block data
 * @returns A new creature entity
 */
export function createCreature(blockNumber: number, blockData: BlockData): Creature {
  return getCreatureGenerator().generateCreature({
    blockNumber,
    blockData
  });
}

/**
 * Create a new creature group
 * @param role The role of the group
 * @param particles The number of particles in the group
 * @param tier The tier of the group
 * @returns A new creature group entity
 */
export function createCreatureGroup(role: Role, particles: number, tier: Tier): CreatureGroup {
  return {
    id: uuidv4(),
    role,
    subclass: {
      name: `Default ${role}`,
      tier: tier,
      bonuses: {
        attributeMultiplier: 1.0
      }
    },
    particles,
    attributeValue: particles * 5,
    mutations: []
  };
}

/**
 * Create an empty creature structure
 * @param blockNumber The Bitcoin block number
 * @param blockData The Bitcoin block data
 * @returns An empty creature structure
 */
export function createEmptyCreature(blockNumber: number, blockData: BlockData): Creature {
  return {
    id: uuidv4(),
    blockNumber,
    blockData,
    groups: [],
    mutations: [],
    createdAt: Date.now(),
    lastUpdatedAt: Date.now()
  };
}

/**
 * Clone a creature
 * @param creature The creature to clone
 * @returns A deep clone of the creature
 */
export function cloneCreature(creature: Creature): Creature {
  // Create deep clone via JSON serialization/deserialization
  const clone = JSON.parse(JSON.stringify(creature));
  
  // Generate new IDs
  clone.id = uuidv4();
  
  // Update timestamps
  clone.createdAt = Date.now();
  clone.lastUpdatedAt = Date.now();
  
  // Generate new IDs for groups
  clone.groups = clone.groups.map((group: CreatureGroup) => ({
    ...group,
    id: uuidv4()
  }));
  
  return clone;
}

/**
 * Validate a creature
 * @param creature The creature to validate
 * @returns An array of validation errors, or empty array if valid
 */
export function validateCreature(creature: Creature): string[] {
  const errors: string[] = [];
  
  // Check required fields
  if (!creature.id) errors.push('Creature id is required');
  if (!creature.blockNumber) errors.push('Block number is required');
  if (!creature.blockData) errors.push('Block data is required');
  if (!creature.groups) errors.push('Creature groups are required');
  if (!Array.isArray(creature.groups)) errors.push('Creature groups must be an array');
  
  // Check timestamps
  if (!creature.createdAt) errors.push('Created timestamp is required');
  if (!creature.lastUpdatedAt) errors.push('Last updated timestamp is required');
  
  // Validate each group
  if (creature.groups && Array.isArray(creature.groups)) {
    creature.groups.forEach((group, index) => {
      if (!group.id) errors.push(`Group ${index} id is required`);
      if (!group.role) errors.push(`Group ${index} role is required`);
      if (!group.particles) errors.push(`Group ${index} particles are required`);
      if (!group.attributeValue) errors.push(`Group ${index} attribute value is required`);
    });
  }
  
  return errors;
} 