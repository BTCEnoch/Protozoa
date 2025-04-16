/**
 * Circle Formation Generator
 *
 * Generates particle positions for circle formations.
 */

import { CircleFormationPattern } from './circleFormation';
import { Vector3 } from '../../../../types/common';
import { createSeededRandom } from '../../../utils/random';

/**
 * Generate positions for a circle formation
 * @param pattern The circle formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateCircleFormation(
  pattern: CircleFormationPattern,
  seed: number
): Vector3[] {
  const {
    radius,
    count,
    offset,
    rotation,
    jitter,
    layers = 1,
    layerSpacing = 1.0
  } = pattern.parameters;

  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);

  // Generate positions for each layer
  for (let layer = 0; layer < layers; layer++) {
    const layerRadius = radius + layer * layerSpacing;
    const layerCount = Math.floor(count * (1 + layer * 0.5));

    for (let i = 0; i < layerCount; i++) {
      const angle = (i / layerCount) * 2 * Math.PI + rotation;

      // Calculate base position on the circle
      const x = Math.cos(angle) * layerRadius;
      const y = Math.sin(angle) * layerRadius;
      const z = 0;

      // Add jitter
      const jitterX = (random() * 2 - 1) * jitter * layerRadius;
      const jitterY = (random() * 2 - 1) * jitter * layerRadius;
      const jitterZ = (random() * 2 - 1) * jitter * layerRadius;

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
 * Generate positions for a multi-layer circle formation
 * @param pattern The circle formation pattern
 * @param seed The random seed
 * @param particleCount The number of particles to generate
 * @returns An array of Vector3 positions
 */
export function generateMultiLayerCircleFormation(
  pattern: CircleFormationPattern,
  seed: number,
  particleCount: number
): Vector3[] {
  const { radius, jitter, offset } = pattern.parameters;
  const random = createSeededRandom(seed);

  // Calculate number of layers based on particle count
  const layers = Math.max(1, Math.ceil(Math.sqrt(particleCount / Math.PI)));

  // Calculate particles per layer
  const particlesPerLayer: number[] = [];
  let remainingParticles = particleCount;

  for (let layer = 0; layer < layers; layer++) {
    const layerRadius = radius * (1 + layer * 0.5);
    const circumference = 2 * Math.PI * layerRadius;
    const idealParticles = Math.floor(circumference / 2); // Particles spaced roughly 2 units apart

    const layerParticles = Math.min(idealParticles, remainingParticles);
    particlesPerLayer.push(layerParticles);
    remainingParticles -= layerParticles;

    if (remainingParticles <= 0) break;
  }

  // Generate positions for each layer
  const positions: Vector3[] = [];

  for (let layer = 0; layer < particlesPerLayer.length; layer++) {
    const layerRadius = radius * (1 + layer * 0.5);
    const layerCount = particlesPerLayer[layer];

    for (let i = 0; i < layerCount; i++) {
      const angle = (i / layerCount) * 2 * Math.PI;

      // Calculate base position on the circle
      const x = Math.cos(angle) * layerRadius;
      const y = Math.sin(angle) * layerRadius;
      const z = 0;

      // Add jitter
      const jitterX = (random() * 2 - 1) * jitter * layerRadius;
      const jitterY = (random() * 2 - 1) * jitter * layerRadius;
      const jitterZ = (random() * 2 - 1) * jitter * layerRadius;

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
