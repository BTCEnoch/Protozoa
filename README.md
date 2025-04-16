# Bitcoin Protozoa

## 📚 Essential Documentation
1. [Project Rules](./docs/rules.md) - **START HERE**
2. [Project Overview](./docs/project_overview.md)
3. [Directory Structure](./docs/directory_structure.md)
4. [Implementation Checklist](./docs/project_checklist.md)

## 🧭 Project Navigation Guide

### Quick Start
1. Project Overview: [@docs/project_overview.md](./docs/project_overview.md)
2. Architecture Guide: [@GROK_INDEX.md](./GROK_INDEX.md)
3. Directory Structure: [@docs/directory_structure.md](./docs/directory_structure.md)

### 📚 Documentation Map

#### Core Architecture
- System Architecture: [@docs/architecture/overview.md](./docs/architecture/overview.md)
- Domain Model: [@docs/architecture/domain_model.md](./docs/architecture/domain_model.md)
- Dependency Map: [@docs/dependency_map.md](./docs/dependency_map.md)

#### System Documentation
- Trait System: [@docs/trait_system.md](./docs/trait_system.md)
- Evolution Mechanics: [@docs/evolution_mechanics.md](./docs/evolution_mechanics.md)
- Bitcoin Integration: [@docs/bitcoin_integration.md](./docs/bitcoin_integration.md)
- RNG System: [@docs/rng_system.md](./docs/rng_system.md)

#### Implementation Details
- Project Checklist: [@docs/project_checklist.md](./docs/project_checklist.md)
- Naming Conventions: [@docs/naming_conventions.md](./docs/naming_conventions.md)

### 💻 Source Code Navigation

#### Core Systems
- Type Definitions: [@src/types/](./src/types/)
- Services: [@src/services/](./src/services/)
- Libraries: [@src/lib/](./src/lib/)

#### Key Services
- Game Theory: [@src/services/gameTheory/](./src/services/gameTheory/)
- Evolution: [@src/services/evolution/](./src/services/evolution/)
- Bitcoin: [@src/services/bitcoin/](./src/services/bitcoin/)
- Rendering: [@src/services/rendering/](./src/services/rendering/)

#### Worker System
- Physics Workers: [@workers/physics/](./workers/physics/)
- Behavior Workers: [@workers/behavior/](./workers/behavior/)
- Render Workers: [@workers/render/](./workers/render/)

### 🧪 Testing Navigation
- Unit Tests: [@tests/unit/](./tests/unit/)
- Integration Tests: [@tests/integration/](./tests/integration/)
- Performance Tests: [@tests/performance/](./tests/performance/)

### 🛠 Configuration
- Default Config: [@config/default.json](./config/default.json)
- App Config: [@config/app/](./config/app/)
- TypeScript Config: [@config/typescript/](./config/typescript/)

### 🎨 Assets
- Shaders: [@assets/shaders/](./assets/shaders/)
- Models: [@assets/models/](./assets/models/)
- Textures: [@assets/textures/](./assets/textures/)

## 🔍 Key Concepts Quick Links

### Particle System
- Implementation: [@src/services/rendering/particleRenderer.ts](./src/services/rendering/particleRenderer.ts)
- Documentation: [@docs/architecture/rendering.md](./docs/architecture/rendering.md)

### Evolution System
- Implementation: [@src/services/evolution/evolutionService.ts](./src/services/evolution/evolutionService.ts)
- Documentation: [@docs/evolution_mechanics.md](./docs/evolution_mechanics.md)

### Game Theory System
- Implementation: [@src/services/gameTheory/payoffMatrixService.ts](./src/services/gameTheory/payoffMatrixService.ts)
- Documentation: [@docs/architecture/game_theory.md](./docs/architecture/game_theory.md)

## 🎯 Development Workflows

### Getting Started
1. Setup Guide: [@docs/guides/getting_started.md](./docs/guides/getting_started.md)
2. Development Guide: [@docs/guides/development.md](./docs/guides/development.md)
3. Optimization Guide: [@docs/guides/optimization.md](./docs/guides/optimization.md)

