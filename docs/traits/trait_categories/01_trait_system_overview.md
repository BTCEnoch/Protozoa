# Trait System Overview

Overview of the Bitcoin Protozoa trait system, including trait categories, rarity tiers, and generation mechanics.

## Source Content

# Trait System

This document outlines the trait system for particle creatures in the Bitcoin Protozoa project, including the different categories of traits, how they're assigned, and how they affect the behavior and appearance of creatures.

## Table of Contents

1. [Overview](#overview) [Line 10]
2. [Core Concepts](#core-concepts) [Line 20]
   - [Deterministic RNG-Based Trait Assignment](#deterministic-rng-based-trait-assignment) [Line 25]
   - [Group-Based Trait Application](#group-based-trait-application) [Line 50]
3. [Group Attributes](#group-attributes) [Line 75]
   - [Physical Attributes](#physical-attributes) [Line 80]
   - [Visual Attributes](#visual-attributes) [Line 100]
   - [Force Calculation Attributes](#force-calculation-attributes) [Line 120]
4. [Trait Categories](#trait-categories) [Line 140]
   - [Visual Traits](#visual-traits) [Line 150]
   - [Formation Traits](#formation-traits) [Line 200]
   - [Behavior Traits](#behavior-traits) [Line 250]
   - [Force Calculation Traits](#force-calculation-traits) [Line 300]
5. [Trait Assignment Process](#trait-assignment-process) [Line 350]
   - [Deterministic RNG-Based Assignment](#deterministic-rng-based-assignment) [Line 360]
   - [Rarity Determination](#rarity-determination) [Line 380]
   - [Trait Selection](#trait-selection) [Line 400]
6. [Implementation Considerations](#implementation-considerations) [Line 450]
   - [Trait Data Structure](#trait-data-structure) [Line 460]
   - [Trait Visualization](#trait-visualization) [Line 480]
   - [Behavior Implementation](#behavior-implementation) [Line 500]
7. [Future Expansion](#future-expansion) [Line 520]
8. [Related Documents](#related-documents) [Line 550]

## Overview

The trait system is a core component of the Bitcoin Protozoa project, responsible for defining the characteristics, behaviors, and appearances of particle creatures. Traits are deterministically generated based on Bitcoin block data, ensuring that creatures are unique but reproducible given the same block height.

Each particle creature consists of five distinct particle groups (CORE, CONTROL, MOVEMENT, DEFENSE, ATTACK), with each group having its own set of traits that influence its appearance, behavior, and interactions with other groups.

## Core Concepts

### Deterministic RNG-Based Trait Assignment

All traits are assigned using a deterministic RNG chain based on the Bitcoin block nonce:

```typescript
// Start with block nonce as seed
const initialSeed = blockData.nonce;
const rng = mulberry32(initialSeed);

// Create a chain of RNG values for different trait categories
const traitRNG = {
  visual: createChainRNG(rng(), 'visual'),
  formation: createChainRNG(rng(), 'formation'),
  behavior: createChainRNG(rng(), 'behavior'),
  force: createChainRNG(rng(), 'force')
};

// Function to create a chained RNG for a specific trait category
function createChainRNG(seed: number, purpose: string): () => number {
  let currentSeed = seed;
  return () => {
    currentSeed = mulberry32(currentSeed)();
    return currentSeed;
  };
}
```

This approach ensures that:
- Traits are deterministically generated from the block nonce
- Different trait categories have independent but deterministic RNG streams
- The same block always produces the same traits

### Group-Based Trait Application

Traits are applied at the group level, with each of the five role groups receiving their own set of traits:

```typescript
// Assign traits to each group
Object.keys(groups).forEach(groupId => {
  const group = groups[groupId];
  assignTraitsToGroup(group, traitRNG);
});

function assignTraitsToGroup(group: ParticleGroup, traitRNG: TraitRNG) {
  // Assign traits based on group role
  const roleSpecificTraits = getRoleSpecificTraitOptions(group.role);

  // Assign visual traits
  group.visualTraits = selectTraitFromArray(
    roleSpecificTraits.visualOptions,
    traitRNG.visual()
  );

  // Assign formation traits
  group.formationTraits = selectTraitFromArray(
    roleSpecificTraits.formationOptions,
    traitRNG.formation()
  );

  // Assign behavior traits
  group.behaviorTraits = selectTraitFromArray(
    roleSpecificTraits.behaviorOptions,
    traitRNG.behavior()
  );

  // Assign force calculation traits
  group.forceTraits = selectTraitFromArray(
    roleSpecificTraits.forceOptions,
    traitRNG.force()
  );
}
```

This group-based approach allows for:
- Role-specific trait options
- Independent trait selection for each group
- Complex emergent behaviors from group interactions

## Group Attributes

Each particle group has the following core attributes:

### Physical Attributes

1. **Perception**: Defines the interaction radius for the group
   - Determines how far the group can "sense" other groups
   - Affects interaction behaviors
   - Role-specific base values with RNG variation

2. **Force Field Shape**: Defines the boundary container for the group
   - Invisible in the final rendering
   - Affects particle containment and movement
   - Role-specific options selected by RNG

3. **Scale**: Defines the overall size of the group
   - Affects visual appearance and physics interactions
   - Role-specific base values with RNG variation

4. **Particle Shape**: Defines the shape of individual particles
   - Affects visual appearance
   - Role-specific options selected by RNG

### Visual Attributes

1. **Color**: Defines the color scheme for the group
   - RGB values determined by RNG
   - Role-specific base colors with variation
   - May be affected by mutations

2. **Visual Effects**: Special visual properties
   - Selected from an array of possible effects by RNG
   - Organized in preset combinations
   - Examples: trails, glow, pulse effects, etc.

### Force Calculation Attributes

1. **Attraction/Repulsion Values**: Defines how the group interacts with other groups
   - Matrix of values between -1 (repulsion) and 1 (attraction)
   - Each group has values for interaction with each other group
   - Creates complex emergent behaviors

## Trait Categories

Traits are organized into categories and rarity tiers, with each tier having a specific probability of occurrence:

- **Common**: 40% chance (8 variations per category)
- **Uncommon**: 30% chance (6 variations per category)
- **Rare**: 20% chance (4 variations per category)
- **Epic**: 8% chance (3 variations per category)
- **Legendary**: 1.5% chance (2 variations per category)
- **Mythic**: 0.5% chance (2 variations per category)

### Visual Traits

Visual traits define the appearance of particles and are organized by rarity tiers:

1. **Particle Shape Traits**:
   - Common: Sphere, Cube (8 variations)
   - Uncommon: Tetrahedron, Octahedron (6 variations)
   - Rare: Icosahedron, Dodecahedron (4 variations)
   - Epic: Star, Torus (3 variations)
   - Legendary: Crystal, Nebula (2 variations)
   - Mythic: Quantum (shape-shifting) (2 variations)

2. **Color Scheme Traits**:
   - Common: Basic colors (Red, Blue, Green, Yellow, Purple, Orange, Cyan, Magenta)
   - Uncommon: Dual-tone gradients (6 variations)
   - Rare: Tri-color schemes (4 variations)
   - Epic: Iridescent, Metallic, Neon (3 variations)
   - Legendary: Prismatic (rainbow shifting), Void (2 variations)
   - Mythic: Dimensional (color beyond normal spectrum) (2 variations)

3. **Visual Effect Traits**:
   - Common: Basic glow, Simple trails, Soft pulse, Faint aura, Subtle shimmer, Gentle wave, Light haze, Mild distortion
   - Uncommon: Pulse effects, Smoke trails, Energy ribbons, Particle emission, Soft sparkle, Halo effect
   - Rare: Sparkle, Electricity, Flame, Plasma
   - Epic: Aura, Ripple effects, Echo
   - Legendary: Distortion, Reality warping
   - Mythic: Dimensional shift, Quantum effects

### Formation Traits

Formation traits define how particles are arranged within their force field, organized by role and rarity:

#### CORE Formations
- Common: Dense Sphere, Simple Core (8 variations)
- Uncommon: Crystalline Structure, Rotating Core (6 variations)
- Rare: Pulsating Core, Fractal Core (4 variations)
- Epic: Quantum Core, Nested Core, Vortex Core (3 variations)
- Legendary: Singularity Core, Hyperdimensional Core (2 variations)
- Mythic: Dimensional Core, Transcendent Core (2 variations)

#### CONTROL Formations
- Common: Command Sphere, Simple Ring, Basic Network, Central Hub, Orbital Control, Radial Array, Nodal Grid, Axial Formation (8 variations)
- Uncommon: Gyroscopic Ring, Satellite Array, Neural Web, Distributed Command, Hierarchical Network, Adaptive Control (6 variations)
- Rare: Neural Network, Distributed Nodes, Quantum Relay, Synaptic Web (4 variations)
- Epic: Quantum Network, Hive Mind, Omniscient Array (3 variations)
- Legendary: Omniscient Array, Transcendent Network (2 variations)
- Mythic: Transcendent Control, Cosmic Awareness (2 variations)

#### MOVEMENT Formations
- Common: Simple Propulsion, Basic Fins, Thrust Array, Directional Pods, Momentum Drivers, Kinetic Formation, Velocity Grid, Propulsion Network (8 variations)
- Uncommon: Wave Formation, Thrust Vectors, Oscillating Drive, Pulsed Propulsion, Harmonic Movement, Resonant Thrust (6 variations)
- Rare: Directional Grid, Propulsion Array, Quantum Drive, Vortex Propulsion (4 variations)
- Epic: Quantum Propulsion, Telekinetic Drive, Gravity Manipulation (3 variations)
- Legendary: Warp Drive, Spacetime Manipulation (2 variations)
- Mythic: Dimensional Shift Drive, Reality Folding (2 variations)

#### DEFENSE Formations
- Common: Simple Barrier, Basic Shield, Protective Shell, Defensive Wall, Barrier Grid, Shielding Array, Protective Sphere, Defensive Lattice (8 variations)
- Uncommon: Spherical Shell, Mesh Network, Reactive Barrier, Adaptive Shield, Reinforced Membrane, Layered Protection (6 variations)
- Rare: Toroidal Shield, Layered Defense, Quantum Barrier, Phased Defense (4 variations)
- Epic: Adaptive Shield, Reactive Barrier, Dimensional Shield (3 variations)
- Legendary: Impenetrable Fortress, Absolute Defense (2 variations)
- Mythic: Dimensional Barrier, Reality Anchor (2 variations)

#### ATTACK Formations
- Common: Simple Strike, Basic Patrol, Offensive Array, Hunter Formation, Striker Pattern, Assault Configuration, Tactical Formation, Combat Grid (8 variations)
- Uncommon: Swarm Pattern, Orbital Strikers, Pincer Attack, Flanking Formation, Envelopment Strategy, Tactical Strike (6 variations)
- Rare: Predator Formation, Ambush Configuration, Phantom Strike, Stealth Attack (4 variations)
- Epic: Phantom Strike, Ghost Protocol, Overwhelming Force (3 variations)
- Legendary: Devastator Array, Annihilation Pattern (2 variations)
- Mythic: Annihilation Formation, Reality Sunder (2 variations)

### Behavior Traits

Behavior traits define how particles move and interact, organized by rarity:

1. **Emergent Behaviors**:
   - Common: Basic Flocking, Simple Pulsation, Gentle Rotation, Mild Oscillation, Subtle Drift, Slow Spin, Gradual Expansion, Soft Contraction (8 variations)
   - Uncommon: Advanced Flocking, Complex Pulsation, Multi-axis Rotation, Harmonic Oscillation, Wave Propagation, Resonant Movement (6 variations)
   - Rare: Bifurcation, Synchronized Movement, Quantum Fluctuation, Phase Shifting (4 variations)
   - Epic: Synchronized Pulsing, Consensus Movement, Collective Intelligence (3 variations)
   - Legendary: Adaptive Learning, Pattern Recognition (2 variations)
   - Mythic: Collective Intelligence, Temporal Manipulation (2 variations)

2. **Role-Specific Behaviors**:

   #### CORE Behaviors
   - Common: Stability, Central Positioning, Gentle Pulsing, Slow Rotation, Energy Conservation, Balanced Movement, Harmonic Oscillation, Subtle Vibration
   - Uncommon: Enhanced Stability, Dynamic Centering, Resonant Pulsing, Multi-axis Rotation, Energy Cycling, Adaptive Positioning
   - Rare: Perfect Balance, Quantum Stability, Dimensional Anchoring, Temporal Stability
   - Epic: Reality Anchoring, Dimensional Stability, Quantum Centering
   - Legendary: Absolute Stability, Transcendent Balance
   - Mythic: Cosmic Anchoring, Universal Stability

   #### CONTROL Behaviors
   - Common: Directional Influence, Basic Decision-making, Simple Coordination, Predictive Movement, Response Patterns, Tactical Positioning, Strategic Rotation, Command Presence
   - Uncommon: Enhanced Coordination, Complex Decision-making, Tactical Awareness, Strategic Planning, Adaptive Leadership, Predictive Analysis
   - Rare: Perfect Coordination, Quantum Decision-making, Tactical Brilliance, Strategic Mastery
   - Epic: Omniscient Awareness, Perfect Strategy, Transcendent Coordination
   - Legendary: Absolute Command, Perfect Awareness
   - Mythic: Cosmic Awareness, Universal Coordination

   #### MOVEMENT Behaviors
   - Common: Basic Propulsion, Simple Navigation, Directional Thrust, Momentum Conservation, Path Following, Velocity Control, Acceleration Management, Drift Correction
   - Uncommon: Enhanced Propulsion, Complex Navigation, Efficient Thrust, Momentum Optimization, Advanced Pathfinding, Velocity Modulation
   - Rare: Perfect Navigation, Quantum Propulsion, Efficient Movement, Optimal Pathfinding
   - Epic: Telekinetic Movement, Gravity Manipulation, Spacetime Navigation
   - Legendary: Warp Movement, Reality Shifting
   - Mythic: Dimensional Movement, Cosmic Navigation

   #### DEFENSE Behaviors
   - Common: Protective Positioning, Basic Barrier Formation, Shield Maintenance, Perimeter Patrol, Threat Assessment, Defensive Stance, Barrier Reinforcement, Shield Regeneration
   - Uncommon: Enhanced Protection, Complex Barrier Formation, Adaptive Shielding, Reactive Defense, Threat Prioritization, Defensive Coordination
   - Rare: Perfect Protection, Quantum Shielding, Impenetrable Barrier, Adaptive Defense
   - Epic: Dimensional Shielding, Perfect Defense, Absolute Protection
   - Legendary: Invulnerable Defense, Reality Barrier
   - Mythic: Cosmic Shield, Universal Protection

   #### ATTACK Behaviors
   - Common: Basic Patrol, Simple Targeting, Threat Response, Offensive Positioning, Strike Preparation, Attack Coordination, Tactical Movement, Strategic Positioning
   - Uncommon: Enhanced Patrol, Complex Targeting, Efficient Strikes, Tactical Maneuvering, Threat Neutralization, Coordinated Assault
   - Rare: Perfect Targeting, Quantum Strike, Devastating Attack, Tactical Brilliance
   - Epic: Ghost Strike, Phantom Attack, Overwhelming Force
   - Legendary: Annihilation Strike, Reality Sundering
   - Mythic: Cosmic Strike, Universal Force

### Force Calculation Traits

Force calculation traits define the physics interactions between groups, organized by rarity:

1. **Attraction/Repulsion Profiles**:
   - Common: Standard profiles (8 variations)
     - Balanced: Moderate attraction/repulsion values
     - Attractive: Higher attraction values overall
     - Repulsive: Higher repulsion values overall
     - Selective: Strong attraction to some, repulsion to others
     - Neutral: Minimal interaction with other groups
     - Cohesive: Strong attraction to same role
     - Divisive: Strong repulsion from same role
     - Random: Varied values with no clear pattern
   - Uncommon: Enhanced profiles (6 variations)
     - Harmonic: Creates rhythmic movement patterns
     - Resonant: Amplifies certain interactions
     - Adaptive: Slowly changes based on proximity
     - Pulsing: Alternates between attraction and repulsion
     - Orbital: Creates stable orbital patterns
     - Hierarchical: Stronger influence on lower-tier roles
   - Rare: Specialized profiles (4 variations)
     - Quantum: Creates unpredictable but stable patterns
     - Vortex: Creates spiral movement patterns
     - Crystalline: Creates lattice-like arrangements
     - Fluid: Creates flowing, liquid-like movement
   - Epic: Dynamic profiles (3 variations)
     - Chaotic: Creates complex, unpredictable patterns
     - Harmonic Cascade: Creates beautiful, complex patterns
     - Dimensional: Influences beyond normal space
   - Legendary: Adaptive profiles (2 variations)
     - Sentient: Appears to make intelligent decisions
     - Reality Warping: Distorts normal physics
   - Mythic: Reality-bending profiles (2 variations)
     - Cosmic: Transcends normal physics
     - Universal: Creates perfect harmony

2. **Force Field Properties**:
   - Common: Basic properties (8 variations)
     - Standard: Balanced strength, flexibility, responsiveness
     - Rigid: High strength, low flexibility
     - Elastic: Low strength, high flexibility
     - Responsive: High responsiveness, average other properties
     - Stable: Low responsiveness, high strength
     - Balanced: Equal values for all properties
     - Specialized: One high value, others low
     - Adaptive: Slowly changes based on conditions
   - Uncommon: Enhanced properties (6 variations)
     - Resonant: Creates harmonic oscillations
     - Pulsing: Strength varies rhythmically
     - Layered: Multiple fields with different properties
     - Adaptive: Changes based on external forces
     - Reactive: Responds quickly to threats
     - Efficient: Optimized for energy conservation
   - Rare: Specialized properties (4 variations)
     - Quantum: Probabilistic field behavior
     - Crystalline: Forms rigid geometric patterns
     - Fluid: Flows and adapts like a liquid
     - Plasma: High energy, dynamic field
   - Epic: Dynamic properties (3 variations)
     - Intelligent: Appears to make decisions
     - Dimensional: Operates beyond normal space
     - Reality Distortion: Warps physics locally
   - Legendary: Adaptive properties (2 variations)
     - Sentient: Appears to have consciousness
     - Reality Anchor: Stabilizes surrounding space
   - Mythic: Reality-bending properties (2 variations)
     - Cosmic: Transcends normal physics
     - Universal: Perfect field properties

## Trait Assignment Process

### Deterministic RNG-Based Assignment

1. **Initialize RNG Chain**:
```typescript
// Start with block nonce as seed
const initialSeed = blockData.nonce;
const rng = mulberry32(initialSeed);

// Create a chain of RNG values for different trait categories
const traitRNG = {
  visual: createChainRNG(rng(), 'visual'),
  formation: createChainRNG(rng(), 'formation'),
  behavior: createChainRNG(rng(), 'behavior'),
  force: createChainRNG(rng(), 'force')
};

// Function to create a chained RNG for a specific trait category
function createChainRNG(seed: number, purpose: string): () => number {
  let currentSeed = seed;
  return () => {
    currentSeed = mulberry32(currentSeed)();
    return currentSeed;
  };
}
```

### Rarity Determination

```typescript
function determineRarity(rng: () => number): Rarity {
  const roll = rng();

  if (roll < 0.005) return Rarity.MYTHIC;       // 0.5% chance
  if (roll < 0.02) return Rarity.LEGENDARY;     // 1.5% chance
  if (roll < 0.10) return Rarity.EPIC;          // 8% chance
  if (roll < 0.30) return Rarity.RARE;          // 20% chance
  if (roll < 0.60) return Rarity.UNCOMMON;      // 30% chance
  return Rarity.COMMON;                         // 40% chance
}
```

### Trait Selection

```typescript
function selectTraitByRarity(category: string, role: ParticleRole, rarity: Rarity, rng: () => number): Trait {
  // Get available traits for this category, role, and rarity
  const availableTraits = getTraitsForCategoryRoleRarity(category, role, rarity);

  // Select a random trait from available options
  const traitIndex = Math.floor(rng() * availableTraits.length);
  return availableTraits[traitIndex];
}

function assignTraitsToGroup(group: ParticleGroup, traitRNG: TraitRNG) {
  // Determine rarity for each trait category
  const visualRarity = determineRarity(traitRNG.visual());
  const formationRarity = determineRarity(traitRNG.formation());
  const behaviorRarity = determineRarity(traitRNG.behavior());
  const forceRarity = determineRarity(traitRNG.force());

  // Assign visual traits
  group.visualTraits = {
    shape: selectTraitByRarity('particleShape', group.role, visualRarity, traitRNG.visual()),
    color: selectTraitByRarity('colorScheme', group.role, visualRarity, traitRNG.visual()),
    effects: selectTraitByRarity('visualEffects', group.role, visualRarity, traitRNG.visual())
  };

  // Assign formation traits
  group.formationTraits = selectTraitByRarity(
    'formation',
    group.role,
    formationRarity,
    traitRNG.formation()
  );

  // Assign behavior traits
  group.behaviorTraits = selectTraitByRarity(
    'behavior',
    group.role,
    behaviorRarity,
    traitRNG.behavior()
  );

  // Assign force calculation traits
  group.forceTraits = {
    attractionProfile: selectTraitByRarity('attractionProfile', group.role, forceRarity, traitRNG.force()),
    fieldProperties: selectTraitByRarity('fieldProperties', group.role, forceRarity, traitRNG.force())
  };
}
```

## Implementation Considerations

### Trait Data Structure

```typescript
enum Rarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
  MYTHIC = 'mythic'
}

interface Trait {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  value: any;
  properties?: Record<string, any>;
}

interface GroupTraits {
  // Physical traits
  perception: number;
  forceFieldShape: Trait;
  scale: number;
  particleShape: Trait;

  // Visual traits
  visualTraits: {
    shape: Trait;
    color: Trait;
    effects: Trait;
  };

  // Formation traits
  formationTraits: Trait;

  // Behavior traits
  behaviorTraits: Trait;

  // Force calculation traits
  forceTraits: {
    attractionProfile: Trait;
    fieldProperties: Trait;
  };

  // Interaction matrix
  interactionMatrix: Record<string, number>; // Group ID -> attraction/repulsion value
}
```

### Trait Visualization

Visual traits should be implemented with clear visual distinctions based on rarity:

```typescript
// Apply shape based on trait
const geometry = geometries[group.visualTraits.shape.value];

// Apply color scheme based on trait
const colorScheme = group.visualTraits.color.value;

// Create material based on rarity
let material;
switch (group.visualTraits.color.rarity) {
  case Rarity.COMMON:
  case Rarity.UNCOMMON:
    // Simple material for common/uncommon
    material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorScheme.r, colorScheme.g, colorScheme.b),
      emissive: new THREE.Color(colorScheme.r * 0.5, colorScheme.g * 0.5, colorScheme.b * 0.5),
      emissiveIntensity: 0.5
    });
    break;

  case Rarity.RARE:
  case Rarity.EPIC:
    // Advanced material for rare/epic
    material = createAdvancedMaterial(colorScheme);
    break;

  case Rarity.LEGENDARY:
  case Rarity.MYTHIC:
    // Custom shader material for legendary/mythic
    material = createCustomShaderMaterial(colorScheme, group.visualTraits.color.rarity);
    break;
}
```

### Behavior Implementation

Behaviors should be implemented as modular components with rarity-based complexity:

```typescript
function applyBehavior(group: ParticleGroup, behaviorTrait: Trait) {
  const behaviorType = behaviorTrait.value;
  const properties = behaviorTrait.properties || {};
  const rarity = behaviorTrait.rarity;

  // Base implementation
  let behaviorImplementation;

  switch (behaviorType) {
    case 'flocking':
      behaviorImplementation = createFlockingBehavior(properties);
      break;

    case 'pulsation':
      behaviorImplementation = createPulsationBehavior(properties);
      break;

    case 'rotation':
      behaviorImplementation = createRotationBehavior(properties);
      break;

    // Other behavior types
  }

  // Enhance based on rarity
  if (rarity >= Rarity.RARE) {
    behaviorImplementation = enhanceBehavior(behaviorImplementation, rarity);
  }

  // Apply to group
  group.addBehavior(behaviorImplementation);
}
```

## Future Expansion

The trait system is designed to be expandable for future features:

1. **Combat Attributes**: For future combat mechanics
   - Damage output
   - Defense rating
   - Special abilities
   - Status effects

2. **Special Abilities**: For future interactive features
   - Temporary boosts
   - Area effects
   - Transformation abilities
   - Environmental interactions

3. **Advanced Behaviors**: For more complex creature interactions
   - Learning behaviors
   - Adaptive strategies
   - Complex decision-making
   - Environmental awareness

4. **Environmental Adaptations**: For interactions with different environments
   - Terrain adaptations
   - Weather responses
   - Resource gathering
   - Territory marking

## Related Documents

- [RNG System](../bitcoin/03_rng_system.md) - For details on the deterministic random number generation system
- [Evolution Mechanics](../bitcoin/02_evolution_mechanics.md) - For details on the confirmation-based mutation system
- [Blockchain Integration](../bitcoin/01_blockchain_integration.md) - For details on Bitcoin blockchain integration
- [Particle System](../particles/01_particle_system.md) - For details on the particle system architecture
- [Force Calculations](../physics/02_force_calculations.md) - For details on force calculation formulas
- [Color Palettes](01_color_palettes.md) - For details on color palette generation
- [Particle Shapes](02_particle_shapes.md) - For details on particle shape implementation
- [Formation Patterns](03_formation_patterns.md) - For details on formation pattern implementation
- [Behavior Traits](04_behavior_traits.md) - For details on behavior trait implementation
- [Force Field Traits](05_force_field_traits.md) - For details on force field trait implementation

