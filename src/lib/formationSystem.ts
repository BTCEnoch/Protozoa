/**
 * Formation System for Bitcoin Protozoa
 *
 * This library provides core functionality for creating and managing formations.
 * It handles formation creation, transitions, and application to particle groups.
 */

import { Role } from '../types/core';
import { Vector3 } from '../types/common';
import { Formation, FormationPattern } from '../types/formations/formation';
import { RNGSystem } from '../types/utils/rng';
import { ParticleGroup } from '../types/particles/particle';

/**
 * Apply a formation to a particle group
 * @param group Particle group to apply formation to
 * @param formation Formation to apply
 * @param transitionTime Time to transition to the formation (in seconds)
 * @returns Updated particle group with formation applied
 */
export function applyFormation(
  group: ParticleGroup,
  formation: Formation,
  transitionTime: number = 1.0
): ParticleGroup {
  // Generate positions for the formation
  const positions = generateFormationPositions(formation, group.count);
  
  // Apply positions to particles
  for (let i = 0; i < Math.min(group.particles.length, positions.length); i++) {
    group.particles[i].targetPosition = positions[i];
    
    // Set transition parameters
    group.particles[i].behaviorParams = {
      ...group.particles[i].behaviorParams,
      transitionTime,
      transitionStartTime: Date.now() * 0.001, // Current time in seconds
      transitionStartPosition: { ...group.particles[i].position },
      transitionEndPosition: { ...positions[i] }
    };
  }
  
  return group;
}

/**
 * Blend between two formations
 * @param group Particle group to apply blended formation to
 * @param formation1 First formation
 * @param formation2 Second formation
 * @param blendFactor Blend factor (0.0 = formation1, 1.0 = formation2)
 * @param transitionTime Time to transition to the blended formation (in seconds)
 * @returns Updated particle group with blended formation applied
 */
export function blendFormations(
  group: ParticleGroup,
  formation1: Formation,
  formation2: Formation,
  blendFactor: number,
  transitionTime: number = 1.0
): ParticleGroup {
  // Clamp blend factor to [0, 1]
  const clampedBlendFactor = Math.max(0, Math.min(1, blendFactor));
  
  // Generate positions for both formations
  const positions1 = generateFormationPositions(formation1, group.count);
  const positions2 = generateFormationPositions(formation2, group.count);
  
  // Blend positions
  const blendedPositions: Vector3[] = [];
  for (let i = 0; i < Math.min(positions1.length, positions2.length); i++) {
    blendedPositions.push({
      x: positions1[i].x * (1 - clampedBlendFactor) + positions2[i].x * clampedBlendFactor,
      y: positions1[i].y * (1 - clampedBlendFactor) + positions2[i].y * clampedBlendFactor,
      z: positions1[i].z * (1 - clampedBlendFactor) + positions2[i].z * clampedBlendFactor
    });
  }
  
  // Apply blended positions to particles
  for (let i = 0; i < Math.min(group.particles.length, blendedPositions.length); i++) {
    group.particles[i].targetPosition = blendedPositions[i];
    
    // Set transition parameters
    group.particles[i].behaviorParams = {
      ...group.particles[i].behaviorParams,
      transitionTime,
      transitionStartTime: Date.now() * 0.001, // Current time in seconds
      transitionStartPosition: { ...group.particles[i].position },
      transitionEndPosition: { ...blendedPositions[i] }
    };
  }
  
  return group;
}

/**
 * Generate positions for a formation
 * @param formation Formation to generate positions for
 * @param count Number of positions to generate
 * @returns Array of positions
 */
export function generateFormationPositions(formation: Formation, count: number): Vector3[] {
  switch (formation.pattern) {
    case 'sphere':
      return generateSphereFormation(count, formation.scale || 1.0, formation.center);
    case 'circle':
      return generateCircleFormation(count, formation.scale || 1.0, formation.center);
    case 'grid':
      return generateGridFormation(count, formation.scale || 1.0, formation.center);
    case 'line':
      return generateLineFormation(count, formation.scale || 1.0, formation.center);
    case 'spiral':
      return generateSpiralFormation(count, formation.scale || 1.0, formation.center);
    case 'vortex':
      return generateVortexFormation(count, formation.scale || 1.0, formation.center);
    case 'cube':
      return generateCubeFormation(count, formation.scale || 1.0, formation.center);
    case 'random':
      return generateRandomFormation(count, formation.scale || 1.0, formation.center);
    case 'custom':
      return formation.positions || [];
    default:
      return generateSphereFormation(count, formation.scale || 1.0, formation.center);
  }
}

/**
 * Generate a sphere formation
 * @param count Number of positions to generate
 * @param scale Scale of the formation
 * @param center Center of the formation
 * @returns Array of positions
 */
