/**
 * Circle Formation Pattern
 * 
 * Defines the circle formation pattern and its parameters.
 */

import { Role, Tier, Rarity } from '../../../../types/core';
import { FormationPattern, FormationPatternType } from '../../../../types/formations/formation';
import { Vector3 } from '../../../../types/common';

/**
 * Circle Formation Pattern interface
 * Extends the base FormationPattern with circle-specific parameters
 */
export interface CircleFormationPattern extends FormationPattern {
  type: FormationPatternType.CIRCLE;
  parameters: {
    radius: number;
    count: number;
    offset: Vector3;
    rotation: number;
    jitter: number;
    layers?: number;
    layerSpacing?: number;
  };
}

/**
 * Create a circle formation pattern
 * @param role The role of the formation
 * @param tier The tier of the formation
 * @param rarity The rarity of the formation
 * @returns A circle formation pattern
 */
export function createCircleFormation(
  role: Role,
  tier: Tier,
  rarity: Rarity
): CircleFormationPattern {
  // Base values
  let radius = 5.0;
  let count = 12;
  let jitter = 0.1;
  let layers = 1;
  let layerSpacing = 1.0;
  
  // Adjust based on tier
  switch (tier) {
    case Tier.TIER_1:
      radius = 5.0;
      count = 12;
      jitter = 0.1;
      layers = 1;
      break;
    case Tier.TIER_2:
      radius = 6.0;
      count = 16;
      jitter = 0.15;
      layers = 2;
      break;
    case Tier.TIER_3:
      radius = 7.0;
      count = 20;
      jitter = 0.2;
      layers = 2;
      break;
    case Tier.TIER_4:
      radius = 8.0;
      count = 24;
      jitter = 0.25;
      layers = 3;
      break;
    case Tier.TIER_5:
      radius = 9.0;
      count = 28;
      jitter = 0.3;
      layers = 3;
      break;
    case Tier.TIER_6:
      radius = 10.0;
      count = 32;
      jitter = 0.35;
      layers = 4;
      break;
  }
  
  // Adjust based on role
  switch (role) {
    case Role.CORE:
      // Core formations are more compact
      radius *= 0.8;
      jitter *= 0.8;
      break;
    case Role.ATTACK:
      // Attack formations are more spread out
      radius *= 1.2;
      count = Math.floor(count * 0.8);
      break;
    case Role.DEFENSE:
      // Defense formations have more particles
      count = Math.floor(count * 1.2);
      break;
    case Role.CONTROL:
      // Control formations are more precise
      jitter *= 0.7;
      break;
    case Role.MOVEMENT:
      // Movement formations are more dynamic
      jitter *= 1.3;
      break;
  }
  
  return {
    type: FormationPatternType.CIRCLE,
    density: 0.7,
    cohesion: 0.8,
    flexibility: 0.5,
    parameters: {
      radius,
      count,
      offset: { x: 0, y: 0, z: 0 },
      rotation: 0,
      jitter,
      layers,
      layerSpacing
    }
  };
}

/**
 * Circle formation patterns for different roles and tiers
 */
export const circleFormations = {
  [Role.CORE]: {
    [Tier.TIER_1]: createCircleFormation(Role.CORE, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createCircleFormation(Role.CORE, Tier.TIER_2, Rarity.UNCOMMON),
    [Tier.TIER_3]: createCircleFormation(Role.CORE, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createCircleFormation(Role.CORE, Tier.TIER_4, Rarity.EPIC),
    [Tier.TIER_5]: createCircleFormation(Role.CORE, Tier.TIER_5, Rarity.LEGENDARY),
    [Tier.TIER_6]: createCircleFormation(Role.CORE, Tier.TIER_6, Rarity.MYTHIC)
  },
  [Role.ATTACK]: {
    [Tier.TIER_1]: createCircleFormation(Role.ATTACK, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createCircleFormation(Role.ATTACK, Tier.TIER_2, Rarity.UNCOMMON)
  },
  [Role.DEFENSE]: {
    [Tier.TIER_1]: createCircleFormation(Role.DEFENSE, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createCircleFormation(Role.DEFENSE, Tier.TIER_2, Rarity.UNCOMMON)
  },
  [Role.CONTROL]: {
    [Tier.TIER_1]: createCircleFormation(Role.CONTROL, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createCircleFormation(Role.CONTROL, Tier.TIER_2, Rarity.UNCOMMON)
  },
  [Role.MOVEMENT]: {
    [Tier.TIER_1]: createCircleFormation(Role.MOVEMENT, Tier.TIER_1, Rarity.COMMON),
    [Tier.TIER_2]: createCircleFormation(Role.MOVEMENT, Tier.TIER_2, Rarity.UNCOMMON)
  }
};

