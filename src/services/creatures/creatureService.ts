/**
 * Creature Service
 * 
 * This service provides methods for managing creatures in the application.
 * It integrates with the creature generator, storage service, and event service.
 */

import { Creature, CreatureGenerationOptions } from '../../types/creature';
import { getCreatureGenerator } from './creatureGenerator';
import { getStorageService } from '../storage/storageService';
import { getEventService } from '../events/eventService';
import { BlockData } from '../../types/bitcoin';

// Singleton instance
let instance: CreatureService | null = null;

/**
 * Creature Service class
 */
class CreatureService {
  private initialized: boolean = false;
  private blockData: BlockData | null = null;

  /**
   * Initialize the creature service with block data
   * @param blockData The Bitcoin block data
   */
  initialize(blockData: BlockData): void {
    this.blockData = blockData;
    
    // Initialize the creature generator
    const creatureGenerator = getCreatureGenerator();
    if (!creatureGenerator.isInitialized()) {
      creatureGenerator.initialize();
    }
    
    this.initialized = true;
  }

  /**
   * Create a new creature from the current block data
   * @param options Optional creature generation options
   * @returns The newly created creature, or null if creation failed
   */
  createCreature(options?: Partial<CreatureGenerationOptions>): Creature | null {
    if (!this.initialized || !this.blockData) {
      console.warn('CreatureService not initialized with block data');
      return null;
    }

    try {
      // Create generation options with current block data
      const generationOptions: CreatureGenerationOptions = {
        blockNumber: options?.blockNumber || this.blockData.number,
        blockData: options?.blockData || this.blockData,
        particleDistribution: options?.particleDistribution,
        forcedTraits: options?.forcedTraits
      };

      // Generate a creature
      const creature = getCreatureGenerator().generateCreature(generationOptions);
      
      // Save the creature
      getStorageService().saveCreature(creature);
      
      // Emit creature created event
      getEventService().emitCreatureCreated(creature);
      
      return creature;
    } catch (error) {
      console.error('Failed to create creature:', error);
      getEventService().emitError('CreatureService', 'Failed to create creature', error);
      return null;
    }
  }

  /**
   * Get a creature by ID
   * @param creatureId The creature ID
   * @returns The creature or null if not found
   */
  getCreature(creatureId: string): Creature | null {
    return getStorageService().loadCreature(creatureId);
  }

  /**
   * Get all creatures
   * @returns Array of all creatures
   */
  getAllCreatures(): Creature[] {
    return getStorageService().loadAllCreatures();
  }

  /**
   * Delete a creature
   * @param creatureId The ID of the creature to delete
   * @returns True if deletion was successful
   */
  deleteCreature(creatureId: string): boolean {
    return getStorageService().deleteCreature(creatureId);
  }

  /**
   * Update a creature
   * @param creature The creature to update
   * @returns True if update was successful
   */
  updateCreature(creature: Creature): boolean {
    // Update lastUpdatedAt timestamp
    creature.lastUpdatedAt = Date.now();
    
    // Save to storage
    const success = getStorageService().saveCreature(creature);
    
    if (success) {
      // Emit creature updated event
      getEventService().emit({
        type: 'CREATURE_UPDATED',
        timestamp: Date.now(),
        source: 'CreatureService',
        data: {
          creatureId: creature.id,
          blockNumber: creature.blockNumber
        }
      });
    }
    
    return success;
  }

  /**
   * Check if the service is initialized
   * @returns True if the service is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }
}

/**
 * Get the creature service instance
 * @returns The creature service singleton instance
 */
export function getCreatureService(): CreatureService {
  if (!instance) {
    instance = new CreatureService();
  }
  return instance;
} 