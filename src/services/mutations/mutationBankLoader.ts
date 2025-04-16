/**
 * Mutation Bank Loader for Bitcoin Protozoa
 *
 * This service is responsible for loading mutation data from various sources
 * and creating a mutation bank for use by the mutation service.
 */

import {
  Role,
  Rarity,
  AttributeType,
  RoleToAttributeType
} from '../../types/core';
import { CreatureGroup } from '../../types/creature';
import {
  Mutation,
  MutationCategory,
  MutationBank,
  AttributeMutation,
  ParticleMutation,
  SubclassMutation,
  AbilityMutation,
  SynergyMutation,
  FormationMutation,
  BehaviorMutation,
  ExoticMutation,
  createMutationId
} from '../../types/mutation';

/**
 * Mutation bank loader class
 */
export class MutationBankLoader {
  private static instance: MutationBankLoader;

  /**
   * Get the singleton instance
   * @returns The singleton instance
   */
  public static getInstance(): MutationBankLoader {
    if (!MutationBankLoader.instance) {
      MutationBankLoader.instance = new MutationBankLoader();
    }
    return MutationBankLoader.instance;
  }

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {}

  /**
   * Load mutation data from JSON files
   * @param basePath The base path to the mutation data files
   * @returns A promise resolving to a mutation bank
   */
  public async loadFromFiles(basePath: string): Promise<MutationBank> {
    try {
      // Create empty mutation bank
      const mutationBank: MutationBank = this.createEmptyMutationBank();

      // Load mutations for each category and rarity
      for (const category of Object.values(MutationCategory)) {
        for (const rarity of Object.values(Rarity)) {
          try {
            const filePath = `${basePath}/${category.toLowerCase()}/${rarity.toLowerCase()}.json`;
            // In a real implementation, we would load the file here
            // For now, we'll use mock data
            // This would be replaced with actual file loading logic
          } catch (error) {
            console.error(`Error loading mutations for ${category}, rarity ${rarity}:`, error);
          }
        }
      }

      // For now, return mock data
      return this.createMockMutationBank();
    } catch (error) {
      console.error('Error loading mutation bank:', error);
      throw error;
    }
  }

  /**
   * Create an empty mutation bank
   * @returns An empty mutation bank
   */
  private createEmptyMutationBank(): MutationBank {
    const mutationBank: Partial<MutationBank> = {};

    // Initialize empty arrays for each category and rarity
    for (const category of Object.values(MutationCategory)) {
      mutationBank[category] = {} as Record<Rarity, any[]>;

      for (const rarity of Object.values(Rarity)) {
        mutationBank[category][rarity] = [];
      }
    }

    return mutationBank as MutationBank;
  }

  /**
   * Create a mock mutation bank for testing
   * @returns A mutation bank with mock data
   */
  public createMockMutationBank(): MutationBank {
    // Create empty mutation bank
    const mutationBank: MutationBank = this.createEmptyMutationBank();

    // Create mock mutations for each category and rarity
    for (const category of Object.values(MutationCategory)) {
      for (const rarity of Object.values(Rarity)) {
        switch (category) {
          case MutationCategory.ATTRIBUTE:
            mutationBank[category][rarity] = this.createMockAttributeMutations(rarity);
            break;
          case MutationCategory.PARTICLE:
            mutationBank[category][rarity] = this.createMockParticleMutations(rarity);
            break;
          case MutationCategory.SUBCLASS:
            mutationBank[category][rarity] = this.createMockSubclassMutations(rarity);
            break;
          case MutationCategory.ABILITY:
            mutationBank[category][rarity] = this.createMockAbilityMutations(rarity);
            break;
          case MutationCategory.SYNERGY:
            mutationBank[category][rarity] = this.createMockSynergyMutations(rarity);
            break;
          // Visual mutations have been removed as visuals will be designed and assigned to abilities and classes
          case MutationCategory.FORMATION:
            mutationBank[category][rarity] = this.createMockFormationMutations(rarity);
            break;
          case MutationCategory.BEHAVIOR:
            mutationBank[category][rarity] = this.createMockBehaviorMutations(rarity);
            break;
          case MutationCategory.EXOTIC:
            mutationBank[category][rarity] = this.createMockExoticMutations(rarity);
            break;
        }
      }
    }

    return mutationBank;
  }

