/**
 * Ability Bank Loader for Bitcoin Protozoa
 *
 * This service is responsible for loading ability data from various sources
 * and creating an ability bank for use by the ability service.
 */

import { Role } from '../../types/core';
import { Tier, Ability, AbilityPool, FormationTrait } from '../../types/ability';

/**
 * Ability bank loader class
 */
export class AbilityBankLoader {
  /**
   * Load ability data from JSON files
   * @param basePath The base path to the ability data files
   * @returns A promise resolving to an ability bank
   */
  public async loadFromFiles(basePath: string): Promise<Record<string, Record<number, AbilityPool>>> {
    try {
      // Create empty ability bank
      const abilityBank: Record<string, Record<number, AbilityPool>> = {
        [Role.CORE]: {},
        [Role.ATTACK]: {},
        [Role.DEFENSE]: {},
        [Role.CONTROL]: {},
        [Role.MOVEMENT]: {}
      };

      // Load ability pools for each role and tier
      for (const role of Object.values(Role)) {
        // Only load Common and Uncommon tiers from pools
        // Higher tiers use predefined subclasses
        for (const tier of [Tier.Common, Tier.Uncommon]) {
          try {
            const filePath = `${basePath}/${role.toLowerCase()}/${Tier[tier].toLowerCase()}.json`;
            // In a real implementation, we would load the file here
            // For now, we'll use mock data
            abilityBank[role][tier] = this.createMockAbilityPool(role, tier);
          } catch (error) {
            console.error(`Error loading ability pool for ${role}, tier ${tier}:`, error);
          }
        }
      }

      return abilityBank;
    } catch (error) {
      console.error('Error loading ability bank:', error);
      throw error;
    }
  }

  /**
   * Create a mock ability bank for testing
   * @returns An ability bank with mock data
   */
  public createMockAbilityBank(): Record<string, Record<number, AbilityPool>> {
    // Create empty ability bank
    const abilityBank: Record<string, Record<number, AbilityPool>> = {
      [Role.CORE]: {},
      [Role.ATTACK]: {},
      [Role.DEFENSE]: {},
      [Role.CONTROL]: {},
      [Role.MOVEMENT]: {}
    };

    // Initialize with mock data for each role and tier
    for (const role of Object.values(Role)) {
      // Only create Common and Uncommon tiers
      // Higher tiers use predefined subclasses
      for (const tier of [Tier.Common, Tier.Uncommon]) {
        abilityBank[role][tier] = this.createMockAbilityPool(role, tier);
      }
    }

    return abilityBank;
  }

