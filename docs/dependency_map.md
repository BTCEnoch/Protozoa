# Bitcoin Protozoa - Dependency Map

## Overview
This document maps out the import/export relationships between components in the Bitcoin Protozoa project, ensuring proper dependency management and avoiding circular dependencies while maintaining our domain-driven structure.

## Core Types Dependencies

### Type Hierarchy
```
types/
├── core.ts                 # Core enums, interfaces, and types
│   ├── Role enum
│   ├── Rarity enum
│   ├── AttributeType enum
│   ├── Tier enum
│   ├── MutationCategory enum
│   ├── TraitCategory enum
│   ├── Vector3 interface
│   ├── Color interface
│   ├── FalloffType enum
│   ├── ForceType enum
│   └── BehaviorType enum
│
├── trait.ts               # Trait-related types
│   ├── BaseTrait interface
│   ├── VisualTrait interface
│   ├── FormationTrait interface
│   ├── BehaviorTrait interface
│   ├── ForceCalculationTrait interface
│   ├── ClassBonusTrait interface
│   ├── SubclassTrait interface
│   ├── TraitBank interface
│   ├── TraitFactory interface
│   ├── TraitEffect type
│   └── createTraitId function
│
├── ability.ts             # Ability-related types
│   ├── Ability interface
│   ├── AbilityType enum
│   ├── AbilityEffect type
│   └── AbilityBank interface
│
├── formation.ts           # Formation-related types
│   ├── Formation interface
│   ├── FormationPattern type
│   ├── FormationEffect type
│   └── FormationBank interface
│
├── behavior.ts            # Behavior-related types
│   ├── Behavior interface
│   ├── BehaviorPattern type
│   ├── BehaviorEffect type
│   └── BehaviorBank interface
│
├── mutation.ts            # Mutation-related types
│   ├── Mutation interface
│   ├── AttributeMutation interface
│   ├── ParticleMutation interface
│   ├── SubclassMutation interface
│   ├── AbilityMutation interface
│   ├── SynergyMutation interface
│   ├── FormationMutation interface
│   ├── BehaviorMutation interface
│   ├── ExoticMutation interface
│   ├── MutationBank interface
│   └── createMutationId function
│
├── creature.ts            # Creature-related types
│   ├── Creature interface
│   ├── ParticleGroup interface
│   └── createCreatureId function
│
├── bitcoin.ts             # Bitcoin-related types
│   ├── BlockData interface
│   └── BlockInfo interface
│
├── rng.ts                 # RNG-related types
│   ├── RNGStream interface
│   └── RNGSystem interface
│
├── rendering/             # Rendering-specific types
│   ├── instanced.ts
│   │   ├── InstancedRenderOptions interface
│   │   ├── InstancedRenderData interface
│   │   └── InstanceAttribute interface
│   │
│   ├── shaders.ts
│   │   ├── ShaderDefinition interface
│   │   ├── ShaderMaterialOptions interface
│   │   └── ShaderUniform interface
│   │
│   ├── lod.ts
│   │   ├── LODLevel interface
│   │   └── LODOptions interface
│   │
│   └── buffers.ts
│       ├── BufferGeometryData interface
│       └── AttributeData interface
│
├── gameTheory/            # Game Theory types
│   ├── payoffMatrix.ts
│   │   ├── PayoffMatrix interface
│   │   ├── StrategyProfile interface
│   │   └── PayoffResult interface
│   │
│   ├── decisionTree.ts
│   │   ├── DecisionNode interface
│   │   ├── DecisionPath interface
│   │   └── DecisionTree interface
│   │
│   ├── nashEquilibrium.ts
│   │   ├── NashEquilibrium interface
│   │   ├── MixedStrategy interface
│   │   └── MixedStrategyProfile interface
│   │
│   ├── utilityFunction.ts
│   │   ├── UtilityFunction interface
│   │   └── UtilityFactor interface
│   │
│   ├── battleOutcome.ts
│   │   ├── BattleOutcome interface
│   │   ├── BattleRound interface
│   │   ├── BattleAction interface
│   │   └── BattleEffect interface
│   │
│   └── index.ts
│
└── workers/               # Worker-specific types
    ├── messages.ts
    │   ├── WorkerMessage interface
    │   ├── PhysicsWorkerMessage interface
    │   ├── BehaviorWorkerMessage interface
    │   └── RenderWorkerMessage interface
    │
    ├── physics.ts
    │   ├── PhysicsData interface
    │   └── ForceCalculationOptions interface
    │
    └── compute.ts
        ├── ComputeTask interface
        └── ComputeOptions interface
```

