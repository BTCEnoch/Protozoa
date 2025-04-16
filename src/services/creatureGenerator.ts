/**
 * Creature Generator Service
 *
 * This service generates creatures based on Bitcoin block data.
 * It uses the RNG system to create deterministic creatures.
 */

// No need for uuid import as we'll use deterministic IDs
import { BlockData } from '../types/bitcoin/bitcoin';
import { Creature, CreatureGroup, Role, Tier, TierThresholds } from '../types/creatures/creature';
import { createRNGFromBlockNonce, RNGSystem } from '../lib/rngSystem';
import { getBitcoinService } from './bitcoinService';
import { getTraitService } from './traits';
import { getFormationService } from './formations';
import { getBehaviorService } from './behaviors';
import { getEvolutionService } from './evolution';
import { getAbilityService } from './abilities';
import { getVisualService } from './visuals';

/**
 * Creature Generator Service
 */
export class CreatureGeneratorService {
  private static instance: CreatureGeneratorService;

  /**
   * Get the singleton instance
   * @returns The singleton instance
   */
  public static getInstance(): CreatureGeneratorService {
    if (!CreatureGeneratorService.instance) {
      CreatureGeneratorService.instance = new CreatureGeneratorService();
    }
    return CreatureGeneratorService.instance;
  }

  /**
   * Generate a creature from a Bitcoin block number
   * @param blockNumber The Bitcoin block number
   * @returns Promise resolving to the generated creature
   */
  public async generateCreature(blockNumber: number): Promise<Creature> {
    // Fetch block data
    const bitcoinService = getBitcoinService();
    const blockData = await bitcoinService.fetchBlockData(blockNumber);

    // Generate creature
    return this.generateCreatureFromBlockData(blockNumber, blockData);
  }

  /**
   * Generate a creature from Bitcoin block data
   * @param blockNumber The Bitcoin block number
   * @param blockData The Bitcoin block data
   * @returns The generated creature
   */
  public generateCreatureFromBlockData(blockNumber: number, blockData: BlockData): Creature {
    // Create RNG system
    const rngSystem = createRNGFromBlockNonce(blockData.nonce);

    // Initialize services
    const traitService = getTraitService();
    traitService.initialize(blockData);

    const formationService = getFormationService();
    formationService.initialize(blockData.nonce);

    const behaviorService = getBehaviorService();
    behaviorService.initialize(blockData.nonce);

    const evolutionService = getEvolutionService();
    evolutionService.initialize(blockData.nonce);

    const abilityService = getAbilityService();
    abilityService.initialize(blockData);

    const visualService = getVisualService();
    visualService.initialize(blockData);

    // Generate creature groups
    const groups = this.generateCreatureGroups(rngSystem);

    // Create creature with deterministic ID
    const creatureId = `creature_${blockNumber}_${blockData.nonce}`;

    const creature: Creature = {
      id: creatureId,
      blockNumber,
      blockData,
      groups,
      mutations: [],
      createdAt: Date.now(),
      lastUpdatedAt: Date.now()
    };

    return creature;
  }

  /**
   * Generate creature groups
   * @param rngSystem The RNG system
   * @returns The generated creature groups
   */
  private generateCreatureGroups(rngSystem: RNGSystem): CreatureGroup[] {
    const groups: CreatureGroup[] = [];
    const roles = Object.values(Role);
    const TOTAL_PARTICLES = 500;
    const BASE_PARTICLES_PER_GROUP = 40;
    const REMAINING_PARTICLES = TOTAL_PARTICLES - (BASE_PARTICLES_PER_GROUP * roles.length);

    // Get RNG streams
    const traitsRng = rngSystem.getStream('traits');
    const subclassRng = rngSystem.getStream('subclass');

    // Generate random weights for distributing remaining particles
    const weights = roles.map(() => traitsRng.next());
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

    // Calculate additional particles for each role based on weights
    const additionalParticles = weights.map(weight =>
      Math.floor((weight / totalWeight) * REMAINING_PARTICLES)
    );

    // Adjust for rounding errors to ensure we use exactly REMAINING_PARTICLES
    let particlesLeft = REMAINING_PARTICLES - additionalParticles.reduce((sum, count) => sum + count, 0);
    while (particlesLeft > 0) {
      const index = traitsRng.nextInt(0, roles.length - 1);
      additionalParticles[index]++;
      particlesLeft--;
    }

    // Generate a group for each role
    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];

