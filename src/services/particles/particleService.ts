/**
 * Particle Service for Bitcoin Protozoa
 *
 * This service manages all particle groups in the system.
 * It handles creation, updates, and rendering of particles.
 */

import { Role } from '../../types/core';
import { ParticleGroup } from '../../types/particle';
import { BlockData } from '../../types/bitcoin';
import { Vector3 } from '../../types/common';
import { getParticleGroupFactory } from './particleGroupFactory';
import { getBehaviorService } from '../behaviors';
import { getRenderService } from '../rendering/index';
import { getParticlePositions, getParticleVelocities, updateParticlePositions, applyForcesToParticles } from '../../lib/particleSystem';

/**
 * Particle Service class
 * Manages all particle groups in the system
 */
class ParticleService {
  private static instance: ParticleService | null = null;
  private groups: Map<string, ParticleGroup> = new Map();
  private blockData: BlockData | null = null;
  private initialized = false;
  private lastUpdateTime = 0;

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {
    // Private constructor to enforce singleton pattern
  }

  /**
   * Get the singleton instance
   * @returns The singleton instance
   */
  public static getInstance(): ParticleService {
    if (!ParticleService.instance) {
      ParticleService.instance = new ParticleService();
    }
    return ParticleService.instance;
  }

  /**
   * Initialize the service with block data
   * @param blockData Bitcoin block data
   */
  public initialize(blockData: BlockData): void {
    if (this.initialized) {
      console.warn('Particle Service already initialized');
      return;
    }

    this.blockData = blockData;

    // Initialize particle group factory
    getParticleGroupFactory().initialize(blockData);

    // Clear existing groups
    this.groups.clear();

    // Set last update time
    this.lastUpdateTime = Date.now();

    this.initialized = true;
    console.log('Particle Service initialized');
  }

  /**
   * Create particle groups for all roles
   * @param particleCounts Map of roles to particle counts
   */
  public createParticleGroups(particleCounts: Map<Role, number>): void {
    if (!this.initialized || !this.blockData) {
      throw new Error('Particle Service not initialized');
    }

    // Create a group for each role
    let index = 0;
    for (const [role, count] of particleCounts.entries()) {
      // Skip if count is 0
      if (count <= 0) continue;

      // Create the group
      const group = getParticleGroupFactory().createGroup({
        role,
        count,
        nonce: this.blockData.nonce,
        index: index++
      });

      // Store the group
      this.groups.set(group.id, group);

      console.log(`Created particle group: ${group.id}, Role: ${role}, Count: ${count}, Tier: ${group.subclass.tier}`);
    }
  }

  /**
   * Update all particle groups
   */
  public update(): void {
    if (!this.initialized) {
      return;
    }

    // Calculate delta time
    const currentTime = Date.now();
    const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // Convert to seconds
    this.lastUpdateTime = currentTime;

    // Update each group
    for (const group of this.groups.values()) {
      this.updateGroup(group, deltaTime);
    }
  }

  /**
   * Update a specific particle group
   * @param group Particle group to update
   * @param deltaTime Time step for the update
   */
  private updateGroup(group: ParticleGroup, deltaTime: number): void {
    // Get current positions
    const positions = getParticlePositions(group.particles);

    // Generate behavior forces
    const behaviorForces = getBehaviorService().generateBehaviorForces(
      group.traits.behaviorTrait,
      positions,
      Date.now() * 0.001 // Current time in seconds
    );

    // Apply forces to particles
    applyForcesToParticles(group.particles, behaviorForces);

    // Update particle positions
    updateParticlePositions(group.particles, deltaTime);

    // Get updated positions and velocities
    const updatedPositions = getParticlePositions(group.particles);
    const updatedVelocities = getParticleVelocities(group.particles);

    // Update rendering
    getRenderService().updateParticles(
      group.role,
      updatedPositions,
      updatedVelocities
    );
  }

  /**
   * Get a particle group by ID
   * @param id Group ID
   * @returns The particle group, or undefined if not found
   */
  public getGroup(id: string): ParticleGroup | undefined {
    return this.groups.get(id);
  }

  /**
   * Get all particle groups
   * @returns Array of all particle groups
   */
  public getAllGroups(): ParticleGroup[] {
    return Array.from(this.groups.values());
  }

  /**
   * Get particle groups by role
   * @param role Particle role
   * @returns Array of particle groups with the specified role
   */
  public getGroupsByRole(role: Role): ParticleGroup[] {
    return Array.from(this.groups.values()).filter(group => group.role === role);
  }

  /**
   * Get the total number of particles
   * @returns Total number of particles across all groups
   */
  public getTotalParticleCount(): number {
    let total = 0;
    for (const group of this.groups.values()) {
      total += group.count;
    }
    return total;
  }

  /**
   * Reset the service
   */
  public reset(): void {
    this.groups.clear();
    this.blockData = null;
    this.initialized = false;
  }
}

/**
 * Get the particle service instance
 * @returns The particle service instance
 */
export function getParticleService(): ParticleService {
  return ParticleService.getInstance();
}
