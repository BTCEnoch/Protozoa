/**
 * Particle System for Bitcoin Protozoa
 *
 * This library provides core functionality for creating and managing particles.
 * It handles particle creation, updates, and physics calculations.
 */

import { v4 as uuidv4 } from 'uuid';
import { Role, Tier } from '../types/core';
import { Particle, ParticleGroup, ParticleCreationOptions, ParticleGroupCreationOptions } from '../types/particle';
import { TraitCollection } from '../types/trait';
import { Vector3, AttributeValues } from '../types/common';
import { RNGSystem } from '../types/rng';
import { SubclassData } from '../types/ability_reference';

// Default values for particles
const DEFAULT_MASS = 1.0;
const DEFAULT_SIZE = 1.0;
const DEFAULT_COLOR = '#FFFFFF';
const DEFAULT_OPACITY = 1.0;
const DEFAULT_EMISSIVE = true;
const DEFAULT_GEOMETRY = 'sphere';
const DEFAULT_MATERIAL = 'standard';

// Role-specific colors
const ROLE_COLORS = {
  [Role.CORE]: '#00FFFF',     // Cyan
  [Role.CONTROL]: '#FF00FF',  // Magenta
  [Role.MOVEMENT]: '#FFFF00', // Yellow
  [Role.DEFENSE]: '#00FF00',  // Green
  [Role.ATTACK]: '#FF0000'    // Red
};

/**
 * Create a new particle
 * @param options Particle creation options
 * @returns A new particle instance
 */
export function createParticle(options: ParticleCreationOptions): Particle {
  const id = uuidv4();
  const role = options.role;
  const position = options.position || { x: 0, y: 0, z: 0 };
  const velocity = options.velocity || { x: 0, y: 0, z: 0 };
  const acceleration = { x: 0, y: 0, z: 0 };
  const mass = options.mass || DEFAULT_MASS;
  const size = options.size || DEFAULT_SIZE;
  const color = options.color || ROLE_COLORS[role] || DEFAULT_COLOR;
  const opacity = options.opacity !== undefined ? options.opacity : DEFAULT_OPACITY;
  const emissive = options.emissive !== undefined ? options.emissive : DEFAULT_EMISSIVE;
  const geometry = options.geometry || DEFAULT_GEOMETRY;
  const material = options.material || DEFAULT_MATERIAL;

  return {
    id,
    role,
    position,
    velocity,
    acceleration,
    mass,
    size,
    color,
    opacity,
    emissive,
    geometry,
    material
  };
}

/**
 * Create a new particle group
 * @param options Particle group creation options
 * @param rngSystem RNG system for deterministic creation
 * @param subclass Subclass data for the group
 * @param traits Trait collection for the group
 * @returns A new particle group instance
 */
