/**
 * Cluster Formation Generator
 *
 * Generates particle positions for cluster formations.
 */

import { ClusterFormationPattern } from './clusterFormation';
import { Vector3 } from '../../../../types/common';
import { createSeededRandom } from '../../../utils/random';

/**
 * Generate positions for a cluster formation
 * @param pattern The cluster formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateClusterFormation(
  pattern: ClusterFormationPattern,
  seed: number
): Vector3[] {
  const {
    density,
    radius,
    clusters,
    clusterSize,
    offset,
    jitter
  } = pattern.parameters;

  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);

  // Generate cluster centers
  const clusterCenters: Vector3[] = [];
  for (let i = 0; i < clusters; i++) {
    // Generate random position within radius
    const angle = random() * 2 * Math.PI;
    const distance = random() * radius * 0.8; // Keep clusters within 80% of radius

    clusterCenters.push({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      z: (random() * 2 - 1) * radius * 0.5 // Less spread in z-direction
    });
  }

  // Calculate particles per cluster
  const particlesPerCluster = Math.floor(density * 20) * clusters;
  const particlesPerClusterArray: number[] = [];

  // Distribute particles among clusters
  let remainingParticles = particlesPerCluster;
  for (let i = 0; i < clusters - 1; i++) {
    // Add some randomness to distribution
    const clusterParticles = Math.floor(remainingParticles / (clusters - i) * (0.8 + random() * 0.4));
    particlesPerClusterArray.push(clusterParticles);
    remainingParticles -= clusterParticles;
  }
  particlesPerClusterArray.push(remainingParticles); // Add remaining particles to last cluster

  // Generate particles for each cluster
  for (let i = 0; i < clusters; i++) {
    const center = clusterCenters[i];
    const particleCount = particlesPerClusterArray[i];

    for (let j = 0; j < particleCount; j++) {
      // Generate random position within cluster
      const angle1 = random() * 2 * Math.PI;
      const angle2 = random() * 2 * Math.PI;
      const distance = random() * clusterSize;

      // Use spherical coordinates for better distribution
      const x = center.x + Math.sin(angle1) * Math.cos(angle2) * distance;
      const y = center.y + Math.sin(angle1) * Math.sin(angle2) * distance;
      const z = center.z + Math.cos(angle1) * distance;

      // Add jitter
      const jitterX = (random() * 2 - 1) * jitter * clusterSize;
      const jitterY = (random() * 2 - 1) * jitter * clusterSize;
      const jitterZ = (random() * 2 - 1) * jitter * clusterSize;

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
 * Generate positions for a hierarchical cluster formation
 * @param pattern The cluster formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateHierarchicalClusterFormation(
  pattern: ClusterFormationPattern,
  seed: number
): Vector3[] {
  // Create a modified pattern with more structure
  const hierarchicalPattern: ClusterFormationPattern = {
    ...pattern,
    parameters: {
      ...pattern.parameters,
      jitter: pattern.parameters.jitter * 0.7, // Less jitter for more structure
      density: pattern.parameters.density * 1.2 // More particles
    }
  };

  const random = createSeededRandom(seed);
  const positions = generateClusterFormation(hierarchicalPattern, seed);

  // Add a central cluster
  const centralClusterSize = pattern.parameters.clusterSize * 0.8;
  const centralParticleCount = Math.floor(pattern.parameters.density * 10);

  for (let i = 0; i < centralParticleCount; i++) {
    // Generate random position within central cluster
    const angle1 = random() * 2 * Math.PI;
    const angle2 = random() * 2 * Math.PI;
    const distance = random() * centralClusterSize;

    // Use spherical coordinates for better distribution
    const x = Math.sin(angle1) * Math.cos(angle2) * distance;
    const y = Math.sin(angle1) * Math.sin(angle2) * distance;
    const z = Math.cos(angle1) * distance;

    // Add jitter
    const jitter = pattern.parameters.jitter * 0.5; // Less jitter for central cluster
    const jitterX = (random() * 2 - 1) * jitter * centralClusterSize;
    const jitterY = (random() * 2 - 1) * jitter * centralClusterSize;
    const jitterZ = (random() * 2 - 1) * jitter * centralClusterSize;

    // Apply offset
    positions.push({
      x: x + jitterX + pattern.parameters.offset.x,
      y: y + jitterY + pattern.parameters.offset.y,
      z: z + jitterZ + pattern.parameters.offset.z
    });
  }

  return positions;
}
