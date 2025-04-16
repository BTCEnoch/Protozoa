# Bitcoin Protozoa Types Organization

## Overview

This document explains the organization of TypeScript types in the Bitcoin Protozoa project. The type definitions are structured to align with the domain-driven design of the codebase and mirror the organization of the services directory.

## Directory Structure

The types are organized into the following directories:

```
src/types/
├── core.ts                 # Core enums, interfaces, and types used throughout the project
├── common.ts               # Common utility types shared across domains
├── config.ts               # Configuration-related types
├── index.ts                # Re-exports from all type modules
│
├── abilities/              # Ability-related types
│   ├── ability.ts          # Core ability interfaces
│   ├── reference.ts        # Reference data for abilities
│   ├── types.ts            # Ability type enums
│   └── index.ts            # Re-exports ability types
│
├── behaviors/              # Behavior-related types
│   ├── behavior.ts         # Behavior interfaces and types
│   └── index.ts            # Re-exports behavior types
│
├── bitcoin/                # Bitcoin-related types
│   ├── bitcoin.ts          # Bitcoin block data structures
│   └── index.ts            # Re-exports Bitcoin types
│
├── creatures/              # Creature-related types
│   ├── creature.ts         # Creature interfaces and factories
│   └── index.ts            # Re-exports creature types
│
├── events/                 # Event system types
│   ├── events.ts           # Event types and interfaces
│   └── index.ts            # Re-exports event types
│
├── evolution/              # Evolution-related types
│   └── index.ts            # (Placeholder for future evolution types)
│
├── formations/             # Formation-related types
│   ├── formation.ts        # Formation interfaces and types
│   └── index.ts            # Re-exports formation types
│
├── gameTheory/             # Game theory types
│   ├── battleOutcome.ts    # Battle outcome types
│   ├── common.ts           # Simple game theory interfaces
│   ├── decisionTree.ts     # Decision tree types
│   ├── nashEquilibrium.ts  # Nash equilibrium types
│   ├── payoffMatrix.ts     # Payoff matrix types
│   ├── utilityFunction.ts  # Utility function types
│   └── index.ts            # Re-exports game theory types
│
├── mutations/              # Mutation-related types
│   ├── mutation.ts         # Mutation interfaces and types
│   └── index.ts            # Re-exports mutation types
│
├── particles/              # Particle-related types
│   ├── particle.ts         # Particle interfaces and types
│   └── index.ts            # Re-exports particle types
│
├── rendering/              # Rendering-related types
│   ├── animation.ts        # Animation interfaces
│   ├── buffers.ts          # Buffer geometry types
│   ├── instanced.ts        # Instanced rendering types
│   ├── lod.ts              # Level of detail types
│   ├── renderService.ts    # Render service types
│   ├── shaders.ts          # Shader-related types
│   └── index.ts            # Re-exports rendering types
│
├── storage/                # Storage-related types
│   └── index.ts            # (Placeholder for storage types)
│
├── traits/                 # Trait-related types
│   ├── trait.ts            # Trait interfaces and types
│   └── index.ts            # Re-exports trait types
│
├── utils/                  # Utility types
│   ├── rng.ts              # Random number generation types
│   └── index.ts            # Re-exports utility types
│
├── visuals/                # Visual-related types
│   ├── visual.ts           # Visual interfaces and types
│   └── index.ts            # Re-exports visual types
│
└── workers/                # Worker-related types
    ├── compute.ts          # Compute worker types
    ├── messages.ts         # Worker message types
    ├── physics.ts          # Physics worker types
    └── index.ts            # Re-exports worker types
```

## Design Principles

The types organization follows these principles:

1. **Domain Alignment**: Type definitions are grouped by domain to align with the domain-driven design of the services.
2. **Separation of Concerns**: Each domain has its own directory with focused type definitions.
3. **Discoverability**: Related types are kept together to make it easier to find and understand relationships.
4. **Barrel Files**: Each directory contains an `index.ts` file that re-exports the types, allowing for cleaner imports.

## Import Patterns

When importing types, you can use either approach:

```typescript
// Import specific types
import { Formation } from '../types/formations/formation';

// Import from the barrel file
import { Formation } from '../types/formations';

// Import from the main types barrel
import { Formation } from '../types';
```

The barrel pattern allows for cleaner imports while maintaining the ability to import specific types when needed.

## Extending the Type System

When adding new types:

1. Place them in the appropriate domain directory
2. Update the domain's `index.ts` file to export the new types
3. If creating a new domain, follow the existing pattern:
   - Create a new directory under `src/types/`
   - Add domain-specific type files
   - Create an `index.ts` barrel file
   - Update the main `src/types/index.ts` to export from the new domain 