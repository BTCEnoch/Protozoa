# Bitcoin Protozoa - Directory Structure

## Overview
This document outlines the complete directory structure for the Bitcoin Protozoa project, following a domain-driven design approach with optimizations for rendering and compute performance.

## Root Structure
```
protozoa/
├── src/               # Source code
├── traits/            # Trait definitions
├── docs/              # Project documentation
├── tests/             # Test files
├── scripts/           # Utility scripts
├── config/            # Configuration files
├── assets/            # Static assets
├── public/            # Public static files
├── dist/              # Build output
├── node_modules/      # Dependencies (not in version control)
├── .github/           # GitHub workflows and templates
├── .vscode/           # VS Code settings
├── package.json       # Project metadata and dependencies
├── tsconfig.json      # TypeScript configuration
├── jest.config.js     # Jest test configuration
├── .eslintrc.js       # ESLint configuration
├── .prettierrc        # Prettier configuration
├── .gitignore         # Git ignore file
├── README.md          # Project readme
└── LICENSE            # Project license
```

## Source Code (`src/`) todo: add the gameTheory sub and its contents to types
```
src/
├── types/             # TypeScript type definitions
│   ├── core.ts          # Core type definitions (enums, constants)
│   ├── ability.ts       # Ability type definitions
│   ├── formation.ts     # Formation type definitions
│   ├── behavior.ts      # Behavior type definitions
│   ├── visual.ts        # Visual type definitions
│   ├── mutation.ts      # Mutation type definitions
│   ├── creature.ts      # Creature type definitions
│   ├── bitcoin.ts       # Bitcoin data type definitions
│   ├── events.ts        # Event type definitions
│   ├── config.ts        # Configuration type definitions
│   ├── rng.ts           # RNG type definitions
│   ├── rendering/       # Rendering-specific types
│   │   ├── instanced.ts   # Types for instanced rendering
│   │   ├── shaders.ts     # Shader interface definitions
│   │   ├── lod.ts         # Level of detail type definitions
│   │   ├── buffers.ts     # Buffer geometry type definitions
│   │   └── index.ts       # Rendering types exports
│   ├── workers/         # Worker-specific types
│   │   ├── messages.ts    # Worker message type definitions
│   │   ├── physics.ts     # Physics worker type definitions
│   │   ├── compute.ts     # Compute worker type definitions
│   │   └── index.ts       # Worker types exports
│   └── index.ts         # Type exports
├── models/            # Data models
│   ├── creature.ts      # Creature model
│   ├── particle.ts      # Particle model
│   ├── group.ts         # Particle group model
│   ├── ability.ts       # Ability model
│   ├── formation.ts     # Formation model
│   ├── behavior.ts      # Behavior model
│   ├── visual.ts        # Visual model
│   ├── mutation.ts      # Mutation model
│   └── index.ts         # Model exports
├── services/          # Business logic services
│   ├── traits/           # Trait-related services
│   │   ├── traitService.ts  # Trait service
│   │   ├── traitBankLoader.ts # Trait bank loader
│   │   └── index.ts        # Trait services exports
│   ├── formations/       # Formation-related services
│   │   ├── formationService.ts # Formation service
│   │   ├── formationBankLoader.ts # Formation bank loader
│   │   └── index.ts        # Formation services exports
│   ├── behaviors/        # Behavior-related services
│   │   ├── behaviorService.ts # Behavior service
│   │   ├── behaviorBankLoader.ts # Behavior bank loader
│   │   └── index.ts        # Behavior services exports
│   ├── abilities/        # Ability-related services
│   │   ├── abilityService.ts # Ability service
│   │   ├── abilityBankLoader.ts # Ability bank loader
│   │   └── index.ts        # Ability services exports
│   ├── visuals/          # Visual-related services
│   │   ├── visualService.ts # Visual service
│   │   ├── visualBankLoader.ts # Visual bank loader
│   │   └── index.ts        # Visual services exports
│   ├── mutations/        # Mutation-related services
│   │   ├── mutationService.ts # Mutation service
│   │   ├── mutationBankLoader.ts # Mutation bank loader
│   │   └── index.ts        # Mutation services exports
│   ├── evolution/        # Evolution-related services
│   │   ├── evolutionService.ts # Evolution service
│   │   └── index.ts        # Evolution services exports
│   ├── bitcoin/          # Bitcoin data services
│   │   ├── bitcoinService.ts # Bitcoin data service
│   │   └── index.ts        # Bitcoin services exports
│   ├── rendering/        # Rendering services
│   │   ├── instancedRenderer.ts # Instanced rendering service
│   │   ├── particleRenderer.ts # Particle rendering service
│   │   ├── shaderManager.ts # Shader management service
│   │   ├── lodManager.ts   # Level of detail management service
│   │   └── index.ts        # Rendering services exports
│   ├── creatureGenerator.ts # Creature generation service
│   ├── storageService.ts # Storage service
│   ├── eventService.ts  # Event handling service
│   └── index.ts         # Service exports
├── lib/               # Core functionality
│   ├── rngSystem.ts     # Random number generation system
│   ├── particleSystem.ts # Particle physics system
│   ├── formationSystem.ts # Formation system
│   ├── eventBus.ts      # Event bus implementation
│   ├── storage.ts       # Storage utilities
│   ├── api.ts           # API utilities
│   ├── mathUtils.ts     # Math utilities
│   ├── spatialUtils.ts   # Spatial calculation utilities
│   ├── workerBridge.ts   # Bridge between main thread and workers
│   ├── renderingUtils.ts # Rendering utilities
│   └── index.ts         # Library exports
├── data/              # Data definitions
│   ├── abilityPools/     # Ability pool definitions
│   │   ├── core.ts        # CORE ability pools
│   │   ├── attack.ts      # ATTACK ability pools
│   │   ├── control.ts     # CONTROL ability pools
│   │   ├── defense.ts     # DEFENSE ability pools
│   │   ├── movement.ts    # MOVEMENT ability pools
│   │   └── index.ts       # Ability pool exports
│   ├── formationPatterns/ # Formation pattern definitions
│   │   ├── core.ts        # CORE formation patterns
│   │   ├── attack.ts      # ATTACK formation patterns
│   │   ├── control.ts     # CONTROL formation patterns
│   │   ├── defense.ts     # DEFENSE formation patterns
│   │   ├── movement.ts    # MOVEMENT formation patterns
│   │   └── index.ts       # Formation pattern exports
│   ├── behaviorPatterns/ # Behavior pattern definitions
│   │   ├── core.ts        # CORE behavior patterns
│   │   ├── attack.ts      # ATTACK behavior patterns
│   │   ├── control.ts     # CONTROL behavior patterns
│   │   ├── defense.ts     # DEFENSE behavior patterns
│   │   ├── movement.ts    # MOVEMENT behavior patterns
│   │   └── index.ts       # Behavior pattern exports
│   ├── visualPatterns/  # Visual pattern definitions
│   │   ├── core.ts        # CORE visual patterns
│   │   ├── attack.ts      # ATTACK visual patterns
│   │   ├── control.ts     # CONTROL visual patterns
│   │   ├── defense.ts     # DEFENSE visual patterns
│   │   ├── movement.ts    # MOVEMENT visual patterns
│   │   └── index.ts       # Visual pattern exports
│   ├── mutations/       # Mutation definitions
│   │   ├── common.ts      # Common mutations
│   │   ├── uncommon.ts    # Uncommon mutations
│   │   ├── rare.ts        # Rare mutations
│   │   ├── epic.ts        # Epic mutations
│   │   ├── legendary.ts   # Legendary mutations
│   │   ├── mythic.ts      # Mythic mutations
│   │   └── index.ts       # Mutation exports
│   └── index.ts         # Data exports
├── utils/             # Utility functions
│   ├── math.ts          # Math utilities
│   ├── random.ts        # Random utilities
│   ├── validation.ts    # Validation utilities
│   ├── formatting.ts    # Formatting utilities
│   ├── logging.ts       # Logging utilities
│   ├── performance/     # Performance utilities
│   │   ├── throttle.ts     # Throttling utilities
│   │   ├── profiling.ts    # Performance profiling
│   │   ├── batching.ts     # Batch processing utilities
│   │   └── index.ts       # Performance utilities exports
│   ├── dom.ts           # DOM utilities
│   ├── transfer.ts      # Transferable object utilities
│   ├── spatial.ts       # Spatial utilities
│   └── index.ts         # Utility exports
├── components/        # UI components
│   ├── CreatureViewer/   # Creature viewer component
│   ├── BlockSelector/    # Block selector component
│   ├── ParticleRenderer/ # Particle renderer component
│   ├── EvolutionTracker/ # Evolution tracker component
│   ├── TraitDisplay/     # Trait display component
│   ├── common/           # Common UI components
│   └── index.ts         # Component exports
├── hooks/             # React hooks
│   ├── useCreature.ts    # Creature hook
│   ├── useBitcoinData.ts # Bitcoin data hook
│   ├── useEvolution.ts   # Evolution hook
│   ├── useRender.ts      # Rendering hook
│   └── index.ts         # Hook exports
├── contexts/          # React contexts
│   ├── CreatureContext.ts # Creature context
│   ├── SettingsContext.ts # Settings context
│   └── index.ts         # Context exports
├── pages/             # Application pages
│   ├── Home.tsx         # Home page
│   ├── Viewer.tsx       # Creature viewer page
│   ├── Gallery.tsx      # Creature gallery page
│   ├── About.tsx        # About page
│   └── index.ts         # Page exports
├── styles/            # Styles
│   ├── global.css       # Global styles
│   ├── variables.css    # CSS variables
│   ├── components/      # Component styles
│   └── pages/           # Page styles
├── constants/         # Application constants
│   ├── config.ts        # Configuration constants
│   ├── traits.ts        # Trait constants
│   ├── evolution.ts     # Evolution constants
│   └── index.ts         # Constant exports
├── workers/           # Web workers
│   ├── physics/          # Physics calculation workers
│   │   ├── forceWorker.ts   # Force calculation worker
│   │   ├── positionWorker.ts # Position update worker
│   │   └── index.ts        # Physics workers exports
│   ├── behavior/         # Behavior calculation workers
│   │   ├── flockingWorker.ts # Flocking behavior worker
│   │   ├── patternWorker.ts # Pattern behavior worker
│   │   └── index.ts        # Behavior workers exports
│   ├── render/           # Rendering workers
│   │   ├── particleWorker.ts # Particle rendering worker
│   │   └── index.ts        # Rendering workers exports
│   ├── bitcoin/          # Bitcoin data workers
│   │   ├── fetchWorker.ts   # Bitcoin data fetching worker
│   │   └── index.ts        # Bitcoin workers exports
│   ├── shared/           # Shared worker utilities
│   │   ├── workerPool.ts    # Worker pool management
│   │   ├── transferUtils.ts # Transferable object utilities
│   │   ├── spatialGrid.ts   # Spatial partitioning for optimization
│   │   └── index.ts        # Shared utilities exports
│   └── index.ts         # Workers exports
└── index.ts           # Main entry point
```