  /**
   * Create a mock ability pool for a role and tier
   * @param role The role
   * @param tier The tier
   * @returns A mock ability pool
   */
  private createMockAbilityPool(role: Role, tier: Tier): AbilityPool {
    // Create mock abilities based on role and tier
    const primary: Ability[] = [];
    const secondary: Ability[] = [];
    const unique: Ability[] = [];
    const crowdControl: Ability[] = [];
    const formationTraits: FormationTrait[] = [];

    // Add mock abilities based on role
    switch (role) {
      case Role.CORE:
        primary.push(
          this.createMockAbility('Healing Pulse', 'Heals nearby allies for 10% of their max health', 'primary', tier),
          this.createMockAbility('Energy Transfer', 'Transfers 20% of your energy to an ally', 'primary', tier)
        );
        secondary.push(
          this.createMockAbility('Stabilize', 'Reduces damage taken by 15% for 5 seconds', 'secondary', tier),
          this.createMockAbility('Energize', 'Increases energy regeneration by 20% for 5 seconds', 'secondary', tier)
        );
        unique.push(
          this.createMockAbility('Core Surge', 'Releases a burst of energy, healing all allies for 5% of their max health', 'unique', tier),
          this.createMockAbility('Vital Link', 'Creates a link with an ally, sharing 10% of healing received', 'unique', tier)
        );
        crowdControl.push(
          this.createMockAbility('Stasis Field', 'Creates a field that slows enemies by 20% for 3 seconds', 'crowdControl', tier),
          this.createMockAbility('Repulsion Wave', 'Pushes enemies away from you', 'crowdControl', tier)
        );
        formationTraits.push(
          this.createMockFormationTrait('Core Resonance', 'Increases healing done by 10%', tier),
          this.createMockFormationTrait('Energy Flow', 'Increases energy regeneration by 10%', tier)
        );
        break;

      case Role.ATTACK:
        primary.push(
          this.createMockAbility('Quick Strike', 'Deals 15% max HP damage to one enemy', 'primary', tier),
          this.createMockAbility('Heavy Strike', 'Deals 20% max HP damage to one enemy', 'primary', tier)
        );
        secondary.push(
          this.createMockAbility('Expose Weakness', 'Increases damage dealt to target by 10% for 5 seconds', 'secondary', tier),
          this.createMockAbility('Sharpen Blades', 'Increases critical strike chance by 10% for 5 seconds', 'secondary', tier)
        );
        unique.push(
          this.createMockAbility('Frenzy', 'Increases attack speed by 20% for 5 seconds', 'unique', tier),
          this.createMockAbility('Execute', 'Deals 30% max HP damage to enemies below 20% health', 'unique', tier)
        );
        crowdControl.push(
          this.createMockAbility('Stun', 'Stuns target for 2 seconds', 'crowdControl', tier),
          this.createMockAbility('Knockback', 'Knocks target back 5 units', 'crowdControl', tier)
        );
        formationTraits.push(
          this.createMockFormationTrait('Aggressive Stance', 'Increases damage output by 10%', tier),
          this.createMockFormationTrait('Blade Formation', 'Increases critical strike damage by 20%', tier)
        );
        break;

      case Role.DEFENSE:
        primary.push(
          this.createMockAbility('Shield Wall', 'Reduces damage taken by 20% for 5 seconds', 'primary', tier),
          this.createMockAbility('Taunt', 'Forces enemies to attack you for 3 seconds', 'primary', tier)
        );
        secondary.push(
          this.createMockAbility('Fortify', 'Increases armor by 15% for 5 seconds', 'secondary', tier),
          this.createMockAbility('Reflect', 'Reflects 10% of damage taken back to attacker for 5 seconds', 'secondary', tier)
        );
        unique.push(
          this.createMockAbility('Unbreakable', 'Becomes immune to damage for 2 seconds', 'unique', tier),
          this.createMockAbility('Guardian', 'Redirects 20% of damage taken by allies to yourself for 5 seconds', 'unique', tier)
        );
        crowdControl.push(
          this.createMockAbility('Shockwave', 'Knocks back all enemies in a 5 unit radius', 'crowdControl', tier),
          this.createMockAbility('Root', 'Roots target in place for 2 seconds', 'crowdControl', tier)
        );
        formationTraits.push(
          this.createMockFormationTrait('Defensive Formation', 'Increases armor by 10%', tier),
          this.createMockFormationTrait('Shield Wall', 'Reduces damage taken by 10%', tier)
        );
        break;

      case Role.CONTROL:
        primary.push(
          this.createMockAbility('Mind Spike', 'Deals 10% max HP damage and slows target by 20% for 3 seconds', 'primary', tier),
          this.createMockAbility('Disrupt', 'Interrupts target\'s abilities for 2 seconds', 'primary', tier)
        );
        secondary.push(
          this.createMockAbility('Weaken', 'Reduces target\'s damage by 15% for 5 seconds', 'secondary', tier),
          this.createMockAbility('Amplify', 'Increases damage taken by target by 15% for 5 seconds', 'secondary', tier)
        );
        unique.push(
          this.createMockAbility('Mind Control', 'Takes control of target for 3 seconds', 'unique', tier),
          this.createMockAbility('Time Warp', 'Slows time in a 5 unit radius by 30% for 3 seconds', 'unique', tier)
        );
        crowdControl.push(
          this.createMockAbility('Silence', 'Prevents target from using abilities for 3 seconds', 'crowdControl', tier),
          this.createMockAbility('Confuse', 'Causes target to attack random targets for 3 seconds', 'crowdControl', tier)
        );
        formationTraits.push(
          this.createMockFormationTrait('Control Grid', 'Increases crowd control duration by 20%', tier),
          this.createMockFormationTrait('Mental Dominance', 'Increases crowd control effectiveness by 15%', tier)
        );
        break;

      case Role.MOVEMENT:
        primary.push(
          this.createMockAbility('Dash', 'Quickly moves 10 units in the target direction', 'primary', tier),
          this.createMockAbility('Blink', 'Teleports 15 units in the target direction', 'primary', tier)
        );
        secondary.push(
          this.createMockAbility('Speed Boost', 'Increases movement speed by 30% for 5 seconds', 'secondary', tier),
          this.createMockAbility('Agility', 'Increases dodge chance by 15% for 5 seconds', 'secondary', tier)
        );
        unique.push(
          this.createMockAbility('Phase Shift', 'Becomes untargetable for 2 seconds', 'unique', tier),
          this.createMockAbility('Momentum', 'Increases movement speed by 5% for each second in motion, up to 25%', 'unique', tier)
        );
        crowdControl.push(
          this.createMockAbility('Vortex', 'Pulls enemies towards you', 'crowdControl', tier),
          this.createMockAbility('Slow Field', 'Creates a field that slows enemies by 30% for 3 seconds', 'crowdControl', tier)
        );
        formationTraits.push(
          this.createMockFormationTrait('Swift Formation', 'Increases movement speed by 10%', tier),
          this.createMockFormationTrait('Evasive Maneuvers', 'Increases dodge chance by 10%', tier)
        );
        break;
    }

    // Return the ability pool
    return {
      role,
      tier,
      primary,
      secondary,
      unique,
      crowdControl,
      formationTraits
    };
  }

