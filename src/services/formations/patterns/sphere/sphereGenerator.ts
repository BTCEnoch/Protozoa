/**
 * Sphere Formation Generator
 *
 * Generates particle positions for sphere formations.
 */

import { SphereFormationPattern } from './sphereFormation';
import { Vector3 } from '../../../../types/common';
import { createSeededRandom } from '../../../utils/random';

/**
 * Generate positions for a sphere formation
 * @param pattern The sphere formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateSphereFormation(
  pattern: SphereFormationPattern,
  seed: number
): Vector3[] {
  const {
    radius,
    count,
    offset,
    jitter,
    layers = 1,
    layerSpacing = 1.0
  } = pattern.parameters;

  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);

  // Generate positions for each layer
  for (let layer = 0; layer < layers; layer++) {
    const layerRadius = radius + layer * layerSpacing;
    const layerCount = Math.floor(count / layers);

    // Generate positions using Fibonacci sphere algorithm for uniform distribution
    for (let i = 0; i < layerCount; i++) {
      // Fibonacci sphere algorithm
      const phi = Math.acos(1 - 2 * (i + 0.5) / layerCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      // Calculate base position on the sphere
      const x = Math.sin(phi) * Math.cos(theta) * layerRadius;
      const y = Math.sin(phi) * Math.sin(theta) * layerRadius;
      const z = Math.cos(phi) * layerRadius;

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
 * Generate positions for a multi-layer sphere formation
 * @param pattern The sphere formation pattern
 * @param seed The random seed
 * @param particleCount The number of particles to generate
 * @returns An array of Vector3 positions
 */
export function generateMultiLayerSphereFormation(
  pattern: SphereFormationPattern,
  seed: number,
  particleCount: number
): Vector3[] {
  const { radius, jitter, offset } = pattern.parameters;
  const random = createSeededRandom(seed);

  // Calculate number of layers based on particle count
  const layers = Math.max(1, Math.min(5, Math.ceil(Math.cbrt(particleCount / 10))));

  // Calculate particles per layer
  const particlesPerLayer: number[] = [];
  let remainingParticles = particleCount;

  for (let layer = 0; layer < layers; layer++) {
    const layerRadius = radius * (1 + layer * 0.5);
    const layerSurface = 4 * Math.PI * layerRadius * layerRadius;
    const idealParticles = Math.floor(layerSurface / 10); // Roughly 1 particle per 10 square units

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

    // Generate positions using Fibonacci sphere algorithm for uniform distribution
    for (let i = 0; i < layerCount; i++) {
      // Fibonacci sphere algorithm
      const phi = Math.acos(1 - 2 * (i + 0.5) / layerCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      // Calculate base position on the sphere
      const x = Math.sin(phi) * Math.cos(theta) * layerRadius;
      const y = Math.sin(phi) * Math.sin(theta) * layerRadius;
      const z = Math.cos(phi) * layerRadius;

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