## Traits (`traits/`)
```
traits/
├── abilities/         # Ability traits
│   ├── core/          # CORE role abilities
│   │   ├── common.ts  # Common tier abilities
│   │   ├── uncommon.ts # Uncommon tier abilities
│   │   ├── rare.ts    # Rare tier abilities
│   │   ├── epic.ts    # Epic tier abilities
│   │   ├── legendary.ts # Legendary tier abilities
│   │   ├── mythic.ts  # Mythic tier abilities
│   │   └── index.ts   # Core abilities index
│   ├── attack/        # ATTACK role abilities
│   │   ├── common.ts  # Common tier abilities
│   │   ├── uncommon.ts # Uncommon tier abilities
│   │   ├── rare.ts    # Rare tier abilities
│   │   ├── epic.ts    # Epic tier abilities
│   │   ├── legendary.ts # Legendary tier abilities
│   │   ├── mythic.ts  # Mythic tier abilities
│   │   └── index.ts   # Attack abilities index
│   ├── control/       # CONTROL role abilities
│   │   ├── common.ts  # Common tier abilities
│   │   ├── uncommon.ts # Uncommon tier abilities
│   │   ├── rare.ts    # Rare tier abilities
│   │   ├── epic.ts    # Epic tier abilities
│   │   ├── legendary.ts # Legendary tier abilities
│   │   ├── mythic.ts  # Mythic tier abilities
│   │   └── index.ts   # Control abilities index
│   ├── defense/       # DEFENSE role abilities
│   │   ├── common.ts  # Common tier abilities
│   │   ├── uncommon.ts # Uncommon tier abilities
│   │   ├── rare.ts    # Rare tier abilities
│   │   ├── epic.ts    # Epic tier abilities
│   │   ├── legendary.ts # Legendary tier abilities
│   │   ├── mythic.ts  # Mythic tier abilities
│   │   └── index.ts   # Defense abilities index
│   ├── movement/      # MOVEMENT role abilities
│   │   ├── common.ts  # Common tier abilities
│   │   ├── uncommon.ts # Uncommon tier abilities
│   │   ├── rare.ts    # Rare tier abilities
│   │   ├── epic.ts    # Epic tier abilities
│   │   ├── legendary.ts # Legendary tier abilities
│   │   ├── mythic.ts  # Mythic tier abilities
│   │   └── index.ts   # Movement abilities index
│   └── index.ts       # Abilities master index
├── formations/        # Formation traits
│   ├── core/          # CORE role formations
│   │   ├── common.ts  # Common tier formations
│   │   ├── uncommon.ts # Uncommon tier formations
│   │   ├── rare.ts    # Rare tier formations
│   │   ├── epic.ts    # Epic tier formations
│   │   ├── legendary.ts # Legendary tier formations
│   │   ├── mythic.ts  # Mythic tier formations
│   │   └── index.ts   # Core formations index
│   ├── attack/        # ATTACK role formations
│   │   ├── common.ts  # Common tier formations
│   │   ├── uncommon.ts # Uncommon tier formations
│   │   ├── rare.ts    # Rare tier formations
│   │   ├── epic.ts    # Epic tier formations
│   │   ├── legendary.ts # Legendary tier formations
│   │   ├── mythic.ts  # Mythic tier formations
│   │   └── index.ts   # Attack formations index
│   ├── control/       # CONTROL role formations
│   │   ├── common.ts  # Common tier formations
│   │   ├── uncommon.ts # Uncommon tier formations
│   │   ├── rare.ts    # Rare tier formations
│   │   ├── epic.ts    # Epic tier formations
│   │   ├── legendary.ts # Legendary tier formations
│   │   ├── mythic.ts  # Mythic tier formations
│   │   └── index.ts   # Control formations index
│   ├── defense/       # DEFENSE role formations
│   │   ├── common.ts  # Common tier formations
│   │   ├── uncommon.ts # Uncommon tier formations
│   │   ├── rare.ts    # Rare tier formations
│   │   ├── epic.ts    # Epic tier formations
│   │   ├── legendary.ts # Legendary tier formations
│   │   ├── mythic.ts  # Mythic tier formations
│   │   └── index.ts   # Defense formations index
│   ├── movement/      # MOVEMENT role formations
│   │   ├── common.ts  # Common tier formations
│   │   ├── uncommon.ts # Uncommon tier formations
│   │   ├── rare.ts    # Rare tier formations
│   │   ├── epic.ts    # Epic tier formations
│   │   ├── legendary.ts # Legendary tier formations
│   │   ├── mythic.ts  # Mythic tier formations
│   │   └── index.ts   # Movement formations index
│   └── index.ts       # Formations master index
├── behaviors/         # Behavior traits
│   ├── core/          # CORE role behaviors
│   │   ├── common.ts  # Common tier behaviors
│   │   ├── uncommon.ts # Uncommon tier behaviors
│   │   ├── rare.ts    # Rare tier behaviors
│   │   ├── epic.ts    # Epic tier behaviors
│   │   ├── legendary.ts # Legendary tier behaviors
│   │   ├── mythic.ts  # Mythic tier behaviors
│   │   └── index.ts   # Core behaviors index
│   ├── attack/        # ATTACK role behaviors
│   │   ├── common.ts  # Common tier behaviors
│   │   ├── uncommon.ts # Uncommon tier behaviors
│   │   ├── rare.ts    # Rare tier behaviors
│   │   ├── epic.ts    # Epic tier behaviors
│   │   ├── legendary.ts # Legendary tier behaviors
│   │   ├── mythic.ts  # Mythic tier behaviors
│   │   └── index.ts   # Attack behaviors index
│   ├── control/       # CONTROL role behaviors
│   │   ├── common.ts  # Common tier behaviors
│   │   ├── uncommon.ts # Uncommon tier behaviors
│   │   ├── rare.ts    # Rare tier behaviors
│   │   ├── epic.ts    # Epic tier behaviors
│   │   ├── legendary.ts # Legendary tier behaviors
│   │   ├── mythic.ts  # Mythic tier behaviors
│   │   └── index.ts   # Control behaviors index
│   ├── defense/       # DEFENSE role behaviors
│   │   ├── common.ts  # Common tier behaviors
│   │   ├── uncommon.ts # Uncommon tier behaviors
│   │   ├── rare.ts    # Rare tier behaviors
│   │   ├── epic.ts    # Epic tier behaviors
│   │   ├── legendary.ts # Legendary tier behaviors
│   │   ├── mythic.ts  # Mythic tier behaviors
│   │   └── index.ts   # Defense behaviors index
│   ├── movement/      # MOVEMENT role behaviors
│   │   ├── common.ts  # Common tier behaviors
│   │   ├── uncommon.ts # Uncommon tier behaviors
│   │   ├── rare.ts    # Rare tier behaviors
│   │   ├── epic.ts    # Epic tier behaviors
│   │   ├── legendary.ts # Legendary tier behaviors
│   │   ├── mythic.ts  # Mythic tier behaviors
│   │   └── index.ts   # Movement behaviors index
│   └── index.ts       # Behaviors master index
├── visuals/           # Visual traits
│   ├── core/          # CORE role visuals
│   │   ├── common.ts  # Common tier visuals
│   │   ├── uncommon.ts # Uncommon tier visuals
│   │   ├── rare.ts    # Rare tier visuals
│   │   ├── epic.ts    # Epic tier visuals
│   │   ├── legendary.ts # Legendary tier visuals
│   │   ├── mythic.ts  # Mythic tier visuals
│   │   └── index.ts   # Core visuals index
│   ├── attack/        # ATTACK role visuals
│   │   ├── common.ts  # Common tier visuals
│   │   ├── uncommon.ts # Uncommon tier visuals
│   │   ├── rare.ts    # Rare tier visuals
│   │   ├── epic.ts    # Epic tier visuals
│   │   ├── legendary.ts # Legendary tier visuals
│   │   ├── mythic.ts  # Mythic tier visuals
│   │   └── index.ts   # Attack visuals index
│   ├── control/       # CONTROL role visuals
│   │   ├── common.ts  # Common tier visuals
│   │   ├── uncommon.ts # Uncommon tier visuals
│   │   ├── rare.ts    # Rare tier visuals
│   │   ├── epic.ts    # Epic tier visuals
│   │   ├── legendary.ts # Legendary tier visuals
│   │   ├── mythic.ts  # Mythic tier visuals
│   │   └── index.ts   # Control visuals index
│   ├── defense/       # DEFENSE role visuals
│   │   ├── common.ts  # Common tier visuals
│   │   ├── uncommon.ts # Uncommon tier visuals
│   │   ├── rare.ts    # Rare tier visuals
│   │   ├── epic.ts    # Epic tier visuals
│   │   ├── legendary.ts # Legendary tier visuals
│   │   ├── mythic.ts  # Mythic tier visuals
│   │   └── index.ts   # Defense visuals index
│   ├── movement/      # MOVEMENT role visuals
│   │   ├── common.ts  # Common tier visuals
│   │   ├── uncommon.ts # Uncommon tier visuals
│   │   ├── rare.ts    # Rare tier visuals
│   │   ├── epic.ts    # Epic tier visuals
│   │   ├── legendary.ts # Legendary tier visuals
│   │   ├── mythic.ts  # Mythic tier visuals
│   │   └── index.ts   # Movement visuals index
│   └── index.ts       # Visuals master index
├── mutations/         # Mutation traits
│   ├── common.ts      # Common mutations
│   ├── uncommon.ts    # Uncommon mutations
│   ├── rare.ts        # Rare mutations
│   ├── epic.ts        # Epic mutations
│   ├── legendary.ts   # Legendary mutations
│   ├── mythic.ts      # Mythic mutations
│   └── index.ts       # Mutations index
└── index.ts           # Master traits index
```

