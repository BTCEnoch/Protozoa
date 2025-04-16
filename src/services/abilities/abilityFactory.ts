/**
 * Ability Factory for Bitcoin Protozoa
 *
 * This service creates abilities for particles based on their role and tier.
 * It uses the ability reference to select appropriate abilities.
 */

import { Role, Tier } from '../../types/core';
import { Ability, FormationTrait, getAbilityPool } from '../../types/ability_reference';
import { RNGSystem } from '../../lib/rngSystem';

/**
 * Ability Factory class
 * Creates abilities for particles based on their role and tier
 */
class AbilityFactory {
  private rngSystem: RNGSystem | null = null;

  /**
   * Initialize the ability factory
   * @param rngSystem RNG system for deterministic ability selection
   */
  public initialize(rngSystem: RNGSystem): void {
    this.rngSystem = rngSystem;
    console.log('Ability Factory initialized');
  }

  /**
   * Create abilities for a particle
   * @param role Particle role
   * @param tier Particle tier
   * @param subclass Optional subclass name for higher tier particles
   * @returns Object containing the particle's abilities
   */
  public createAbilities(
    role: Role,
    tier: Tier,
    subclass?: string
  ): {
    primary: Ability;
    secondary: Ability;
    unique: Ability;
    crowdControl: Ability;
    formationTrait: FormationTrait;
  } {
    if (!this.rngSystem) {
      throw new Error('Ability Factory not initialized');
    }

    // Get the ability pool for the role and tier
    const abilityPool = getAbilityPool(role, tier);

    // For higher tiers (Rare+), we use subclass to determine abilities
    // For Common and Uncommon, we randomly select from the pool
    if (tier >= Tier.RARE && subclass) {
      // For higher tiers, we should have predefined ability sets for each subclass
      // This would typically involve a mapping of subclasses to specific ability IDs
      // For now, we'll use a deterministic approach based on the subclass name

      // Use the subclass name to seed a deterministic selection
      const subclassSeed = this.getSubclassSeed(subclass);

      // Select abilities deterministically based on the subclass seed
      const primary = this.selectDeterministicAbility(abilityPool.primary, subclassSeed);
      const secondary = this.selectDeterministicAbility(abilityPool.secondary, subclassSeed + 1);
      const unique = this.selectDeterministicAbility(abilityPool.unique, subclassSeed + 2);
      const crowdControl = this.selectDeterministicAbility(abilityPool.crowdControl, subclassSeed + 3);
      const formationTrait = this.selectDeterministicFormationTrait(abilityPool.formationTraits, subclassSeed + 4);

      return {
        primary,
        secondary,
        unique,
        crowdControl,
        formationTrait
      };
    }

    // Select abilities randomly from the pool
    const primary = this.selectRandomAbility(abilityPool.primary);
    const secondary = this.selectRandomAbility(abilityPool.secondary);
    const unique = this.selectRandomAbility(abilityPool.unique);
    const crowdControl = this.selectRandomAbility(abilityPool.crowdControl);
    const formationTrait = this.selectRandomFormationTrait(abilityPool.formationTraits);

    return {
      primary,
      secondary,
      unique,
      crowdControl,
      formationTrait
    };
  }

  /**
   * Select a random ability from an array of abilities
   * @param abilities Array of abilities to select from
   * @returns Selected ability
   */
  private selectRandomAbility(abilities: Ability[]): Ability {
    if (!this.rngSystem || abilities.length === 0) {
      throw new Error('No abilities available or RNG system not initialized');
    }

    const index = this.rngSystem.getRandomInt(0, abilities.length - 1);
    return abilities[index];
  }

  /**
   * Select a random formation trait from an array of formation traits
   * @param formationTraits Array of formation traits to select from
   * @returns Selected formation trait
   */
  private selectRandomFormationTrait(formationTraits: FormationTrait[]): FormationTrait {
    if (!this.rngSystem || formationTraits.length === 0) {
      throw new Error('No formation traits available or RNG system not initialized');
    }

    const index = this.rngSystem.getRandomInt(0, formationTraits.length - 1);
    return formationTraits[index];
  }

  /**
   * Create a specific ability by ID
   * @param abilityId Ability ID
   * @param role Particle role
   * @param tier Particle tier
   * @returns The ability with the specified ID, or undefined if not found
   */
  public createAbilityById(
    abilityId: string,
    role: Role,
    tier: Tier
  ): Ability | undefined {
    // Get the ability pool for the role and tier
    const abilityPool = getAbilityPool(role, tier);

    // Search for the ability in all categories
    const ability = [
      ...abilityPool.primary,
      ...abilityPool.secondary,
      ...abilityPool.unique,
      ...abilityPool.crowdControl
    ].find(ability => ability.id === abilityId);

    return ability;
  }

  /**
   * Create a specific formation trait by ID
   * @param traitId Formation trait ID
   * @param role Particle role
   * @param tier Particle tier
   * @returns The formation trait with the specified ID, or undefined if not found
   */
  public createFormationTraitById(
    traitId: string,
    role: Role,
    tier: Tier
  ): FormationTrait | undefined {
    // Get the ability pool for the role and tier
    const abilityPool = getAbilityPool(role, tier);

    // Search for the formation trait
    const formationTrait = abilityPool.formationTraits.find(trait => trait.id === traitId);

    return formationTrait;
  }

  /**
   * Generate a seed value from a subclass name for deterministic ability selection
   * @param subclass The subclass name
   * @returns A numeric seed value
   */
  private getSubclassSeed(subclass: string): number {
    // Simple hash function to convert the subclass name to a number
    let hash = 0;
    for (let i = 0; i < subclass.length; i++) {
      const char = subclass.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Select an ability deterministically based on a seed value
   * @param abilities Array of abilities to select from
   * @param seed Seed value for deterministic selection
   * @returns Selected ability
   */
  private selectDeterministicAbility(abilities: Ability[], seed: number): Ability {
    if (!abilities.length) {
      throw new Error('No abilities available for deterministic selection');
    }

    // Use the seed to select an ability deterministically
    const index = seed % abilities.length;
    return abilities[index];
  }

  /**
   * Select a formation trait deterministically based on a seed value
   * @param formationTraits Array of formation traits to select from
   * @param seed Seed value for deterministic selection
   * @returns Selected formation trait
   */
  private selectDeterministicFormationTrait(formationTraits: FormationTrait[], seed: number): FormationTrait {
    if (!formationTraits.length) {
      throw new Error('No formation traits available for deterministic selection');
    }

    // Use the seed to select a formation trait deterministically
    const index = seed % formationTraits.length;
    return formationTraits[index];
  }
}

// Singleton instance
let abilityFactoryInstance: AbilityFactory | null = null;

/**
 * Get the ability factory instance
 * @returns AbilityFactory instance
 */
export function getAbilityFactory(): AbilityFactory {
  if (!abilityFactoryInstance) {
    abilityFactoryInstance = new AbilityFactory();
  }

  return abilityFactoryInstance;
}
