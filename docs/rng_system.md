# Bitcoin Protozoa - RNG System

## Overview

The Random Number Generation (RNG) system is a core component of Bitcoin Protozoa, providing deterministic randomness for creature generation and evolution. This document details how the RNG system works, focusing on its deterministic nature and how it uses Bitcoin block nonce as a seed.

## Design Goals

The RNG system is designed with the following goals:

1. **Determinism**: Given the same Bitcoin block nonce, the system always produces the same sequence of random numbers
2. **Reproducibility**: Creatures can be regenerated exactly as they were originally created
3. **Separation of Concerns**: Different aspects of creature generation use separate RNG streams
4. **Quality**: The random numbers should be of high quality with good statistical properties
5. **Efficiency**: The system should be computationally efficient

## Mulberry32 Algorithm

We use the Mulberry32 algorithm as our core RNG function. Mulberry32 is a simple but high-quality 32-bit pseudorandom number generator that takes a seed and produces a sequence of numbers between 0 and 1.

```typescript
function mulberry32(seed: number): () => number {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
```

## RNG Streams

To maintain separation of concerns, we create separate RNG streams for different aspects of creature generation:

1. **Traits Stream**: Used for determining attribute values and trait selection
2. **Physics Stream**: Used for particle physics calculations
3. **Formation Stream**: Used for formation pattern generation
4. **Visual Stream**: Used for visual appearance randomization
5. **Subclass Stream**: Used for subclass selection
6. **Ability Stream**: Used for ability selection
7. **Mutation Stream**: Used for mutation determination

Each stream is initialized with a different seed derived from the main Bitcoin block nonce.

## RNG Stream Interface

Each RNG stream provides the following methods:

```typescript
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

## RNG System Implementation

The RNG system is implemented as a class that manages multiple RNG streams:

```typescript
class RNGSystem {
  private streams: Map<string, RNGStream> = new Map();
  private mainRNG: () => number;

  constructor(seed: number) {
    this.mainRNG = mulberry32(seed);
    
    // Create default streams for common purposes
    const purposes = ['traits', 'physics', 'formation', 'visual', 'subclass', 'ability', 'mutation'];
    for (const purpose of purposes) {
      this.createStream(purpose, Math.floor(this.mainRNG() * 4294967296));
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

## Seeding from Bitcoin Block Nonce

The RNG system is seeded using the nonce from a Bitcoin block:

```typescript
function createRNGFromBlockNonce(nonce: number): RNGSystem {
  return new RNGSystem(nonce);
}
```

This ensures that the same block always produces the same creature, while different blocks produce different creatures.

## Usage Examples

### Creature Generation

```typescript
// Fetch block data
const blockData = await fetchBlockData(blockNumber);

// Create RNG system from block nonce
const rngSystem = createRNGFromBlockNonce(blockData.nonce);

// Get RNG streams for different purposes
const attributeRNG = rngSystem.getStream('traits');
const subclassRNG = rngSystem.getStream('subclass');

// Generate random attribute values
const attributeValue = attributeRNG.nextInt(0, 400);

// Select a random subclass
const subclass = subclassRNG.nextItem(availableSubclasses);
```

### Ability Selection

```typescript
// Get the ability RNG stream
const abilityRNG = rngSystem.getStream('ability');

// Select random abilities from pools
const primaryAbility = abilityRNG.nextItem(abilityPool.primary);
const secondaryAbility = abilityRNG.nextItem(abilityPool.secondary);
const uniqueAbility = abilityRNG.nextItem(abilityPool.unique);
const crowdControlAbility = abilityRNG.nextItem(abilityPool.crowdControl);
```

### Mutation Determination

```typescript
// Get the mutation RNG stream
const mutationRNG = rngSystem.getStream('mutation');

// Check if a mutation should occur based on confirmation milestone
const mutationChance = getMutationChance(blockData.confirmations);
if (mutationRNG.nextBool(mutationChance)) {
  // Select a random mutation
  const mutation = selectRandomMutation(mutationRNG);
}
```

## Testing and Validation

The RNG system includes comprehensive tests to ensure:

1. **Determinism**: The same seed always produces the same sequence
2. **Distribution**: The output has a uniform distribution
3. **Independence**: No correlation between consecutive outputs
4. **Range**: Values are correctly bounded within specified ranges
5. **Reproducibility**: Creature generation is reproducible with the same block nonce

## Performance Considerations

The Mulberry32 algorithm is chosen for its balance of quality and performance. It is fast enough for real-time applications while providing high-quality randomness.

For very large creatures or complex simulations, we implement optimizations such as:

1. **Lazy Initialization**: Streams are only created when needed
2. **Caching**: Frequently used random values are cached
3. **Batch Generation**: Multiple random values are generated in batches when possible