  /**
   * Create mock attribute mutations
   * @param rarity The rarity tier
   * @returns An array of attribute mutations
   */
  private createMockAttributeMutations(rarity: Rarity): AttributeMutation[] {
    const mutations: AttributeMutation[] = [];
    const roles = Object.values(Role);
    const attributes = Object.values(AttributeType);

    // Create 2 mutations per role
    for (const role of roles) {
      // Get the primary attribute for this role
      const primaryAttribute = RoleToAttributeType[role];

      // Create a primary attribute mutation
      const primaryMutation: AttributeMutation = {
        id: createMutationId(MutationCategory.ATTRIBUTE, role, rarity, 1),
        name: `Enhanced ${primaryAttribute}`,
        description: `Increases ${primaryAttribute} by ${this.getAttributeBoostForRarity(rarity)}%`,
        category: MutationCategory.ATTRIBUTE,
        rarity,
        confirmationThreshold: this.getConfirmationThresholdForRarity(rarity),
        appliedAt: 0, // Will be set when applied
        attributeBonuses: {
          [primaryAttribute]: this.getAttributeBoostForRarity(rarity)
        },
        multiplier: 1 + (this.getAttributeBoostForRarity(rarity) / 100),
        applyEffect: (group: CreatureGroup) => {
          // Clone the group
          const updatedGroup = { ...group };

          // Apply the attribute boost
          updatedGroup.attributeValue = Math.floor(
            updatedGroup.attributeValue * (1 + (this.getAttributeBoostForRarity(rarity) / 100))
          );

          return updatedGroup;
        },
        visualEffect: `${role.toLowerCase()}_attribute_boost_effect`,
        compatibleRoles: [role]
      };

      mutations.push(primaryMutation);

      // Create a secondary attribute mutation that affects all attributes
      const secondaryMutation: AttributeMutation = {
        id: createMutationId(MutationCategory.ATTRIBUTE, role, rarity, 2),
        name: `${role} Mastery`,
        description: `Increases all attributes by ${this.getAttributeBoostForRarity(rarity) / 2}%`,
        category: MutationCategory.ATTRIBUTE,
        rarity,
        confirmationThreshold: this.getConfirmationThresholdForRarity(rarity),
        appliedAt: 0, // Will be set when applied
        attributeBonuses: attributes.reduce((bonuses, attr) => {
          bonuses[attr] = this.getAttributeBoostForRarity(rarity) / 2;
          return bonuses;
        }, {} as Partial<Record<AttributeType, number>>),
        multiplier: 1 + (this.getAttributeBoostForRarity(rarity) / 200),
        applyEffect: (group: CreatureGroup) => {
          // Clone the group
          const updatedGroup = { ...group };

          // Apply the attribute boost
          updatedGroup.attributeValue = Math.floor(
            updatedGroup.attributeValue * (1 + (this.getAttributeBoostForRarity(rarity) / 200))
          );

          return updatedGroup;
        },
        visualEffect: `${role.toLowerCase()}_mastery_effect`,
        compatibleRoles: [role]
      };

      mutations.push(secondaryMutation);
    }

    return mutations;
  }

