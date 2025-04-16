/**
 * Behavior Generators for Bitcoin Protozoa
 * 
 * This file contains implementations of various behavior generators
 * that can be registered with the behavior service.
 */

import { BehaviorTrait } from '../../types/trait';
import { Position3D } from '../formations/formationService';

/**
 * Generate oscillation behavior forces
 * @param behaviorTrait The behavior trait
 * @param positions The current positions of particles
 * @param time The current time
 * @param rng The RNG stream
 * @returns An array of force vectors
 */
export function generateOscillationBehavior(
  behaviorTrait: BehaviorTrait,
  positions: Position3D[],
  time: number,
  rng: any
): Position3D[] {
  const forces: Position3D[] = [];
  const strength = behaviorTrait.physicsLogic.strength;
  const frequency = behaviorTrait.physicsLogic.frequency;
  
  // Generate forces for each particle
  for (let i = 0; i < positions.length; i++) {
    // Each particle oscillates with a slightly different phase
    const phase = (i / positions.length) * Math.PI * 2;
    const oscillation = Math.sin(time * frequency + phase) * strength;
    
    // Apply force in the x direction
    forces.push({ x: oscillation, y: 0, z: 0 });
  }
  
  return forces;
}

/**
 * Generate rotation behavior forces
 * @param behaviorTrait The behavior trait
 * @param positions The current positions of particles
 * @param time The current time
 * @param rng The RNG stream
 * @returns An array of force vectors
 */
export function generateRotationBehavior(
  behaviorTrait: BehaviorTrait,
  positions: Position3D[],
  time: number,
  rng: any
): Position3D[] {
  const forces: Position3D[] = [];
  const strength = behaviorTrait.physicsLogic.strength;
  
  // Calculate center of mass
  const center = calculateCenterOfMass(positions);
  
  // Generate forces for each particle
  for (const position of positions) {
    const dx = position.x - center.x;
    const dy = position.y - center.y;
    
    // Apply rotational force (perpendicular to radius)
    const forceX = -dy * strength;
    const forceY = dx * strength;
    
    forces.push({ x: forceX, y: forceY, z: 0 });
  }
  
  return forces;
}

/**
 * Generate swarming behavior forces
 * @param behaviorTrait The behavior trait
 * @param positions The current positions of particles
 * @param time The current time
 * @param rng The RNG stream
 * @returns An array of force vectors
 */
export function generateSwarmingBehavior(
  behaviorTrait: BehaviorTrait,
  positions: Position3D[],
  time: number,
  rng: any
): Position3D[] {
  const forces: Position3D[] = [];
  const strength = behaviorTrait.physicsLogic.strength;
  const range = behaviorTrait.physicsLogic.range;
  
  // Calculate center of mass
  const center = calculateCenterOfMass(positions);
  
  // Generate forces for each particle
  for (const position of positions) {
    // Random force component
    const randomX = (rng.next() * 2 - 1) * strength;
    const randomY = (rng.next() * 2 - 1) * strength;
    const randomZ = (rng.next() * 2 - 1) * strength;
    
    // Attraction to center
    const toCenterX = center.x - position.x;
    const toCenterY = center.y - position.y;
    const toCenterZ = center.z - position.z;
    
    const distSq = toCenterX * toCenterX + toCenterY * toCenterY + toCenterZ * toCenterZ;
    const attraction = Math.min(1, distSq / (range * range)) * strength * 0.5;
    
    // Combine forces
    const forceX = randomX + toCenterX * attraction;
    const forceY = randomY + toCenterY * attraction;
    const forceZ = randomZ + toCenterZ * attraction;
    
    forces.push({ x: forceX, y: forceY, z: forceZ });
  }
  
  return forces;
}

/**
 * Generate hunting behavior forces
 * @param behaviorTrait The behavior trait
 * @param positions The current positions of particles
 * @param time The current time
 * @param rng The RNG stream
 * @returns An array of force vectors
 */
export function generateHuntingBehavior(
  behaviorTrait: BehaviorTrait,
  positions: Position3D[],
  time: number,
  rng: any
): Position3D[] {
  const forces: Position3D[] = [];
  const strength = behaviorTrait.physicsLogic.strength;
  
  // Select a random target particle
  const targetIndex = Math.floor(rng.next() * positions.length);
  const target = positions[targetIndex];
  
  // Generate forces for each particle
  for (let i = 0; i < positions.length; i++) {
    if (i === targetIndex) {
      // Target particle moves randomly
      const randomX = (rng.next() * 2 - 1) * strength;
      const randomY = (rng.next() * 2 - 1) * strength;
      const randomZ = (rng.next() * 2 - 1) * strength;
      
      forces.push({ x: randomX, y: randomY, z: randomZ });
    } else {
      // Other particles hunt the target
      const position = positions[i];
      const toTargetX = target.x - position.x;
      const toTargetY = target.y - position.y;
      const toTargetZ = target.z - position.z;
      
      const distSq = toTargetX * toTargetX + toTargetY * toTargetY + toTargetZ * toTargetZ;
      const dist = Math.sqrt(distSq);
      
      if (dist > 0) {
        const forceX = toTargetX / dist * strength;
        const forceY = toTargetY / dist * strength;
        const forceZ = toTargetZ / dist * strength;
        
        forces.push({ x: forceX, y: forceY, z: forceZ });
      } else {
        forces.push({ x: 0, y: 0, z: 0 });
      }
    }
  }
  
  return forces;
}

/**
 * Calculate center of mass for a set of positions
 * @param positions The positions
 * @returns The center of mass
 */
export function calculateCenterOfMass(positions: Position3D[]): Position3D {
  if (positions.length === 0) {
    return { x: 0, y: 0, z: 0 };
  }
  
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;
  
  for (const position of positions) {
    sumX += position.x;
    sumY += position.y;
    sumZ += position.z;
  }
  
  return {
    x: sumX / positions.length,
    y: sumY / positions.length,
    z: sumZ / positions.length
  };
}