### Common Tasks
- Building: [@scripts/build/build.js](./scripts/build/build.js)
- Testing: [@scripts/test/runTests.js](./scripts/test/runTests.js)
- Deployment: [@scripts/deploy/deploy.js](./scripts/deploy/deploy.js)

## 🔄 System Integration Points

### Bitcoin Integration
- API Client: [@src/services/bitcoin/bitcoinApiClient.ts](./src/services/bitcoin/bitcoinApiClient.ts)
- Block Processing: [@src/services/bitcoin/bitcoinService.ts](./src/services/bitcoin/bitcoinService.ts)

### Rendering Pipeline
- Shader Manager: [@src/services/rendering/shaderManager.ts](./src/services/rendering/shaderManager.ts)
- LOD Manager: [@src/services/rendering/lodManager.ts](./src/services/rendering/lodManager.ts)

## 🏷 Search Tags
#BITCOIN #PROTOZOA #PARTICLE_SYSTEM #EVOLUTION #GAME_THEORY
#THREEJS #TYPESCRIPT #WEBWORKERS #RENDERING #OPTIMIZATION

## 📊 Architecture Diagrams
See [@GROK_INDEX.md](./GROK_INDEX.md) for detailed system architecture diagrams and flow charts.

## 🚀 Getting Started

1. **Installation**
```bash
npm install
```

2. **Development**
```bash
npm run dev
```

3. **Build**
```bash
npm run build
```

## 🔧 Technical Architecture

### Particle System
- Efficient particle management using instanced rendering
- Role-based particle distribution
- Dynamic formation patterns

### Bitcoin Integration
- Block data fetching via ordinals.com API
- Deterministic RNG system using block nonce
- Evolution triggers based on confirmations

### Rendering System
- Three.js-based rendering pipeline
- Instanced mesh optimization
- Level of Detail (LOD) system
- Custom shader effects

### Game Theory Implementation
- Nash equilibrium calculations
- Decision tree processing
- Utility function optimization
- Battle outcome determination

## 🎮 Core Game Systems

### Ability System
- Tiered ability structure (Common to Mythic)
- Role-specific ability pools
- Dynamic ability generation

### Formation System
- Dynamic particle arrangements
- Role-influenced formations
- Spatial optimization

### Mutation System
- Block data-driven mutations
- Progressive evolution
- Trait inheritance

## 📦 Project Organization

```
fresh/
├── src/               # Source code
│   ├── types/         # Type definitions
│   ├── services/      # Business logic
│   ├── lib/           # Core utilities
│   ├── data/          # Data definitions
│   └── models/        # Data models
├── traits/            # Trait definitions
├── docs/              # Documentation
└── tests/             # Test suite
```

## 🛠 Development Tools

- TypeScript for type safety
- Three.js for rendering
- Web Workers for computation
- Jest for testing
- ESLint + Prettier for code quality

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🔍 Implementation Status

For current implementation status and roadmap, see:
- [Project Checklist](./docs/project_checklist.md)
- [Implementation Inventory](./docs/updated_implementation_inventory.md)

## 🎯 Core Systems Deep Dive

### RNG System Navigation
- Core RNG Implementation: [@src/lib/rngSystem.ts](./src/lib/rngSystem.ts)
- RNG Types: [@src/types/rng.ts](./src/types/rng.ts)
- Block Nonce Processing: [@src/services/bitcoin/nonceProcessor.ts](./src/services/bitcoin/nonceProcessor.ts)
- RNG Stream Interface: [@src/types/rng/RNGStream.ts](./src/types/rng/RNGStream.ts)
- RNG Documentation: [@docs/rng_system.md](./docs/rng_system.md)