  /**
   * Create mock particle mutations
   * @param rarity The rarity tier
   * @returns An array of particle mutations
   */
  private createMockParticleMutations(rarity: Rarity): ParticleMutation[] {
    const mutations: ParticleMutation[] = [];
    const roles = Object.values(Role);

    // Create 2 mutations per role
    for (const role of roles) {
      // Create a particle count increase mutation
      const countIncreaseMutation: ParticleMutation = {
        id: createMutationId(MutationCategory.PARTICLE, role, rarity, 1),
        name: `${role} Particle Surge`,
        description: `Increases ${role} particle count by ${this.getParticleCountBoostForRarity(rarity)}`,
        category: MutationCategory.PARTICLE,
        rarity,
        confirmationThreshold: this.getConfirmationThresholdForRarity(rarity),
        appliedAt: 0, // Will be set when applied
        particleCountChange: this.getParticleCountBoostForRarity(rarity),
        applyEffect: (group: CreatureGroup) => {
          // Clone the group
          const updatedGroup = { ...group };

          // Apply the particle count boost
          updatedGroup.particles += this.getParticleCountBoostForRarity(rarity);

          return updatedGroup;
        },
        visualEffect: `${role.toLowerCase()}_particle_surge_effect`,
        compatibleRoles: [role]
      };

      mutations.push(countIncreaseMutation);

      // Create a particle distribution mutation
      const distributionMutation: ParticleMutation = {
        id: createMutationId(MutationCategory.PARTICLE, role, rarity, 2),
        name: `${role} Specialization`,
        description: `Optimizes particle distribution for ${role}`,
        category: MutationCategory.PARTICLE,
        rarity,
        confirmationThreshold: this.getConfirmationThresholdForRarity(rarity),
        appliedAt: 0, // Will be set when applied
        particleDistribution: {
          [role]: this.getParticleDistributionBoostForRarity(rarity)
        },
        applyEffect: (group: CreatureGroup) => {
          // Clone the group
          const updatedGroup = { ...group };

          // Apply the attribute boost based on particle count
          updatedGroup.attributeValue += Math.floor(
            updatedGroup.particles * (this.getAttributeBoostForRarity(rarity) / 100)
          );

          return updatedGroup;
        },
        visualEffect: `${role.toLowerCase()}_specialization_effect`,
        compatibleRoles: [role]
      };

      mutations.push(distributionMutation);
    }

    return mutations;
  }

  /**
   * Create mock subclass mutations
   * @param rarity The rarity tier
   * @returns An array of subclass mutations
   */
  private createMockSubclassMutations(rarity: Rarity): SubclassMutation[] {
    const mutations: SubclassMutation[] = [];
    const roles = Object.values(Role);

    // Create 1 mutation per role
    for (const role of roles) {
      // Create a subclass evolution mutation
      const subclassMutation: SubclassMutation = {
        id: createMutationId(MutationCategory.SUBCLASS, role, rarity, 1),
        name: `${role} Evolution`,
        description: `Evolves the ${role} subclass to a higher tier`,
        category: MutationCategory.SUBCLASS,
        rarity,
        confirmationThreshold: this.getConfirmationThresholdForRarity(rarity),
        appliedAt: 0, // Will be set when applied
        tierChange: 1, // Increase tier by 1
        applyEffect: (group: CreatureGroup) => {
          // Clone the group
          const updatedGroup = { ...group };

          // Apply the attribute boost based on rarity
          updatedGroup.attributeValue = Math.floor(
            updatedGroup.attributeValue * (1 + (this.getAttributeBoostForRarity(rarity) / 50))
          );

          return updatedGroup;
        },
        visualEffect: `${role.toLowerCase()}_evolution_effect`,
        compatibleRoles: [role]
      };

      mutations.push(subclassMutation);
    }

    return mutations;
  }

