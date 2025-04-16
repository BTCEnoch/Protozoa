# Bitcoin Protozoa - Mutation System

## Overview
The mutation system defines how creatures evolve over time based on Bitcoin block confirmations. Mutations can affect any trait domain, creating increasingly unique and powerful creatures as they age.

## Mutation Mechanics
Mutations are triggered by Bitcoin block confirmation milestones:
- **10k confirmations**: 1% mutation chance
- **50k confirmations**: 5% mutation chance
- **100k confirmations**: 10% mutation chance
- **250k confirmations**: 25% mutation chance
- **500k confirmations**: 50% mutation chance
- **1M confirmations**: 100% mutation chance

## Mutation Structure
Each mutation has the following properties:
- **ID**: Unique identifier
- **Name**: Descriptive name
- **Description**: What the mutation does
- **Rarity**: Common, Uncommon, Rare, Epic, or Legendary
- **Attribute Boost**: Percentage boost to base attributes
- **Ability Effect**: How the mutation affects abilities (if applicable)
- **Effect Visualization**: Visual feedback when the mutation is applied

## Mutation Rarity
Mutations have different rarity levels with corresponding probabilities:
- **Common**: 40% chance - Small attribute boosts (+1%)
- **Uncommon**: 30% chance - Moderate attribute boosts (+2%)
- **Rare**: 20% chance - Significant attribute boosts (+5%)
- **Epic**: 8% chance - Major attribute boosts (+8%)
- **Legendary**: 2% chance - Extraordinary attribute boosts (+10%)

## Mutation Types

### Attribute Mutations
- Directly boost attribute values
- Affect tier progression
- Examples:
  - "Minor Strength" - +1% attribute boost
  - "Major Vitality" - +5% attribute boost

### Ability Mutations
- Enhance or modify abilities
- Can unlock new ability variants
- Examples:
  - "Ability Enhancement" - Increases effectiveness of one ability by 10%
  - "Ability Evolution" - Transforms an ability into a more powerful variant

### Formation Mutations
- Alter formation patterns and effects
- Examples:
  - "Formation Stability" - Increases cohesion of a formation
  - "Formation Evolution" - Transforms a formation into a more complex pattern

### Behavior Mutations
- Change how creatures act and react
- Examples:
  - "Behavioral Adaptation" - Improves decision making in specific situations
  - "Instinct Evolution" - Unlocks new behavioral patterns

### Synergy Mutations
- Create synergies between different role groups
- Examples:
  - "Role Synergy" - Increases effectiveness when two roles work together
  - "Complementary Adaptation" - Creates special effects when specific roles interact

## Mutation Accumulation
Creatures can accumulate multiple mutations over time:
- Each mutation is permanent
- Effects stack additively
- Multiple mutations can affect the same trait
- Mutations can push creatures into higher tiers

## Implementation
The mutation system is implemented through:
- TypeScript interfaces defining mutation structures
- JSON data files containing mutation definitions
- RNG system for mutation chance and selection
- Event system for mutation triggers
- Persistence system for tracking mutations
