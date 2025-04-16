# Bitcoin Protozoa - Naming Conventions

## Overview
This document outlines the naming conventions used throughout the Bitcoin Protozoa project. Consistent naming is crucial for maintaining a clean, understandable codebase, especially in a domain-driven design approach.

## File and Directory Naming

### Files
- Use camelCase for file names
- Add appropriate suffixes to indicate file type/purpose
- Examples:
  - `creatureGenerator.ts`
  - `mutationService.ts`
  - `traitBankLoader.ts`
  - `particleVertex.glsl`

### Directories
- Use lowercase for directory names
- Use descriptive names that reflect the domain
- Examples:
  - `services`
  - `types`
  - `workers`
  - `traits`
  - `abilities`

## Code Element Naming

### Classes
- Use PascalCase for class names
- Use suffixes to indicate class purpose
- Examples:
  - `CreatureGenerator`
  - `MutationService`
  - `TraitBankLoader`
  - `InstancedRenderer`

### Interfaces
- Use PascalCase for interfaces
- Do not use "I" prefix (e.g., use `Ability` not `IAbility`)
- Examples:
  - `Ability`
  - `Formation`
  - `Mutation`
  - `RenderOptions`

### Types
- Use PascalCase for type aliases
- Examples:
  - `AbilityType`
  - `FormationPattern`
  - `MutationEffect`
  - `RenderMode`

### Constants
- Use UPPER_SNAKE_CASE for constants
- Examples:
  - `MAX_PARTICLES`
  - `DEFAULT_ATTRIBUTE_VALUE`
  - `CONFIRMATION_THRESHOLDS`
  - `MUTATION_CHANCES`

### Functions
- Use camelCase for functions
- Use verb-noun pattern for clarity
- Examples:
  - `generateCreature()`
  - `applyMutation()`
  - `calculateDistance()`
  - `renderParticles()`

### Variables
- Use camelCase for variables
- Use descriptive names
- Examples:
  - `particleCount`
  - `currentFormation`
  - `mutationChance`
  - `blockNonce`

### Enums
- Use PascalCase for enum names
- Use UPPER_SNAKE_CASE for enum values
- Examples:
  - `Role.CORE`
  - `Rarity.LEGENDARY`
  - `AttributeType.STRENGTH`
  - `MutationCategory.ATTRIBUTE`

## Domain-Specific Naming

### Domain Entities
- Use PascalCase for domain entities
- Examples:
  - `Creature`
  - `ParticleGroup`
  - `Ability`
  - `Formation`

### Domain Services
- Use PascalCase with 'Service' suffix
- Examples:
  - `MutationService`
  - `TraitService`
  - `EvolutionService`
  - `BitcoinService`
  - `PayoffMatrixService`
  - `NashEquilibriumFinder`

### Bank Loaders
- Use PascalCase with 'BankLoader' suffix
- Examples:
  - `TraitBankLoader`
  - `AbilityBankLoader`
  - `MutationBankLoader`
  - `FormationBankLoader`

### Renderers
- Use PascalCase with 'Renderer' suffix
- Examples:
  - `InstancedRenderer`
  - `ParticleRenderer`
  - `EffectRenderer`
  - `FormationRenderer`

### Workers
- Use PascalCase with 'Worker' suffix
- Examples:
  - `PhysicsWorker`
  - `BehaviorWorker`
  - `RenderWorker`
  - `ComputeWorker`

### Game Theory Components
- Use descriptive PascalCase names for game theory types
- Examples:
  - `PayoffMatrix`
  - `StrategyProfile`
  - `NashEquilibrium`
  - `DecisionTree`
  - `UtilityFunction`
  - `BattleOutcome`

## File Organization Naming

### Worker Messages
- Use PascalCase for worker message types
- Examples:
  - `PhysicsWorkerMessage`
  - `BehaviorWorkerMessage`
  - `RenderWorkerMessage`
  - `ComputeWorkerMessage`

### Shader Files
- Use camelCase for shader files
- Examples:
  - `particleVertex.glsl`
  - `particleFragment.glsl`
  - `instancedVertex.glsl`
  - `effectFragment.glsl`

### Test Files
- Use .test.ts suffix for test files
- Examples:
  - `traitService.test.ts`
  - `mutationBankLoader.test.ts`
  - `rngSystem.test.ts`
  - `instancedRenderer.test.ts`

### Mock Files
- Use .mock.ts suffix for mock files
- Examples:
  - `traitService.mock.ts`
  - `bitcoinService.mock.ts`
  - `renderService.mock.ts`
  - `workerBridge.mock.ts`

## Import and Export Naming

### Import Paths
- Use relative paths for imports within the same domain
- Examples:
  - `import { Component } from 'react'`
  - `import { Vector3 } from 'three'`
  - `import { Trait } from '../types/traits/trait'` or simply `import { Trait } from '../types/traits'`

### Barrel Exports
- Use index.ts files for barrel exports
- Examples:
  - `export * from './traitService'`
  - `export * from './traitBankLoader'`
  - `export { getTraitService } from './traitService'`

## Documentation Naming

### Documentation Files
- Use snake_case for documentation files
- Examples:
  - `trait_system.md`
  - `mutation_system.md`
  - `bitcoin_integration.md`
  - `project_checklist.md`

### Architecture Documentation
- Use descriptive names that reflect the content
- Examples:
  - `rendering.md`
  - `compute.md`
  - `workers.md`
  - `optimization.md`

## Consistency Rules

1. **Be Consistent**: Once a naming convention is established, follow it throughout the codebase
2. **Be Descriptive**: Names should clearly indicate purpose and function
3. **Be Concise**: Avoid overly long names while still being descriptive
4. **Follow Domain Language**: Use terms from the domain model consistently
5. **Avoid Abbreviations**: Use full words unless abbreviations are widely understood
6. **Use Singular for Types**: Use singular nouns for types and interfaces (e.g., `Ability` not `Abilities`)
7. **Use Plural for Collections**: Use plural nouns for collections (e.g., `abilities` not `ability`)
8. **Be Explicit**: Avoid ambiguous names that could have multiple interpretations