export function createParticleGroup(
  options: ParticleGroupCreationOptions,
  rngSystem: RNGSystem,
  subclass: SubclassData,
  traits: TraitCollection
): ParticleGroup {
  const id = `group-${options.role}-${options.index}-${Date.now()}`;
  const role = options.role;
  const count = options.count;
  const particles: Particle[] = [];
  
  // Create RNG stream for this group
  const particleRng = rngSystem.getStream(`particles-${id}`);
  
  // Create particles for this group
  for (let i = 0; i < count; i++) {
    // Create random initial position within a small sphere
    const theta = particleRng.next() * Math.PI * 2;
    const phi = Math.acos(2 * particleRng.next() - 1);
    const radius = particleRng.next() * 5; // 5 unit radius
    
    const position: Vector3 = {
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.sin(phi) * Math.sin(theta),
      z: radius * Math.cos(phi)
    };
    
    // Create random initial velocity
    const velocity: Vector3 = {
      x: (particleRng.next() - 0.5) * 0.1,
      y: (particleRng.next() - 0.5) * 0.1,
      z: (particleRng.next() - 0.5) * 0.1
    };
    
    // Create the particle
    const particle = createParticle({
      role,
      position,
      velocity,
      mass: DEFAULT_MASS,
      size: DEFAULT_SIZE,
      color: ROLE_COLORS[role],
      opacity: DEFAULT_OPACITY,
      emissive: DEFAULT_EMISSIVE,
      geometry: DEFAULT_GEOMETRY,
      material: DEFAULT_MATERIAL
    });
    
    particles.push(particle);
  }
  
  // Calculate base attribute value based on nonce and index
  const baseAttributeValue = (options.nonce % 1000) + (options.index * 100);
  
  // Create attribute multipliers
  const attributeMultipliers = {
    base: 1.0,
    fromTraits: 0.0,
    fromMutations: 0.0
  };
  
  // Calculate attributes based on traits
  const attributes: AttributeValues = {
    strength: baseAttributeValue * (1 + attributeMultipliers.base + attributeMultipliers.fromTraits + attributeMultipliers.fromMutations),
    agility: baseAttributeValue * (1 + attributeMultipliers.base + attributeMultipliers.fromTraits + attributeMultipliers.fromMutations),
    resilience: baseAttributeValue * (1 + attributeMultipliers.base + attributeMultipliers.fromTraits + attributeMultipliers.fromMutations),
    intelligence: baseAttributeValue * (1 + attributeMultipliers.base + attributeMultipliers.fromTraits + attributeMultipliers.fromMutations),
    perception: baseAttributeValue * (1 + attributeMultipliers.base + attributeMultipliers.fromTraits + attributeMultipliers.fromMutations)
  };
  
  // Create the particle group
  return {
    id,
    role,
    count,
    traits,
    attributes,
    particles,
    mutations: [],
    subclass,
    baseAttributeValue,
    attributeMultipliers
  };
}

/**
 * Update particle positions based on velocities
 * @param particles Array of particles to update
 * @param deltaTime Time step for the update
 */
export function updateParticlePositions(particles: Particle[], deltaTime: number): void {
  for (const particle of particles) {
    // Update velocity based on acceleration
    particle.velocity.x += particle.acceleration.x * deltaTime;
    particle.velocity.y += particle.acceleration.y * deltaTime;
    particle.velocity.z += particle.acceleration.z * deltaTime;
    
    // Update position based on velocity
    particle.position.x += particle.velocity.x * deltaTime;
    particle.position.y += particle.velocity.y * deltaTime;
    particle.position.z += particle.velocity.z * deltaTime;
    
    // Reset acceleration
    particle.acceleration.x = 0;
    particle.acceleration.y = 0;
    particle.acceleration.z = 0;
  }
}

/**
 * Apply forces to particles
 * @param particles Array of particles to apply forces to
 * @param forces Array of forces to apply
 */
export function applyForcesToParticles(
  particles: Particle[],
  forces: Vector3[]
): void {
  if (particles.length !== forces.length) {
    throw new Error('Number of particles and forces must match');
  }
  
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    const force = forces[i];
    
    // F = ma, so a = F/m
    particle.acceleration.x += force.x / particle.mass;
    particle.acceleration.y += force.y / particle.mass;
    particle.acceleration.z += force.z / particle.mass;
  }
}

/**
 * Get positions from particles
 * @param particles Array of particles
 * @returns Array of positions
 */
export function getParticlePositions(particles: Particle[]): Vector3[] {
  return particles.map(p => p.position);
}

/**
 * Get velocities from particles
 * @param particles Array of particles
 * @returns Array of velocities
 */
export function getParticleVelocities(particles: Particle[]): Vector3[] {
  return particles.map(p => p.velocity);
}

/**
 * Determine tier based on attribute value
 * @param attributeValue The attribute value
 * @returns The corresponding tier
 */
export function determineTierFromAttributeValue(attributeValue: number): Tier {
  if (attributeValue >= 1501) return Tier.MYTHIC;
  if (attributeValue >= 1201) return Tier.LEGENDARY;
  if (attributeValue >= 901) return Tier.EPIC;
  if (attributeValue >= 601) return Tier.RARE;
  if (attributeValue >= 301) return Tier.UNCOMMON;
  return Tier.COMMON;
}