      // Generate attribute value
      const attributeValue = this.generateAttributeValue(traitsRng, role);

      // Determine tier based on attribute value
      const tier = this.determineAttributeTier(attributeValue);

      // Calculate total particles for this group
      const particles = BASE_PARTICLES_PER_GROUP + additionalParticles[i];

      // Create group with deterministic ID
      const groupId = `group_${role}_${tier}_${attributeValue}`;

      // Get abilities for this group
      const abilityService = getAbilityService();
      let abilities;
      try {
        abilities = abilityService.selectAbilitiesForGroup(groupId, role, tier);
      } catch (error) {
        console.warn(`Failed to select abilities for group ${groupId}:`, error);
        abilities = null;
      }

      // Get visual trait for this group
      const visualService = getVisualService();
      let visualTrait;
      try {
        visualTrait = visualService.selectVisualForGroup(groupId, role, tier);
      } catch (error) {
        console.warn(`Failed to select visual trait for group ${groupId}:`, error);
        visualTrait = null;
      }

      // Create subclass
      const subclass = {
        id: `${role.toLowerCase()}_subclass_${tier}`,
        name: `${role} Subclass (Tier ${tier})`,
        tier,
        description: `A tier ${tier} subclass for ${role} particles.`,
        abilities: abilities ? {
          primary: abilities.primary,
          secondary: abilities.secondary,
          unique: abilities.unique,
          crowdControl: abilities.crowdControl,
          formationTrait: abilities.formationTrait
        } : undefined,
        visualTrait: visualTrait || undefined
      };

      // Create group
      const group: CreatureGroup = {
        id: groupId,
        role,
        subclass,
        particles,
        attributeValue,
        mutations: []
      };

      groups.push(group);
    }

    return groups;
  }

  /**
   * Generate an attribute value for a role
   * @param rng The RNG stream
   * @param role The particle role
   * @returns The generated attribute value
   */
  private generateAttributeValue(rng: any, role: Role): number {
    // Base range is 0-500
    const baseValue = rng.nextInt(0, 500);

    // Apply role-specific modifiers
    switch (role) {
      case Role.CORE:
        return baseValue * 1.2; // CORE gets a 20% boost
      case Role.ATTACK:
        return baseValue * 1.1; // ATTACK gets a 10% boost
      case Role.DEFENSE:
        return baseValue * 1.1; // DEFENSE gets a 10% boost
      case Role.CONTROL:
        return baseValue * 1.05; // CONTROL gets a 5% boost
      case Role.MOVEMENT:
        return baseValue * 1.05; // MOVEMENT gets a 5% boost
      default:
        return baseValue;
    }
  }

  /**
   * Determine the tier based on attribute value
   * @param attributeValue The attribute value
   * @returns The tier
   */
  private determineAttributeTier(attributeValue: number): Tier {
    if (attributeValue >= TierThresholds[Tier.MYTHIC]) return Tier.MYTHIC;
    if (attributeValue >= TierThresholds[Tier.LEGENDARY]) return Tier.LEGENDARY;
    if (attributeValue >= TierThresholds[Tier.EPIC]) return Tier.EPIC;
    if (attributeValue >= TierThresholds[Tier.RARE]) return Tier.RARE;
    if (attributeValue >= TierThresholds[Tier.UNCOMMON]) return Tier.UNCOMMON;
    return Tier.COMMON;
  }


}

/**
 * Get the CreatureGeneratorService instance
 * @returns The CreatureGeneratorService instance
 */
export function getCreatureGeneratorService(): CreatureGeneratorService {
  return CreatureGeneratorService.getInstance();
}

