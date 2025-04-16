/**
 * Formation Bank Loader for Bitcoin Protozoa
 *
 * This service is responsible for loading formation data from various sources
 * and creating a formation bank for use by the formation service.
 */

import { Role, Tier } from '../../types/core';
import { Formation, FormationBank, FormationPattern } from '../../types/formation';
import { Vector3 } from '../../types/common';
import { RNGSystem } from '../../types/rng';

/**
 * Formation bank loader class
 */
class FormationBankLoader {
  private static instance: FormationBankLoader | null = null;
  private rngSystem: RNGSystem | null = null;

  /**
   * Private constructor for singleton pattern
   */
  private constructor() {
    // Initialize with empty state
  }

  /**
   * Get the singleton instance
   * @returns The singleton instance
   */
  public static getInstance(): FormationBankLoader {
    if (!FormationBankLoader.instance) {
      FormationBankLoader.instance = new FormationBankLoader();
    }
    return FormationBankLoader.instance;
  }

  /**
   * Initialize the loader with an RNG system
   * @param rngSystem RNG system for deterministic creation
   */
  public initialize(rngSystem: RNGSystem): void {
    this.rngSystem = rngSystem;
  }

  /**
   * Load formations from files
   * @returns Formation bank loaded from files
   */
  public loadFromFiles(): FormationBank {
    // In a real implementation, this would load formations from files
    // For now, we'll create mock formations
    return this.createMockFormationBank();
  }

  /**
   * Create a mock formation bank for testing
   * @returns A formation bank with mock data
   */
  public createMockFormationBank(): FormationBank {
    if (!this.rngSystem) {
      throw new Error('RNG system not initialized');
    }

    const bank: FormationBank = {
      formations: [],
      getFormationsByRole: (role: Role) => bank.formations.filter(f => f.role === role),
      getFormationsByRarity: (rarity: Tier) => bank.formations.filter(f => f.rarity === rarity),
      getFormationById: (id: string) => bank.formations.find(f => f.id === id)
    };

    // Create formations for each role
    for (const role of Object.values(Role)) {
      bank.formations.push(...this.createFormationsForRole(role as Role));
    }

    return bank;
  }

  /**
   * Create formations for a specific role
   * @param role Particle role
   * @returns Array of formations for the role
   */
  private createFormationsForRole(role: Role): Formation[] {
    if (!this.rngSystem) {
      throw new Error('RNG system not initialized');
    }

    const formations: Formation[] = [];
    const roleRng = this.rngSystem.getStream(`formations-${role}`);

    // Define role-specific patterns
    const patterns: Record<Role, FormationPattern[]> = {
      [Role.CORE]: ['sphere', 'circle', 'spiral'],
      [Role.CONTROL]: ['grid', 'cube', 'vortex'],
      [Role.MOVEMENT]: ['line', 'spiral', 'vortex'],
      [Role.DEFENSE]: ['circle', 'sphere', 'cube'],
      [Role.ATTACK]: ['vortex', 'spiral', 'line']
    };

    // Define role-specific names
    const names: Record<Role, string[]> = {
      [Role.CORE]: ['Nucleus', 'Orbit', 'Nexus', 'Pulse', 'Beacon'],
      [Role.CONTROL]: ['Grid', 'Matrix', 'Network', 'Command', 'Dominion'],
      [Role.MOVEMENT]: ['Flux', 'Stream', 'Surge', 'Drift', 'Glide'],
      [Role.DEFENSE]: ['Shield', 'Barrier', 'Bulwark', 'Aegis', 'Rampart'],
      [Role.ATTACK]: ['Strike', 'Assault', 'Barrage', 'Onslaught', 'Volley']
    };

    // Create formations for each rarity
    for (const rarity of Object.values(Tier)) {
      // Skip if not a valid rarity
      if (typeof rarity !== 'string') continue;

      // Create 3 formations per rarity
      for (let i = 0; i < 3; i++) {
        // Select a pattern for this role
        const rolePatterns = patterns[role];
        const patternIndex = Math.floor(roleRng.next() * rolePatterns.length);
        const pattern = rolePatterns[patternIndex];

        // Select a name for this formation
        const roleNames = names[role];
        const nameIndex = Math.floor(roleRng.next() * roleNames.length);
        const name = `${roleNames[nameIndex]} ${rarity}`;

        // Generate scale based on role and rarity
        const baseScale = 5.0;
        const roleScales: Record<Role, number> = {
          [Role.CORE]: 0.8,
          [Role.CONTROL]: 1.2,
          [Role.MOVEMENT]: 1.5,
          [Role.DEFENSE]: 1.0,
          [Role.ATTACK]: 1.3
        };
        const rarityScales: Record<Tier, number> = {
          [Tier.COMMON]: 0.8,
          [Tier.UNCOMMON]: 1.0,
          [Tier.RARE]: 1.2,
          [Tier.EPIC]: 1.4,
          [Tier.LEGENDARY]: 1.6,
          [Tier.MYTHIC]: 2.0
        };
        const scale = baseScale * roleScales[role] * rarityScales[rarity as Tier];

        // Create the formation
        formations.push({
          id: `formation-${role}-${rarity}-${i}`,
          name,
          role,
          rarity: rarity as Tier,
          pattern,
          scale,
          center: { x: 0, y: 0, z: 0 },
          description: `A ${rarity.toLowerCase()} tier formation for ${role.toLowerCase()} particles.`,
          effects: this.getFormationEffects(role, rarity as Tier)
        });
      }
    }

    return formations;
  }

