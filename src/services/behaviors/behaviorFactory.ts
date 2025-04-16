/**
 * Behavior Factory for Bitcoin Protozoa
 * 
 * This factory is responsible for creating behaviors for particle groups.
 * It ensures deterministic behavior creation based on Bitcoin block data.
 */

import { Role } from '../../types/creature';
import { RNGSystem } from '../../types/rng';
import { BehaviorTrait } from '../../types/trait';
import { Rarity } from '../../types/core';
import { createRNGFromBlockNonce } from '../../lib/rngSystem';

/**
 * Behavior factory class
 */
export class BehaviorFactory {
  private static instance: BehaviorFactory;
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
  public static getInstance(): BehaviorFactory {
    if (!BehaviorFactory.instance) {
      BehaviorFactory.instance = new BehaviorFactory();
    }
    return BehaviorFactory.instance;
  }

  /**
   * Initialize the behavior factory with a nonce
   * @param nonce The Bitcoin block nonce to use for RNG
   */
  public initialize(nonce: number): void {
    this.rngSystem = createRNGFromBlockNonce(nonce);
    console.log('Behavior factory initialized with nonce:', nonce);
  }

  /**
   * Create a behavior
   * @param params The behavior parameters
   * @returns A behavior trait
   */
  public createBehavior(params: {
    name: string;
    description: string;
    role: Role;
    rarity: Rarity;
    type: string;
    strength?: number;
    range?: number;
    priority?: number;
    persistence?: number;
    frequency?: number;
    additionalParameters?: Record<string, any>;
  }): BehaviorTrait {
    if (!this.rngSystem) {
      throw new Error('Behavior factory not initialized');
    }

    // Create a behavior-specific RNG stream
    const behaviorRng = this.rngSystem.getStream(`behavior_${params.name}_${params.role}`);

    // Generate a random strength if not provided
    const strength = params.strength ?? 0.5 + behaviorRng.next() * 0.5;
    
    // Generate a random range if not provided
    const range = params.range ?? 5 + behaviorRng.next() * 10;
    
    // Generate a random priority if not provided
    const priority = params.priority ?? behaviorRng.next();
    
    // Generate a random persistence if not provided
    const persistence = params.persistence ?? 0.5 + behaviorRng.next() * 0.5;
    
    // Generate a random frequency if not provided
    const frequency = params.frequency ?? 0.5 + behaviorRng.next() * 0.5;

    // Create the behavior trait
    return {
      id: this.generateBehaviorId(params.role, params.type, params.name),
      name: params.name,
      description: params.description,
      rarityTier: params.rarity,
      role: params.role,
      evolutionParameters: {
        mutationChance: 0.1,
        possibleEvolutions: []
      },
      type: params.type,
      physicsLogic: {
        strength,
        range,
        priority,
        persistence,
        frequency,
        additionalParameters: params.additionalParameters ?? {}
      },
      visualEffects: {
        particleEffect: `${params.role.toLowerCase()}_${params.type.toLowerCase()}_effect`,
        trailEffect: `${params.role.toLowerCase()}_${params.type.toLowerCase()}_trail`,
        colorModulation: behaviorRng.next() > 0.5
      }
    };
  }

  /**
   * Create a behavior from a template
   * @param template The behavior template
   * @param overrides The properties to override
   * @returns A behavior trait
   */
  public createBehaviorFromTemplate(
    template: Partial<BehaviorTrait>,
    overrides: Partial<BehaviorTrait> = {}
  ): BehaviorTrait {
    if (!this.rngSystem) {
      throw new Error('Behavior factory not initialized');
    }

    // Create a behavior-specific RNG stream
    const behaviorRng = this.rngSystem.getStream(`behavior_template_${template.name}_${template.role}`);

    // Merge template and overrides
    const merged = {
      ...template,
      ...overrides
    };

    // Ensure required properties are present
    if (!merged.id) {
      merged.id = this.generateBehaviorId(
        merged.role!,
        merged.type!,
        merged.name!
      );
    }

    if (!merged.evolutionParameters) {
      merged.evolutionParameters = {
        mutationChance: 0.1,
        possibleEvolutions: []
      };
    }

    if (!merged.physicsLogic) {
      merged.physicsLogic = {
        strength: 0.5 + behaviorRng.next() * 0.5,
        range: 5 + behaviorRng.next() * 10,
        priority: behaviorRng.next(),
        persistence: 0.5 + behaviorRng.next() * 0.5,
        frequency: 0.5 + behaviorRng.next() * 0.5,
        additionalParameters: {}
      };
    }

    if (!merged.visualEffects) {
      merged.visualEffects = {
        particleEffect: `${merged.role!.toLowerCase()}_${merged.type!.toLowerCase()}_effect`,
        trailEffect: `${merged.role!.toLowerCase()}_${merged.type!.toLowerCase()}_trail`,
        colorModulation: behaviorRng.next() > 0.5
      };
    }

    return merged as BehaviorTrait;
  }

  /**
   * Generate a behavior ID
   * @param role The role
   * @param type The behavior type
   * @param name The behavior name
   * @returns A behavior ID
   */
  public generateBehaviorId(role: Role, type: string, name: string): string {
    // Convert name to snake_case
    const snakeCaseName = name.toLowerCase().replace(/\s+/g, '_');
    
    // Generate ID
    return `${role.toLowerCase()}_${type.toLowerCase()}_${snakeCaseName}`;
  }

  /**
   * Reset the behavior factory
   */
  public reset(): void {
    this.rngSystem = null;
  }
}

/**
 * Get the behavior factory instance
 * @returns The behavior factory instance
 */
export function getBehaviorFactory(): BehaviorFactory {
  return BehaviorFactory.getInstance();
}
