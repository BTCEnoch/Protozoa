/**
 * Random number generation utilities for Bitcoin Protozoa
 */

/**
 * Mulberry32 is a simple, fast, and high-quality 32-bit RNG
 * It's used for deterministic random number generation based on Bitcoin block data
 */
export class Mulberry32 {
  private state: number;

  /**
   * Create a new Mulberry32 RNG
   * @param seed The seed for the RNG
   */
  constructor(seed: number) {
    this.state = seed >>> 0; // Convert to 32-bit unsigned integer
  }

  /**
   * Generate a random number between 0 and 1
   * @returns A random number between 0 and 1
   */
  public random(): number {
    // Update the state
    let z = (this.state += 0x6D2B79F5);
    
    // Mix the bits
    z = (z ^ (z >>> 15)) * (z | 1);
    z ^= z + (z ^ (z >>> 7)) * (z | 61);
    
    // Return a number between 0 and 1
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * Generate a random integer between min (inclusive) and max (inclusive)
   * @param min The minimum value (inclusive)
   * @param max The maximum value (inclusive)
   * @returns A random integer between min and max
   */
  public randomInt(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random float between min (inclusive) and max (exclusive)
   * @param min The minimum value (inclusive)
   * @param max The maximum value (exclusive)
   * @returns A random float between min and max
   */
  public randomFloat(min: number, max: number): number {
    return this.random() * (max - min) + min;
  }

  /**
   * Generate a random boolean with the given probability of being true
   * @param probability The probability of the result being true (default: 0.5)
   * @returns A random boolean
   */
  public randomBoolean(probability: number = 0.5): boolean {
    return this.random() < probability;
  }

  /**
   * Randomly select an item from an array
   * @param array The array to select from
   * @returns A randomly selected item from the array
   */
  public randomItem<T>(array: T[]): T {
    return array[this.randomInt(0, array.length - 1)];
  }

  /**
   * Randomly select multiple items from an array
   * @param array The array to select from
   * @param count The number of items to select
   * @param allowDuplicates Whether to allow duplicates (default: false)
   * @returns An array of randomly selected items
   */
  public randomItems<T>(array: T[], count: number, allowDuplicates: boolean = false): T[] {
    if (count <= 0) {
      return [];
    }

    if (count >= array.length && !allowDuplicates) {
      return [...array]; // Return a copy of the entire array
    }

    if (allowDuplicates) {
      // Select items with duplicates allowed
      const result: T[] = [];
      for (let i = 0; i < count; i++) {
        result.push(this.randomItem(array));
      }
      return result;
    } else {
      // Select items without duplicates
      const shuffled = this.shuffle([...array]);
      return shuffled.slice(0, count);
    }
  }

  /**
   * Deterministically shuffle an array using a seeded Fisher-Yates algorithm
   * @param array The array to shuffle
   * @param streamName Unique identifier for the RNG stream to ensure determinism
   * @returns A new shuffled array
   */
  public shuffle<T>(array: T[], streamName: string): T[] {
    const shuffleStream = this.getStream(`${streamName}_shuffle`);
    const result = [...array];
    
    // Use a dedicated RNG stream for this specific shuffle operation
    for (let i = result.length - 1; i > 0; i--) {
      const j = shuffleStream.nextInt(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }
    
    return result;
  }

  /**
   * Select a weighted random item from an array
   * @param array The array of items
   * @param weights The array of weights corresponding to the items
   * @returns A randomly selected item based on weights
   */
  public weightedRandomItem<T>(array: T[], weights: number[]): T {
    if (array.length !== weights.length) {
      throw new Error('Array and weights must have the same length');
    }

    // Calculate the sum of weights
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

    // Generate a random value between 0 and the total weight
    const randomValue = this.randomFloat(0, totalWeight);

    // Find the item corresponding to the random value
    let cumulativeWeight = 0;
    for (let i = 0; i < array.length; i++) {
      cumulativeWeight += weights[i];
      if (randomValue < cumulativeWeight) {
        return array[i];
      }
    }

    // Fallback (should never happen)
    return array[array.length - 1];
  }

  /**
   * Generate a random color in hexadecimal format
   * @returns A random color in hexadecimal format (e.g., "#FF0000")
   */
  public randomColor(): string {
    const r = this.randomInt(0, 255).toString(16).padStart(2, '0');
    const g = this.randomInt(0, 255).toString(16).padStart(2, '0');
    const b = this.randomInt(0, 255).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  /**
   * Reset the RNG to its initial state with the given seed
   * @param seed The seed for the RNG
   */
  public reset(seed: number): void {
    this.state = seed >>> 0;
  }
}

