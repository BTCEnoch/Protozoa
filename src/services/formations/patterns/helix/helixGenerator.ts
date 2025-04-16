/**
 * Helix Formation Generator
 *
 * Generates particle positions for helix formations.
 */

import { HelixFormationPattern } from './helixFormation';
import { Vector3 } from '../../../../types/common';
import { createSeededRandom } from '../../../utils/random';

/**
 * Generate positions for a helix formation
 * @param pattern The helix formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateHelixFormation(
  pattern: HelixFormationPattern,
  seed: number
): Vector3[] {
  const {
    radius,
    height,
    turns,
    particles,
    offset,
    rotation,
    jitter,
    strands = 1
  } = pattern.parameters;

  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);

  // Calculate particles per strand
  const particlesPerStrand = Math.floor(particles / strands);

  // Generate positions for each strand
  for (let strand = 0; strand < strands; strand++) {
    // Calculate strand offset angle
    const strandOffset = (strand / strands) * 2 * Math.PI;

    // Generate positions along the helix
    for (let i = 0; i < particlesPerStrand; i++) {
      // Calculate the position along the helix (0 to 1)
      const t = i / particlesPerStrand;

      // Calculate the angle based on the position and number of turns
      const angle = t * turns * 2 * Math.PI + strandOffset + rotation;

      // Calculate the height based on the position
      const z = t * height - height / 2;

      // Calculate base position on the helix
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // Add jitter
      const jitterX = (random() * 2 - 1) * jitter * radius;
      const jitterY = (random() * 2 - 1) * jitter * radius;
      const jitterZ = (random() * 2 - 1) * jitter * height / turns;

      // Apply offset
      positions.push({
        x: x + jitterX + offset.x,
        y: y + jitterY + offset.y,
        z: z + jitterZ + offset.z
      });
    }
  }

  return positions;
}

/**
 * Generate positions for a double helix formation
 * @param pattern The helix formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateDoubleHelixFormation(
  pattern: HelixFormationPattern,
  seed: number
): Vector3[] {
  // Create a copy of the pattern with 2 strands
  const doubleHelixPattern: HelixFormationPattern = {
    ...pattern,
    parameters: {
      ...pattern.parameters,
      strands: 2
    }
  };

  return generateHelixFormation(doubleHelixPattern, seed);
}

/**
 * Generate positions for a triple helix formation
 * @param pattern The helix formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateTripleHelixFormation(
  pattern: HelixFormationPattern,
  seed: number
): Vector3[] {
  // Create a copy of the pattern with 3 strands
  const tripleHelixPattern: HelixFormationPattern = {
    ...pattern,
    parameters: {
      ...pattern.parameters,
      strands: 3
    }
  };

  return generateHelixFormation(tripleHelixPattern, seed);
}