## Documentation (`docs/`)
```
docs/
├── project_overview.md       # Project overview
├── trait_system.md           # Trait system documentation
├── ability_system.md         # Ability system documentation
├── formation_system.md       # Formation system documentation
├── behavior_system.md        # Behavior system documentation
├── visual_system.md          # Visual system documentation
├── visual_service_documentation.md # Visual service documentation
├── mutation_system.md        # Mutation system documentation
├── bitcoin_integration.md    # Bitcoin integration documentation
├── rng_system.md             # RNG system documentation
├── evolution_mechanics.md    # Evolution mechanics documentation
├── directory_structure.md    # Directory structure documentation
├── project_checklist.md      # Project implementation checklist
├── naming_conventions.md     # Naming conventions documentation
├── architecture/             # Architecture documentation
│   ├── overview.md           # System architecture overview
│   ├── rendering.md          # Rendering architecture
│   ├── compute.md            # Compute architecture
│   ├── workers.md            # Web Worker architecture
│   ├── optimization.md       # Performance optimization strategies
│   └── domain_model.md       # Domain model architecture
├── api/                      # API documentation
│   ├── bitcoin.md            # Bitcoin API documentation
│   ├── rendering.md          # Rendering API documentation
│   └── index.md              # API index
├── guides/                   # User and developer guides
│   ├── getting_started.md    # Getting started guide
│   ├── development.md        # Development guide
│   ├── optimization.md       # Optimization guide
│   └── worker_usage.md       # Web Worker usage guide
├── implementation/           # Implementation documentation
│   ├── bitcoinService.md     # Bitcoin service implementation
│   ├── rngSystem.md          # RNG system implementation
│   ├── renderingSystem.md    # Rendering system implementation
│   └── workerSystem.md       # Worker system implementation
└── index.md                  # Documentation index
```

