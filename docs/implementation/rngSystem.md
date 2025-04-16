# RNG System Implementation

This document provides the implementation details for the Random Number Generation (RNG) system that uses Bitcoin block nonce as a seed to provide deterministic randomness for creature generation.

## Core RNG Function

The core of our RNG system is the Mulberry32 algorithm, which takes a seed (the Bitcoin block nonce) and produces a sequence of pseudorandom numbers:

```typescript
/**
 * Mulberry32 is a simple but high-quality 32-bit RNG
 * @param seed The seed value (Bitcoin block nonce)
 * @returns A function that generates random numbers between 0 and 1
 */
function mulberry32(seed: number): () => number {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
```

## RNG Stream Interface

Each aspect of creature generation uses a separate RNG stream to maintain separation of concerns:

```typescript
/**
 * RNG Stream interface
 */
interface RNGStream {
  // Returns a random number between 0 and 1
  next(): number;
  
  // Returns a random integer between min and max (inclusive)
  nextInt(min: number, max: number): number;
  
  // Returns true with probability equal to the given value
  nextBool(probability: number): boolean;
  
  // Returns a random item from the array
  nextItem<T>(array: T[]): T;
  
  // Returns n random items from the array
  nextItems<T>(array: T[], count: number): T[];
  
  // Returns a shuffled copy of the array
  shuffle<T>(array: T[]): T[];
}
```

## RNG Stream Implementation

```typescript
/**
 * RNG Stream implementation
 */
class RNGStreamImpl implements RNGStream {
  private rng: () => number;

  constructor(seed: number) {
    this.rng = mulberry32(seed);
  }

  next(): number {
    return this.rng();
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  nextBool(probability: number): boolean {
    return this.next() < probability;
  }

  nextItem<T>(array: T[]): T {
    if (array.length === 0) {
      throw new Error('Cannot select an item from an empty array');
    }
    return array[this.nextInt(0, array.length - 1)];
  }

  nextItems<T>(array: T[], count: number): T[] {
    if (array.length === 0) {
      throw new Error('Cannot select items from an empty array');
    }
    
    if (count <= 0) {
      return [];
    }
    
    if (count >= array.length) {
      return this.shuffle([...array]);
    }
    
    const shuffled = this.shuffle([...array]);
    return shuffled.slice(0, count);
  }

  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}
```

## RNG System Interface

The RNG system manages multiple RNG streams:

```typescript
/**
 * RNG System interface
 */
interface RNGSystem {
  // Get an existing RNG stream by name
  getStream(name: string): RNGStream;
  
  // Create a new RNG stream with a specific seed
  createStream(name: string, seed: number): RNGStream;
}
```

## RNG System Implementation

```typescript
/**
 * RNG System implementation
 */
class RNGSystemImpl implements RNGSystem {
  private streams: Map<string, RNGStream> = new Map();
  private mainRNG: () => number;

  constructor(seed: number) {
    this.mainRNG = mulberry32(seed);
    
    // Create default streams for common purposes
    const purposes = [
      'traits',     // For attribute and trait determination
      'physics',    // For particle physics calculations
      'formation',  // For formation pattern generation
      'visual',     // For visual appearance randomization
      'subclass',   // For subclass selection
      'ability',    // For ability selection
      'mutation'    // For mutation determination
    ];
    
    for (const purpose of purposes) {
      // Create a unique seed for each stream derived from the main seed
      const streamSeed = Math.floor(this.mainRNG() * 4294967296);
      this.createStream(purpose, streamSeed);
    }
  }

  getStream(name: string): RNGStream {
    const stream = this.streams.get(name);
    if (!stream) {
      throw new Error(`RNG stream '${name}' not found`);
    }
    return stream;
  }

  createStream(name: string, seed: number): RNGStream {
    const stream = new RNGStreamImpl(seed);
    this.streams.set(name, stream);
    return stream;
  }
}
```

## Creating an RNG System from Bitcoin Block Nonce

```typescript
/**
 * Create an RNG system from a Bitcoin block nonce
 * @param nonce The Bitcoin block nonce
 * @returns An RNG system seeded with the nonce
 */
function createRNGFromBlockNonce(nonce: number): RNGSystem {
  return new RNGSystemImpl(nonce);
}
```

## Usage Example

```typescript
// Fetch Bitcoin block data
const blockData = await bitcoinService.fetchBlockData(blockNumber);

// Create RNG system from block nonce
const rngSystem = createRNGFromBlockNonce(blockData.nonce);

// Get RNG streams for different purposes
const attributeRNG = rngSystem.getStream('traits');
const subclassRNG = rngSystem.getStream('subclass');
const abilityRNG = rngSystem.getStream('ability');

// Generate random attribute values
const attributeValue = attributeRNG.nextInt(0, 400);

// Select a random subclass
const subclass = subclassRNG.nextItem(availableSubclasses);

// Select random abilities from pools
const primaryAbility = abilityRNG.nextItem(abilityPool.primary);
```

## Key Features

1. **Determinism**: Given the same Bitcoin block nonce, the system always produces the same sequence of random numbers
2. **Separation of Concerns**: Different aspects of creature generation use separate RNG streams
3. **Reproducibility**: Creatures can be regenerated exactly as they were originally created
4. **Quality**: Mulberry32 provides high-quality pseudorandom numbers with good statistical properties
5. **Efficiency**: The implementation is computationally efficient

## Testing for Determinism

To verify that the RNG system is truly deterministic, you can run the following test:

```typescript
// Create two RNG systems with the same seed
const rngSystem1 = createRNGFromBlockNonce(blockData.nonce);
const rngSystem2 = createRNGFromBlockNonce(blockData.nonce);

// Get the same stream from both systems
const stream1 = rngSystem1.getStream('traits');
const stream2 = rngSystem2.getStream('traits');

// Generate 10 random numbers from each stream
const numbers1 = Array(10).fill(0).map(() => stream1.next());
const numbers2 = Array(10).fill(0).map(() => stream2.next());

// Check if the sequences match
const match = numbers1.every((num, i) => num === numbers2[i]);

console.log('Sequences match:', match ? 'YES' : 'NO');
```

This test should always return `YES`, confirming that the RNG system is deterministic.