### Trait System Navigation
#### Core Trait Components
- Trait Service: [@src/services/traits/traitService.ts](./src/services/traits/traitService.ts)
- Trait Factory: [@src/services/traits/traitFactory.ts](./src/services/traits/traitFactory.ts)
- Trait Bank Loader: [@src/services/traits/traitBankLoader.ts](./src/services/traits/traitBankLoader.ts)

#### Trait Type Definitions
- Base Trait Types: [@src/types/trait.ts](./src/types/trait.ts)
- Visual Traits: [@src/types/traits/visual.ts](./src/types/traits/visual.ts)
- Formation Traits: [@src/types/traits/formation.ts](./src/types/traits/formation.ts)
- Behavior Traits: [@src/types/traits/behavior.ts](./src/types/traits/behavior.ts)
- Force Calculation Traits: [@src/types/traits/forceCalculation.ts](./src/types/traits/forceCalculation.ts)
- Class Bonus Traits: [@src/types/traits/classBonus.ts](./src/types/traits/classBonus.ts)
- Subclass Traits: [@src/types/traits/subclass.ts](./src/types/traits/subclass.ts)

#### Trait Data Definitions
- Core Role Traits: [@traits/core/](./traits/core/)
- Control Role Traits: [@traits/control/](./traits/control/)
- Movement Role Traits: [@traits/movement/](./traits/movement/)
- Defense Role Traits: [@traits/defense/](./traits/defense/)
- Attack Role Traits: [@traits/attack/](./traits/attack/)

### Particle System Navigation
#### Core Components
- Particle System: [@src/lib/particleSystem.ts](./src/lib/particleSystem.ts)
- Particle Types: [@src/types/particle.ts](./src/types/particle.ts)
- Group Types: [@src/types/group.ts](./src/types/group.ts)

#### Factories
- Particle Group Factory: [@src/factories/particleGroup/particleGroupFactory.ts](./src/factories/particleGroup/particleGroupFactory.ts)
- Role-Specific Factories:
  - Core Group Factory: [@src/factories/particleGroup/coreGroupFactory.ts](./src/factories/particleGroup/coreGroupFactory.ts)
  - Control Group Factory: [@src/factories/particleGroup/controlGroupFactory.ts](./src/factories/particleGroup/controlGroupFactory.ts)
  - Movement Group Factory: [@src/factories/particleGroup/movementGroupFactory.ts](./src/factories/particleGroup/movementGroupFactory.ts)
  - Defense Group Factory: [@src/factories/particleGroup/defenseGroupFactory.ts](./src/factories/particleGroup/defenseGroupFactory.ts)
  - Attack Group Factory: [@src/factories/particleGroup/attackGroupFactory.ts](./src/factories/particleGroup/attackGroupFactory.ts)

#### Particle Behaviors
- Behavior System: [@src/lib/behaviorSystem.ts](./src/lib/behaviorSystem.ts)
- Behavior Types: [@src/types/behavior.ts](./src/types/behavior.ts)
- Behavior Factory: [@src/factories/behavior/behaviorFactory.ts](./src/factories/behavior/behaviorFactory.ts)

### Integration Points
#### RNG to Trait Generation
```typescript
// Example flow:
BlockData -> NonceProcessor -> RNGSystem -> TraitFactory -> TraitService
```

#### Trait to Particle Group
```typescript
// Example flow:
TraitService -> ParticleGroupFactory -> BehaviorSystem -> RenderingSystem
```

### Common Usage Patterns
#### RNG Stream Creation
```typescript
import { createRNGFromBlockNonce, createRNGStream } from '../../lib/rngSystem';

// Create deterministic RNG stream from block nonce
const rngStream = createRNGStream(createRNGFromBlockNonce(blockData.nonce));
```

#### Trait Application
```typescript
import { getTraitService } from '../../services/traits';
import { getParticleGroupFactory } from '../../factories/particleGroup';

// Apply traits to particle group
const traitService = getTraitService();
const groupFactory = getParticleGroupFactory();
const group = groupFactory.createGroup(Role.CORE);
traitService.applyTraitsToGroup(group, traits);
```