### Import/Export Rules
1. `core.ts` should not import from any other type files
2. Domain-specific type files (trait.ts, ability.ts, etc.) should primarily import from `core.ts`
3. Limited cross-imports between domain-specific type files are allowed when necessary (e.g., formation.ts can import Tier from ability.ts)
4. Nested type directories (rendering, workers) can import from core types but not from each other

## Service Dependencies

### Service Hierarchy
```
services/
  ├── traits/
  │    ├── traitService.ts
  │    ├── traitBankLoader.ts
  │    └── traitFactory.ts
  │
  ├── formations/
  │    ├── formationService.ts
  │    ├── formationBankLoader.ts
  │    └── formationFactory.ts
  │
  ├── behaviors/
  │    ├── behaviorService.ts
  │    ├── behaviorGenerators.ts
  │    └── behaviorFactory.ts
  │
  ├── abilities/
  │    ├── abilityService.ts
  │    ├── abilityBankLoader.ts
  │    └── abilityFactory.ts
  │
  ├── visuals/
  │    ├── visualService.ts
  │    └── visualBankLoader.ts
  │
  ├── mutations/
  │    ├── mutationService.ts
  │    ├── mutationBankLoader.ts
  │    └── mutationFactory.ts
  │
  ├── evolution/
  │    ├── evolutionService.ts
  │    └── evolutionTracker.ts
  │
  ├── bitcoin/
  │    ├── bitcoinService.ts
  │    └── bitcoinApiClient.ts
  │
  ├── gameTheory/
  │    ├── payoffMatrixService.ts
  │    ├── nashEquilibriumFinder.ts
  │    ├── decisionTreeService.ts
  │    └── utilityFunctionService.ts
  │
  └── rendering/
       ├── instancedRenderer.ts
       ├── particleRenderer.ts
       ├── shaderManager.ts
       └── lodManager.ts
```

### Import/Export Rules for Services
1. Services should follow the singleton pattern with a `get[ServiceName]` function
2. Services should import types from the appropriate type files
3. Services can import from lib utilities but not from other services outside their domain
4. Cross-domain communication should happen through events or explicit dependencies in initialize()
5. All services should be initialized with `BlockData` from the Bitcoin API, not just with a nonce

## Library Dependencies

### Library Hierarchy
```
lib/
  ├── rngSystem.ts
  ├── workerBridge.ts
  ├── mathUtils.ts
  ├── spatialUtils.ts
  ├── eventBus.ts
  ├── renderingUtils.ts
  └── gameTheory.ts
```

### Import/Export Rules for Libraries
1. Libraries should be self-contained with minimal dependencies
2. Libraries can import from types but not from services
3. Libraries should not have circular dependencies

## Worker Dependencies

### Worker Hierarchy
```
workers/
  ├── physics/
  │    ├── forceWorker.ts
  │    └── positionWorker.ts
  │
  ├── behavior/
  │    ├── flockingWorker.ts
  │    └── patternWorker.ts
  │
  ├── render/
  │    └── particleWorker.ts
  │
  ├── bitcoin/
  │    └── fetchWorker.ts
  │
  └── shared/
       ├── workerPool.ts
       ├── transferUtils.ts
       └── spatialGrid.ts
```

### Import/Export Rules for Workers
1. Workers should import types from the appropriate type files
2. Workers should be self-contained with minimal dependencies
3. Workers can import from shared worker utilities
4. Workers should communicate through message passing, not direct imports

