/**
 * Behavior Bank Loader for Bitcoin Protozoa
 * 
 * This service is responsible for loading behavior data from various sources
 * and creating a behavior bank for use by the behavior service.
 */

import { Role } from '../../types/core';
import { 
  Behavior, 
  BehaviorRegistry, 
  BehaviorTriggerType, 
  BehaviorActionType 
} from '../../types/behavior';
import { Tier } from '../../types/ability';

/**
 * Behavior Bank Loader class
 */
export class BehaviorBankLoader {
  private static instance: BehaviorBankLoader;

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
  public static getInstance(): BehaviorBankLoader {
    if (!BehaviorBankLoader.instance) {
      BehaviorBankLoader.instance = new BehaviorBankLoader();
    }
    return BehaviorBankLoader.instance;
  }

  /**
   * Load behavior data from JSON files
   * @param basePath The base path to the behavior data files
   * @returns A promise resolving to a behavior registry
   */
  public async loadFromFiles(basePath: string): Promise<BehaviorRegistry> {
    try {
      // Create empty behavior registry
      const behaviorRegistry: BehaviorRegistry = {};
      
      // Initialize empty arrays for each role and tier
      const roles = Object.values(Role);
      // Use only the enum string values, not the numeric values
      const tiers = [
        Tier.TIER_1,
        Tier.TIER_2,
        Tier.TIER_3,
        Tier.TIER_4,
        Tier.TIER_5,
        Tier.TIER_6
      ];
      
      for (const role of roles) {
        behaviorRegistry[role] = {};
        for (const tier of tiers) {
          behaviorRegistry[role][tier] = [];
        }
      }

      // Load behaviors for each role and tier
      for (const role of roles) {
        for (const tier of tiers) {
          const behaviors = await this.loadBehaviorFile(
            `${basePath}/behaviors/${role.toLowerCase()}_tier${tier.replace('TIER_', '')}_behaviors.json`
          );
          behaviorRegistry[role][tier] = behaviors;
        }
      }

      return behaviorRegistry;
    } catch (error) {
      console.error('Error loading behavior bank:', error);
      throw error;
    }
  }

  /**
   * Load a behavior file
   * @param filePath The path to the behavior file
   * @returns A promise resolving to an array of behaviors
   */
  private async loadBehaviorFile(filePath: string): Promise<Behavior[]> {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        console.warn(`Failed to load behavior file ${filePath}: ${response.status} ${response.statusText}`);
        return [];
      }
      return await response.json();
    } catch (error) {
      console.warn(`Error loading behavior file ${filePath}:`, error);
      return [];
    }
  }

  /**
   * Create a mock behavior registry for testing
   * @returns A behavior registry with mock data
   */
  public createMockBehaviorRegistry(): BehaviorRegistry {
    // Create empty behavior registry
    const behaviorRegistry: BehaviorRegistry = {};
    
    // Initialize with mock data for each role
    const roles = Object.values(Role);
    // Use only the enum string values, not the numeric values
    const tiers = [
      Tier.TIER_1,
      Tier.TIER_2,
      Tier.TIER_3,
      Tier.TIER_4,
      Tier.TIER_5,
      Tier.TIER_6
    ];
    
    for (const role of roles) {
      behaviorRegistry[role] = {};
      for (const tier of tiers) {
        behaviorRegistry[role][tier] = this.createMockBehaviors(role, tier);
      }
    }

    return behaviorRegistry;
  }

  /**
   * Create mock behaviors for a role and tier
   * @param role The role
   * @param tier The tier
   * @returns An array of mock behaviors
   */
  private createMockBehaviors(role: Role, tier: Tier): Behavior[] {
    const subclasses = [
      'Default', 
      'Alpha', 
      'Sentinel', 
      'Guardian', 
      'Assassin', 
      'Commander'
    ];
    
    const triggerTypes = Object.values(BehaviorTriggerType);
    const actionTypes = Object.values(BehaviorActionType);
    
    // Generate 2-4 behaviors per role and tier
    const count = 2 + Math.floor(Math.random() * 3);
    const behaviors: Behavior[] = [];
    
    for (let i = 0; i < count; i++) {
      const subclass = i < subclasses.length ? subclasses[i] : 'Default';
      const triggerType = triggerTypes[i % triggerTypes.length];
      const actionType = actionTypes[i % actionTypes.length];
      
      behaviors.push({
        name: `${role} ${subclass} Behavior ${i}`,
        description: `A tier ${tier} behavior for ${role} ${subclass}`,
        role: role,
        tier: tier as Tier,
        subclass: subclass,
        trigger: {
          type: triggerType,
          condition: `Trigger condition for ${triggerType}`,
          parameters: this.generateMockTriggerParameters(triggerType)
        },
        action: {
          type: actionType,
          description: `Action for ${actionType}`,
          parameters: this.generateMockActionParameters(actionType)
        },
        priority: 50 + (i * 10) // Different priorities
      });
    }
    
    return behaviors;
  }

  /**
   * Generate mock trigger parameters based on trigger type
   * @param triggerType The trigger type
   * @returns Mock trigger parameters
   */
  private generateMockTriggerParameters(triggerType: BehaviorTriggerType): Record<string, any> {
    switch (triggerType) {
      case BehaviorTriggerType.HEALTH_THRESHOLD:
        return { threshold: 0.3 + Math.random() * 0.4 };
      case BehaviorTriggerType.ENEMY_PROXIMITY:
        return { range: 10 + Math.random() * 20 };
      case BehaviorTriggerType.PERIODIC:
        return { interval: 3 + Math.random() * 7 };
      case BehaviorTriggerType.ABILITY_READY:
        return { abilityName: 'SomeAbility' };
      default:
        return {};
    }
  }

  /**
   * Generate mock action parameters based on action type
   * @param actionType The action type
   * @returns Mock action parameters
   */
  private generateMockActionParameters(actionType: BehaviorActionType): Record<string, any> {
    switch (actionType) {
      case BehaviorActionType.ABILITY_USAGE:
        return { abilityName: 'SomeAbility', targetType: 'ENEMY' };
      case BehaviorActionType.MOVEMENT:
        return { direction: 'AWAY', speed: 1 + Math.random() };
      case BehaviorActionType.FORMATION_CHANGE:
        return { formationName: 'DefensiveFormation' };
      default:
        return {};
    }
  }
}

/**
 * Get the behavior bank loader instance
 * @returns The behavior bank loader instance
 */
export function getBehaviorBankLoader(): BehaviorBankLoader {
  return BehaviorBankLoader.getInstance();
} 