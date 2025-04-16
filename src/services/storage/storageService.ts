/**
 * Storage Service
 * 
 * This service provides persistent storage for creatures and other game data.
 * It uses localStorage for browser persistence and provides fallbacks.
 */

import { Creature } from '../../types/creatures/creature';

// Constants
const STORAGE_PREFIX = 'bitcoin_protozoa_';
const CREATURE_PREFIX = `${STORAGE_PREFIX}creature_`;
const SETTINGS_KEY = `${STORAGE_PREFIX}settings`;
const MAX_CREATURES = 50; // Maximum number of creatures to store

// Storage keys
enum StorageKeys {
  CREATURES_INDEX = `${STORAGE_PREFIX}creatures_index`,
  LAST_BLOCK = `${STORAGE_PREFIX}last_block`,
  EVOLUTION_HISTORY = `${STORAGE_PREFIX}evolution_history`,
  USER_PREFERENCES = `${STORAGE_PREFIX}user_preferences`
}

// Types
interface StorageServiceOptions {
  useCompression?: boolean;
  maxCreatures?: number;
}

// Singleton instance
let instance: StorageService | null = null;

/**
 * Storage Service class
 */
class StorageService {
  private initialized: boolean = false;
  private options: StorageServiceOptions;
  private isAvailable: boolean = false;
  private creaturesIndex: string[] = [];

  /**
   * Constructor
   * @param options Storage service options
   */
  constructor(options: StorageServiceOptions = {}) {
    this.options = {
      useCompression: options.useCompression || false,
      maxCreatures: options.maxCreatures || MAX_CREATURES
    };
    
    // Check if localStorage is available
    this.isAvailable = this.checkStorageAvailability();
  }

  /**
   * Initialize the storage service
   */
  initialize(): void {
    if (this.initialized) return;
    
    if (this.isAvailable) {
      // Load creatures index
      const indexJson = localStorage.getItem(StorageKeys.CREATURES_INDEX);
      if (indexJson) {
        try {
          this.creaturesIndex = JSON.parse(indexJson);
        } catch (error) {
          console.error('Failed to parse creatures index:', error);
          this.creaturesIndex = [];
        }
      }
    }
    
    this.initialized = true;
  }

  /**
   * Check if localStorage is available
   * @returns True if localStorage is available
   */
  private checkStorageAvailability(): boolean {
    try {
      const testKey = `${STORAGE_PREFIX}_test`;
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('localStorage is not available:', e);
      return false;
    }
  }

  /**
   * Save a creature to storage
   * @param creature The creature to save
   * @returns True if successful
   */
  saveCreature(creature: Creature): boolean {
    if (!this.initialized) {
      this.initialize();
    }
    
    if (!this.isAvailable) {
      console.warn('Storage is not available, creature not saved');
      return false;
    }
    
    try {
      // Convert creature to JSON string
      const creatureJson = JSON.stringify(creature);
      
      // Create storage key for this creature
      const storageKey = `${CREATURE_PREFIX}${creature.id}`;
      
      // Save creature
      localStorage.setItem(storageKey, creatureJson);
      
      // Update creatures index if needed
      if (!this.creaturesIndex.includes(creature.id)) {
        // Add creature to index
        this.creaturesIndex.push(creature.id);
        
        // If we've exceeded max creatures, remove oldest
        if (this.creaturesIndex.length > (this.options.maxCreatures || MAX_CREATURES)) {
          const oldestCreatureId = this.creaturesIndex.shift(); // Remove oldest
          if (oldestCreatureId) {
            localStorage.removeItem(`${CREATURE_PREFIX}${oldestCreatureId}`);
          }
        }
        
        // Save updated index
        localStorage.setItem(StorageKeys.CREATURES_INDEX, JSON.stringify(this.creaturesIndex));
      }
      
      return true;
    } catch (error) {
      console.error('Failed to save creature:', error);
      return false;
    }
  }

  /**
   * Load a creature from storage
   * @param creatureId The ID of the creature to load
   * @returns The creature object or null if not found
   */
  loadCreature(creatureId: string): Creature | null {
    if (!this.initialized) {
      this.initialize();
    }
    
    if (!this.isAvailable) {
      console.warn('Storage is not available, cannot load creature');
      return null;
    }
    
    try {
      // Get creature JSON from storage
      const storageKey = `${CREATURE_PREFIX}${creatureId}`;
      const creatureJson = localStorage.getItem(storageKey);
      
      if (!creatureJson) {
        return null;
      }
      
      // Parse creature JSON
      return JSON.parse(creatureJson) as Creature;
    } catch (error) {
      console.error(`Failed to load creature ${creatureId}:`, error);
      return null;
    }
  }