## Dependency Flow Diagram

```
                  ┌─────────────┐
                  │   Types     │
                  └─────────────┘
                        ↑
                        │
                        ↓
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  Libraries  │←──│  Services   │───→   Workers   │
└─────────────┘   └─────────────┘   └─────────────┘
                        ↑
                        │
                        ↓
                  ┌─────────────┐
                  │ Application │
                  └─────────────┘
```

## Specific Import Chains

### Trait System Chain
```
types/core.ts → types/trait.ts → services/traits/traitFactory.ts
                                  ↓
                services/traits/traitBankLoader.ts
                                  ↓
                services/traits/traitService.ts
```

#### Detailed Trait Service Implementation
```
services/traits/traitService.ts
├── getTraitService() function
└── TraitService class
    ├── private instance: TraitService
    ├── private traitBank: TraitBank
    ├── initialize(blockData: BlockData): void
    │   └── Loads traits using traitBankLoader
    ├── getTraitsForRole(role: Role): BaseTrait[]
    ├── getTraitById(id: string): BaseTrait | undefined
    ├── getTraitsByCategory(category: TraitCategory): BaseTrait[]
    ├── getTraitsByRarity(rarity: Rarity): BaseTrait[]
    ├── applyTraitToGroup(trait: BaseTrait, group: ParticleGroup): void
    ├── getCompatibleTraits(group: ParticleGroup): BaseTrait[]
    └── getTraitEffect(trait: BaseTrait): TraitEffect

services/traits/traitBankLoader.ts
├── getTraitBankLoader() function
└── TraitBankLoader class
    ├── private instance: TraitBankLoader
    ├── loadFromFiles(): TraitBank
    ├── createMockTraitBank(): TraitBank
    ├── createVisualTraits(): VisualTrait[]
    ├── createFormationTraits(): FormationTrait[]
    ├── createBehaviorTraits(): BehaviorTrait[]
    ├── createForceCalculationTraits(): ForceCalculationTrait[]
    ├── createClassBonusTraits(): ClassBonusTrait[]
    ├── createSubclassTraits(): SubclassTrait[]
    ├── getTraitsByCategory(bank: TraitBank, category: TraitCategory): BaseTrait[]
    ├── getTraitsByRarity(bank: TraitBank, rarity: Rarity): BaseTrait[]
    └── getTraitById(bank: TraitBank, id: string): BaseTrait | undefined

services/traits/traitFactory.ts
├── getTraitFactory() function
└── TraitFactory class
    ├── private instance: TraitFactory
    ├── createVisualTrait(params): VisualTrait
    ├── createFormationTrait(params): FormationTrait
    ├── createBehaviorTrait(params): BehaviorTrait
    ├── createForceCalculationTrait(params): ForceCalculationTrait
    ├── createClassBonusTrait(params): ClassBonusTrait
    ├── createSubclassTrait(params): SubclassTrait
    ├── createTraitFromTemplate(template, overrides): BaseTrait
    └── generateTraitId(role: Role, category: TraitCategory, name: string): string
```

### Formation System Chain
```
types/core.ts → types/formation.ts → services/formations/formationFactory.ts
                                      ↓
                services/formations/formationBankLoader.ts
                                      ↓
                services/formations/formationService.ts
```

#### Detailed Formation Service Implementation
```
services/formations/formationService.ts
├── getFormationService() function
└── FormationService class
    ├── private instance: FormationService
    ├── private formationBank: FormationBank
    ├── initialize(blockData: BlockData): void
    │   └── Loads formations using formationBankLoader
    ├── getFormationForRole(role: Role): Formation[]
    ├── getFormationById(id: string): Formation | undefined
    ├── getFormationsByRarity(rarity: Rarity): Formation[]
    ├── applyFormationToGroup(formation: Formation, group: ParticleGroup): void
    ├── getCompatibleFormations(group: ParticleGroup): Formation[]
    └── getFormationEffect(formation: Formation): FormationEffect

services/formations/formationBankLoader.ts
├── getFormationBankLoader() function
└── FormationBankLoader class
    ├── private instance: FormationBankLoader
    ├── loadFromFiles(): FormationBank
    ├── createMockFormationBank(): FormationBank
    ├── createFormationsForRole(role: Role): Formation[]
    ├── getFormationsByRarity(bank: FormationBank, rarity: Rarity): Formation[]
    └── getFormationById(bank: FormationBank, id: string): Formation | undefined
```