  /**
   * Create mock ability mutations
   * @param rarity The rarity tier
   * @returns An array of ability mutations
   */
  private createMockAbilityMutations(rarity: Rarity): AbilityMutation[] {
    const mutations: AbilityMutation[] = [];
    const roles = Object.values(Role);

    // Create 2 mutations per role
    for (const role of roles) {
      // Create a cooldown reduction mutation
      const cooldownMutation: AbilityMutation = {
        id: createMutationId(MutationCategory.ABILITY, role, rarity, 1),
        name: `${role} Efficiency`,
        description: `Reduces ability cooldowns by ${this.getCooldownReductionForRarity(rarity)}%`,
        category: MutationCategory.ABILITY,
        rarity,
        confirmationThreshold: this.getConfirmationThresholdForRarity(rarity),
        appliedAt: 0, // Will be set when applied
        cooldownReduction: this.getCooldownReductionForRarity(rarity),
        applyEffect: (group: CreatureGroup) => {
          // Clone the group
          const updatedGroup = { ...group };

          // In a real implementation, this would modify ability cooldowns
          // For now, just apply an attribute boost
          updatedGroup.attributeValue = Math.floor(
            updatedGroup.attributeValue * (1 + (this.getCooldownReductionForRarity(rarity) / 200))
          );

          return updatedGroup;
        },
        visualEffect: `${role.toLowerCase()}_efficiency_effect`,
        compatibleRoles: [role]
      };

      mutations.push(cooldownMutation);

      // Create a damage increase mutation
      const damageMutation: AbilityMutation = {
        id: createMutationId(MutationCategory.ABILITY, role, rarity, 2),
        name: `${role} Power`,
        description: `Increases ability damage by ${this.getDamageIncreaseForRarity(rarity)}%`,
        category: MutationCategory.ABILITY,
        rarity,
        confirmationThreshold: this.getConfirmationThresholdForRarity(rarity),
        appliedAt: 0, // Will be set when applied
        damageIncrease: this.getDamageIncreaseForRarity(rarity),
        applyEffect: (group: CreatureGroup) => {
          // Clone the group
          const updatedGroup = { ...group };

          // In a real implementation, this would modify ability damage
          // For now, just apply an attribute boost
          updatedGroup.attributeValue = Math.floor(
            updatedGroup.attributeValue * (1 + (this.getDamageIncreaseForRarity(rarity) / 100))
          );

          return updatedGroup;
        },
        visualEffect: `${role.toLowerCase()}_power_effect`,
        compatibleRoles: [role]
      };

      mutations.push(damageMutation);
    }

    return mutations;
  }

  /**
   * Create mock synergy mutations
   * @param rarity The rarity tier
   * @returns An array of synergy mutations
   */
  private createMockSynergyMutations(rarity: Rarity): SynergyMutation[] {
    const mutations: SynergyMutation[] = [];
    const roles = Object.values(Role);

    // Create 1 mutation per role
    for (const role of roles) {
      // Get a random target role that's different from the current role
      const targetRoles = roles.filter(r => r !== role);
      const targetRole = targetRoles[0]; // In a real implementation, this would be random

      // Create a synergy mutation
      const synergyMutation: SynergyMutation = {
        id: createMutationId(MutationCategory.SYNERGY, role, rarity, 1),
        name: `${role}-${targetRole} Synergy`,
        description: `Creates a synergy between ${role} and ${targetRole} groups`,
        category: MutationCategory.SYNERGY,
        rarity,
        confirmationThreshold: this.getConfirmationThresholdForRarity(rarity),
        appliedAt: 0, // Will be set when applied
        targetRoles: [role, targetRole],
        synergyEffect: `Increases effectiveness when ${role} and ${targetRole} work together`,
        synergyBonus: this.getSynergyBonusForRarity(rarity),
        synergyType: 'attribute',
        applyEffect: (group: CreatureGroup) => {
          // Clone the group
          const updatedGroup = { ...group };

          // Only apply the effect if this is one of the target roles
          if (updatedGroup.role === role || updatedGroup.role === targetRole) {
            updatedGroup.attributeValue = Math.floor(
              updatedGroup.attributeValue * (1 + (this.getSynergyBonusForRarity(rarity) / 100))
            );
          }

          return updatedGroup;
        },
        visualEffect: `${role.toLowerCase()}_${targetRole.toLowerCase()}_synergy_effect`,
        compatibleRoles: [role, targetRole]
      };

      mutations.push(synergyMutation);
    }

    return mutations;
  }

  // Visual mutations have been removed as visuals will be designed and assigned to abilities and classes

