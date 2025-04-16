# Bitcoin Protozoa - Traits Index

This document serves as the master index for all traits in the Bitcoin Protozoa project.

## Trait Domains

### [Abilities](./abilities/index.md)
Abilities are active or passive skills that creatures can use in various situations.

- [CORE Abilities](./abilities/core/index.md)
- [ATTACK Abilities](./abilities/attack/index.md)
- [CONTROL Abilities](./abilities/control/index.md)
- [DEFENSE Abilities](./abilities/defense/index.md)
- [MOVEMENT Abilities](./abilities/movement/index.md)

### [Formations](./formations/index.md)
Formations define how particles arrange themselves and interact within a creature.

- [CORE Formations](./formations/core/index.md)
- [ATTACK Formations](./formations/attack/index.md)
- [CONTROL Formations](./formations/control/index.md)
- [DEFENSE Formations](./formations/defense/index.md)
- [MOVEMENT Formations](./formations/movement/index.md)

### [Behaviors](./behaviors/index.md)
Behaviors define how creatures act and react in different situations.

- [CORE Behaviors](./behaviors/core/index.md)
- [ATTACK Behaviors](./behaviors/attack/index.md)
- [CONTROL Behaviors](./behaviors/control/index.md)
- [DEFENSE Behaviors](./behaviors/defense/index.md)
- [MOVEMENT Behaviors](./behaviors/movement/index.md)

### [Visuals](./visuals/index.md)
Visual traits determine the appearance of creatures and their particles.

- [CORE Visuals](./visuals/core/index.md)
- [ATTACK Visuals](./visuals/attack/index.md)
- [CONTROL Visuals](./visuals/control/index.md)
- [DEFENSE Visuals](./visuals/defense/index.md)
- [MOVEMENT Visuals](./visuals/movement/index.md)

### [Mutations](./mutations/index.md)
Mutations are changes that occur as creatures evolve over time.

- [Common Mutations](./mutations/common.md)
- [Uncommon Mutations](./mutations/uncommon.md)
- [Rare Mutations](./mutations/rare.md)
- [Epic Mutations](./mutations/epic.md)
- [Legendary Mutations](./mutations/legendary.md)

## Trait Tiers

Traits are organized into six rarity tiers:

1. **Common (Tier 1)**: 0-300 attribute points
2. **Uncommon (Tier 2)**: 301-600 attribute points
3. **Rare (Tier 3)**: 601-900 attribute points
4. **Epic (Tier 4)**: 901-1200 attribute points
5. **Legendary (Tier 5)**: 1201-1500 attribute points
6. **Mythic (Tier 6)**: 1501+ attribute points

## Trait Determination

Traits are determined through a combination of factors:

1. **Bitcoin Block Nonce**: Used as RNG seed for deterministic generation
2. **Particle Count**: Influences base attribute values
3. **Attribute Values**: Determine tier thresholds
4. **Confirmations**: Trigger mutations and evolution

## Implementation

Traits are implemented through:

- TypeScript interfaces defining trait structures
- JSON data files containing trait definitions
- RNG system for deterministic selection
- Mutation system for evolution