services/formations/formationFactory.ts
├── getFormationFactory() function
└── FormationFactory class
    ├── private instance: FormationFactory
    ├── createFormation(params): Formation
    ├── createFormationFromTemplate(template, overrides): Formation
    └── generateFormationId(role: Role, name: string): string
```

### Behavior System Chain
```
types/core.ts → types/behavior.ts → services/behaviors/behaviorFactory.ts
                                     ↓
                services/behaviors/behaviorGenerators.ts
                                     ↓
                services/behaviors/behaviorService.ts
```

#### Detailed Behavior Service Implementation
```
services/behaviors/behaviorService.ts
├── getBehaviorService() function
└── BehaviorService class
    ├── private instance: BehaviorService
    ├── private behaviorBank: BehaviorBank
    ├── initialize(blockData: BlockData): void
    │   └── Loads behaviors using behaviorGenerators
    ├── getBehaviorForRole(role: Role): Behavior[]
    ├── getBehaviorById(id: string): Behavior | undefined
    ├── getBehaviorsByRarity(rarity: Rarity): Behavior[]
    ├── applyBehaviorToGroup(behavior: Behavior, group: ParticleGroup): void
    ├── getCompatibleBehaviors(group: ParticleGroup): Behavior[]
    └── getBehaviorEffect(behavior: Behavior): BehaviorEffect

services/behaviors/behaviorGenerators.ts
├── getBehaviorGenerators() function
└── BehaviorGenerators class
    ├── private instance: BehaviorGenerators
    ├── generateBehaviorsForRole(role: Role): Behavior[]
    ├── generateCoreBehaviors(): Behavior[]
    ├── generateControlBehaviors(): Behavior[]
    ├── generateMovementBehaviors(): Behavior[]
    ├── generateDefenseBehaviors(): Behavior[]
    ├── generateAttackBehaviors(): Behavior[]
    └── generateBehaviorId(role: Role, name: string): string
```

### Ability System Chain
```
types/core.ts → types/ability.ts → services/abilities/abilityFactory.ts
                                    ↓
                services/abilities/abilityBankLoader.ts
                                    ↓
                services/abilities/abilityService.ts
```

#### Detailed Ability Service Implementation
```
services/abilities/abilityService.ts
├── getAbilityService() function
└── AbilityService class
    ├── private instance: AbilityService
    ├── private abilityBank: AbilityBank
    ├── initialize(blockData: BlockData): void
    │   └── Loads abilities using abilityBankLoader
    ├── getAbilitiesForRole(role: Role): Ability[]
    ├── getAbilityById(id: string): Ability | undefined
    ├── getAbilitiesByType(type: AbilityType): Ability[]
    ├── getAbilitiesByRarity(rarity: Rarity): Ability[]
    ├── applyAbilityToGroup(ability: Ability, group: ParticleGroup): void
    ├── getCompatibleAbilities(group: ParticleGroup): Ability[]
    └── getAbilityEffect(ability: Ability): AbilityEffect
```

### Visual System Chain
```
types/core.ts → types/visual.ts → services/visuals/visualBankLoader.ts
                                   ↓
                services/visuals/visualService.ts
