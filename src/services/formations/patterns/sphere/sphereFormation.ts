/**
 * Sphere Formation Pattern
 *
 * Defines the sphere formation pattern and its parameters.
 */

import { Role, Tier, Rarity } from '../../../../types/core';
import { FormationPattern, FormationPatternType } from '../../../../types/formations/formation';
import { Vector3 } from '../../../../types/common';

/**
 * Sphere Formation Pattern interface
 * Extends the base FormationPattern with sphere-specific parameters
 */
export interface SphereFormationPattern extends FormationPattern {
  type: FormationPatternType.SPHERE;
  parameters: {
    radius: number;       // Radius of the sphere
    count: number;        // Number of particles
    offset: Vector3;      // Center point offset
    jitter: number;       // Random variation
    layers?: number;      // Number of layers (for multi-layer spheres)
    layerSpacing?: number; // Spacing between layers
  };
}

/**
 * Create a sphere formation pattern
 * @param role The role of the formation
 * @param tier The tier of the formation
 * @param rarity The rarity of the formation
 * @returns A sphere formation pattern
 */
export function createSphereFormation(
  role: Role,
  tier: Tier,
  rarity: Rarity
): SphereFormationPattern {
  // Base values
  let radius = 5.0;
  let count = 32;
  let jitter = 0.1;
  let layers = 1;
  let layerSpacing = 1.0;

  // Adjust based on tier
  switch (tier) {
    case Tier.TIER_1:
      radius = 5.0;
      count = 32;
      jitter = 0.1;
      layers = 1;
      break;
    case Tier.TIER_2:
      radius = 6.0;
      count = 48;
      jitter = 0.15;
      layers = 1;
      break;
    case Tier.TIER_3:
      radius = 7.0;
      count = 64;
      jitter = 0.2;
      layers = 2;
      break;
    case Tier.TIER_4:
      radius = 8.0;
      count = 80;
      jitter = 0.25;
      layers = 2;
      break;
    case Tier.TIER_5:
      radius = 9.0;
      count = 96;
      jitter = 0.3;
      layers = 3;
      break;
    case Tier.TIER_6:
      radius = 10.0;
      count = 128;
      jitter = 0.35;
      layers = 3;
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
    type: FormationPatternType.SPHERE,
    density: 0.7,
    cohesion: 0.8,
    flexibility: 0.5,
    parameters: {
      radius,
      count,
      offset: { x: 0, y: 0, z: 0 },
      jitter,
      layers,
      layerSpacing
    }
  };
}

/**
 * Sphere formation patterns for different roles and tiers
 */
export const sphereFormations = {
  [Role.CORE]: {
    [Tier.TIER_3]: createSphereFormation(Role.CORE, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createSphereFormation(Role.CORE, Tier.TIER_4, Rarity.EPIC)
  },
  [Role.ATTACK]: {
    [Tier.TIER_3]: createSphereFormation(Role.ATTACK, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createSphereFormation(Role.ATTACK, Tier.TIER_4, Rarity.EPIC)
  },
  [Role.DEFENSE]: {
    [Tier.TIER_3]: createSphereFormation(Role.DEFENSE, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createSphereFormation(Role.DEFENSE, Tier.TIER_4, Rarity.EPIC)
  },
  [Role.CONTROL]: {
    [Tier.TIER_3]: createSphereFormation(Role.CONTROL, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createSphereFormation(Role.CONTROL, Tier.TIER_4, Rarity.EPIC)
  },
  [Role.MOVEMENT]: {
    [Tier.TIER_3]: createSphereFormation(Role.MOVEMENT, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createSphereFormation(Role.MOVEMENT, Tier.TIER_4, Rarity.EPIC)
  }
};

