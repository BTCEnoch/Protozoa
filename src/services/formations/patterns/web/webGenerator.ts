/**
 * Web Formation Generator
 * 
 * Generates particle positions for web formations.
 */

import { WebFormationPattern } from './webFormation';
import { Vector3 } from '../../../../types/common';
import { createSeededRandom } from '../../../utils/random';

/**
 * Generate positions for a web formation
 * @param pattern The web formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateWebFormation(
  pattern: WebFormationPattern,
  seed: number
): Vector3[] {
  const {
    radius,
    density,
    layers,
    spokes,
    irregularity,
    offset,
    rotation,
    jitter
  } = pattern.parameters;
  
  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);
  
  // Generate the web structure
  
  // 1. Create concentric circles (layers)
  for (let layer = 1; layer <= layers; layer++) {
    const layerRadius = (layer / layers) * radius;
    
    // 2. Create points along each layer
    for (let spoke = 0; spoke < spokes; spoke++) {
      // Calculate base angle with some irregularity
      const baseAngle = (spoke / spokes) * Math.PI * 2;
      const angleVariation = random() * irregularity * (Math.PI / spokes);
      const angle = baseAngle + angleVariation + rotation;
      
      // Calculate position on the web
      const x = Math.cos(angle) * layerRadius;
      const y = Math.sin(angle) * layerRadius;
      
      // Add some height variation for 3D effect
      const z = (random() * 2 - 1) * radius * 0.2 * irregularity;
      
      // Add jitter
      const jitterX = (random() * 2 - 1) * jitter * layerRadius;
      const jitterY = (random() * 2 - 1) * jitter * layerRadius;
      const jitterZ = (random() * 2 - 1) * jitter * layerRadius;
      
      // Add to positions with offset
      positions.push({
        x: x + jitterX + offset.x,
        y: y + jitterY + offset.y,
        z: z + jitterZ + offset.z
      });
    }
  }
  
  // 3. Add some random connections based on density
  const connectionCount = Math.floor(density * spokes * layers * 0.5);
  
  for (let i = 0; i < connectionCount; i++) {
    // Pick two random points and add a point between them
    const idx1 = Math.floor(random() * positions.length);
    const idx2 = Math.floor(random() * positions.length);
    
    if (idx1 !== idx2) {
      const p1 = positions[idx1];
      const p2 = positions[idx2];
      
      // Create a point somewhere along the line between p1 and p2
      const t = random(); // 0 to 1
      
      const x = p1.x + (p2.x - p1.x) * t;
      const y = p1.y + (p2.y - p1.y) * t;
      const z = p1.z + (p2.z - p1.z) * t;
      
      // Add jitter
      const jitterX = (random() * 2 - 1) * jitter * radius * 0.2;
      const jitterY = (random() * 2 - 1) * jitter * radius * 0.2;
      const jitterZ = (random() * 2 - 1) * jitter * radius * 0.2;
      
      // Add to positions
      positions.push({
        x: x + jitterX,
        y: y + jitterY,
        z: z + jitterZ
      });
    }
  }
  
  return positions;
}

/**
 * Generate positions for a complex web formation
 * @param pattern The web formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateComplexWebFormation(
  pattern: WebFormationPattern,
  seed: number
): Vector3[] {
  // Create a modified pattern with more complexity
  const complexPattern: WebFormationPattern = {
    ...pattern,
    parameters: {
      ...pattern.parameters,
      layers: pattern.parameters.layers + 1,
      spokes: pattern.parameters.spokes + 4,
      density: Math.min(1.0, pattern.parameters.density * 1.3)
    }
  };
  
  return generateWebFormation(complexPattern, seed);
}
