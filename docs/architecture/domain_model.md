# Bitcoin Protozoa - Domain Model Architecture

## Overview
This document outlines the domain model architecture for the Bitcoin Protozoa project, focusing on the core domain concepts and their relationships.

## Domain Concepts

### Creature
A creature is the top-level entity in the domain model, representing a complete Bitcoin Protozoa organism.

#### Properties
- **ID**: Deterministic ID based on Bitcoin block data
- **Block Data**: Reference to the Bitcoin block data used to generate the creature
- **Groups**: Collection of particle groups organized by role
- **Attributes**: Aggregate attributes derived from groups
- **Evolution Stage**: Current evolution stage based on confirmation milestones

#### Relationships
- Contains multiple ParticleGroups
- Associated with BitcoinBlockData
- Has multiple Traits through its groups

### Particle Group
A particle group represents a collection of particles with the same role.

#### Properties
- **Role**: The role of the particles in the group (CORE, CONTROL, MOVEMENT, DEFENSE, ATTACK)
- **Particles**: Number of particles in the group
- **Attribute Value**: The primary attribute value for the group
- **Tier**: The tier level based on attribute value
- **Subclass**: The subclass of the group based on tier and traits

#### Relationships
- Belongs to a Creature
- Has a Role
- Has a Tier
- Has a Subclass
- Has multiple Traits
- Has a Formation
- Has a Behavior

### Trait
A trait represents a characteristic or ability of a particle group.

#### Properties
- **ID**: Unique identifier for the trait
- **Name**: Display name of the trait
- **Description**: Description of the trait's effects
- **Rarity**: Rarity level of the trait (COMMON, UNCOMMON, RARE, EPIC, LEGENDARY, MYTHIC)
- **Compatible Roles**: Roles that can have this trait
- **Effects**: Effects applied by the trait

#### Relationships
- Associated with one or more ParticleGroups
- Has a Rarity
- Compatible with specific Roles

### Ability
An ability represents an action or effect that a particle group can perform.

#### Properties
- **ID**: Unique identifier for the ability
- **Name**: Display name of the ability
- **Description**: Description of the ability's effects
- **Rarity**: Rarity level of the ability
- **Compatible Roles**: Roles that can have this ability
- **Effects**: Effects applied by the ability
- **Cooldown**: Time between ability activations
- **Duration**: Duration of the ability effect

#### Relationships
- Associated with a Subclass
- Has a Rarity
- Compatible with specific Roles

### Formation
A formation represents the spatial arrangement of particles within a group.

#### Properties
- **ID**: Unique identifier for the formation
- **Name**: Display name of the formation
- **Description**: Description of the formation's effects
- **Pattern**: The spatial pattern of the formation
- **Compatible Roles**: Roles that can use this formation
- **Effects**: Effects applied by the formation

#### Relationships
- Associated with a ParticleGroup
- Compatible with specific Roles

### Behavior
A behavior represents the movement and interaction patterns of particles within a group.

#### Properties
- **ID**: Unique identifier for the behavior
- **Name**: Display name of the behavior
- **Description**: Description of the behavior's effects
- **Pattern**: The movement pattern of the behavior
- **Compatible Roles**: Roles that can use this behavior
- **Effects**: Effects applied by the behavior

#### Relationships
- Associated with a ParticleGroup
- Compatible with specific Roles

### Mutation
A mutation represents a change to a particle group that occurs during evolution.

#### Properties
- **ID**: Unique identifier for the mutation
- **Name**: Display name of the mutation
- **Description**: Description of the mutation's effects
- **Category**: The category of the mutation (ATTRIBUTE, PARTICLE, SUBCLASS, ABILITY, SYNERGY, FORMATION, BEHAVIOR, EXOTIC)
- **Rarity**: Rarity level of the mutation
- **Confirmation Threshold**: The confirmation threshold at which the mutation can occur
- **Effects**: Effects applied by the mutation

#### Relationships
- Applied to a ParticleGroup
- Has a Category
- Has a Rarity

### Subclass
A subclass represents a specialization of a particle group based on its tier and traits.

#### Properties
- **ID**: Unique identifier for the subclass
- **Name**: Display name of the subclass
- **Description**: Description of the subclass's characteristics
- **Role**: The role associated with this subclass
- **Tier**: The tier level required for this subclass
- **Abilities**: Abilities granted by this subclass

#### Relationships
- Associated with a ParticleGroup
- Has a Role
- Has a Tier
- Grants multiple Abilities

### Bitcoin Block Data
Bitcoin block data represents the data from a Bitcoin block used to generate and evolve creatures.

#### Properties
- **Block Number**: The number of the Bitcoin block
- **Nonce**: The nonce value used for RNG seed
- **Confirmations**: The number of confirmations for the block
- **Timestamp**: The timestamp of the block

#### Relationships
- Used to generate Creatures
- Provides evolution data for Creatures

## Domain Services

### Creature Generator
The creature generator service is responsible for creating new creatures based on Bitcoin block data.

#### Responsibilities
- Generate deterministic creatures from Bitcoin block data
- Create particle groups with appropriate roles
- Assign initial traits, formations, and behaviors
- Ensure consistent and balanced creature generation

### Evolution Service
The evolution service is responsible for evolving creatures based on Bitcoin block confirmations.

#### Responsibilities
- Check confirmation milestones
- Determine mutation eligibility
- Apply mutations to particle groups
- Update creature attributes and characteristics

### Mutation Service
The mutation service is responsible for managing and applying mutations to particle groups.

#### Responsibilities
- Maintain a bank of possible mutations
- Select appropriate mutations based on rarity and compatibility
- Apply mutation effects to particle groups
- Track applied mutations

## Domain Rules

### Creature Generation
- Creatures are generated deterministically from Bitcoin block data
- Each creature has 500 particles distributed across five roles
- Initial distribution is 40 base particles per role plus random distribution of remaining 300
- Particle groups are assigned traits based on their role and attribute values

### Evolution
- Evolution occurs at specific confirmation milestones: 10k, 50k, 100k, 250k, 500k, 1M
- Each milestone has a specific mutation chance: 1%, 5%, 10%, 25%, 50%, 100%
- Mutations are selected based on rarity and compatibility with the particle group
- Rarity distribution follows specific weights: Common ~40%, Uncommon ~30%, Rare ~20%, Epic ~8%, Legendary ~1.5%, Mythic ~0.5%

### Attribute Calculation
- Tier is determined by attribute thresholds: Tier 1 (0-300), Tier 2 (301-600), Tier 3 (601-900), Tier 4 (901-1200), Tier 5 (1201-1500), Tier 6 (1501+)
- Attributes are affected by traits, formations, behaviors, and mutations
- Each role has a primary attribute that affects its effectiveness

## Conclusion
The domain model architecture for Bitcoin Protozoa provides a structured framework for representing and manipulating particle-based creatures that evolve based on Bitcoin block data. By clearly defining the core domain concepts and their relationships, the architecture enables the implementation of complex behaviors and emergent properties while maintaining a clean and maintainable codebase.
