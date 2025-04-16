/**
 * Cluster Formation Pattern
 *
 * Defines the cluster formation pattern and its parameters.
 */

import { Role, Tier, Rarity } from '../../../../types/core';
import { FormationPattern, FormationPatternType } from '../../../../types/formation';
import { Vector3 } from '../../../../types/common';

/**
 * Cluster Formation Pattern interface
 * Extends the base FormationPattern with cluster-specific parameters
 */
export interface ClusterFormationPattern extends FormationPattern {
  type: FormationPatternType.CLUSTER;
  parameters: {
    density: number;       // Particle density
    radius: number;        // Overall cluster radius
    clusters: number;      // Number of sub-clusters
    clusterSize: number;   // Size of each sub-cluster
    offset: Vector3;       // Center point offset
    seed: number;          // Random seed
    jitter: number;        // Random variation
  };
}

/**
 * Create a cluster formation pattern
 * @param role The role of the formation
 * @param tier The tier of the formation
 * @param rarity The rarity of the formation
 * @returns A cluster formation pattern
 */
export function createClusterFormation(
  role: Role,
  tier: Tier,
  rarity: Rarity
): ClusterFormationPattern {
  // Base values
  let density = 0.5;
  let radius = 8.0;
  let clusters = 3;
  let clusterSize = 3.0;
  let jitter = 0.2;

  // Adjust based on tier
  switch (tier) {
    case Tier.TIER_1:
      // Not available at tier 1
      break;
    case Tier.TIER_2:
      density = 0.5;
      radius = 8.0;
      clusters = 3;
      clusterSize = 3.0;
      jitter = 0.2;
      break;
    case Tier.TIER_3:
      density = 0.6;
      radius = 10.0;
      clusters = 4;
      clusterSize = 3.5;
      jitter = 0.25;
      break;
    case Tier.TIER_4:
      density = 0.7;
      radius = 12.0;
      clusters = 5;
      clusterSize = 4.0;
      jitter = 0.3;
      break;
    case Tier.TIER_5:
      density = 0.8;
      radius = 14.0;
      clusters = 6;
      clusterSize = 4.5;
      jitter = 0.35;
      break;
    case Tier.TIER_6:
      density = 0.9;
      radius = 16.0;
      clusters = 7;
      clusterSize = 5.0;
      jitter = 0.4;
      break;
  }

  // Adjust based on role
  switch (role) {
    case Role.CORE:
      // Core formations are more compact
      radius *= 0.8;
      clusterSize *= 0.9;
      jitter *= 0.8;
      break;
    case Role.ATTACK:
      // Attack formations are more spread out
      radius *= 1.2;
      clusters = Math.max(2, clusters - 1);
      clusterSize *= 1.2;
      break;
    case Role.DEFENSE:
      // Defense formations have more clusters
      clusters += 1;
      clusterSize *= 0.9;
      break;
    case Role.CONTROL:
      // Control formations are more precise
      jitter *= 0.7;
      density *= 1.1;
      break;
    case Role.MOVEMENT:
      // Movement formations are more dynamic
      jitter *= 1.3;
      radius *= 1.1;
      break;
  }

  return {
    type: FormationPatternType.CLUSTER,
    density: 0.7,
    cohesion: 0.8,
    flexibility: 0.6,
    parameters: {
      density,
      radius,
      clusters,
      clusterSize,
      offset: { x: 0, y: 0, z: 0 },
      seed: 12345,
      jitter
    }
  };
}

/**
 * Cluster formation patterns for different roles and tiers
 */
export const clusterFormations = {
  [Role.CORE]: {
    [Tier.TIER_2]: createClusterFormation(Role.CORE, Tier.TIER_2, Rarity.UNCOMMON),
    [Tier.TIER_3]: createClusterFormation(Role.CORE, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createClusterFormation(Role.CORE, Tier.TIER_4, Rarity.EPIC)
  },
  [Role.ATTACK]: {
    [Tier.TIER_2]: createClusterFormation(Role.ATTACK, Tier.TIER_2, Rarity.UNCOMMON),
    [Tier.TIER_3]: createClusterFormation(Role.ATTACK, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createClusterFormation(Role.ATTACK, Tier.TIER_4, Rarity.EPIC)
  },
  [Role.DEFENSE]: {
    [Tier.TIER_2]: createClusterFormation(Role.DEFENSE, Tier.TIER_2, Rarity.UNCOMMON),
    [Tier.TIER_3]: createClusterFormation(Role.DEFENSE, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createClusterFormation(Role.DEFENSE, Tier.TIER_4, Rarity.EPIC)
  },
  [Role.CONTROL]: {
    [Tier.TIER_2]: createClusterFormation(Role.CONTROL, Tier.TIER_2, Rarity.UNCOMMON),
    [Tier.TIER_3]: createClusterFormation(Role.CONTROL, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createClusterFormation(Role.CONTROL, Tier.TIER_4, Rarity.EPIC)
  },
  [Role.MOVEMENT]: {
    [Tier.TIER_2]: createClusterFormation(Role.MOVEMENT, Tier.TIER_2, Rarity.UNCOMMON),
    [Tier.TIER_3]: createClusterFormation(Role.MOVEMENT, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createClusterFormation(Role.MOVEMENT, Tier.TIER_4, Rarity.EPIC)
  }
};
