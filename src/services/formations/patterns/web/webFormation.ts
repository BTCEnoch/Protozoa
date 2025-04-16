/**
 * Web Formation Pattern
 * 
 * Defines the web formation pattern and its parameters.
 */

import { Role, Tier, Rarity } from '../../../../types/core';
import { FormationPattern, FormationPatternType } from '../../../../types/formations/formation';
import { Vector3 } from '../../../../types/common';

/**
 * Web Formation Pattern interface
 * Extends the base FormationPattern with web-specific parameters
 */
export interface WebFormationPattern extends FormationPattern {
  type: FormationPatternType.WEB;
  parameters: {
    radius: number;        // Radius of the web
    density: number;       // Density of connections
    layers: number;        // Number of concentric layers
    spokes: number;        // Number of radial spokes
    irregularity: number;  // How irregular the web is (0-1)
    offset: Vector3;       // Center point offset
    rotation: number;      // Rotation angle
    jitter: number;        // Random variation
  };
}

/**
 * Create a web formation pattern
 * @param role The role of the formation
 * @param tier The tier of the formation
 * @param rarity The rarity of the formation
 * @returns A web formation pattern
 */
export function createWebFormation(
  role: Role,
  tier: Tier,
  rarity: Rarity
): WebFormationPattern {
  // Base values
  let radius = 10.0;
  let density = 0.5;
  let layers = 3;
  let spokes = 8;
  let irregularity = 0.3;
  let jitter = 0.1;
  
  // Adjust based on tier
  switch (tier) {
    case Tier.TIER_3:
      radius = 10.0;
      density = 0.5;
      layers = 3;
      spokes = 8;
      irregularity = 0.3;
      jitter = 0.1;
      break;
    case Tier.TIER_4:
      radius = 12.0;
      density = 0.6;
      layers = 4;
      spokes = 10;
      irregularity = 0.4;
      jitter = 0.15;
      break;
    case Tier.TIER_5:
      radius = 15.0;
      density = 0.7;
      layers = 5;
      spokes = 12;
      irregularity = 0.5;
      jitter = 0.2;
      break;
    case Tier.TIER_6:
      radius = 18.0;
      density = 0.8;
      layers = 6;
      spokes = 16;
      irregularity = 0.6;
      jitter = 0.25;
      break;
  }
  
  // Adjust based on role
  switch (role) {
    case Role.CORE:
      // Core formations are more structured
      irregularity *= 0.8;
      jitter *= 0.8;
      break;
    case Role.ATTACK:
      // Attack formations are more aggressive
      spokes = Math.max(6, spokes - 2);
      irregularity *= 1.2;
      break;
    case Role.DEFENSE:
      // Defense formations are more dense
      density *= 1.2;
      layers += 1;
      break;
    case Role.CONTROL:
      // Control formations are more precise
      jitter *= 0.7;
      spokes += 2;
      break;
    case Role.MOVEMENT:
      // Movement formations are more dynamic
      jitter *= 1.3;
      irregularity *= 1.3;
      break;
  }
  
  return {
    type: FormationPatternType.WEB,
    density: 0.7,
    cohesion: 0.8,
    flexibility: 0.6,
    parameters: {
      radius,
      density,
      layers,
      spokes,
      irregularity,
      offset: { x: 0, y: 0, z: 0 },
      rotation: 0,
      jitter
    }
  };
}

/**
 * Web formation patterns for different roles and tiers
 */
export const webFormations = {
  [Role.CORE]: {
    [Tier.TIER_3]: createWebFormation(Role.CORE, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createWebFormation(Role.CORE, Tier.TIER_4, Rarity.EPIC)
  },
  [Role.ATTACK]: {
    [Tier.TIER_3]: createWebFormation(Role.ATTACK, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createWebFormation(Role.ATTACK, Tier.TIER_4, Rarity.EPIC)
  },
  [Role.DEFENSE]: {
    [Tier.TIER_3]: createWebFormation(Role.DEFENSE, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createWebFormation(Role.DEFENSE, Tier.TIER_4, Rarity.EPIC)
  },
  [Role.CONTROL]: {
    [Tier.TIER_3]: createWebFormation(Role.CONTROL, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createWebFormation(Role.CONTROL, Tier.TIER_4, Rarity.EPIC)
  },
  [Role.MOVEMENT]: {
    [Tier.TIER_3]: createWebFormation(Role.MOVEMENT, Tier.TIER_3, Rarity.RARE),
    [Tier.TIER_4]: createWebFormation(Role.MOVEMENT, Tier.TIER_4, Rarity.EPIC)
  }
};

