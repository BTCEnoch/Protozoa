/**
 * Grid Formation Pattern
 * 
 * Defines the grid formation pattern and its parameters.
 */

import { Role, Tier, Rarity } from '../../../../types/core';
import { FormationPattern, FormationPatternType } from '../../../../types/formation';
import { Vector3 } from '../../../../types/common';

/**
 * Grid Formation Pattern interface
 * Extends the base FormationPattern with grid-specific parameters
 */
export interface GridFormationPattern extends FormationPattern {
  type: FormationPatternType.GRID;
  parameters: {
    spacing: number;
    dimensions: Vector3;
    offset: Vector3;
    rotation: Vector3;
    jitter: number;
  };
}

/**
 * Create a grid formation pattern
 * @param role The role of the formation
 * @param tier The tier of the formation
 * @param rarity The rarity of the formation
 * @returns A grid formation pattern
 */
export function createGridFormation(
  role: Role,
  tier: Tier,
  rarity: Rarity
): GridFormationPattern {
  // Base values
  let spacing = 2.0;
  let dimensions = { x: 3, y: 3, z: 1 };
  let jitter = 0.1;
  
  // Adjust based on tier
  switch (tier) {
    case Tier.TIER_1:
      spacing = 2.0;
      dimensions = { x: 3, y: 3, z: 1 };
      jitter = 0.1;
      break;
    case Tier.TIER_2:
      spacing = 2.5;
      dimensions = { x: 4, y: 4, z: 1 };
      jitter = 0.15;
      break;
    case Tier.TIER_3:
      spacing = 3.0;
      dimensions = { x: 4, y: 4, z: 2 };
      jitter = 0.2;
      break;
    case Tier.TIER_4:
      spacing = 3.5;
      dimensions = { x: 5, y: 5, z: 2 };
      jitter = 0.25;
      break;
    case Tier.TIER_5:
      spacing = 4.0;
      dimensions = { x: 5, y: 5, z: 3 };
      jitter = 0.3;
      break;
    case Tier.TIER_6:
      spacing = 4.5;
      dimensions = { x: 6, y: 6, z: 3 };
      jitter = 0.35;
      break;
  }
  
  // Adjust based on role
  switch (role) {
    case Role.CORE:
      // Core formations are more compact
      spacing *= 0.8;
      jitter *= 0.8;
      break;
    case Role.ATTACK:
      // Attack formations are more spread out
      spacing *= 1.2;
      dimensions.z = Math.max(1, dimensions.z - 1);
      break;
    case Role.DEFENSE:
      // Defense formations are more structured
      jitter *= 0.7;
      dimensions.x += 1;
      dimensions.y += 1;
      break;
    case Role.CONTROL:
      // Control formations are more precise
      jitter *= 0.6;
      dimensions.z += 1;
      break;
    case Role.MOVEMENT:
      // Movement formations are more dynamic
      jitter *= 1.3;
      spacing *= 1.1;
      break;
  }
  
  return {
    type: FormationPatternType.GRID,
    density: 0.8,
    cohesion: 0.7,
    flexibility: 0.4,
    parameters: {
      spacing,
      dimensions,
      offset: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      jitter
    }
  };
}

/**
 * Grid formation patterns for different roles and tiers
 */
export const gridFormations = {
  [Role.CORE]: {
    [Tier.TIER_1]: createGridFormation(Role.CORE, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createGridFormation(Role.CORE, Tier.TIER_2, Rarity.UNCOMMON)
  },
  [Role.ATTACK]: {
    [Tier.TIER_1]: createGridFormation(Role.ATTACK, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createGridFormation(Role.ATTACK, Tier.TIER_2, Rarity.UNCOMMON)
  },
  [Role.DEFENSE]: {
    [Tier.TIER_1]: createGridFormation(Role.DEFENSE, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createGridFormation(Role.DEFENSE, Tier.TIER_2, Rarity.UNCOMMON)
  },
  [Role.CONTROL]: {
    [Tier.TIER_1]: createGridFormation(Role.CONTROL, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createGridFormation(Role.CONTROL, Tier.TIER_2, Rarity.UNCOMMON)
  },
  [Role.MOVEMENT]: {
    [Tier.TIER_1]: createGridFormation(Role.MOVEMENT, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createGridFormation(Role.MOVEMENT, Tier.TIER_2, Rarity.UNCOMMON)
  }
};
