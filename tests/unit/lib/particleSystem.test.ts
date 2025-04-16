/**
 * Particle System Tests
 *
 * This file contains tests for the particle system implementation.
 */

import { Role, Tier } from '../types/core';
import { createParticle, createParticleGroup, determineTierFromAttributeValue } from '../lib/particleSystem';
import { getParticleGroupFactory, getParticleService } from '../services/particles/index';
import { RNGSystemImpl } from '../lib/rngSystem';

// Mock block data for testing
const mockBlockData = {
  height: 123456,
  hash: '0000000000000000000123456789abcdef0123456789abcdef0123456789abcd',
  nonce: 12345,
  confirmations: 100,
  timestamp: Date.now()
};

describe('Particle System', () => {
  describe('createParticle', () => {
    it('should create a particle with default values', () => {
      const particle = createParticle({ role: Role.CORE });

      expect(particle).toBeDefined();
      expect(particle.role).toBe(Role.CORE);
      expect(particle.position).toEqual({ x: 0, y: 0, z: 0 });
      expect(particle.velocity).toEqual({ x: 0, y: 0, z: 0 });
      expect(particle.acceleration).toEqual({ x: 0, y: 0, z: 0 });
    });

    it('should create a particle with custom values', () => {
      const particle = createParticle({
        role: Role.ATTACK,
        position: { x: 1, y: 2, z: 3 },
        velocity: { x: 0.1, y: 0.2, z: 0.3 },
        mass: 2.0,
        size: 1.5,
        color: '#FF0000'
      });

      expect(particle).toBeDefined();
      expect(particle.role).toBe(Role.ATTACK);
      expect(particle.position).toEqual({ x: 1, y: 2, z: 3 });
      expect(particle.velocity).toEqual({ x: 0.1, y: 0.2, z: 0.3 });
      expect(particle.mass).toBe(2.0);
      expect(particle.size).toBe(1.5);
      expect(particle.color).toBe('#FF0000');
    });
  });

  describe('determineTierFromAttributeValue', () => {
    it('should determine the correct tier based on attribute value', () => {
      expect(determineTierFromAttributeValue(0)).toBe(Tier.COMMON);
      expect(determineTierFromAttributeValue(300)).toBe(Tier.COMMON);
      expect(determineTierFromAttributeValue(301)).toBe(Tier.UNCOMMON);
      expect(determineTierFromAttributeValue(600)).toBe(Tier.UNCOMMON);
      expect(determineTierFromAttributeValue(601)).toBe(Tier.RARE);
      expect(determineTierFromAttributeValue(900)).toBe(Tier.RARE);
      expect(determineTierFromAttributeValue(901)).toBe(Tier.EPIC);
      expect(determineTierFromAttributeValue(1200)).toBe(Tier.EPIC);
      expect(determineTierFromAttributeValue(1201)).toBe(Tier.LEGENDARY);
      expect(determineTierFromAttributeValue(1500)).toBe(Tier.LEGENDARY);
      expect(determineTierFromAttributeValue(1501)).toBe(Tier.MYTHIC);
      expect(determineTierFromAttributeValue(2000)).toBe(Tier.MYTHIC);
    });
  });

  describe('Particle Group Factory', () => {
    beforeEach(() => {
      // Reset the factory before each test
      getParticleGroupFactory().reset();

      // Initialize the factory with mock block data
      getParticleGroupFactory().initialize(mockBlockData);
    });

    it('should create a particle group with the correct role and count', () => {
      const group = getParticleGroupFactory().createGroup({
        role: Role.CORE,
        count: 50,
        nonce: mockBlockData.nonce,
        index: 0
      });

      expect(group).toBeDefined();
      expect(group.role).toBe(Role.CORE);
      expect(group.count).toBe(50);
      expect(group.particles.length).toBe(50);
      expect(group.subclass).toBeDefined();
      expect(group.traits).toBeDefined();
    });

    it('should create groups with different subclasses based on tier', () => {
      // Create a low-tier group (should be Common or Uncommon)
      const lowTierGroup = getParticleGroupFactory().createGroup({
        role: Role.CORE,
        count: 10, // Small count should result in low attribute value
        nonce: mockBlockData.nonce,
        index: 0
      });

      // Create a high-tier group (should be Rare or higher)
      const highTierGroup = getParticleGroupFactory().createGroup({
        role: Role.CORE,
        count: 200, // Large count should result in high attribute value
        nonce: mockBlockData.nonce,
        index: 1
      });

      expect(lowTierGroup.subclass.tier).toBeDefined();
      expect(highTierGroup.subclass.tier).toBeDefined();

      // The high-tier group should have a higher tier than the low-tier group
      const lowTierValue = Tier[lowTierGroup.subclass.tier as keyof typeof Tier];
      const highTierValue = Tier[highTierGroup.subclass.tier as keyof typeof Tier];

      expect(highTierValue).toBeGreaterThan(lowTierValue);
    });
  });

  describe('Particle Service', () => {
    beforeEach(() => {
      // Reset the service before each test
      getParticleService().reset();

      // Initialize the service with mock block data
      getParticleService().initialize(mockBlockData);
    });

    it('should create particle groups for all roles', () => {
      // Create a map of roles to particle counts
      const particleCounts = new Map<Role, number>([
        [Role.CORE, 100],
        [Role.CONTROL, 100],
        [Role.MOVEMENT, 100],
        [Role.DEFENSE, 100],
        [Role.ATTACK, 100]
      ]);

      // Create particle groups
      getParticleService().createParticleGroups(particleCounts);

      // Get all groups
      const groups = getParticleService().getAllGroups();

      // Should have 5 groups (one for each role)
      expect(groups.length).toBe(5);

      // Check that we have one group for each role
      const roles = groups.map(group => group.role);
      expect(roles).toContain(Role.CORE);
      expect(roles).toContain(Role.CONTROL);
      expect(roles).toContain(Role.MOVEMENT);
      expect(roles).toContain(Role.DEFENSE);
      expect(roles).toContain(Role.ATTACK);

      // Check total particle count
      expect(getParticleService().getTotalParticleCount()).toBe(500);
    });

    it('should get groups by role', () => {
      // Create a map of roles to particle counts
      const particleCounts = new Map<Role, number>([
        [Role.CORE, 100],
        [Role.CONTROL, 100],
        [Role.MOVEMENT, 100],
        [Role.DEFENSE, 100],
        [Role.ATTACK, 100]
      ]);

      // Create particle groups
      getParticleService().createParticleGroups(particleCounts);

      // Get groups by role
      const coreGroups = getParticleService().getGroupsByRole(Role.CORE);
      const attackGroups = getParticleService().getGroupsByRole(Role.ATTACK);

      // Should have one group for each role
      expect(coreGroups.length).toBe(1);
      expect(attackGroups.length).toBe(1);

      // Check that the groups have the correct role
      expect(coreGroups[0].role).toBe(Role.CORE);
      expect(attackGroups[0].role).toBe(Role.ATTACK);
    });
  });
});
