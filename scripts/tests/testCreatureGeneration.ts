/**
 * Test script for creature generation
 *
 * This script tests the creature generation system by generating creatures
 * from different Bitcoin blocks and analyzing their attributes and tiers.
 */

import { generateCreature } from '../lib/creatureGenerator';
import { Tier, Role } from '../types/abilities/ability';

// Test blocks with different confirmation levels
const testBlocks = [
  { number: 100000, description: 'Recent block (few confirmations)' },
  { number: 50000, description: 'Older block (moderate confirmations)' },
  { number: 10000, description: 'Very old block (many confirmations)' }
];

// Main function
async function main() {
  console.log('Testing Creature Generation\n');

  // Generate creatures from each test block
  for (const block of testBlocks) {
    console.log(`Generating creature from block ${block.number} (${block.description})...`);

    try {
      // Generate a creature
      const creature = await generateCreature(block.number);

      // Log creature details
      console.log(`\nCreature from block ${creature.blockNumber}:`);
      console.log(`Block nonce: ${creature.blockData.nonce}`);
      console.log(`Confirmations: ${creature.blockData.confirmations}`);

      // Track tier distribution
      const tierCounts = {
        [Tier.Common]: 0,
        [Tier.Uncommon]: 0,
        [Tier.Rare]: 0,
        [Tier.Epic]: 0,
        [Tier.Legendary]: 0,
        [Tier.Mythic]: 0
      };

      // Log each group
      console.log('\nGroups:');
      for (const group of creature.groups) {
        console.log(`\n${Role[group.role]} Group (${group.particles} particles):`);
        console.log(`  Attribute Value: ${group.attributeValue}`);
        console.log(`  Tier: ${Tier[group.subclass.tier]} (${group.subclass.tier})`);
        console.log(`  Subclass: ${group.subclass.name}`);
        console.log(`  Synergy: ${group.subclass.synergy}`);

        // Log abilities
        console.log('  Abilities:');
        console.log(`    Primary: ${group.subclass.abilities.primary.name} - ${group.subclass.abilities.primary.description}`);
        console.log(`    Secondary: ${group.subclass.abilities.secondary.name} - ${group.subclass.abilities.secondary.description}`);
        console.log(`    Unique: ${group.subclass.abilities.unique.name} - ${group.subclass.abilities.unique.description}`);
        console.log(`    Crowd Control: ${group.subclass.abilities.crowdControl.name} - ${group.subclass.abilities.crowdControl.description}`);

        // Log formation trait
        console.log(`  Formation Trait: ${group.subclass.formationTrait.name} - ${group.subclass.formationTrait.description}`);

        // Count tiers
        tierCounts[group.subclass.tier]++;
      }

      // Log tier distribution
      console.log('\nTier Distribution:');
      for (const [tier, count] of Object.entries(tierCounts)) {
        if (count > 0) {
          console.log(`  ${Tier[Number(tier)]}: ${count} groups`);
        }
      }

      console.log('\n-----------------------------------\n');
    } catch (error) {
      console.error('Error generating creature:', error);
    }
  }
}

// Run the main function
main().catch(console.error);

