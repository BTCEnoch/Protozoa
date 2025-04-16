# Bitcoin Protozoa - Visual Service Documentation

## Overview
The Visual Service is responsible for managing the visual appearance of particle groups in the Bitcoin Protozoa project. It handles visual trait selection, application, and evolution based on Bitcoin block data.

## Directory Structure

```
src/services/visuals/
├── visualService.ts     # Main visual service implementation
├── visualBankLoader.ts  # Visual trait bank loader
└── index.ts             # Visual services exports
```

## Service Components

### Visual Service (`src/services/visuals/visualService.ts`)
- **Purpose**: Manages visual traits for particle groups
- **Responsibilities**:
  - Initializing with Bitcoin block data
  - Selecting visual traits for particle groups
  - Applying visual traits to particle groups
  - Evolving visual traits based on confirmations
- **Key Methods**:
  - `initialize(blockData: BlockData)`: Initialize with Bitcoin block data
  - `selectVisualForGroup(groupId, role, tier, subclass?)`: Select a visual trait for a group
  - `applyVisualToGroup(groupId, visualTrait)`: Apply a visual trait to a group
  - `evolveVisual(groupId, confirmations)`: Evolve a visual trait based on confirmations
  - `getAllSelectedVisuals()`: Get all selected visual traits
  - `clearSelectedVisuals()`: Clear all selected visual traits

### Visual Bank Loader (`src/services/visuals/visualBankLoader.ts`)
- **Purpose**: Loads visual trait data from various sources
- **Responsibilities**:
  - Loading visual trait data from files
  - Creating mock visual traits for testing
  - Generating visual appearances, animations, and effects
- **Key Methods**:
  - `loadFromFiles(basePath)`: Load visual trait data from JSON files
  - `createMockVisualRegistry()`: Create a mock visual registry for testing
  - `createMockVisualTraits(role, tier)`: Create mock visual traits for a role and tier
  - `createMockVisualTrait(role, tier, index)`: Create a mock visual trait
  - `createMockParticleAppearance(role, tier)`: Create a mock particle appearance
  - `createMockAnimation(role, tier)`: Create a mock animation
  - `createMockVisualEffects(role, tier)`: Create mock visual effects

## Type Definitions

The visual service relies on the following type definitions from `src/types/visual.ts`:

- `VisualTrait`: Defines the visual appearance of particles
- `ParticleAppearance`: Defines the visual properties of a particle
- `ParticleShape`: Enum of possible shapes for particles
- `Color`: Defines the color properties of a particle
- `Animation`: Defines an animation for a particle
- `AnimationType`: Enum of possible animation types
- `VisualEffect`: Defines a visual effect for a particle
- `VisualEffectType`: Enum of possible visual effect types
- `VisualEffectTrigger`: Enum of possible triggers for visual effects
- `VisualRegistry`: Registry of visual traits organized by role and tier

## Integration with Other Services

The Visual Service integrates with the following components:

- **RNG System**: Uses the RNG system to deterministically select visual traits
- **Bitcoin Service**: Initializes with Bitcoin block data
- **Particle System**: Applies visual traits to particle groups
- **Rendering System**: Provides visual information for rendering particles

## Usage Example

```typescript
// Get the visual service instance
import { getVisualService } from '../../services/visuals';
const visualService = getVisualService();

// Initialize with block data
visualService.initialize(blockData);

// Select a visual trait for a particle group
const visualTrait = visualService.selectVisualForGroup(
  'group1',
  Role.CORE,
  Tier.RARE,
  'Graviton Core'
);

// Apply the visual trait to the particle group
visualService.applyVisualToGroup('group1', visualTrait);

// Evolve the visual trait based on confirmations
const evolved = visualService.evolveVisual('group1', 50000);
```

## Implementation Details

### Singleton Pattern
The Visual Service follows the singleton pattern, ensuring only one instance exists throughout the application:

```typescript
// Singleton instance
let visualServiceInstance: VisualService | null = null;

/**
 * Get the visual service instance
 * @returns The visual service instance
 */
export function getVisualService(): VisualService {
  if (!visualServiceInstance) {
    visualServiceInstance = new VisualService();
  }
  return visualServiceInstance;
}
```

### Deterministic Visual Selection
Visual traits are selected deterministically based on the Bitcoin block nonce:

```typescript
// Create RNG stream for this group
const visualRng = this.rngSystem.createStream(`${groupId}_visual`);

// Try to find a visual trait for the subclass
let visualTrait: VisualTrait | undefined;

if (subclass) {
  // Try to find a visual trait for the specific subclass
  const tierVisuals = this.visualRegistry[role]?.[tier];
  if (tierVisuals) {
    visualTrait = tierVisuals.find(visual => visual.subclass === subclass);
  }
}

// If no subclass-specific visual trait was found, get a random one
if (!visualTrait) {
  visualTrait = getRandomVisualTrait(this.visualRegistry, role, tier, visualRng);
}
```

## Future Enhancements

1. **Visual Evolution**: Implement the `evolveVisual` method to evolve visual traits based on confirmations
2. **Visual Effects**: Add support for more complex visual effects
3. **Performance Optimization**: Optimize visual trait application for large numbers of particles
4. **Custom Visuals**: Allow users to create and save custom visual traits
5. **Visual Presets**: Add support for visual presets that can be applied to multiple particle groups
