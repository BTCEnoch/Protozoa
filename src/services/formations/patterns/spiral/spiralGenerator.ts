/**
 * Spiral Formation Generator
 * 
 * Generates particle positions for spiral formations.
 */

import { SpiralFormationPattern } from './spiralFormation';
import { Vector3 } from '../../../../types/common';
import { createSeededRandom } from '../../../utils/random';

/**
 * Generate positions for a spiral formation
 * @param pattern The spiral formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateSpiralFormation(
  pattern: SpiralFormationPattern,
  seed: number
): Vector3[] {
  const {
    radius,
    growth,
    turns,
    particles,
    offset,
    rotation,
    jitter
  } = pattern.parameters;
  
  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);
  
  // Generate positions along the spiral
  for (let i = 0; i < particles; i++) {
    // Calculate the angle based on the particle index
    const t = (i / particles) * turns * 2 * Math.PI + rotation;
    
    // Calculate the radius at this point in the spiral
    const r = radius + growth * t;
    
    // Calculate base position on the spiral
    const x = Math.cos(t) * r;
    const y = Math.sin(t) * r;
    const z = 0;
    
    // Add jitter
    const jitterX = (random() * 2 - 1) * jitter * r;
    const jitterY = (random() * 2 - 1) * jitter * r;
    const jitterZ = (random() * 2 - 1) * jitter * r;
    
    // Apply offset
    positions.push({
      x: x + jitterX + offset.x,
      y: y + jitterY + offset.y,
      z: z + jitterZ + offset.z
    });
  }
  
  return positions;
}

/**
 * Generate positions for a double spiral formation
 * @param pattern The spiral formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateDoubleSpiralFormation(
  pattern: SpiralFormationPattern,
  seed: number
): Vector3[] {
  const {
    radius,
    growth,
    turns,
    particles,
    offset,
    rotation,
    jitter
  } = pattern.parameters;
  
  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);
  
  // Calculate particles per spiral
  const particlesPerSpiral = Math.floor(particles / 2);
  
  // Generate positions for the first spiral
  for (let i = 0; i < particlesPerSpiral; i++) {
    // Calculate the angle based on the particle index
    const t = (i / particlesPerSpiral) * turns * 2 * Math.PI + rotation;
    
    // Calculate the radius at this point in the spiral
    const r = radius + growth * t;
    
    // Calculate base position on the spiral
    const x = Math.cos(t) * r;
    const y = Math.sin(t) * r;
    const z = 0;
    
    // Add jitter
    const jitterX = (random() * 2 - 1) * jitter * r;
    const jitterY = (random() * 2 - 1) * jitter * r;
    const jitterZ = (random() * 2 - 1) * jitter * r;
    
    // Apply offset
    positions.push({
      x: x + jitterX + offset.x,
      y: y + jitterY + offset.y,
      z: z + jitterZ + offset.z
    });
  }
  
  // Generate positions for the second spiral (offset by 180 degrees)
  for (let i = 0; i < particles - particlesPerSpiral; i++) {
    // Calculate the angle based on the particle index
    const t = (i / particlesPerSpiral) * turns * 2 * Math.PI + rotation + Math.PI;
    
    // Calculate the radius at this point in the spiral
    const r = radius + growth * t;
    
    // Calculate base position on the spiral
    const x = Math.cos(t) * r;
    const y = Math.sin(t) * r;
    const z = 0;
    
    // Add jitter
    const jitterX = (random() * 2 - 1) * jitter * r;
    const jitterY = (random() * 2 - 1) * jitter * r;
    const jitterZ = (random() * 2 - 1) * jitter * r;
    
    // Apply offset
    positions.push({
      x: x + jitterX + offset.x,
      y: y + jitterY + offset.y,
      z: z + jitterZ + offset.z
    });
  }
  
  return positions;
}

/**
 * Generate positions for a 3D spiral formation
 * @param pattern The spiral formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generate3DSpiralFormation(
  pattern: SpiralFormationPattern,
  seed: number
): Vector3[] {
  const {
    radius,
    growth,
    turns,
    particles,
    offset,
    rotation,
    jitter
  } = pattern.parameters;
  
  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);
  
  // Generate positions along the 3D spiral
  for (let i = 0; i < particles; i++) {
    // Calculate the angle based on the particle index
    const t = (i / particles) * turns * 2 * Math.PI + rotation;
    
    // Calculate the radius at this point in the spiral
    const r = radius + growth * t;
    
    // Calculate the height based on the particle index
    const height = (i / particles) * turns * 2;
    
    // Calculate base position on the 3D spiral
    const x = Math.cos(t) * r;
    const y = Math.sin(t) * r;
    const z = height;
    
    // Add jitter
    const jitterX = (random() * 2 - 1) * jitter * r;
    const jitterY = (random() * 2 - 1) * jitter * r;
    const jitterZ = (random() * 2 - 1) * jitter * height;
    
    // Apply offset
    positions.push({
      x: x + jitterX + offset.x,
      y: y + jitterY + offset.y,
      z: z + jitterZ + offset.z
    });
  }
  
  return positions;
}
