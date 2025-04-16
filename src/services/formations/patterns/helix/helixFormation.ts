/**
 * Helix Formation Pattern
 *
 * Defines the helix formation pattern and its parameters.
 */

import { Role, Tier, Rarity } from '../../../../types/core';
import { FormationPattern, FormationPatternType } from '../../../../types/formation';
import { Vector3 } from '../../../../types/common';

/**
 * Helix Formation Pattern interface
 * Extends the base FormationPattern with helix-specific parameters
 */
export interface HelixFormationPattern extends FormationPattern {
  type: FormationPatternType.HELIX;
  parameters: {
    radius: number;       // Radius of the helix
    height: number;       // Total height of the helix
    turns: number;        // Number of complete turns
    particles: number;    // Number of particles
    offset: Vector3;      // Center point offset
    rotation: number;     // Rotation angle
    jitter: number;       // Random variation
    strands?: number;     // Number of strands (for multi-strand helices)
  };
}

/**
 * Create a helix formation pattern
 * @param role The role of the formation
 * @param tier The tier of the formation
 * @param rarity The rarity of the formation
 * @returns A helix formation pattern
 */
export function createHelixFormation(
  role: Role,
  tier: Tier,
  rarity: Rarity
): HelixFormationPattern {
  // Base values
  let radius = 3.0;
  let height = 10.0;
  let turns = 3;
  let particles = 36;
  let jitter = 0.1;
  let strands = 1;

  // Adjust based on tier
  switch (tier) {
    case Tier.TIER_1:
      radius = 3.0;
      height = 10.0;
      turns = 3;
      particles = 36;
      jitter = 0.1;
      strands = 1;
      break;
    case Tier.TIER_2:
      radius = 3.5;
      height = 12.0;
      turns = 4;
      particles = 48;
      jitter = 0.15;
      strands = 1;
      break;
    case Tier.TIER_3:
      radius = 4.0;
      height = 14.0;
      turns = 5;
      particles = 60;
      jitter = 0.2;
      strands = 2;
      break;
    case Tier.TIER_4:
      radius = 4.5;
      height = 16.0;
      turns = 6;
      particles = 72;
      jitter = 0.25;
      strands = 2;
      break;
    case Tier.TIER_5:
      radius = 5.0;
      height = 18.0;
      turns = 7;
      particles = 84;
      jitter = 0.3;
      strands = 3;
      break;
    case Tier.TIER_6:
      radius = 5.5;
      height = 20.0;
      turns = 8;
      particles = 96;
      jitter = 0.35;
      strands = 3;
      break;
  }

  // Adjust based on role
  switch (role) {
    case Role.CORE:
      // Core formations are more compact
      radius *= 0.8;
      height *= 0.8;
      jitter *= 0.8;
      break;
    case Role.ATTACK:
      // Attack formations are more aggressive
      radius *= 1.2;
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
      height *= 1.2;
      break;
  }

  return {
    type: FormationPatternType.HELIX,
    density: 0.6,
    cohesion: 0.7,
    flexibility: 0.8,
    parameters: {
      radius,
      height,
      turns,
      particles,
      offset: { x: 0, y: 0, z: 0 },
      rotation: 0,
      jitter,
      strands
    }
  };
}

/**
 * Helix formation patterns for different roles and tiers
 */
export const helixFormations = {
  [Role.CORE]: {
    [Tier.TIER_3]: createHelixFormation(Role.CORE, Tier.TIER_3, Rarity.RARE)
  },
  [Role.ATTACK]: {
    [Tier.TIER_3]: createHelixFormation(Role.ATTACK, Tier.TIER_3, Rarity.RARE)
  },
  [Role.DEFENSE]: {
    [Tier.TIER_3]: createHelixFormation(Role.DEFENSE, Tier.TIER_3, Rarity.RARE)
  },
  [Role.CONTROL]: {
    [Tier.TIER_3]: createHelixFormation(Role.CONTROL, Tier.TIER_3, Rarity.RARE)
  },
  [Role.MOVEMENT]: {
    [Tier.TIER_3]: createHelixFormation(Role.MOVEMENT, Tier.TIER_3, Rarity.RARE)
  }
};
