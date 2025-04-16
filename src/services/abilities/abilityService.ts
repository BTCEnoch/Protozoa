/**
 * Ability Service for Bitcoin Protozoa
 *
 * This service is responsible for managing abilities for particle groups.
 * It handles ability selection, application, and evolution.
 */

import { BlockData } from '../../types/bitcoin/bitcoin';
import { Role } from '../../types/core';
import { Tier, Ability, AbilityPool, FormationTrait } from '../../types/abilities/ability';
import { RNGSystem } from '../../types/utils/rng';
import { createRNGFromBlockNonce } from '../../lib/rngSystem';
import { getAbilityBankLoader } from './abilityBankLoader';

/**
 * Ability service class
 */
export class AbilityService {
  private blockData: BlockData | null = null;
  private rngSystem: RNGSystem | null = null;
  private abilityBank: Record<string, Record<number, AbilityPool>> | null = null;
  private selectedAbilities: Map<string, {
    primary: Ability;
    secondary: Ability;
    unique: Ability;
    crowdControl: Ability;
    formationTrait: FormationTrait;
  }> = new Map();
  private initialized = false;

  /**
   * Initialize the ability service with block data
   * @param blockData The block data to use for RNG
   */
  public initialize(blockData: BlockData): void {
    this.blockData = blockData;
    this.rngSystem = createRNGFromBlockNonce(blockData.nonce);

    // Load ability bank
    const abilityBankLoader = getAbilityBankLoader();
    this.abilityBank = abilityBankLoader.createMockAbilityBank();

    this.selectedAbilities.clear();
    this.initialized = true;

    console.log('Ability service initialized with block data:', blockData);
  }

  /**
   * Check if the service is initialized
   * @returns True if initialized, false otherwise
   */
  public isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Select abilities for a particle group
   * @param groupId The ID of the particle group
   * @param role The role of the particle group
   * @param tier The tier of the particle group
   * @param subclass Optional subclass to filter abilities by
   * @returns The selected abilities
   */
  public selectAbilitiesForGroup(
    groupId: string,
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
    if (!this.initialized || !this.rngSystem || !this.abilityBank) {
      throw new Error('Ability service not initialized');
    }

    // Check if we already have abilities for this group
    if (this.selectedAbilities.has(groupId)) {
      return this.selectedAbilities.get(groupId)!;
    }

    // Get the ability pool for this role and tier
    const abilityPool = this.getAbilityPool(role, tier);
    if (!abilityPool) {
      throw new Error(`No ability pool found for ${role}, tier ${tier}`);
    }

    // Create RNG streams for each ability category
    const primaryRng = this.rngSystem.createStream(`${groupId}_primary`);
    const secondaryRng = this.rngSystem.createStream(`${groupId}_secondary`);
    const uniqueRng = this.rngSystem.createStream(`${groupId}_unique`);
    const crowdControlRng = this.rngSystem.createStream(`${groupId}_crowdControl`);
    const formationTraitRng = this.rngSystem.createStream(`${groupId}_formationTrait`);

    // Filter abilities by subclass if provided
    const filteredPrimary = subclass
      ? abilityPool.primary.filter(a => !a.subclass || a.subclass === subclass)
      : abilityPool.primary;

    const filteredSecondary = subclass
      ? abilityPool.secondary.filter(a => !a.subclass || a.subclass === subclass)
      : abilityPool.secondary;

    const filteredUnique = subclass
      ? abilityPool.unique.filter(a => !a.subclass || a.subclass === subclass)
      : abilityPool.unique;

    const filteredCrowdControl = subclass
      ? abilityPool.crowdControl.filter(a => !a.subclass || a.subclass === subclass)
      : abilityPool.crowdControl;

    const filteredFormationTraits = subclass
      ? abilityPool.formationTraits.filter(ft => !ft.subclass || ft.subclass === subclass)
      : abilityPool.formationTraits;

    // Select one ability from each category
    const primary = this.selectRandomAbility(filteredPrimary, primaryRng);
    const secondary = this.selectRandomAbility(filteredSecondary, secondaryRng);
    const unique = this.selectRandomAbility(filteredUnique, uniqueRng);
    const crowdControl = this.selectRandomAbility(filteredCrowdControl, crowdControlRng);
    const formationTrait = this.selectRandomFormationTrait(filteredFormationTraits, formationTraitRng);

    // Store the selected abilities
    const selectedAbilities = {
      primary,
      secondary,
      unique,
      crowdControl,
      formationTrait
    };

    this.selectedAbilities.set(groupId, selectedAbilities);
    return selectedAbilities;
  }

  /**
   * Get the ability pool for a role and tier
   * @param role The role
   * @param tier The tier
   * @returns The ability pool
   */
  private getAbilityPool(role: Role, tier: Tier): AbilityPool | null {
    if (!this.abilityBank) {
      return null;
    }

    return this.abilityBank[role]?.[tier] || null;
  }

  /**
   * Select a random ability from a list
   * @param abilities The list of abilities
   * @param rng The RNG stream to use
   * @returns A randomly selected ability
   */
  private selectRandomAbility(abilities: Ability[], rng: () => number): Ability {
    if (abilities.length === 0) {
      throw new Error('No abilities to select from');
    }

    const index = Math.floor(rng() * abilities.length);
    return abilities[index];
  }

  /**
   * Select a random formation trait from a list
   * @param formationTraits The list of formation traits
   * @param rng The RNG stream to use
   * @returns A randomly selected formation trait
   */
  private selectRandomFormationTrait(formationTraits: FormationTrait[], rng: () => number): FormationTrait {
    if (formationTraits.length === 0) {
      throw new Error('No formation traits to select from');
    }

    const index = Math.floor(rng() * formationTraits.length);
    return formationTraits[index];
  }
}

// Singleton instance
let abilityServiceInstance: AbilityService | null = null;

/**
 * Get the ability service instance
 * @returns The ability service instance
 */
export function getAbilityService(): AbilityService {
  if (!abilityServiceInstance) {
    abilityServiceInstance = new AbilityService();
  }
  return abilityServiceInstance;
}