```

#### Detailed Visual Service Implementation
```
services/visuals/visualService.ts
├── getVisualService() function
└── VisualService class
    ├── private blockData: BlockData | null
    ├── private rngSystem: RNGSystem | null
    ├── private visualRegistry: VisualRegistry | null
    ├── private selectedVisuals: Map<string, VisualTrait>
    ├── private initialized: boolean
    ├── initialize(blockData: BlockData): void
    │   └── Loads visual registry using visualBankLoader
    ├── isInitialized(): boolean
    ├── selectVisualForGroup(groupId, role, tier, subclass?): VisualTrait
    ├── getAllSelectedVisuals(): Map<string, VisualTrait>
    ├── clearSelectedVisuals(): void
    ├── applyVisualToGroup(groupId, visualTrait): void
    └── evolveVisual(groupId, confirmations): boolean

services/visuals/visualBankLoader.ts
├── getVisualBankLoader() function
└── VisualBankLoader class
    ├── loadFromFiles(basePath): Promise<VisualRegistry>
    ├── createMockVisualRegistry(): VisualRegistry
    ├── createMockVisualTraits(role, tier): VisualTrait[]
    ├── createMockVisualTrait(role, tier, index): VisualTrait
    ├── createMockParticleAppearance(role, tier): ParticleAppearance
    ├── createMockAnimation(role, tier): Animation
    ├── createAnimationParameters(type, tier): Record<string, any>
    ├── createMockVisualEffects(role, tier): VisualEffect[]
    └── lightenColor(hex, amount): string
```

### Mutation System Chain
```
types/core.ts → types/mutation.ts → services/mutations/mutationFactory.ts
                                     ↓
                services/mutations/mutationBankLoader.ts
                                     ↓
                services/mutations/mutationService.ts
```

#### Detailed Mutation Service Implementation
```
services/mutations/mutationService.ts
├── getMutationService() function
└── MutationService class
    ├── private instance: MutationService
    ├── private mutationBank: MutationBank
    ├── initialize(blockData: BlockData): void
    │   └── Loads mutations using mutationBankLoader
    ├── shouldMutate(confirmations: number, rarity: Rarity): boolean
    ├── getMutationForGroup(group: ParticleGroup): Mutation | undefined
    ├── applyMutation(mutation: Mutation, group: ParticleGroup): void
    ├── getMutationsByCategory(category: MutationCategory): Mutation[]
    ├── getMutationsByRarity(rarity: Rarity): Mutation[]
    ├── getCompatibleMutations(group: ParticleGroup): Mutation[]
    └── getMutationEffect(mutation: Mutation): MutationEffect
```

### Evolution System Chain
```
types/core.ts → types/mutation.ts → services/evolution/evolutionTracker.ts
                                     ↓
                services/evolution/evolutionService.ts
```

#### Detailed Evolution Service Implementation
```
services/evolution/evolutionService.ts
├── getEvolutionService() function
└── EvolutionService class
    ├── private instance: EvolutionService
    ├── initialize(blockData: BlockData): void
    ├── evolveCreature(creature: Creature, blockData: BlockData): void
    ├── checkMutations(creature: Creature, blockData: BlockData): Mutation[]
    ├── applyMutationsToCreature(creature: Creature, mutations: Mutation[]): void
    ├── getConfirmationMilestones(): number[]
    ├── getMutationChanceForMilestone(milestone: number): number
    ├── getRarityDistributionForMilestone(milestone: number): Map<Rarity, number>
    ├── trackEvolution(creature: Creature, mutations: Mutation[]): void
    └── getEvolutionHistory(creatureId: string): EvolutionHistory
```

### Bitcoin System Chain
```
types/core.ts → types/bitcoin.ts → services/bitcoin/bitcoinService.ts
                                    ↓
                services/bitcoin/bitcoinApiClient.ts
```

### Import/Export Rules for Bitcoin Services
- Always import Bitcoin service from '@src/services/bitcoin'
- Never import directly from '@src/services/bitcoinService.ts' (deprecated)

#### Detailed Bitcoin Service Implementation
```
services/bitcoin/bitcoinService.ts
├── getBitcoinService() function
└── BitcoinService class
    ├── private instance: BitcoinService
    ├── initialize(): void
    ├── fetchBlockData(blockNumber: number): Promise<BlockData>
    ├── getBlockInfo(blockNumber: number): Promise<BlockInfo>
    ├── getBlockConfirmations(blockNumber: number): Promise<number>
    ├── getBlockNonce(blockNumber: number): Promise<number>
    ├── getBlockHash(blockNumber: number): Promise<string>
    ├── cacheBlockData(blockNumber: number, data: BlockData): void
    ├── getCachedBlockData(blockNumber: number): BlockData | undefined
    └── clearCache(): void