## Tests (`tests/`)
```
tests/
├── unit/              # Unit tests
│   ├── models/        # Model tests
│   │   ├── creature.test.ts  # Creature model tests
│   │   ├── particle.test.ts  # Particle model tests
│   │   ├── group.test.ts     # Group model tests
│   │   ├── ability.test.ts   # Ability model tests
│   │   ├── formation.test.ts # Formation model tests
│   │   ├── behavior.test.ts  # Behavior model tests
│   │   ├── visual.test.ts    # Visual model tests
│   │   └── mutation.test.ts  # Mutation model tests
│   ├── services/      # Service tests
│   │   ├── traits/         # Trait service tests
│   │   ├── formations/     # Formation service tests
│   │   ├── behaviors/      # Behavior service tests
│   │   ├── abilities/      # Ability service tests
│   │   ├── mutations/      # Mutation service tests
│   │   ├── evolution/      # Evolution service tests
│   │   ├── bitcoin/        # Bitcoin service tests
│   │   ├── rendering/      # Rendering service tests
│   │   │   ├── instancedRenderer.test.ts # Instanced renderer tests
│   │   │   ├── particleRenderer.test.ts  # Particle renderer tests
│   │   │   ├── shaderManager.test.ts     # Shader manager tests
│   │   │   └── lodManager.test.ts        # LOD manager tests
│   │   ├── creatureGenerator.test.ts # Creature generator tests
│   │   ├── storageService.test.ts    # Storage service tests
│   │   └── eventService.test.ts      # Event service tests
│   ├── lib/           # Library tests
│   │   ├── rngSystem.test.ts     # RNG system tests
│   │   ├── particleSystem.test.ts # Particle system tests
│   │   ├── formationSystem.test.ts # Formation system tests
│   │   ├── eventBus.test.ts      # Event bus tests
│   │   ├── storage.test.ts       # Storage utility tests
│   │   ├── api.test.ts           # API utility tests
│   │   ├── mathUtils.test.ts     # Math utilities tests
│   │   ├── spatialUtils.test.ts  # Spatial utilities tests
│   │   ├── workerBridge.test.ts  # Worker bridge tests
│   │   └── renderingUtils.test.ts # Rendering utilities tests
│   ├── workers/       # Worker tests
│   │   ├── physics/        # Physics worker tests
│   │   ├── behavior/       # Behavior worker tests
│   │   ├── render/         # Render worker tests
│   │   ├── bitcoin/        # Bitcoin worker tests
│   │   └── shared/         # Shared worker utilities tests
│   ├── utils/         # Utility tests
│   │   ├── math.test.ts       # Math utility tests
│   │   ├── random.test.ts     # Random utility tests
│   │   ├── validation.test.ts # Validation utility tests
│   │   ├── formatting.test.ts # Formatting utility tests
│   │   └── logging.test.ts    # Logging utility tests
│   ├── components/    # Component tests
│   ├── hooks/         # Hook tests
│   ├── contexts/      # Context tests
│   └── constants/     # Constants tests
├── integration/       # Integration tests
│   ├── api/           # API integration tests
│   ├── services/      # Service integration tests
│   ├── bitcoin/       # Bitcoin integration tests
│   ├── evolution/     # Evolution integration tests
│   ├── rendering/     # Rendering integration tests
│   └── workers/       # Worker integration tests
├── e2e/               # End-to-end tests
│   ├── viewer/        # Creature viewer tests
│   ├── generation/    # Creature generation tests
│   └── evolution/     # Evolution tests
├── performance/       # Performance tests
│   ├── rendering/      # Rendering performance tests
│   ├── workers/        # Worker performance tests
│   ├── compute/        # Compute performance tests
│   └── memory/         # Memory usage tests
├── mocks/             # Test mocks
│   ├── bitcoinData.ts  # Bitcoin data mocks
│   ├── creatures.ts    # Creature mocks
│   └── services.ts     # Service mocks
├── fixtures/          # Test fixtures
│   ├── blockData/      # Block data fixtures
│   ├── creatures/      # Creature fixtures
│   └── traits/         # Trait fixtures
├── helpers/           # Test helpers
│   ├── rendering.ts    # Rendering helpers
│   ├── assertions.ts   # Custom assertions
│   └── setup.ts        # Test setup helpers
└── setup.ts            # Test setup file
```