  /**
   * Create mock formation mutations
   * @param rarity The rarity tier
   * @returns An array of formation mutations
   */
  private createMockFormationMutations(rarity: Rarity): FormationMutation[] {
    const mutations: FormationMutation[] = [];
    const roles = Object.values(Role);

    // Create 1 mutation per role
    for (const role of roles) {
      // Create a formation mutation
      const formationMutation: FormationMutation = {
        id: createMutationId(MutationCategory.FORMATION, role, rarity, 1),
        name: `${role} Formation Shift`,
        description: `Changes the formation pattern of ${role} particles`,
        category: MutationCategory.FORMATION,
        rarity,
        confirmationThreshold: this.getConfirmationThresholdForRarity(rarity),
        appliedAt: 0, // Will be set when applied
        patternChange: `${role.toLowerCase()}_pattern_${rarity.toLowerCase()}`,
        densityChange: this.getDensityChangeForRarity(rarity),
        rangeChange: this.getRangeChangeForRarity(rarity),
        stabilityChange: this.getStabilityChangeForRarity(rarity),
        applyEffect: (group: CreatureGroup) => {
          // Clone the group
          const updatedGroup = { ...group };

          // In a real implementation, this would modify formation properties
          // For now, just apply a small attribute boost
          updatedGroup.attributeValue = Math.floor(
            updatedGroup.attributeValue * (1 + (this.getAttributeBoostForRarity(rarity) / 200))
          );

          return updatedGroup;
        },
        visualEffect: `${role.toLowerCase()}_formation_shift_effect`,
        compatibleRoles: [role]
      };

      mutations.push(formationMutation);
    }

    return mutations;
  }

  /**
   * Create mock behavior mutations
   * @param rarity The rarity tier
   * @returns An array of behavior mutations
   */
  private createMockBehaviorMutations(rarity: Rarity): BehaviorMutation[] {
    const mutations: BehaviorMutation[] = [];
    const roles = Object.values(Role);

    // Create 1 mutation per role
    for (const role of roles) {
      // Create a behavior mutation
      const behaviorMutation: BehaviorMutation = {
        id: createMutationId(MutationCategory.BEHAVIOR, role, rarity, 1),
        name: `${role} Behavior Adaptation`,
        description: `Adapts the behavior of ${role} particles`,
        category: MutationCategory.BEHAVIOR,
        rarity,
        confirmationThreshold: this.getConfirmationThresholdForRarity(rarity),
        appliedAt: 0, // Will be set when applied
        speedChange: this.getSpeedChangeForRarity(rarity),
        aggressionChange: role === Role.ATTACK ? this.getAggressionChangeForRarity(rarity) : 0,
        cohesionChange: role === Role.DEFENSE ? this.getCohesionChangeForRarity(rarity) : 0,
        patternChange: `${role.toLowerCase()}_behavior_pattern_${rarity.toLowerCase()}`,
        applyEffect: (group: CreatureGroup) => {
          // Clone the group
          const updatedGroup = { ...group };

          // In a real implementation, this would modify behavior properties
          // For now, just apply a small attribute boost
          updatedGroup.attributeValue = Math.floor(
            updatedGroup.attributeValue * (1 + (this.getAttributeBoostForRarity(rarity) / 200))
          );

          return updatedGroup;
        },
        visualEffect: `${role.toLowerCase()}_behavior_adaptation_effect`,
        compatibleRoles: [role]
      };

      mutations.push(behaviorMutation);
    }

    return mutations;
  }

  /**
   * Create mock exotic mutations
   * @param rarity The rarity tier
   * @returns An array of exotic mutations
   */
  private createMockExoticMutations(rarity: Rarity): ExoticMutation[] {
    // Only create exotic mutations for Legendary and Mythic rarities
    if (rarity !== Rarity.LEGENDARY && rarity !== Rarity.MYTHIC) {
      return [];
    }

    const mutations: ExoticMutation[] = [];
    const roles = Object.values(Role);

    // Create 1 mutation per role
    for (const role of roles) {
      // Create an exotic mutation
      const exoticMutation: ExoticMutation = {
        id: createMutationId(MutationCategory.EXOTIC, role, rarity, 1),
        name: `${role} Transcendence`,
        description: `A rare and powerful mutation that transforms ${role} particles`,
        category: MutationCategory.EXOTIC,
        rarity,
        confirmationThreshold: this.getConfirmationThresholdForRarity(rarity),
        appliedAt: 0, // Will be set when applied
        uniqueEffectId: `${role.toLowerCase()}_transcendence_${rarity.toLowerCase()}`,
        globalEffect: rarity === Rarity.MYTHIC, // Only Mythic mutations have global effects
        transformationEffect: `Transforms ${role} particles into a higher state of being`,
        specialAbility: `Grants a unique ability to ${role} particles`,
        applyEffect: (group: CreatureGroup) => {
          // Clone the group
          const updatedGroup = { ...group };

          // Apply a significant attribute boost
          updatedGroup.attributeValue = Math.floor(
            updatedGroup.attributeValue * (1 + (this.getExoticBoostForRarity(rarity) / 100))
          );

          return updatedGroup;
        },
        visualEffect: `${role.toLowerCase()}_transcendence_effect`,
        compatibleRoles: [role]
      };

      mutations.push(exoticMutation);
    }

    return mutations;
  }

