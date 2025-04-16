/**
 * Sierpinski Formation Pattern
 *
 * Defines the Sierpinski formation pattern and its parameters.
 */

import { Role, Tier, Rarity } from '../../../../types/core';
import { FormationPattern, FormationPatternType } from '../../../../types/formations/formation';
import { Vector3 } from '../../../../types/common';

/**
 * Sierpinski Formation Pattern interface
 * Extends the base FormationPattern with Sierpinski-specific parameters
 */
export interface SierpinskiFormationPattern extends FormationPattern {
  type: FormationPatternType.SIERPINSKI;
  parameters: {
    size: number;          // Size of the Sierpinski structure
    iterations: number;    // Number of iterations (detail level)
    shape: string;         // Shape type: 'triangle', 'tetrahedron', 'carpet'
    scale: number;         // Scale factor between iterations
    offset: Vector3;       // Center point offset
    rotation: number;      // Rotation angle
    jitter: number;        // Random variation
  };
}

/**
 * Create a Sierpinski formation pattern
 * @param role The role of the formation
 * @param tier The tier of the formation
 * @param rarity The rarity of the formation
 * @returns A Sierpinski formation pattern
 */
export function createSierpinskiFormation(
  role: Role,
  tier: Tier,
  rarity: Rarity
): SierpinskiFormationPattern {
  // Base values
  let size = 10.0;
  let iterations = 3;
  let shape = 'triangle';
  let scale = 0.5;
  let jitter = 0.1;

  // Adjust based on tier
  switch (tier) {
    case Tier.TIER_1:
      // Not available at tier 1
      break;
    case Tier.TIER_2:
      // Not available at tier 2
      break;
    case Tier.TIER_3:
      // Not available at tier 3
      break;
    case Tier.TIER_4:
      // Not available at tier 4
      break;
    case Tier.TIER_5:
      size = 10.0;
      iterations = 3;
      shape = 'triangle';
      scale = 0.5;
      jitter = 0.1;
      break;
    case Tier.TIER_6:
      size = 12.0;
      iterations = 4;
      shape = 'tetrahedron';
      scale = 0.5;
      jitter = 0.05;
      break;
  }

  // Adjust based on role
  switch (role) {
    case Role.CORE:
      // Core formations are more structured
      jitter *= 0.5;
      break;
    case Role.ATTACK:
      // Attack formations are more aggressive
      shape = 'tetrahedron';
      size *= 1.2;
      break;
    case Role.DEFENSE:
      // Defense formations are more solid
      shape = 'carpet';
      iterations = Math.max(2, iterations - 1);
      break;
    case Role.CONTROL:
      // Control formations are more precise
      jitter *= 0.7;
      iterations = Math.min(5, iterations + 1);
      break;
    case Role.MOVEMENT:
      // Movement formations are more dynamic
      jitter *= 1.5;
      break;
  }

  return {
    type: FormationPatternType.SIERPINSKI,
    density: 0.7,
    cohesion: 0.9,
    flexibility: 0.3,
    parameters: {
      size,
      iterations,
      shape,
      scale,
      offset: { x: 0, y: 0, z: 0 },
      rotation: 0,
      jitter
    }
  };
}

/**
 * Sierpinski formation patterns for different roles and tiers
 */
export const sierpinskiFormations = {
  [Role.CORE]: {
    [Tier.TIER_5]: createSierpinskiFormation(Role.CORE, Tier.TIER_5, Rarity.LEGENDARY),
    [Tier.TIER_6]: createSierpinskiFormation(Role.CORE, Tier.TIER_6, Rarity.MYTHIC)
  },
  [Role.ATTACK]: {
    [Tier.TIER_5]: createSierpinskiFormation(Role.ATTACK, Tier.TIER_5, Rarity.LEGENDARY),
    [Tier.TIER_6]: createSierpinskiFormation(Role.ATTACK, Tier.TIER_6, Rarity.MYTHIC)
  },
  [Role.DEFENSE]: {
    [Tier.TIER_5]: createSierpinskiFormation(Role.DEFENSE, Tier.TIER_5, Rarity.LEGENDARY),
    [Tier.TIER_6]: createSierpinskiFormation(Role.DEFENSE, Tier.TIER_6, Rarity.MYTHIC)
  },
  [Role.CONTROL]: {
    [Tier.TIER_5]: createSierpinskiFormation(Role.CONTROL, Tier.TIER_5, Rarity.LEGENDARY),
    [Tier.TIER_6]: createSierpinskiFormation(Role.CONTROL, Tier.TIER_6, Rarity.MYTHIC)
  },
  [Role.MOVEMENT]: {
    [Tier.TIER_5]: createSierpinskiFormation(Role.MOVEMENT, Tier.TIER_5, Rarity.LEGENDARY),
    [Tier.TIER_6]: createSierpinskiFormation(Role.MOVEMENT, Tier.TIER_6, Rarity.MYTHIC)
  }
};