  /**
   * Create a mock ability
   * @param name The ability name
   * @param description The ability description
   * @param category The ability category
   * @param tier The ability tier
   * @returns A mock ability
   */
  private createMockAbility(
    name: string,
    description: string,
    category: 'primary' | 'secondary' | 'unique' | 'crowdControl',
    tier: Tier
  ): Ability {
    return {
      id: `${name.toLowerCase().replace(/\s+/g, '_')}_${tier}`,
      name,
      description,
      cooldown: 10 + (tier * 2), // Higher tiers have longer cooldowns
      category,
      energyCost: 10 + (tier * 5), // Higher tiers cost more energy
      damage: category === 'primary' ? 10 + (tier * 5) : undefined,
      healing: category === 'primary' && name.includes('Heal') ? 10 + (tier * 5) : undefined,
      duration: description.includes('seconds') ? parseInt(description.match(/(\d+) seconds?/)?.[1] || '0') : undefined,
      range: 5 + tier,
      area: description.includes('radius') ? parseInt(description.match(/(\d+) unit radius/)?.[1] || '0') : undefined,
      visualEffect: `${name.toLowerCase().replace(/\s+/g, '_')}_effect`,
      soundEffect: `${name.toLowerCase().replace(/\s+/g, '_')}_sound`
    };
  }

  /**
   * Create a mock formation trait
   * @param name The formation trait name
   * @param description The formation trait description
   * @param tier The formation trait tier
   * @returns A mock formation trait
   */
  private createMockFormationTrait(
    name: string,
    description: string,
    tier: Tier
  ): FormationTrait {
    return {
      id: `${name.toLowerCase().replace(/\s+/g, '_')}_${tier}`,
      name,
      description,
      bonusType: description.includes('damage') ? 'damage' :
                description.includes('healing') ? 'healing' :
                description.includes('armor') ? 'armor' :
                description.includes('speed') ? 'speed' :
                description.includes('dodge') ? 'dodge' :
                description.includes('critical') ? 'critical' :
                description.includes('energy') ? 'energy' :
                description.includes('crowd control') ? 'crowd_control' :
                'other',
      bonusValue: parseInt(description.match(/(\d+)%/)?.[1] || '0'),
      visualEffect: `${name.toLowerCase().replace(/\s+/g, '_')}_effect`
    };
  }
}

// Singleton instance
let abilityBankLoaderInstance: AbilityBankLoader | null = null;

/**
 * Get the ability bank loader instance
 * @returns The ability bank loader instance
 */
export function getAbilityBankLoader(): AbilityBankLoader {
  if (!abilityBankLoaderInstance) {
    abilityBankLoaderInstance = new AbilityBankLoader();
  }
  return abilityBankLoaderInstance;
}
