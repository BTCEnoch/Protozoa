/**
 * Swarm Formation Pattern
 *
 * Defines the swarm formation pattern and its parameters.
 */

import { Role, Tier, Rarity } from '../../../../types/core';
import { FormationPattern, FormationPatternType } from '../../../../types/formations/formation';
import { Vector3 } from '../../../../types/common';

/**
 * Swarm Formation Pattern interface
 * Extends the base FormationPattern with swarm-specific parameters
 */
export interface SwarmFormationPattern extends FormationPattern {
  type: FormationPatternType.SWARM;
  parameters: {
    volume: number;        // Space the swarm occupies
    density: number;       // Particle density
    cohesion: number;      // How tightly particles stick together
    separation: number;    // Minimum distance between particles
    alignment: number;     // How strongly particles align with neighbors
    offset: Vector3;       // Center point offset
    jitter: number;        // Random variation
    iterations?: number;   // Number of iterations to apply swarm rules
  };
}

/**
 * Create a swarm formation pattern
 * @param role The role of the formation
 * @param tier The tier of the formation
 * @param rarity The rarity of the formation
 * @returns A swarm formation pattern
 */
export function createSwarmFormation(
  role: Role,
  tier: Tier,
  rarity: Rarity
): SwarmFormationPattern {
  // Base values
  let volume = 10.0;
  let density = 0.6;
  let cohesion = 0.5;
  let separation = 1.0;
  let alignment = 0.5;
  let jitter = 0.2;
  let iterations = 3;

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
      volume = 10.0;
      density = 0.6;
      cohesion = 0.5;
      separation = 1.0;
      alignment = 0.5;
      jitter = 0.2;
      iterations = 3;
      break;
    case Tier.TIER_5:
      volume = 12.0;
      density = 0.7;
      cohesion = 0.6;
      separation = 1.2;
      alignment = 0.6;
      jitter = 0.25;
      iterations = 4;
      break;
    case Tier.TIER_6:
      volume = 15.0;
      density = 0.8;
      cohesion = 0.7;
      separation = 1.5;
      alignment = 0.7;
      jitter = 0.3;
      iterations = 5;
      break;
  }

  // Adjust based on role
  switch (role) {
    case Role.CORE:
      // Core formations are more compact
      volume *= 0.8;
      cohesion *= 1.2;
      separation *= 0.8;
      break;
    case Role.ATTACK:
      // Attack formations are more aggressive
      volume *= 1.2;
      alignment *= 1.2;
      jitter *= 1.2;
      break;
    case Role.DEFENSE:
      // Defense formations are more structured
      cohesion *= 1.2;
      separation *= 1.2;
      jitter *= 0.8;
      break;
    case Role.CONTROL:
      // Control formations are more balanced
      cohesion *= 1.1;
      alignment *= 1.1;
      separation *= 1.1;
      break;
    case Role.MOVEMENT:
      // Movement formations are more dynamic
      volume *= 1.3;
      alignment *= 1.3;
      jitter *= 1.3;
      break;
  }

  return {
    type: FormationPatternType.SWARM,
    density: 0.7,
    cohesion: 0.8,
    flexibility: 0.9,
    parameters: {
      volume,
      density,
      cohesion,
      separation,
      alignment,
      offset: { x: 0, y: 0, z: 0 },
      jitter,
      iterations
    }
  };
}

/**
 * Swarm formation patterns for different roles and tiers
 */
export const swarmFormations = {
  [Role.CORE]: {
    [Tier.TIER_4]: createSwarmFormation(Role.CORE, Tier.TIER_4, Rarity.EPIC),
    [Tier.TIER_5]: createSwarmFormation(Role.CORE, Tier.TIER_5, Rarity.LEGENDARY)
  },
  [Role.ATTACK]: {
    [Tier.TIER_4]: createSwarmFormation(Role.ATTACK, Tier.TIER_4, Rarity.EPIC),
    [Tier.TIER_5]: createSwarmFormation(Role.ATTACK, Tier.TIER_5, Rarity.LEGENDARY)
  },
  [Role.DEFENSE]: {
    [Tier.TIER_4]: createSwarmFormation(Role.DEFENSE, Tier.TIER_4, Rarity.EPIC),
    [Tier.TIER_5]: createSwarmFormation(Role.DEFENSE, Tier.TIER_5, Rarity.LEGENDARY)
  },
  [Role.CONTROL]: {
    [Tier.TIER_4]: createSwarmFormation(Role.CONTROL, Tier.TIER_4, Rarity.EPIC),
    [Tier.TIER_5]: createSwarmFormation(Role.CONTROL, Tier.TIER_5, Rarity.LEGENDARY)
  },
  [Role.MOVEMENT]: {
    [Tier.TIER_4]: createSwarmFormation(Role.MOVEMENT, Tier.TIER_4, Rarity.EPIC),
    [Tier.TIER_5]: createSwarmFormation(Role.MOVEMENT, Tier.TIER_5, Rarity.LEGENDARY)
  }
};