## Scripts (`scripts/`)
```
scripts/
├── build/             # Build scripts
│   ├── build.js         # Main build script
│   ├── webpack.config.js # Webpack configuration
│   ├── optimize.js      # Asset optimization
│   └── analyze.js       # Bundle analysis
├── deploy/            # Deployment scripts
│   ├── deploy.js        # Main deployment script
│   ├── staging.js       # Staging deployment
│   └── production.js    # Production deployment
├── test/              # Test scripts
│   ├── runTests.js      # Test runner
│   ├── coverage.js      # Coverage reporter
│   └── benchmark.js     # Performance benchmarks
├── data/              # Data generation scripts
│   ├── generateTraits.js # Trait generation
│   ├── importBitcoin.js  # Bitcoin data import
│   └── exportData.js     # Data export
├── utils/             # Utility scripts
│   ├── createComponent.js # Component generator
│   ├── createService.js   # Service generator
│   ├── createTest.js      # Test generator
│   └── lint.js           # Linting utility
├── phase1/            # Phase 1 scripts
│   ├── generate/        # Generation scripts
│   └── setup/           # Setup scripts
├── phase2/            # Phase 2 scripts
│   ├── generate/        # Generation scripts
│   └── setup/           # Setup scripts
├── phase3/            # Phase 3 scripts
│   ├── generate/        # Generation scripts
│   └── setup/           # Setup scripts
├── phase4/            # Phase 4 scripts
│   ├── generate/        # Generation scripts
│   └── setup/           # Setup scripts
└── setup.js           # Project setup script
```