```

### Rendering System Chain
```
types/core.ts → types/rendering/*.ts → services/rendering/shaderManager.ts
                                        ↓
                services/rendering/instancedRenderer.ts
                services/rendering/particleRenderer.ts
                services/rendering/lodManager.ts
```

### Worker System Chain
```
types/core.ts → types/workers/*.ts → workers/shared/*.ts
                                      ↓
                workers/physics/*.ts
                workers/behavior/*.ts
                workers/render/*.ts
                workers/bitcoin/*.ts
```

## Initialization Chain

The proper initialization order should be:

1. Initialize core libraries (RNG, event bus, etc.)
2. Initialize Bitcoin service
3. Initialize trait, formation, behavior, ability services
4. Initialize mutation service
5. Initialize evolution service
6. Initialize rendering services
7. Initialize workers

## Avoiding Circular Dependencies

To avoid circular dependencies:

1. Use interfaces for cross-domain communication
2. Use event-based communication where appropriate
3. Pass dependencies through initialize() methods rather than importing directly
4. Keep domain boundaries clear and well-defined
5. Use dependency injection for services that need to communicate

## Example Import Statements

### Proper Import for Trait Service
```typescript
// services/traits/traitService.ts
import { Role, Rarity } from '../../types/core';
import { BaseTrait, TraitBank } from '../../types/trait';
import { getTraitBankLoader } from './traitBankLoader';
```

### Proper Import for Evolution Service
```typescript
// services/evolution/evolutionService.ts
import { Creature } from '../../types/creature';
import { Mutation } from '../../types/mutation';
import { BlockData } from '../../types/bitcoin';
import { getMutationService } from '../mutations/mutationService';
```

### Proper Import for Worker
```typescript
// workers/physics/forceWorker.ts
import { PhysicsData, ForceCalculationOptions } from '../../types/workers/physics';
import { Vector3 } from '../../types/core';
```

## UI Component Dependencies

### Component Hierarchy
```
components/
  ├── CreatureViewer/
  │    ├── CreatureViewer.tsx
  │    ├── CreatureViewer.styles.ts
  │    ├── CreatureViewer.test.tsx
  │    └── index.ts
  │
  ├── BlockSelector/
  │    ├── BlockSelector.tsx
  │    └── index.ts
  │
  ├── ParticleRenderer/
  │    ├── ParticleRenderer.tsx
  │    └── index.ts
  │
  ├── EvolutionTracker/
  │    ├── EvolutionTracker.tsx
  │    └── index.ts
  │
  ├── TraitDisplay/
  │    ├── TraitDisplay.tsx
  │    └── index.ts
  │
  ├── common/
  │    ├── Button/
  │    │    ├── Button.tsx
  │    │    └── index.ts
  │    │
  │    ├── Card/
  │    │    ├── Card.tsx
  │    │    └── index.ts
  │    │
  │    ├── Loader/
  │    │    ├── Loader.tsx
  │    │    └── index.ts
  │    │
  │    └── index.ts
  │
  └── index.ts
```

### Import/Export Rules for Components
1. Components should import hooks from the appropriate hook files
2. Components should import types from the appropriate type files
3. Components should not import services directly, but use hooks instead
4. Common components should be imported from the common directory
5. Components should be exported through the index.ts files

### Component Dependencies
```
CreatureViewer
├── hooks/useCreature
├── hooks/useBitcoinData
├── components/ParticleRenderer
├── services/traits
├── services/formations
├── services/behaviors
└── types/core

BlockSelector
└── React core

ParticleRenderer
├── three.js
├── services/rendering
├── types/core
└── types/visual

EvolutionTracker
├── hooks/useEvolution
├── hooks/useBitcoinData
└── Material UI components

TraitDisplay
├── hooks/useCreature
├── types/core
└── Material UI components
```

### React Hooks
```
hooks/
  ├── useCreature.ts
  │    ├── Depends on: services/traits, services/formations, services/behaviors
  │    └── Returns: creature data, loading state, error state
  │
  ├── useBitcoinData.ts
  │    ├── Depends on: services/bitcoin
  │    └── Returns: block data, loading state, error state
  │
  ├── useEvolution.ts
  │    ├── Depends on: services/evolution, services/mutations
  │    └── Returns: evolution history, next milestone, mutation chance
  │
  ├── useRender.ts
  │    ├── Depends on: services/rendering
  │    └── Returns: rendering utilities and state
  │
  └── index.ts
```

## Inventory Structure

The inventory system contains all the data for traits, formations, behaviors, mutations, and particles. It follows a hierarchical structure organized by role, tier, and rarity.

```
inventory/
  ├── traits/
  │    ├── visual/
  │    │    ├── core/
  │    │    │    ├── tier1/
  │    │    │    │    ├── basicCore.ts
  │    │    │    │    └── index.ts
  │    │    │    └── index.ts
  │    │    ├── attack/
  │    │    ├── defense/
  │    │    ├── control/
  │    │    ├── movement/
  │    │    └── index.ts
  │    ├── formation/
  │    │    ├── core/
  │    │    │    ├── tier1/
  │    │    │    │    ├── circleFormation.ts
  │    │    │    │    └── index.ts
  │    │    │    └── index.ts
  │    │    ├── attack/
  │    │    ├── defense/
  │    │    ├── control/
  │    │    ├── movement/
  │    │    └── index.ts
  │    ├── behavior/
  │    │    ├── core/
  │    │    ├── attack/
  │    │    ├── defense/
  │    │    ├── control/
  │    │    ├── movement/
  │    │    └── index.ts
  │    └── index.ts
  ├── formations/
  │    ├── patterns/
  │    │    ├── circle/
  │    │    ├── grid/
  │    │    ├── spiral/
  │    │    ├── sphere/
  │    │    ├── helix/
  │    │    ├── cluster/
  │    │    ├── swarm/
  │    │    ├── tree/
  │    │    ├── sierpinski/
  │    │    ├── mandelbrot/
  │    │    ├── web/
  │    │    └── index.ts
  │    ├── parameters/
  │    │    ├── spacing/
  │    │    ├── rotation/
  │    │    ├── scale/
  │    │    └── index.ts
  │    └── index.ts
  ├── behaviors/
  │    ├── patterns/
  │    │    ├── flocking/
  │    │    ├── predator/
  │    │    ├── prey/
  │    │    ├── swarm/
  │    │    └── index.ts
  │    ├── parameters/
  │    │    ├── forces/
  │    │    ├── speeds/
  │    │    ├── weights/
  │    │    └── index.ts
  │    └── index.ts
  ├── mutations/
  │    ├── attribute/
  │    ├── particle/
  │    ├── subclass/
  │    ├── ability/
  │    ├── synergy/
  │    ├── formation/
  │    ├── behavior/
  │    ├── exotic/
  │    └── index.ts
  ├── particles/
  │    ├── core/
  │    ├── attack/
  │    ├── defense/
  │    ├── control/
  │    ├── movement/
  │    └── index.ts
  ├── types.ts
  └── index.ts
```

### Inventory Dependencies
```
Inventory
├── Types
│    ├── core
│    └── visual
├── Traits
│    ├── Visual
│    ├── Formation
│    └── Behavior
├── Formations
│    ├── Patterns
│    └── Parameters
├── Behaviors
│    ├── Patterns
│    └── Parameters
├── Mutations
└── Particles
```

## Conclusion

Following these dependency rules will ensure a clean, maintainable codebase with clear domain boundaries and proper separation of concerns. This will make the Bitcoin Protozoa project more robust, easier to understand, and simpler to extend in the future.

