# Bitcoin Protozoa - Project Overview

## Core Concept
Bitcoin Protozoa creates evolving particle creatures using Bitcoin block data. Each creature consists of 500 particles distributed across five role groups (CORE, CONTROL, MOVEMENT, DEFENSE, ATTACK), with traits and abilities determined by Bitcoin block data.

## Key Features

### Particle System
- 500 particles per creature
- Particles divided into five role groups
- Particle count per group influences attributes and abilities

### Bitcoin Integration
- Uses ordinals.com API to fetch block data
- Block nonce used as RNG seed for deterministic generation
- Block confirmations determine evolution milestones

### Trait System
- Traits organized by domain (abilities, formations, behaviors, visuals, mutations)
- Each trait domain has its own organization and hierarchy
- Traits are associated with specific roles and tiers

### Ability System
- Hybrid approach combining ability pools and tiered progression
- Lower tiers (Common, Uncommon): Abilities drawn from pools
- Higher tiers (Rare, Epic, Legendary, Mythic): More specialized abilities
- Each tier has specific subclasses that contribute abilities to the pool

### Evolution Mechanics
- Creatures evolve based on Bitcoin block confirmations
- Mutation chances at specific milestones:
  - 10k confirmations: 1% chance
  - 50k confirmations: 5% chance
  - 100k confirmations: 10% chance
  - 250k confirmations: 25% chance
  - 500k confirmations: 50% chance
  - 1M confirmations: 100% chance

### Tier System
- Six rarity tiers with specific attribute thresholds:
  - Tier 1 (Common): 0-300
  - Tier 2 (Uncommon): 301-600
  - Tier 3 (Rare): 601-900
  - Tier 4 (Epic): 901-1200
  - Tier 5 (Legendary): 1201-1500
  - Tier 6 (Mythic): 1501+

## Technical Architecture
- TypeScript-based implementation
- Domain-driven design
- RNG system for deterministic generation
- API integration for Bitcoin data

## Project Structure
The project follows a domain-driven directory structure:

```
protozoa/
├── src/               # Source code
│   ├── types/         # TypeScript type definitions
│   ├── lib/           # Core functionality
│   ├── data/          # Data definitions
│   └── scripts/       # Utility scripts
├── traits/            # Trait definitions and documentation
│   ├── abilities/     # Ability traits
│   ├── formations/    # Formation traits
│   ├── behaviors/     # Behavior traits
│   ├── visuals/       # Visual traits
│   └── mutations/     # Mutation traits
└── docs/              # Project documentation
```

## Development Approach
- Phased implementation
- Strong typing with TypeScript
- Comprehensive documentation
- Test-driven development