## Configuration (`config/`)
```
config/
├── default.json       # Default configuration
├── development.json   # Development configuration
├── test.json          # Test configuration
├── production.json    # Production configuration
├── webpack/           # Webpack configurations
│   ├── common.js        # Common webpack config
│   ├── development.js   # Development webpack config
│   └── production.js    # Production webpack config
├── jest/              # Jest configurations
│   ├── unit.js          # Unit test config
│   ├── integration.js   # Integration test config
│   └── e2e.js           # End-to-end test config
├── eslint/            # ESLint configurations
│   ├── base.js          # Base ESLint config
│   ├── typescript.js    # TypeScript ESLint config
│   └── react.js         # React ESLint config
├── typescript/        # TypeScript configurations
│   ├── base.json        # Base TypeScript config
│   ├── react.json       # React TypeScript config
│   └── node.json        # Node TypeScript config
├── app/               # Application configurations
│   ├── traits.json      # Trait system config
│   ├── rendering.json   # Rendering config
│   ├── evolution.json   # Evolution config
│   └── bitcoin.json     # Bitcoin integration config
└── env/               # Environment-specific configs
    ├── local.json       # Local environment config
    ├── staging.json     # Staging environment config
    └── production.json  # Production environment config
```

## Assets (`assets/`)
```
assets/
├── images/            # Image assets
│   ├── icons/           # Icon images
│   ├── backgrounds/     # Background images
│   ├── particles/       # Particle images
│   └── ui/              # UI images
├── sounds/            # Sound assets
│   ├── effects/         # Sound effects
│   ├── music/           # Background music
│   └── ambient/         # Ambient sounds
├── shaders/           # Shader assets
│   ├── particle/        # Particle shaders
│   │   ├── vertex/         # Vertex shaders
│   │   ├── fragment/       # Fragment shaders
│   │   └── compute/        # Compute shaders
│   ├── post/            # Post-processing shaders
│   ├── effects/         # Effect shaders
│   ├── instanced/       # Instanced rendering shaders
│   └── lod/             # Level of detail shaders
├── models/            # 3D model assets
│   ├── particles/       # Particle models
│   └── environments/    # Environment models
├── fonts/             # Font assets
│   ├── display/         # Display fonts
│   └── text/            # Text fonts
├── textures/          # Texture assets
│   ├── particles/       # Particle textures
│   ├── backgrounds/     # Background textures
│   └── effects/         # Effect textures
└── animations/        # Animation assets
    ├── particles/       # Particle animations
    ├── ui/              # UI animations
    └── effects/         # Effect animations
```

