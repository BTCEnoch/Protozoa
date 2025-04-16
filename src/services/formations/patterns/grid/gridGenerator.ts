/**
 * Grid Formation Generator
 * 
 * Generates particle positions for grid formations.
 */

import { GridFormationPattern } from './gridFormation';
import { Vector3 } from '../../../../types/common';
import { createSeededRandom } from '../../../utils/random';

/**
 * Generate positions for a grid formation
 * @param pattern The grid formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateGridFormation(
  pattern: GridFormationPattern,
  seed: number
): Vector3[] {
  const {
    spacing,
    dimensions,
    offset,
    rotation,
    jitter
  } = pattern.parameters;
  
  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);
  
  // Generate positions for each grid point
  for (let x = 0; x < dimensions.x; x++) {
    for (let y = 0; y < dimensions.y; y++) {
      for (let z = 0; z < dimensions.z; z++) {
        // Calculate base position in the grid
        const baseX = (x - dimensions.x / 2) * spacing;
        const baseY = (y - dimensions.y / 2) * spacing;
        const baseZ = (z - dimensions.z / 2) * spacing;
        
        // Add jitter
        const jitterX = (random() * 2 - 1) * jitter * spacing;
        const jitterY = (random() * 2 - 1) * jitter * spacing;
        const jitterZ = (random() * 2 - 1) * jitter * spacing;
        
        // Apply rotation (simplified rotation for now)
        // In a full implementation, we would use a rotation matrix
        const rotatedX = baseX * Math.cos(rotation.z) - baseY * Math.sin(rotation.z);
        const rotatedY = baseX * Math.sin(rotation.z) + baseY * Math.cos(rotation.z);
        const rotatedZ = baseZ;
        
        // Apply offset
        positions.push({
          x: rotatedX + jitterX + offset.x,
          y: rotatedY + jitterY + offset.y,
          z: rotatedZ + jitterZ + offset.z
        });
      }
    }
  }
  
  return positions;
}

/**
 * Generate positions for an adaptive grid formation
 * @param pattern The grid formation pattern
 * @param seed The random seed
 * @param particleCount The number of particles to generate
 * @returns An array of Vector3 positions
 */
export function generateAdaptiveGridFormation(
  pattern: GridFormationPattern,
  seed: number,
  particleCount: number
): Vector3[] {
  const { spacing, offset, jitter } = pattern.parameters;
  const random = createSeededRandom(seed);
  
  // Calculate dimensions based on particle count
  // We want to create a roughly cubic grid
  const dimension = Math.ceil(Math.pow(particleCount, 1/3));
  
  // Adjust dimensions to fit the particle count more precisely
  let xDim = dimension;
  let yDim = dimension;
  let zDim = Math.ceil(particleCount / (xDim * yDim));
  
  // If we have a 2D grid (zDim = 1), adjust x and y
  if (zDim === 1) {
    yDim = Math.ceil(Math.sqrt(particleCount));
    xDim = Math.ceil(particleCount / yDim);
  }
  
  const dimensions = { x: xDim, y: yDim, z: zDim };
  
  // Generate positions for each grid point
  const positions: Vector3[] = [];
  let count = 0;
  
  for (let z = 0; z < dimensions.z && count < particleCount; z++) {
    for (let y = 0; y < dimensions.y && count < particleCount; y++) {
      for (let x = 0; x < dimensions.x && count < particleCount; x++) {
        // Calculate base position in the grid
        const baseX = (x - dimensions.x / 2) * spacing;
        const baseY = (y - dimensions.y / 2) * spacing;
        const baseZ = (z - dimensions.z / 2) * spacing;
        
        // Add jitter
        const jitterX = (random() * 2 - 1) * jitter * spacing;
        const jitterY = (random() * 2 - 1) * jitter * spacing;
        const jitterZ = (random() * 2 - 1) * jitter * spacing;
        
        // Apply offset
        positions.push({
          x: baseX + jitterX + offset.x,
          y: baseY + jitterY + offset.y,
          z: baseZ + jitterZ + offset.z
        });
        
        count++;
      }
    }
  }
  
  return positions;
}