  /**
   * Get the confirmation threshold for a rarity tier
   * @param rarity The rarity tier
   * @returns The confirmation threshold
   */
  private getConfirmationThresholdForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 10000;
      case Rarity.UNCOMMON:
        return 50000;
      case Rarity.RARE:
        return 100000;
      case Rarity.EPIC:
        return 250000;
      case Rarity.LEGENDARY:
        return 500000;
      case Rarity.MYTHIC:
        return 1000000;
      default:
        return 10000;
    }
  }

  /**
   * Get the attribute boost percentage for a rarity tier
   * @param rarity The rarity tier
   * @returns The attribute boost percentage
   */
  private getAttributeBoostForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 5;
      case Rarity.UNCOMMON:
        return 10;
      case Rarity.RARE:
        return 15;
      case Rarity.EPIC:
        return 25;
      case Rarity.LEGENDARY:
        return 40;
      case Rarity.MYTHIC:
        return 60;
      default:
        return 5;
    }
  }

  /**
   * Get the particle count boost for a rarity tier
   * @param rarity The rarity tier
   * @returns The particle count boost
   */
  private getParticleCountBoostForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 5;
      case Rarity.UNCOMMON:
        return 10;
      case Rarity.RARE:
        return 15;
      case Rarity.EPIC:
        return 25;
      case Rarity.LEGENDARY:
        return 40;
      case Rarity.MYTHIC:
        return 60;
      default:
        return 5;
    }
  }

  /**
   * Get the particle distribution boost for a rarity tier
   * @param rarity The rarity tier
   * @returns The particle distribution boost
   */
  private getParticleDistributionBoostForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 5;
      case Rarity.UNCOMMON:
        return 10;
      case Rarity.RARE:
        return 15;
      case Rarity.EPIC:
        return 20;
      case Rarity.LEGENDARY:
        return 25;
      case Rarity.MYTHIC:
        return 30;
      default:
        return 5;
    }
  }

  /**
   * Get the cooldown reduction percentage for a rarity tier
   * @param rarity The rarity tier
   * @returns The cooldown reduction percentage
   */
  private getCooldownReductionForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 5;
      case Rarity.UNCOMMON:
        return 10;
      case Rarity.RARE:
        return 15;
      case Rarity.EPIC:
        return 20;
      case Rarity.LEGENDARY:
        return 30;
      case Rarity.MYTHIC:
        return 40;
      default:
        return 5;
    }
  }

  /**
   * Get the damage increase percentage for a rarity tier
   * @param rarity The rarity tier
   * @returns The damage increase percentage
   */
  private getDamageIncreaseForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 5;
      case Rarity.UNCOMMON:
        return 10;
      case Rarity.RARE:
        return 20;
      case Rarity.EPIC:
        return 30;
      case Rarity.LEGENDARY:
        return 50;
      case Rarity.MYTHIC:
        return 75;
      default:
        return 5;
    }
  }

  /**
   * Get the synergy bonus percentage for a rarity tier
   * @param rarity The rarity tier
   * @returns The synergy bonus percentage
   */
  private getSynergyBonusForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 3;
      case Rarity.UNCOMMON:
        return 6;
      case Rarity.RARE:
        return 10;
      case Rarity.EPIC:
        return 15;
      case Rarity.LEGENDARY:
        return 25;
      case Rarity.MYTHIC:
        return 40;
      default:
        return 3;
    }
  }

  /**
   * Get a random color in hex format
   * @returns A random color in hex format
   */
  private getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }

  /**
   * Get the size change percentage for a rarity tier
   * @param rarity The rarity tier
   * @returns The size change percentage
   */
  private getSizeChangeForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 5;
      case Rarity.UNCOMMON:
        return 10;
      case Rarity.RARE:
        return 15;
      case Rarity.EPIC:
        return 20;
      case Rarity.LEGENDARY:
        return 30;
      case Rarity.MYTHIC:
        return 50;
      default:
        return 5;
    }
  }

  /**
   * Get the density change for a rarity tier
   * @param rarity The rarity tier
   * @returns The density change
   */
  private getDensityChangeForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 0.05;
      case Rarity.UNCOMMON:
        return 0.1;
      case Rarity.RARE:
        return 0.15;
      case Rarity.EPIC:
        return 0.2;
      case Rarity.LEGENDARY:
        return 0.3;
      case Rarity.MYTHIC:
        return 0.5;
      default:
        return 0.05;
    }
  }

  /**
   * Get the range change for a rarity tier
   * @param rarity The rarity tier
   * @returns The range change
   */
  private getRangeChangeForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 1;
      case Rarity.UNCOMMON:
        return 2;
      case Rarity.RARE:
        return 3;
      case Rarity.EPIC:
        return 5;
      case Rarity.LEGENDARY:
        return 8;
      case Rarity.MYTHIC:
        return 12;
      default:
        return 1;
    }
  }

  /**
   * Get the stability change for a rarity tier
   * @param rarity The rarity tier
   * @returns The stability change
   */
  private getStabilityChangeForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 0.05;
      case Rarity.UNCOMMON:
        return 0.1;
      case Rarity.RARE:
        return 0.15;
      case Rarity.EPIC:
        return 0.2;
      case Rarity.LEGENDARY:
        return 0.3;
      case Rarity.MYTHIC:
        return 0.5;
      default:
        return 0.05;
    }
  }

  /**
   * Get the speed change for a rarity tier
   * @param rarity The rarity tier
   * @returns The speed change
   */
  private getSpeedChangeForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 0.05;
      case Rarity.UNCOMMON:
        return 0.1;
      case Rarity.RARE:
        return 0.15;
      case Rarity.EPIC:
        return 0.2;
      case Rarity.LEGENDARY:
        return 0.3;
      case Rarity.MYTHIC:
        return 0.5;
      default:
        return 0.05;
    }
  }

  /**
   * Get the aggression change for a rarity tier
   * @param rarity The rarity tier
   * @returns The aggression change
   */
  private getAggressionChangeForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 0.05;
      case Rarity.UNCOMMON:
        return 0.1;
      case Rarity.RARE:
        return 0.15;
      case Rarity.EPIC:
        return 0.2;
      case Rarity.LEGENDARY:
        return 0.3;
      case Rarity.MYTHIC:
        return 0.5;
      default:
        return 0.05;
    }
  }

  /**
   * Get the cohesion change for a rarity tier
   * @param rarity The rarity tier
   * @returns The cohesion change
   */
  private getCohesionChangeForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.COMMON:
        return 0.05;
      case Rarity.UNCOMMON:
        return 0.1;
      case Rarity.RARE:
        return 0.15;
      case Rarity.EPIC:
        return 0.2;
      case Rarity.LEGENDARY:
        return 0.3;
      case Rarity.MYTHIC:
        return 0.5;
      default:
        return 0.05;
    }
  }

  /**
   * Get the exotic boost for a rarity tier
   * @param rarity The rarity tier
   * @returns The exotic boost percentage
   */
  private getExoticBoostForRarity(rarity: Rarity): number {
    switch (rarity) {
      case Rarity.LEGENDARY:
        return 50;
      case Rarity.MYTHIC:
        return 100;
      default:
        return 25;
    }
  }
}

/**
 * Get the mutation bank loader instance
 * @returns The mutation bank loader instance
 */
export function getMutationBankLoader(): MutationBankLoader {
  return MutationBankLoader.getInstance();
}
