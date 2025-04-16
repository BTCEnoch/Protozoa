/**
 * Swarm Formation Generator
 *
 * Generates particle positions for swarm formations.
 */

import { SwarmFormationPattern } from './swarmFormation';
import { Vector3 } from '../../../../types/common';
import { createSeededRandom } from '../../../utils/random';
import { addVectors, subtractVectors, multiplyVector, normalizeVector } from '../../../../lib/mathUtils';

/**
 * Generate positions for a swarm formation
 * @param pattern The swarm formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateSwarmFormation(
  pattern: SwarmFormationPattern,
  seed: number
): Vector3[] {
  const {
    volume,
    density,
    cohesion,
    separation,
    alignment,
    offset,
    jitter,
    iterations = 3
  } = pattern.parameters;

  const random = createSeededRandom(seed);

  // Calculate number of particles based on volume and density
  const particleCount = Math.floor(volume * density * 2);

  // Generate initial random positions
  const positions: Vector3[] = [];
  for (let i = 0; i < particleCount; i++) {
    positions.push({
      x: (random() * 2 - 1) * volume / 2,
      y: (random() * 2 - 1) * volume / 2,
      z: (random() * 2 - 1) * volume / 2
    });
  }

  // Apply swarm rules for several iterations
  for (let iter = 0; iter < iterations; iter++) {
    // Calculate forces for each particle
    const forces: Vector3[] = positions.map((pos, i) => {
      // Initialize forces
      let cohesionForce = { x: 0, y: 0, z: 0 };
      let separationForce = { x: 0, y: 0, z: 0 };
      let alignmentForce = { x: 0, y: 0, z: 0 };

      // Find neighbors
      let neighborCount = 0;
      let centerOfMass = { x: 0, y: 0, z: 0 };

      for (let j = 0; j < positions.length; j++) {
        if (i === j) continue;

        const otherPos = positions[j];
        const dx = otherPos.x - pos.x;
        const dy = otherPos.y - pos.y;
        const dz = otherPos.z - pos.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        // Consider particles within a certain radius as neighbors
        const neighborRadius = volume / 4;
        if (distSq < neighborRadius * neighborRadius) {
          // Accumulate center of mass for cohesion
          centerOfMass.x += otherPos.x;
          centerOfMass.y += otherPos.y;
          centerOfMass.z += otherPos.z;

          // Calculate separation force (stronger when closer)
          const dist = Math.sqrt(distSq);
          if (dist < separation) {
            const repulsionStrength = 1 - dist / separation;
            separationForce.x -= dx / dist * repulsionStrength;
            separationForce.y -= dy / dist * repulsionStrength;
            separationForce.z -= dz / dist * repulsionStrength;
          }

          neighborCount++;
        }
      }

      // Calculate cohesion force (move toward center of neighbors)
      if (neighborCount > 0) {
        centerOfMass.x /= neighborCount;
        centerOfMass.y /= neighborCount;
        centerOfMass.z /= neighborCount;

        cohesionForce.x = (centerOfMass.x - pos.x) * cohesion;
        cohesionForce.y = (centerOfMass.y - pos.y) * cohesion;
        cohesionForce.z = (centerOfMass.z - pos.z) * cohesion;
      }

      // Add some random movement (jitter)
      const jitterForce = {
        x: (random() * 2 - 1) * jitter,
        y: (random() * 2 - 1) * jitter,
        z: (random() * 2 - 1) * jitter
      };

      // Combine forces
      return {
        x: cohesionForce.x + separationForce.x * 2 + alignmentForce.x + jitterForce.x,
        y: cohesionForce.y + separationForce.y * 2 + alignmentForce.y + jitterForce.y,
        z: cohesionForce.z + separationForce.z * 2 + alignmentForce.z + jitterForce.z
      };
    });

    // Apply forces to update positions
    for (let i = 0; i < positions.length; i++) {
      positions[i].x += forces[i].x;
      positions[i].y += forces[i].y;
      positions[i].z += forces[i].z;

      // Keep particles within bounds
      const maxDist = volume / 2;
      const distFromCenter = Math.sqrt(
        positions[i].x * positions[i].x +
        positions[i].y * positions[i].y +
        positions[i].z * positions[i].z
      );

      if (distFromCenter > maxDist) {
        const scale = maxDist / distFromCenter;
        positions[i].x *= scale;
        positions[i].y *= scale;
        positions[i].z *= scale;
      }
    }
  }

  // Apply offset to all positions
  for (let i = 0; i < positions.length; i++) {
    positions[i].x += offset.x;
    positions[i].y += offset.y;
    positions[i].z += offset.z;
  }

  return positions;
}

/**
 * Generate positions for a directed swarm formation
 * @param pattern The swarm formation pattern
 * @param seed The random seed
 * @param direction The direction vector for the swarm
 * @returns An array of Vector3 positions
 */
export function generateDirectedSwarmFormation(
  pattern: SwarmFormationPattern,
  seed: number,
  direction: Vector3 = { x: 0, y: 1, z: 0 }
): Vector3[] {
  // Create a modified pattern with directional bias
  const directedPattern: SwarmFormationPattern = {
    ...pattern,
    parameters: {
      ...pattern.parameters,
      alignment: pattern.parameters.alignment * 1.5 // Stronger alignment for direction
    }
  };

  // Generate base swarm
  const positions = generateSwarmFormation(directedPattern, seed);

  // Normalize direction
  const normalizedDirection = normalizeVector(direction);

  // Apply directional bias
  for (let i = 0; i < positions.length; i++) {
    // Add a component in the specified direction
    positions[i].x += normalizedDirection.x * pattern.parameters.volume * 0.2;
    positions[i].y += normalizedDirection.y * pattern.parameters.volume * 0.2;
    positions[i].z += normalizedDirection.z * pattern.parameters.volume * 0.2;
  }

  return positions;
}
