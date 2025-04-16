# Bitcoin Protozoa - Trait System

## Overview
The trait system is the core of Bitcoin Protozoa's creature generation and evolution. Traits define the characteristics, abilities, and behaviors of creatures, organized into distinct domains.

## Trait Domains

### 1. Abilities
Abilities are active or passive skills that creatures can use. They are categorized by:
- **Role**: CORE, ATTACK, CONTROL, DEFENSE, MOVEMENT
- **Tier**: Common, Uncommon, Rare, Epic, Legendary, Mythic
- **Category**: Primary, Secondary, Unique, Crowd Control
- **Subclass**: Each ability belongs to a specific subclass within its role and tier

#### Ability Categories
- **Primary**: Main offensive or supportive abilities
- **Secondary**: Complementary abilities that enhance the primary role
- **Unique**: Special abilities that define the subclass's identity
- **Crowd Control**: Abilities that control or disrupt enemies

### 2. Formations
Formations define how particles arrange themselves and interact. They provide passive bonuses and visual patterns.
- Each role has specific formation traits
- Formations are tied to subclasses
- Formations influence both visual appearance and gameplay mechanics

### 3. Behaviors
Behaviors define how creatures act and react in different situations.
- Movement patterns
- Target selection
- Ability usage priorities
- Reaction to environmental factors

### 4. Visuals
Visual traits determine the appearance of creatures.
- Particle colors
- Particle sizes
- Emission effects
- Animation patterns

### 5. Mutations
Mutations are changes that occur as creatures evolve over time.
- Triggered by Bitcoin block confirmation milestones
- Can affect any other trait domain
- Have different rarity levels with corresponding impact

## Trait Tiers
Traits are organized into six rarity tiers:
1. **Common (Tier 1)**: Basic traits, accessible to all creatures
2. **Uncommon (Tier 2)**: Improved traits with moderate power
3. **Rare (Tier 3)**: Specialized traits with significant power
4. **Epic (Tier 4)**: Powerful traits with unique effects
5. **Legendary (Tier 5)**: Extremely powerful traits with game-changing effects
6. **Mythic (Tier 6)**: The rarest and most powerful traits

## Subclass System
Each role has multiple subclasses per tier that define specialized trait sets:
- Each subclass contributes specific abilities to the tier's ability pool
- Subclasses define the identity and playstyle of a creature
- Higher tier subclasses have more specialized and powerful traits

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
