/**
 * Mandelbrot Formation Pattern
 *
 * Defines the Mandelbrot formation pattern and its parameters.
 */

import { Role, Tier, Rarity } from '../../../../types/core';
import { FormationPattern, FormationPatternType } from '../../../../types/formation';
import { Vector3 } from '../../../../types/common';

/**
 * Mandelbrot Formation Pattern interface
 * Extends the base FormationPattern with Mandelbrot-specific parameters
 */
export interface MandelbrotFormationPattern extends FormationPattern {
  type: FormationPatternType.MANDELBROT;
  parameters: {
    centerX: number;      // X-coordinate of the center point in the complex plane
    centerY: number;      // Y-coordinate of the center point in the complex plane
    scale: number;        // Scale factor (zoom level)
    iterations: number;   // Maximum number of iterations for the Mandelbrot calculation
    threshold: number;    // Escape threshold
    density: number;      // Particle density
    offset: Vector3;      // Center point offset in 3D space
    rotation: number;     // Rotation angle
    jitter: number;       // Random variation
    is3D: boolean;        // Whether to generate in 3D (Julia set) or 2D (Mandelbrot)
  };
}

/**
 * Create a Mandelbrot formation pattern
 * @param role The role of the formation
 * @param tier The tier of the formation
 * @param rarity The rarity of the formation
 * @returns A Mandelbrot formation pattern
 */
export function createMandelbrotFormation(
  role: Role,
  tier: Tier,
  rarity: Rarity
): MandelbrotFormationPattern {
  // Base values
  let centerX = -0.5;
  let centerY = 0.0;
  let scale = 2.5;
  let iterations = 50;
  let threshold = 4.0;
  let density = 0.5;
  let jitter = 0.05;
  let is3D = false;

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
      // Not available at tier 5
      break;
    case Tier.TIER_6:
      centerX = -0.5;
      centerY = 0.0;
      scale = 2.5;
      iterations = 50;
      threshold = 4.0;
      density = 0.5;
      jitter = 0.05;
      is3D = false;
      break;
  }

  // Adjust based on role
  switch (role) {
    case Role.CORE:
      // Core formations focus on the main bulb
      centerX = -0.5;
      centerY = 0.0;
      scale = 2.0;
      break;
    case Role.ATTACK:
      // Attack formations focus on a more jagged area
      centerX = -0.75;
      centerY = 0.1;
      scale = 1.5;
      break;
    case Role.DEFENSE:
      // Defense formations are more structured
      iterations = 100;
      jitter *= 0.5;
      break;
    case Role.CONTROL:
      // Control formations focus on a mini-bulb
      centerX = -1.25;
      centerY = 0.0;
      scale = 0.5;
      break;
    case Role.MOVEMENT:
      // Movement formations use 3D Julia set
      is3D = true;
      iterations = 30;
      break;
  }

  return {
    type: FormationPatternType.MANDELBROT,
    density: 0.8,
    cohesion: 0.9,
    flexibility: 0.2,
    parameters: {
      centerX,
      centerY,
      scale,
      iterations,
      threshold,
      density,
      offset: { x: 0, y: 0, z: 0 },
      rotation: 0,
      jitter,
      is3D
    }
  };
}

/**
 * Mandelbrot formation patterns for different roles and tiers
 */
export const mandelbrotFormations = {
  [Role.CORE]: {
    [Tier.TIER_6]: createMandelbrotFormation(Role.CORE, Tier.TIER_6, Rarity.MYTHIC)
  },
  [Role.ATTACK]: {
    [Tier.TIER_6]: createMandelbrotFormation(Role.ATTACK, Tier.TIER_6, Rarity.MYTHIC)
  },
  [Role.DEFENSE]: {
    [Tier.TIER_6]: createMandelbrotFormation(Role.DEFENSE, Tier.TIER_6, Rarity.MYTHIC)
  },
  [Role.CONTROL]: {
    [Tier.TIER_6]: createMandelbrotFormation(Role.CONTROL, Tier.TIER_6, Rarity.MYTHIC)
  },
  [Role.MOVEMENT]: {
    [Tier.TIER_6]: createMandelbrotFormation(Role.MOVEMENT, Tier.TIER_6, Rarity.MYTHIC)
  }
};