  /**
   * Get formation effects for a role and rarity
   * @param role Particle role
   * @param rarity Formation rarity
   * @returns Formation effects
   */
  private getFormationEffects(role: Role, rarity: Tier): Record<string, number> {
    // Define base effect values
    const baseEffects: Record<string, number> = {
      cohesion: 1.0,
      separation: 1.0,
      alignment: 1.0,
      speed: 1.0,
      stability: 1.0,
      attackBonus: 0.0,
      defenseBonus: 0.0,
      controlBonus: 0.0,
      movementBonus: 0.0,
      coreBonus: 0.0
    };

    // Define rarity multipliers
    const rarityMultipliers: Record<Tier, number> = {
      [Tier.COMMON]: 1.0,
      [Tier.UNCOMMON]: 1.2,
      [Tier.RARE]: 1.5,
      [Tier.EPIC]: 1.8,
      [Tier.LEGENDARY]: 2.2,
      [Tier.MYTHIC]: 3.0
    };

    // Apply role-specific bonuses
    switch (role) {
      case Role.CORE:
        baseEffects.coreBonus = 0.2;
        baseEffects.stability = 1.5;
        break;
      case Role.CONTROL:
        baseEffects.controlBonus = 0.2;
        baseEffects.alignment = 1.5;
        break;
      case Role.MOVEMENT:
        baseEffects.movementBonus = 0.2;
        baseEffects.speed = 1.5;
        break;
      case Role.DEFENSE:
        baseEffects.defenseBonus = 0.2;
        baseEffects.cohesion = 1.5;
        break;
      case Role.ATTACK:
        baseEffects.attackBonus = 0.2;
        baseEffects.separation = 1.5;
        break;
    }

    // Apply rarity multiplier
    const rarityMultiplier = rarityMultipliers[rarity];
    const effects: Record<string, number> = {};

    for (const [key, value] of Object.entries(baseEffects)) {
      effects[key] = value * rarityMultiplier;
    }

    return effects;
  }

  /**
   * Get formations by rarity
   * @param rarity Formation rarity
   * @param bank Formation bank
   * @returns Array of formations with the specified rarity
   */
  public getFormationsByRarity(rarity: Tier, bank: FormationBank): Formation[] {
    return bank.getFormationsByRarity(rarity);
  }

  /**
   * Get formation by ID
   * @param id Formation ID
   * @param bank Formation bank
   * @returns Formation with the specified ID, or undefined if not found
   */
  public getFormationById(id: string, bank: FormationBank): Formation | undefined {
    return bank.getFormationById(id);
  }
}

/**
 * Get the formation bank loader instance
 * @returns The formation bank loader instance
 */
export function getFormationBankLoader(): FormationBankLoader {
  return FormationBankLoader.getInstance();
}
