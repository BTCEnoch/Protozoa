/**
 * Particle System Demo
 *
 * This file demonstrates how to use the particle system.
 */

import { Role } from '../types/core';
import { getParticleService } from '../services/particles/index';
import { getRenderService } from '../services/rendering/index';

// Mock block data for demo
const mockBlockData = {
  height: 123456,
  hash: '0000000000000000000123456789abcdef0123456789abcdef0123456789abcd',
  nonce: 12345,
  confirmations: 100,
  timestamp: Date.now()
};

/**
 * Run the particle system demo
 */
export function runParticleSystemDemo(): void {
  console.log('Starting Particle System Demo');

  // Initialize the particle service
  getParticleService().initialize(mockBlockData);
  console.log('Particle Service initialized');

  // Initialize the render service
  getRenderService().initialize();
  console.log('Render Service initialized');

  // Create particle groups
  const particleCounts = new Map<Role, number>([
    [Role.CORE, 100],
    [Role.CONTROL, 100],
    [Role.MOVEMENT, 100],
    [Role.DEFENSE, 100],
    [Role.ATTACK, 100]
  ]);

  getParticleService().createParticleGroups(particleCounts);
  console.log('Particle Groups created');

  // Get all groups
  const groups = getParticleService().getAllGroups();
  console.log(`Created ${groups.length} particle groups with a total of ${getParticleService().getTotalParticleCount()} particles`);

  // Log information about each group
  groups.forEach(group => {
    console.log(`Group: ${group.id}`);
    console.log(`  Role: ${group.role}`);
    console.log(`  Count: ${group.count}`);
    console.log(`  Tier: ${group.subclass.tier}`);
    console.log(`  Subclass: ${group.subclass.name}`);
    console.log(`  Abilities:`);
    console.log(`    Primary: ${group.subclass.abilities?.primary.name}`);
    console.log(`    Secondary: ${group.subclass.abilities?.secondary.name}`);
    console.log(`    Unique: ${group.subclass.abilities?.unique.name}`);
    console.log(`    Crowd Control: ${group.subclass.abilities?.crowdControl.name}`);
    console.log(`    Formation Trait: ${group.subclass.abilities?.formationTrait.name}`);
  });

  // Start animation loop
  let lastTime = Date.now();

  function animate(): void {
    // Calculate delta time
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    // Update particle positions
    getParticleService().update();

    // Render the scene
    getRenderService().render();

    // Request next frame
    requestAnimationFrame(animate);
  }

  // Start animation
  animate();
  console.log('Animation started');
}

// Run the demo if this file is executed directly
if (require.main === module) {
  runParticleSystemDemo();
}