function generateSphereFormation(
  count: number,
  scale: number = 1.0,
  center: Vector3 = { x: 0, y: 0, z: 0 }
): Vector3[] {
  const positions: Vector3[] = [];
  
  // Golden spiral algorithm for uniform sphere point distribution
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
  
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radius = Math.sqrt(1 - y * y); // Radius at y
    
    const theta = phi * i; // Golden angle increment
    
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    
    positions.push({
      x: x * scale + center.x,
      y: y * scale + center.y,
      z: z * scale + center.z
    });
  }
  
  return positions;
}

/**
 * Generate a circle formation
 * @param count Number of positions to generate
 * @param scale Scale of the formation
 * @param center Center of the formation
 * @returns Array of positions
 */
function generateCircleFormation(
  count: number,
  scale: number = 1.0,
  center: Vector3 = { x: 0, y: 0, z: 0 }
): Vector3[] {
  const positions: Vector3[] = [];
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    
    positions.push({
      x: Math.cos(angle) * scale + center.x,
      y: center.y,
      z: Math.sin(angle) * scale + center.z
    });
  }
  
  return positions;
}

/**
 * Generate a grid formation
 * @param count Number of positions to generate
 * @param scale Scale of the formation
 * @param center Center of the formation
 * @returns Array of positions
 */
function generateGridFormation(
  count: number,
  scale: number = 1.0,
  center: Vector3 = { x: 0, y: 0, z: 0 }
): Vector3[] {
  const positions: Vector3[] = [];
  
  // Calculate grid dimensions
  const gridSize = Math.ceil(Math.sqrt(count));
  const spacing = scale / gridSize;
  
  for (let i = 0; i < count; i++) {
    const x = (i % gridSize) * spacing - (scale / 2) + (spacing / 2);
    const z = Math.floor(i / gridSize) * spacing - (scale / 2) + (spacing / 2);
    
    positions.push({
      x: x + center.x,
      y: center.y,
      z: z + center.z
    });
  }
  
  return positions;
}

/**
 * Generate a line formation
 * @param count Number of positions to generate
 * @param scale Scale of the formation
 * @param center Center of the formation
 * @returns Array of positions
 */
function generateLineFormation(
  count: number,
  scale: number = 1.0,
  center: Vector3 = { x: 0, y: 0, z: 0 }
): Vector3[] {
  const positions: Vector3[] = [];
  
  for (let i = 0; i < count; i++) {
    const t = count > 1 ? i / (count - 1) : 0.5;
    
    positions.push({
      x: (t - 0.5) * scale * 2 + center.x,
      y: center.y,
      z: center.z
    });
  }
  
  return positions;
}

/**
 * Generate a spiral formation
 * @param count Number of positions to generate
 * @param scale Scale of the formation
 * @param center Center of the formation
 * @returns Array of positions
 */
function generateSpiralFormation(
  count: number,
  scale: number = 1.0,
  center: Vector3 = { x: 0, y: 0, z: 0 }
): Vector3[] {
  const positions: Vector3[] = [];
  
  const turns = 3; // Number of spiral turns
  
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const angle = t * Math.PI * 2 * turns;
    const radius = t * scale;
    
    positions.push({
      x: Math.cos(angle) * radius + center.x,
      y: center.y,
      z: Math.sin(angle) * radius + center.z
    });
  }
  
  return positions;
}

/**
 * Generate a vortex formation
 * @param count Number of positions to generate
 * @param scale Scale of the formation
 * @param center Center of the formation
 * @returns Array of positions
 */
function generateVortexFormation(
  count: number,
  scale: number = 1.0,
  center: Vector3 = { x: 0, y: 0, z: 0 }
): Vector3[] {
  const positions: Vector3[] = [];
  
  const turns = 3; // Number of spiral turns
  const height = scale * 2;
  
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const angle = t * Math.PI * 2 * turns;
    const radius = t * scale;
    
    positions.push({
      x: Math.cos(angle) * radius + center.x,
      y: (t - 0.5) * height + center.y,
      z: Math.sin(angle) * radius + center.z
    });
  }
  
  return positions;
}

/**
 * Generate a cube formation
 * @param count Number of positions to generate
 * @param scale Scale of the formation
 * @param center Center of the formation
 * @returns Array of positions
 */
function generateCubeFormation(
  count: number,
  scale: number = 1.0,
  center: Vector3 = { x: 0, y: 0, z: 0 }
): Vector3[] {
  const positions: Vector3[] = [];
  
  // Calculate cube dimensions
  const cubeSize = Math.ceil(Math.cbrt(count));
  const spacing = scale / cubeSize;
  
  for (let i = 0; i < count; i++) {
    const x = (i % cubeSize) * spacing - (scale / 2) + (spacing / 2);
    const y = (Math.floor(i / cubeSize) % cubeSize) * spacing - (scale / 2) + (spacing / 2);
    const z = Math.floor(i / (cubeSize * cubeSize)) * spacing - (scale / 2) + (spacing / 2);
    
    positions.push({
      x: x + center.x,
      y: y + center.y,
      z: z + center.z
    });
  }
  
  return positions;
}

