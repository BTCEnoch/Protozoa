/**
 * Tree Formation Pattern
 *
 * Defines the tree formation pattern and its parameters.
 */

import { Role, Tier, Rarity } from '../../../../types/core';
import { FormationPattern, FormationPatternType } from '../../../../types/formations/formation';
import { Vector3 } from '../../../../types/common';

/**
 * Tree Formation Pattern interface
 * Extends the base FormationPattern with tree-specific parameters
 */
export interface TreeFormationPattern extends FormationPattern {
  type: FormationPatternType.TREE;
  parameters: {
    height: number;        // Height of the tree
    branchLevels: number;  // Number of branch levels
    branchFactor: number;  // Branching factor (how many branches per node)
    branchAngle: number;   // Angle between branches
    branchLength: number;  // Length of branches
    trunkWidth: number;    // Width of the trunk
    leafDensity: number;   // Density of leaves
    offset: Vector3;       // Center point offset
    rotation: number;      // Rotation angle
    jitter: number;        // Random variation
  };
}

/**
 * Create a tree formation pattern
 * @param role The role of the formation
 * @param tier The tier of the formation
 * @param rarity The rarity of the formation
 * @returns A tree formation pattern
 */
export function createTreeFormation(
  role: Role,
  tier: Tier,
  rarity: Rarity
): TreeFormationPattern {
  // Base values
  let height = 10.0;
  let branchLevels = 3;
  let branchFactor = 2;
  let branchAngle = 0.5; // In radians
  let branchLength = 2.0;
  let trunkWidth = 1.0;
  let leafDensity = 0.5;
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
      height = 10.0;
      branchLevels = 3;
      branchFactor = 2;
      branchAngle = 0.5;
      branchLength = 2.0;
      trunkWidth = 1.0;
      leafDensity = 0.5;
      jitter = 0.1;
      break;
    case Tier.TIER_5:
      height = 12.0;
      branchLevels = 4;
      branchFactor = 2;
      branchAngle = 0.6;
      branchLength = 2.5;
      trunkWidth = 1.2;
      leafDensity = 0.6;
      jitter = 0.15;
      break;
    case Tier.TIER_6:
      height = 15.0;
      branchLevels = 5;
      branchFactor = 3;
      branchAngle = 0.7;
      branchLength = 3.0;
      trunkWidth = 1.5;
      leafDensity = 0.7;
      jitter = 0.2;
      break;
  }

  // Adjust based on role
  switch (role) {
    case Role.CORE:
      // Core formations are more balanced
      branchAngle *= 1.0;
      branchFactor = Math.max(2, branchFactor);
      break;
    case Role.ATTACK:
      // Attack formations have sharper angles
      branchAngle *= 0.8;
      height *= 1.2;
      break;
    case Role.DEFENSE:
      // Defense formations are wider
      branchAngle *= 1.2;
      trunkWidth *= 1.2;
      break;
    case Role.CONTROL:
      // Control formations are more structured
      jitter *= 0.8;
      branchLevels = Math.min(branchLevels + 1, 5);
      break;
    case Role.MOVEMENT:
      // Movement formations are more dynamic
      jitter *= 1.2;
      leafDensity *= 1.2;
      break;
  }

  return {
    type: FormationPatternType.TREE,
    density: 0.6,
    cohesion: 0.7,
    flexibility: 0.5,
    parameters: {
      height,
      branchLevels,
      branchFactor,
      branchAngle,
      branchLength,
      trunkWidth,
      leafDensity,
      offset: { x: 0, y: 0, z: 0 },
      rotation: 0,
      jitter
    }
  };
}

/**
 * Tree formation patterns for different roles and tiers
 */
export const treeFormations = {
  [Role.CORE]: {
    [Tier.TIER_4]: createTreeFormation(Role.CORE, Tier.TIER_4, Rarity.EPIC),
    [Tier.TIER_5]: createTreeFormation(Role.CORE, Tier.TIER_5, Rarity.LEGENDARY)
  },
  [Role.ATTACK]: {
    [Tier.TIER_4]: createTreeFormation(Role.ATTACK, Tier.TIER_4, Rarity.EPIC),
    [Tier.TIER_5]: createTreeFormation(Role.ATTACK, Tier.TIER_5, Rarity.LEGENDARY)
  },
  [Role.DEFENSE]: {
    [Tier.TIER_4]: createTreeFormation(Role.DEFENSE, Tier.TIER_4, Rarity.EPIC),
    [Tier.TIER_5]: createTreeFormation(Role.DEFENSE, Tier.TIER_5, Rarity.LEGENDARY)
  },
  [Role.CONTROL]: {
    [Tier.TIER_4]: createTreeFormation(Role.CONTROL, Tier.TIER_4, Rarity.EPIC),
    [Tier.TIER_5]: createTreeFormation(Role.CONTROL, Tier.TIER_5, Rarity.LEGENDARY)
  },
  [Role.MOVEMENT]: {
    [Tier.TIER_4]: createTreeFormation(Role.MOVEMENT, Tier.TIER_4, Rarity.EPIC),
    [Tier.TIER_5]: createTreeFormation(Role.MOVEMENT, Tier.TIER_5, Rarity.LEGENDARY)
  }
};