## Public (`public/`)
```
public/
├── index.html         # Main HTML file
├── favicon.ico        # Favicon
├── manifest.json      # Web app manifest
├── robots.txt         # Robots file
├── images/            # Public images
│   ├── logo.png         # Logo image
│   └── icons/           # App icons
├── static/            # Static assets
│   ├── js/              # Static JavaScript
│   └── css/             # Static CSS
└── locales/           # Localization files
    ├── en/              # English localization
    └── es/              # Spanish localization
```

## Naming Conventions
- **Files**: Use camelCase for file names (e.g., `creatureGenerator.ts`)
- **Directories**: Use lowercase for directory names (e.g., `abilities`)
- **Classes**: Use PascalCase for class names (e.g., `CreatureGenerator`)
- **Interfaces**: Use PascalCase for interfaces (e.g., `Ability`)
- **Types**: Use PascalCase for type aliases (e.g., `AbilityType`)
- **Constants**: Use UPPER_SNAKE_CASE for constants (e.g., `MAX_PARTICLES`)
- **Functions**: Use camelCase for functions (e.g., `generateCreature()`)
- **Variables**: Use camelCase for variables (e.g., `particleCount`)
- **Enums**: Use PascalCase for enum names (e.g., `Role`, `Rarity`)
- **Enum Values**: Use UPPER_SNAKE_CASE for enum values (e.g., `Role.CORE`, `Rarity.COMMON`)
- **Documentation**: Use snake_case for documentation files (e.g., `trait_system.md`)
- **Worker Messages**: Use PascalCase for worker message types (e.g., `PhysicsWorkerMessage`)
- **Shader Files**: Use camelCase for shader files (e.g., `particleVertex.glsl`, `particleFragment.glsl`)
- **Service Methods**: Use verb-noun pattern for service methods (e.g., `loadTraits()`, `applyMutation()`)
- **Domain Entities**: Use PascalCase for domain entities (e.g., `Creature`, `ParticleGroup`)
- **Domain Services**: Use PascalCase for service classes with 'Service' suffix (e.g., `MutationService`)
- **Bank Loaders**: Use PascalCase for bank loader classes with 'BankLoader' suffix (e.g., `TraitBankLoader`)
- **Renderers**: Use PascalCase for renderer classes with 'Renderer' suffix (e.g., `InstancedRenderer`)
- **Workers**: Use PascalCase for worker classes with 'Worker' suffix (e.g., `PhysicsWorker`)
- **Utility Functions**: Use camelCase for utility functions (e.g., `calculateDistance()`, `hashString()`)
- **Import Paths**: Use relative paths for imports within the same domain (e.g., `import { Trait } from '../types/trait'`)
- **Barrel Exports**: Use index.ts files for barrel exports (e.g., `export * from './traitService'`)
- **Test Files**: Use .test.ts suffix for test files (e.g., `traitService.test.ts`)
- **Mock Files**: Use .mock.ts suffix for mock files (e.g., `traitService.mock.ts`)