/**
 * Generate a random formation
 * @param count Number of positions to generate
 * @param scale Scale of the formation
 * @param center Center of the formation
 * @returns Array of positions
 */
function generateRandomFormation(
  count: number,
  scale: number = 1.0,
  center: Vector3 = { x: 0, y: 0, z: 0 }
): Vector3[] {
  const positions: Vector3[] = [];
  
  for (let i = 0; i < count; i++) {
    positions.push({
      x: (Math.random() - 0.5) * scale * 2 + center.x,
      y: (Math.random() - 0.5) * scale * 2 + center.y,
      z: (Math.random() - 0.5) * scale * 2 + center.z
    });
  }
  
  return positions;
}

/**
 * Create a formation
 * @param pattern Formation pattern
 * @param scale Scale of the formation
 * @param center Center of the formation
 * @param positions Custom positions (for custom pattern)
 * @returns A new formation
 */
export function createFormation(
  pattern: FormationPattern,
  scale: number = 1.0,
  center: Vector3 = { x: 0, y: 0, z: 0 },
  positions?: Vector3[]
): Formation {
  return {
    id: `formation-${pattern}-${Date.now()}`,
    pattern,
    scale,
    center,
    positions
  };
}

/**
 * Create a role-specific formation
 * @param role Particle role
 * @param rngSystem RNG system for deterministic creation
 * @returns A new formation for the specified role
 */
export function createRoleFormation(role: Role, rngSystem: RNGSystem): Formation {
  // Create RNG stream for formation creation
  const formationRng = rngSystem.getStream(`formation-${role}`);
  
  // Define role-specific patterns
  const patterns: Record<Role, FormationPattern[]> = {
    [Role.CORE]: ['sphere', 'circle', 'spiral'],
    [Role.CONTROL]: ['grid', 'cube', 'vortex'],
    [Role.MOVEMENT]: ['line', 'spiral', 'vortex'],
    [Role.DEFENSE]: ['circle', 'sphere', 'cube'],
    [Role.ATTACK]: ['vortex', 'spiral', 'line']
  };
  
  // Select a pattern for this role
  const rolePatterns = patterns[role];
  const patternIndex = Math.floor(formationRng.next() * rolePatterns.length);
  const pattern = rolePatterns[patternIndex];
  
  // Generate scale based on role
  const baseScale = 5.0;
  const roleScales: Record<Role, number> = {
    [Role.CORE]: 0.8,
    [Role.CONTROL]: 1.2,
    [Role.MOVEMENT]: 1.5,
    [Role.DEFENSE]: 1.0,
    [Role.ATTACK]: 1.3
  };
  const scale = baseScale * roleScales[role];
  
  // Create the formation
  return createFormation(pattern, scale);
}

/**
 * Update particle positions based on formation transitions
 * @param group Particle group to update
 * @param currentTime Current time in seconds
 * @returns Updated particle group
 */
export function updateFormationTransitions(
  group: ParticleGroup,
  currentTime: number
): ParticleGroup {
  for (const particle of group.particles) {
    // Skip particles without transition parameters
    if (!particle.behaviorParams || 
        !particle.behaviorParams.transitionTime || 
        !particle.behaviorParams.transitionStartTime || 
        !particle.behaviorParams.transitionStartPosition || 
        !particle.behaviorParams.transitionEndPosition) {
      continue;
    }
    
    // Calculate transition progress
    const startTime = particle.behaviorParams.transitionStartTime;
    const duration = particle.behaviorParams.transitionTime;
    const endTime = startTime + duration;
    
    // Skip if transition is complete
    if (currentTime >= endTime) {
      // Set final position
      particle.position = { ...particle.behaviorParams.transitionEndPosition };
      continue;
    }
    
    // Calculate interpolation factor
    const t = (currentTime - startTime) / duration;
    const smoothT = t * t * (3 - 2 * t); // Smooth step interpolation
    
    // Interpolate position
    const startPos = particle.behaviorParams.transitionStartPosition;
    const endPos = particle.behaviorParams.transitionEndPosition;
    
    particle.position = {
      x: startPos.x + (endPos.x - startPos.x) * smoothT,
      y: startPos.y + (endPos.y - startPos.y) * smoothT,
      z: startPos.z + (endPos.z - startPos.z) * smoothT
    };
  }
  
  return group;
}