  /**
   * Delete a creature from storage
   * @param creatureId The ID of the creature to delete
   * @returns True if successful
   */
  deleteCreature(creatureId: string): boolean {
    if (!this.initialized) {
      this.initialize();
    }
    
    if (!this.isAvailable) {
      console.warn('Storage is not available, cannot delete creature');
      return false;
    }
    
    try {
      // Remove creature from storage
      const storageKey = `${CREATURE_PREFIX}${creatureId}`;
      localStorage.removeItem(storageKey);
      
      // Update creatures index
      const index = this.creaturesIndex.indexOf(creatureId);
      if (index >= 0) {
        this.creaturesIndex.splice(index, 1);
        localStorage.setItem(StorageKeys.CREATURES_INDEX, JSON.stringify(this.creaturesIndex));
      }
      
      return true;
    } catch (error) {
      console.error(`Failed to delete creature ${creatureId}:`, error);
      return false;
    }
  }

  /**
   * Get all creature IDs
   * @returns Array of creature IDs
   */
  getAllCreatureIds(): string[] {
    if (!this.initialized) {
      this.initialize();
    }
    
    return [...this.creaturesIndex];
  }

  /**
   * Load all creatures
   * @returns Array of creatures
   */
  loadAllCreatures(): Creature[] {
    if (!this.initialized) {
      this.initialize();
    }
    
    const creatures: Creature[] = [];
    
    for (const creatureId of this.creaturesIndex) {
      const creature = this.loadCreature(creatureId);
      if (creature) {
        creatures.push(creature);
      }
    }
    
    return creatures;
  }

  /**
   * Save general data to storage
   * @param key The storage key
   * @param data The data to save
   * @returns True if successful
   */
  saveData(key: string, data: any): boolean {
    if (!this.isAvailable) {
      console.warn('Storage is not available, data not saved');
      return false;
    }
    
    try {
      const storageKey = `${STORAGE_PREFIX}${key}`;
      const dataJson = JSON.stringify(data);
      localStorage.setItem(storageKey, dataJson);
      return true;
    } catch (error) {
      console.error(`Failed to save data for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Load general data from storage
   * @param key The storage key
   * @returns The loaded data or null if not found
   */
  loadData(key: string): any {
    if (!this.isAvailable) {
      console.warn('Storage is not available, cannot load data');
      return null;
    }
    
    try {
      const storageKey = `${STORAGE_PREFIX}${key}`;
      const dataJson = localStorage.getItem(storageKey);
      
      if (!dataJson) {
        return null;
      }
      
      return JSON.parse(dataJson);
    } catch (error) {
      console.error(`Failed to load data for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Delete general data from storage
   * @param key The storage key
   * @returns True if successful
   */
  deleteData(key: string): boolean {
    if (!this.isAvailable) {
      console.warn('Storage is not available, cannot delete data');
      return false;
    }
    
    try {
      const storageKey = `${STORAGE_PREFIX}${key}`;
      localStorage.removeItem(storageKey);
      return true;
    } catch (error) {
      console.error(`Failed to delete data for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Clear all storage for this application
   * @returns True if successful
   */
  clearAllStorage(): boolean {
    if (!this.isAvailable) {
      console.warn('Storage is not available, cannot clear storage');
      return false;
    }
    
    try {
      // Remove all items with our prefix
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      }
      
      // Reset creatures index
      this.creaturesIndex = [];
      
      return true;
    } catch (error) {
      console.error('Failed to clear storage:', error);
      return false;
    }
  }

  /**
   * Check if the service is initialized
   * @returns True if the service is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Check if storage is available
   * @returns True if storage is available
   */
  isStorageAvailable(): boolean {
    return this.isAvailable;
  }
}

/**
 * Get the storage service instance
 * @param options Optional configuration options
 * @returns The storage service singleton instance
 */
export function getStorageService(options?: StorageServiceOptions): StorageService {
  if (!instance) {
    instance = new StorageService(options);
  }
  return instance;
} 
