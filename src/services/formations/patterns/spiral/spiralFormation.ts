/**
 * Spiral Formation Pattern
 * 
 * Defines the spiral formation pattern and its parameters.
 */

import { Role, Tier, Rarity } from '../../../../types/core';
import { FormationPattern, FormationPatternType } from '../../../../types/formation';
import { Vector3 } from '../../../../types/common';

/**
 * Spiral Formation Pattern interface
 * Extends the base FormationPattern with spiral-specific parameters
 */
export interface SpiralFormationPattern extends FormationPattern {
  type: FormationPatternType.SPIRAL;
  parameters: {
    radius: number;
    growth: number;
    turns: number;
    particles: number;
    offset: Vector3;
    rotation: number;
    jitter: number;
  };
}

/**
 * Create a spiral formation pattern
 * @param role The role of the formation
 * @param tier The tier of the formation
 * @param rarity The rarity of the formation
 * @returns A spiral formation pattern
 */
export function createSpiralFormation(
  role: Role,
  tier: Tier,
  rarity: Rarity
): SpiralFormationPattern {
  // Base values
  let radius = 3.0;
  let growth = 0.2;
  let turns = 2;
  let particles = 24;
  let jitter = 0.1;
  
  // Adjust based on tier
  switch (tier) {
    case Tier.TIER_1:
      radius = 3.0;
      growth = 0.2;
      turns = 2;
      particles = 24;
      jitter = 0.1;
      break;
    case Tier.TIER_2:
      radius = 3.5;
      growth = 0.25;
      turns = 3;
      particles = 36;
      jitter = 0.15;
      break;
    case Tier.TIER_3:
      radius = 4.0;
      growth = 0.3;
      turns = 4;
      particles = 48;
      jitter = 0.2;
      break;
    case Tier.TIER_4:
      radius = 4.5;
      growth = 0.35;
      turns = 5;
      particles = 60;
      jitter = 0.25;
      break;
    case Tier.TIER_5:
      radius = 5.0;
      growth = 0.4;
      turns = 6;
      particles = 72;
      jitter = 0.3;
      break;
    case Tier.TIER_6:
      radius = 5.5;
      growth = 0.45;
      turns = 7;
      particles = 84;
      jitter = 0.35;
      break;
  }
  
  // Adjust based on role
  switch (role) {
    case Role.CORE:
      // Core formations are more compact
      radius *= 0.8;
      growth *= 0.9;
      jitter *= 0.8;
      break;
    case Role.ATTACK:
      // Attack formations are more aggressive
      growth *= 1.2;
      turns *= 0.8;
      jitter *= 1.2;
      break;
    case Role.DEFENSE:
      // Defense formations are more structured
      jitter *= 0.7;
      particles *= 1.2;
      break;
    case Role.CONTROL:
      // Control formations are more precise
      jitter *= 0.6;
      turns *= 1.2;
      break;
    case Role.MOVEMENT:
      // Movement formations are more dynamic
      jitter *= 1.3;
      growth *= 1.1;
      break;
  }
  
  return {
    type: FormationPatternType.SPIRAL,
    density: 0.6,
    cohesion: 0.7,
    flexibility: 0.8,
    parameters: {
      radius,
      growth,
      turns,
      particles,
      offset: { x: 0, y: 0, z: 0 },
      rotation: 0,
      jitter
    }
  };
}

/**
 * Spiral formation patterns for different roles and tiers
 */
export const spiralFormations = {
  [Role.CORE]: {
    [Tier.TIER_1]: createSpiralFormation(Role.CORE, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createSpiralFormation(Role.CORE, Tier.TIER_2, Rarity.UNCOMMON),
    [Tier.TIER_3]: createSpiralFormation(Role.CORE, Tier.TIER_3, Rarity.RARE)
  },
  [Role.ATTACK]: {
    [Tier.TIER_1]: createSpiralFormation(Role.ATTACK, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createSpiralFormation(Role.ATTACK, Tier.TIER_2, Rarity.UNCOMMON),
    [Tier.TIER_3]: createSpiralFormation(Role.ATTACK, Tier.TIER_3, Rarity.RARE)
  },
  [Role.DEFENSE]: {
    [Tier.TIER_1]: createSpiralFormation(Role.DEFENSE, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createSpiralFormation(Role.DEFENSE, Tier.TIER_2, Rarity.UNCOMMON),
    [Tier.TIER_3]: createSpiralFormation(Role.DEFENSE, Tier.TIER_3, Rarity.RARE)
  },
  [Role.CONTROL]: {
    [Tier.TIER_1]: createSpiralFormation(Role.CONTROL, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createSpiralFormation(Role.CONTROL, Tier.TIER_2, Rarity.UNCOMMON),
    [Tier.TIER_3]: createSpiralFormation(Role.CONTROL, Tier.TIER_3, Rarity.RARE)
  },
  [Role.MOVEMENT]: {
    [Tier.TIER_1]: createSpiralFormation(Role.MOVEMENT, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createSpiralFormation(Role.MOVEMENT, Tier.TIER_2, Rarity.UNCOMMON),
    [Tier.TIER_3]: createSpiralFormation(Role.MOVEMENT, Tier.TIER_3, Rarity.RARE)
  }
};
