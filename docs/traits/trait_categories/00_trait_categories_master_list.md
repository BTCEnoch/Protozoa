# Trait Categories Master List

This document serves as the comprehensive reference for all trait categories in the Bitcoin Protozoa project. It catalogs every trait type, their rarity distributions, and their effects on particle behavior and appearance.

## Table of Contents

1. [Overview](#overview)
2. [Rarity System](#rarity-system)
3. [Particle Roles](#particle-roles)
4. [Trait Category Types](#trait-category-types)
5. [Visual Traits](#visual-traits)
6. [Formation Traits](#formation-traits)
7. [Class Bonuses](#class-bonuses)
8. [Behavior Traits](#behavior-traits)
9. [Force Calculation Traits](#force-calculation-traits)
10. [Subclass Traits](#subclass-traits)
   - [CORE Subclasses](#core-subclasses)
   - [CONTROL Subclasses](#control-subclasses)
   - [ATTACK Subclasses](#attack-subclasses)
   - [DEFENSE Subclasses](#defense-subclasses)
   - [MOVEMENT Subclasses](#movement-subclasses)
11. [Trait Interaction Matrix](#trait-interaction-matrix)
12. [Evolution Effects on Traits](#evolution-effects-on-traits)

## Overview

The trait system forms the foundation of Bitcoin Protozoa's deterministic generation mechanics. Each particle group receives traits across multiple categories, with traits determined by:

- The Bitcoin block's nonce (for RNG seeding)
- The particle group's role (CORE, CONTROL, MOVEMENT, DEFENSE, ATTACK)
- The particle count within each group (determining rarity tier)
- The deterministic RNG chain for each trait category

All traits are deterministically generated, ensuring the same block always produces identical creatures.

## Rarity System

All traits follow a six-tier rarity system:

| Rarity Tier | Name      | Probability | Particle Count Range | Visual Distinction                      |
|-------------|-----------|-------------|----------------------|----------------------------------------|
| 1           | Common    | 40%         | 43-90                | Basic effects                          |
| 2           | Uncommon  | 30%         | 91-121               | Enhanced basic effects                 |
| 3           | Rare      | 20%         | 122-151              | Unique visual properties               |
| 4           | Epic      | 8%          | 152-182              | Advanced visual effects                |
| 5           | Legendary | 1.5%        | 183-203              | Complex animations and particle effects|
| 6           | Mythic    | 0.5%        | 204-220              | Custom shaders and unique animations   |

## Particle Roles

Each particle group has a specific role that influences its traits:

| Role     | Primary Function                   | Trait Specialization                      |
|----------|-----------------------------------|-------------------------------------------|
| CORE     | Central stability and coordination | Energy distribution, stability enhancement|
| CONTROL  | Directs group movement and actions | Command abilities, coordination effects   |
| MOVEMENT | Propulsion and navigation         | Speed, agility, and directional control   |
| DEFENSE  | Protection and damage mitigation  | Shields, barriers, and damage reduction   |
| ATTACK   | Offensive capabilities            | Damage output, targeting, and tactics     |

## Trait Category Types

Traits are divided into five main categories:

1. **Visual Traits**: Determine appearance
2. **Formation Traits**: Define spatial arrangement
3. **Class Bonuses**: Provide statistical enhancements to subclasses
4. **Behavior Traits**: Control movement patterns and interactions
5. **Force Calculation Traits**: Govern physics interactions

## Visual Traits

Visual traits determine the appearance of particles within a group.

### Particle Shape Traits

| Rarity    | Available Shapes (per role) | Special Properties                        |
|-----------|-----------------------------|-----------------------------------------|
| Common    | 8 variations                | Basic geometric shapes                   |
| Uncommon  | 6 variations                | Textured geometric shapes               |
| Rare      | 4 variations                | Complex geometric shapes                |
| Epic      | 3 variations                | Animated geometric shapes               |
| Legendary | 2 variations                | Compound shapes with particle effects   |
| Mythic    | 2 variations                | Custom shader-based shapes with physics |

#### CORE Shape Examples
- Common: Sphere, Cube, Tetrahedron, Octahedron
- Uncommon: Torus, Icosahedron, Dodecahedron
- Rare: Stellated Octahedron, Truncated Icosahedron
- Epic: Pulsating Sphere, Rotating Compound
- Legendary: Quantum Sphere, Dimensional Fold
- Mythic: Cosmic Nexus, Void Fragment

#### CONTROL Shape Examples
- Common: Pyramid, Prism, Diamond, Cylinder
- Uncommon: Hexagonal Prism, Cone, Truncated Pyramid
- Rare: Gyroelongated Pyramid, Rhombicuboctahedron
- Epic: Oscillating Prism, Phasing Diamond
- Legendary: Command Node, Dimensional Anchor
- Mythic: Thought Matrix, Reality Lens

#### MOVEMENT Shape Examples
- Common: Teardrop, Wedge, Fin, Arrow
- Uncommon: Airfoil, Propeller, Turbine
- Rare: Vortex Shape, Hyperbolic Helicoid
- Epic: Phasing Propeller, Dimensional Slip
- Legendary: Spacetime Fold, Quantum Tunnel
- Mythic: Void Skipper, Reality Surfer

#### DEFENSE Shape Examples
- Common: Shield, Wall, Dome, Barrier
- Uncommon: Honeycomb, Fortress, Bulwark
- Rare: Reactive Barrier, Absorption Field
- Epic: Phase Shield, Dimensional Barrier
- Legendary: Quantum Shield, Void Barrier
- Mythic: Reality Anchor, Cosmic Shield

#### ATTACK Shape Examples
- Common: Spike, Blade, Dart, Needle
- Uncommon: Barb, Lance, Scythe, Talon
- Rare: Plasma Edge, Energy Spike
- Epic: Phase Blade, Quantum Spike
- Legendary: Void Cutter, Reality Shard
- Mythic: Cosmic Spear, Dimensional Blade

### Color Scheme Traits

| Rarity    | Available Color Schemes (per role) | Special Properties                      |
|-----------|-----------------------------------|---------------------------------------|
| Common    | 8 variations                      | Solid colors                          |
| Uncommon  | 6 variations                      | Gradient colors                       |
| Rare      | 4 variations                      | Multi-color patterns                  |
| Epic      | 3 variations                      | Animated color shifts                 |
| Legendary | 2 variations                      | Reactive colors with particle effects |
| Mythic    | 2 variations                      | Custom shader-based color effects     |

#### CORE Color Examples
- Common: White, Blue, Gold, Silver
- Uncommon: Blue-White Gradient, Gold-Silver Gradient
- Rare: Energy Pulse Pattern, Quantum Fluctuation
- Epic: Pulsating Energy, Dimensional Shift
- Legendary: Cosmic Core, Stellar Heart
- Mythic: Universal Essence, Primordial Energy

#### CONTROL Color Examples
- Common: Purple, Magenta, Cyan, Indigo
- Uncommon: Purple-Cyan Gradient, Magenta-Indigo Gradient
- Rare: Command Pattern, Neural Network
- Epic: Thought Pulse, Mind Wave
- Legendary: Cosmic Thought, Stellar Mind
- Mythic: Universal Consciousness, Primordial Thought

#### MOVEMENT Color Examples
- Common: Green, Teal, Turquoise, Aqua
- Uncommon: Green-Teal Gradient, Turquoise-Aqua Gradient
- Rare: Speed Pattern, Flow Dynamic
- Epic: Kinetic Pulse, Velocity Wave
- Legendary: Cosmic Motion, Stellar Flow
- Mythic: Universal Current, Primordial Motion

#### DEFENSE Color Examples
- Common: Red, Orange, Yellow, Amber
- Uncommon: Red-Orange Gradient, Yellow-Amber Gradient
- Rare: Shield Pattern, Barrier Dynamic
- Epic: Protection Pulse, Defense Wave
- Legendary: Cosmic Shield, Stellar Barrier
- Mythic: Universal Protection, Primordial Defense

#### ATTACK Color Examples
- Common: Black, Crimson, Maroon, Burgundy
- Uncommon: Black-Crimson Gradient, Maroon-Burgundy Gradient
- Rare: Attack Pattern, Strike Dynamic
- Epic: Damage Pulse, Assault Wave
- Legendary: Cosmic Strike, Stellar Attack
- Mythic: Universal Assault, Primordial Strike

### Visual Effect Traits

| Rarity    | Available Effects (per role) | Special Properties                      |
|-----------|------------------------------|---------------------------------------|
| Common    | 8 variations                 | Basic particle effects                |
| Uncommon  | 6 variations                 | Enhanced particle effects             |
| Rare      | 4 variations                 | Complex particle systems              |
| Epic      | 3 variations                 | Animated effect sequences             |
| Legendary | 2 variations                 | Interactive environmental effects     |
| Mythic    | 2 variations                 | Custom shader-based reality distortion|

#### CORE Effect Examples
- Common: Gentle Glow, Soft Pulse, Faint Aura, Subtle Shimmer
- Uncommon: Energy Field, Particle Orbit, Resonance Wave
- Rare: Quantum Fluctuation, Dimensional Echo, Energy Cascade
- Epic: Reality Ripple, Time Distortion, Space Warping
- Legendary: Cosmic Presence, Stellar Manifestation
- Mythic: Universal Nexus, Primordial Essence

#### CONTROL Effect Examples
- Common: Command Pulse, Thought Wave, Signal Burst, Neural Flicker
- Uncommon: Mind Field, Thought Orbit, Command Resonance
- Rare: Quantum Command, Dimensional Signal, Thought Cascade
- Epic: Reality Command, Time Signal, Space Thought
- Legendary: Cosmic Command, Stellar Signal
- Mythic: Universal Thought, Primordial Command

#### MOVEMENT Effect Examples
- Common: Speed Trail, Motion Blur, Velocity Streak, Kinetic Trace
- Uncommon: Flow Field, Velocity Orbit, Motion Resonance
- Rare: Quantum Motion, Dimensional Velocity, Speed Cascade
- Epic: Reality Flow, Time Motion, Space Velocity
- Legendary: Cosmic Motion, Stellar Velocity
- Mythic: Universal Flow, Primordial Motion

#### DEFENSE Effect Examples
- Common: Shield Flare, Barrier Pulse, Protection Wave, Defense Shimmer
- Uncommon: Shield Field, Barrier Orbit, Protection Resonance
- Rare: Quantum Shield, Dimensional Barrier, Protection Cascade
- Epic: Reality Shield, Time Barrier, Space Protection
- Legendary: Cosmic Shield, Stellar Barrier
- Mythic: Universal Protection, Primordial Defense

#### ATTACK Effect Examples
- Common: Strike Flash, Attack Pulse, Damage Wave, Assault Shimmer
- Uncommon: Strike Field, Attack Orbit, Damage Resonance
- Rare: Quantum Strike, Dimensional Attack, Damage Cascade
- Epic: Reality Strike, Time Attack, Space Damage
- Legendary: Cosmic Strike, Stellar Attack
- Mythic: Universal Assault, Primordial Strike

## Formation Traits

Formation traits define how particles arrange themselves spatially. Each subclass has a unique formation trait.

### CORE Formation Traits

| Rarity    | Formation Name       | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Dense Cluster       | Particles form a tight, spherical cluster                        |
| Common    | Healing Lattice     | Particles arrange in a crystalline lattice pattern               |
| Common    | Protective Shell    | Particles form a hollow spherical shell                          |
| Common    | Stable Core         | Particles form a dense core with orbital layers                  |
| Uncommon  | Energy Nexus        | Particles form interconnected energy channels                    |
| Uncommon  | Quantum Matrix      | Particles arrange in a complex 3D grid with quantum fluctuations |
| Uncommon  | Resonance Web       | Particles form a web-like structure that pulses with energy      |
| Rare      | Dimensional Anchor  | Particles form a structure that appears to bend space            |
| Rare      | Harmonic Lattice    | Particles arrange in a pattern that resonates with energy        |
| Rare      | Stability Field     | Particles form a field that stabilizes nearby particles          |
| Epic      | Reality Node        | Particles form a node that appears to connect to other dimensions|
| Epic      | Temporal Nexus      | Particles form a structure that appears to manipulate time       |
| Legendary | Cosmic Heart        | Particles form a pulsating core that emanates cosmic energy      |
| Legendary | Stellar Nucleus     | Particles form a structure resembling a star's core              |
| Mythic    | Universal Constant  | Particles form a perfect geometric pattern that defies physics   |

### CONTROL Formation Traits

| Rarity    | Formation Name       | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Command Sphere      | Particles form a spherical arrangement with a central node       |
| Common    | Neural Network      | Particles form an interconnected network resembling neurons      |
| Common    | Signal Array        | Particles arrange in a pattern optimized for signal transmission |
| Common    | Thought Matrix      | Particles form a complex 3D grid representing thought patterns   |
| Uncommon  | Coordination Hub    | Particles form a central hub with radiating connections          |
| Uncommon  | Directive Nexus     | Particles form a nexus that coordinates other particles          |
| Uncommon  | Synaptic Web        | Particles form a web-like structure resembling neural synapses   |
| Rare      | Quantum Command     | Particles arrange in a pattern that enables quantum communication|
| Rare      | Dimensional Signal  | Particles form a structure that can signal across dimensions     |
| Rare      | Harmonic Control    | Particles arrange in a pattern that resonates with other groups  |
| Epic      | Reality Command     | Particles form a structure that appears to command reality       |
| Epic      | Temporal Signal     | Particles form a structure that can signal across time           |
| Legendary | Cosmic Command      | Particles form a structure that emanates cosmic commands         |
| Legendary | Stellar Signal      | Particles form a structure resembling a stellar communication hub|
| Mythic    | Universal Thought   | Particles form a perfect pattern representing universal thought  |

### MOVEMENT Formation Traits

| Rarity    | Formation Name       | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Propulsion Array    | Particles form an array optimized for forward movement           |
| Common    | Kinetic Engine      | Particles arrange in a pattern resembling an engine              |
| Common    | Velocity Matrix     | Particles form a matrix that enhances speed                      |
| Common    | Flow Dynamic        | Particles arrange in a pattern that optimizes flow               |
| Uncommon  | Momentum Nexus      | Particles form a nexus that generates momentum                   |
| Uncommon  | Thrust Vector       | Particles form a vector that generates thrust                    |
| Uncommon  | Kinetic Web         | Particles form a web-like structure that enhances movement       |
| Rare      | Quantum Motion      | Particles arrange in a pattern that enables quantum movement     |
| Rare      | Dimensional Slip    | Particles form a structure that can slip between dimensions      |
| Rare      | Harmonic Velocity   | Particles arrange in a pattern that resonates with motion        |
| Epic      | Reality Skipper     | Particles form a structure that appears to skip through reality  |
| Epic      | Temporal Flow       | Particles form a structure that can flow through time            |
| Legendary | Cosmic Motion       | Particles form a structure that emanates cosmic motion           |
| Legendary | Stellar Flow        | Particles form a structure resembling a stellar flow             |
| Mythic    | Universal Current   | Particles form a perfect pattern representing universal motion   |

### DEFENSE Formation Traits

| Rarity    | Formation Name       | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Shield Wall         | Particles form a wall-like barrier                               |
| Common    | Protective Dome     | Particles arrange in a dome-shaped barrier                       |
| Common    | Defense Matrix      | Particles form a matrix that absorbs damage                      |
| Common    | Barrier Field       | Particles arrange in a pattern that creates a defensive field    |
| Uncommon  | Absorption Nexus    | Particles form a nexus that absorbs energy                       |
| Uncommon  | Deflection Vector   | Particles form a vector that deflects attacks                    |
| Uncommon  | Protection Web      | Particles form a web-like structure that enhances defense        |
| Rare      | Quantum Shield      | Particles arrange in a pattern that enables quantum protection   |
| Rare      | Dimensional Barrier | Particles form a barrier that spans dimensions                   |
| Rare      | Harmonic Defense    | Particles arrange in a pattern that resonates with protection    |
| Epic      | Reality Anchor      | Particles form a structure that anchors reality against attacks  |
| Epic      | Temporal Shield     | Particles form a structure that can shield across time           |
| Legendary | Cosmic Protection   | Particles form a structure that emanates cosmic protection       |
| Legendary | Stellar Barrier     | Particles form a structure resembling a stellar barrier          |
| Mythic    | Universal Shield    | Particles form a perfect pattern representing universal protection|

### ATTACK Formation Traits

| Rarity    | Formation Name       | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Strike Formation    | Particles form a formation optimized for striking                |
| Common    | Damage Array        | Particles arrange in an array that enhances damage               |
| Common    | Assault Matrix      | Particles form a matrix that focuses attacks                     |
| Common    | Attack Vector       | Particles arrange in a pattern that creates an attack vector     |
| Uncommon  | Penetration Nexus   | Particles form a nexus that enhances penetration                 |
| Uncommon  | Strike Vector       | Particles form a vector that enhances strikes                    |
| Uncommon  | Assault Web         | Particles form a web-like structure that enhances attacks        |
| Rare      | Quantum Strike      | Particles arrange in a pattern that enables quantum attacks      |
| Rare      | Dimensional Assault | Particles form an assault that spans dimensions                  |
| Rare      | Harmonic Damage     | Particles arrange in a pattern that resonates with damage        |
| Epic      | Reality Shard       | Particles form a structure that shards reality in attacks        |
| Epic      | Temporal Strike     | Particles form a structure that can strike across time           |
| Legendary | Cosmic Assault      | Particles form a structure that emanates cosmic damage           |
| Legendary | Stellar Strike      | Particles form a structure resembling a stellar strike           |
| Mythic    | Universal Blade     | Particles form a perfect pattern representing universal assault  |

## Class Bonuses

Class bonuses are randomly assigned statistical enhancements that boost a subclass's effectiveness in its role. Each group has a pool of class bonuses, with one assigned based on the subclass's rarity tier.

> **Note**: Class bonuses are distinct from behavior traits. While behavior traits define how particles move and interact (their actual movement patterns), class bonuses provide statistical improvements to a subclass's capabilities (like damage boosts, healing increases, etc.).

### CORE Class Bonuses

| Rarity    | Bonus Name           | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Stability           | Maintains position and resists external forces                   |
| Common    | Gentle Pulsing      | Slowly expands and contracts in a rhythmic pattern               |
| Common    | Slow Rotation       | Rotates slowly around its center                                 |
| Common    | Energy Conservation | Minimizes movement to conserve energy                            |
| Uncommon  | Energy Distribution | Distributes energy to nearby particles                           |
| Uncommon  | Harmonic Resonance  | Vibrates at a frequency that resonates with nearby particles     |
| Uncommon  | Adaptive Stability  | Adjusts stability based on environmental factors                 |
| Rare      | Quantum Fluctuation | Rapidly shifts position within a small area                      |
| Rare      | Energy Absorption   | Absorbs energy from nearby sources                              |
| Rare      | Dimensional Anchor  | Maintains position across dimensional shifts                     |
| Epic      | Reality Stabilizer  | Stabilizes reality in a small area                              |
| Epic      | Temporal Lock       | Locks position in time, resisting temporal effects              |
| Legendary | Cosmic Presence     | Maintains presence across cosmic distances                       |
| Legendary | Stellar Anchor      | Anchors position with the force of a star                       |
| Mythic    | Universal Constant  | Maintains absolute position regardless of universal forces       |

### CONTROL Class Bonuses

| Rarity    | Bonus Name           | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Minor Spell Damage   | Increases spell damage by 5%                                     |
| Common    | Minor Cooldown       | Reduces spell cooldowns by 5%                                    |
| Common    | Minor Efficiency     | Reduces energy cost of spells by 5%                              |
| Common    | Minor Control        | Increases duration of control effects by 5%                      |
| Uncommon  | Moderate Spell Damage| Increases spell damage by 10%                                    |
| Uncommon  | Moderate Cooldown    | Reduces spell cooldowns by 10%                                   |
| Uncommon  | Moderate Efficiency  | Reduces energy cost of spells by 10%                             |
| Rare      | Strong Spell Damage  | Increases spell damage by 15%                                    |
| Rare      | Arcane Surge         | Next spell deals +50% damage every 30 seconds                    |
| Rare      | Spell Echo           | 10% chance for a spell to be cast twice                          |
| Epic      | Epic Spell Damage    | Increases spell damage by 20%                                    |
| Epic      | Time Warp            | Reduces all spell cooldowns by 50% for 10 seconds (once per battle)|
| Legendary | Legendary Spell Damage| Increases spell damage by 25%                                   |
| Legendary | Mana Font            | Regenerates 10% energy every 5 seconds                           |
| Mythic    | Arcane Apotheosis    | Becomes invulnerable and casts spells without energy for 10 seconds (once per battle)|

### ATTACK Class Bonuses

| Rarity    | Bonus Name           | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Minor Damage Boost   | Increases physical damage by 5%                                  |
| Common    | Minor Attack Speed   | Increases attack speed by 5%                                     |
| Common    | Minor Critical       | Increases critical hit chance by 5%                              |
| Common    | Minor Penetration    | Increases armor penetration by 5%                                |
| Uncommon  | Moderate Damage Boost| Increases physical damage by 10%                                 |
| Uncommon  | Moderate Attack Speed| Increases attack speed by 10%                                    |
| Uncommon  | Moderate Critical    | Increases critical hit chance by 10%                             |
| Rare      | Strong Damage Boost  | Increases physical damage by 15%                                 |
| Rare      | Frenzy               | +20% attack speed for 10 seconds after killing an enemy         |
| Rare      | Bleed Effect         | 10% chance to cause bleed, dealing 20% damage over 5 seconds    |
| Epic      | Epic Damage Boost    | Increases physical damage by 20%                                 |
| Epic      | Executioner          | +50% damage to enemies below 30% HP                             |
| Legendary | Legendary Damage Boost| Increases physical damage by 25%                                |
| Legendary | Unstoppable Force    | Attacks can't be blocked or dodged for 10 seconds (once per battle)|
| Mythic    | Berserker's Rage     | Doubles damage and attack speed for 10 seconds when HP <50% (once per battle)|

### DEFENSE Class Bonuses

| Rarity    | Bonus Name           | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Minor Damage Reduction| Reduces damage taken by 5%                                       |
| Common    | Minor Shield Boost   | Increases shield strength by 5%                                  |
| Common    | Minor Taunt Duration | Increases taunt duration by 5%                                   |
| Common    | Minor Regen          | Regenerates 1% HP every 5 seconds                                |
| Uncommon  | Moderate Damage Reduction| Reduces damage taken by 10%                                  |
| Uncommon  | Moderate Shield Boost| Increases shield strength by 10%                                 |
| Uncommon  | Moderate Taunt Duration| Increases taunt duration by 10%                                |
| Rare      | Strong Damage Reduction| Reduces damage taken by 15%                                    |
| Rare      | Retaliation          | Reflects 10% of damage taken                                     |
| Rare      | Fortified            | +20% max HP for 10 seconds every 30 seconds                      |
| Epic      | Epic Damage Reduction| Reduces damage taken by 20%                                      |
| Epic      | Guardian's Call      | Taunts all enemies for 5 seconds (once per battle)              |
| Legendary | Legendary Damage Reduction| Reduces damage taken by 25%                                 |
| Legendary | Aegis of Protection  | Grants a shield equal to 30% max HP to all allies (once per battle)|
| Mythic    | Indomitable Will     | Becomes invulnerable for 5 seconds (once per battle)            |

### MOVEMENT Class Bonuses

| Rarity    | Bonus Name           | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Minor Speed Boost    | Increases movement speed by 5%                                    |
| Common    | Minor Evasion Boost  | Increases evasion by 5%                                          |
| Common    | Minor Detection Range| Increases detection range by 5%                                   |
| Common    | Minor Trap Effectiveness| Increases trap damage/slow by 5%                               |
| Uncommon  | Moderate Speed Boost | Increases movement speed by 10%                                   |
| Uncommon  | Moderate Evasion Boost| Increases evasion by 10%                                         |
| Uncommon  | Moderate Detection Range| Increases detection range by 10%                               |
| Rare      | Strong Speed Boost   | Increases movement speed by 15%                                   |
| Rare      | Phantom Step         | Teleports a short distance every 30 seconds                       |
| Rare      | Evasive Maneuvers    | +20% evasion for 5 seconds every 20 seconds                      |
| Epic      | Epic Speed Boost     | Increases movement speed by 20%                                   |
| Epic      | Shadow Cloak         | Becomes invisible for 5 seconds (once per battle)                |
| Legendary | Legendary Speed Boost| Increases movement speed by 25%                                   |
| Legendary | Omni-Dash            | Dashes in any direction, avoiding damage (once per battle)       |
| Mythic    | Time Warp            | Freezes time for 3 seconds, allowing free movement and attacks (once per battle)|

## Behavior Traits

Behavior traits define how particles move and interact with each other and the environment. These traits create the dynamic, lifelike qualities of the protozoa creatures.

### Core Behavior Principles

1. **Role-Based Behaviors**: Each particle group exhibits behaviors appropriate to its functional role
2. **Emergent Complexity**: Simple behavior rules combine to create complex, lifelike movements
3. **Responsive Adaptation**: Behaviors respond to environmental stimuli and internal states
4. **Deterministic Variation**: Behaviors are deterministically generated but with natural variation

### Primary Behavior Types

| Behavior Type | Description | Applicable Roles |
|---------------|-------------|------------------|
| Flocking | Coordinated group movement with separation, alignment, and cohesion | All |
| Pulsation | Rhythmic expansion and contraction | CORE, DEFENSE |
| Rotation | Circular or spinning movement patterns | CONTROL, ATTACK |
| Oscillation | Back-and-forth movement along an axis | MOVEMENT, ATTACK |
| Bifurcation | Splitting and rejoining patterns | CONTROL, MOVEMENT |

### Behavior Implementation

Behaviors are implemented through force calculations that determine particle movement. Each behavior type has parameters that can be adjusted based on rarity tier:

- **Strength**: How powerful the behavior's effect is
- **Range**: How far the behavior extends
- **Priority**: Which behaviors take precedence
- **Persistence**: How long the behavior lasts

## Subclass Traits

Subclass Traits define the specialized roles and abilities of particle groups. Each role has 15 subclasses distributed across six rarity tiers, with unique abilities, formations, and synergies.

### CORE Subclasses

CORE subclasses specialize in healing, support, and stability, with abilities that scale with rarity.

| Tier | Rarity    | Subclass Name | Primary Role | Formation Trait |
|------|-----------|--------------|--------------|------------------|
| 1    | Common    | Stabilizer   | Basic healing and stability | Dense Cluster |
| 1    | Common    | Mender       | Gradual healing | Cubic Lattice |
| 1    | Common    | Guardian     | Team-wide support | Tetrahedral Formation |
| 1    | Common    | Anchor       | Self-sustaining stability | Spherical Shell |
| 2    | Uncommon  | Healer       | Improved healing | Pulsating Sphere |
| 2    | Uncommon  | Vitalist     | Energy and HP boosting | Rotating Cube |
| 2    | Uncommon  | Pillar       | Team-wide support with staying power | Helical Core |
| 3    | Rare      | Restorer     | Potent healing with advanced support | Toroidal Formation |
| 3    | Rare      | Lifegiver    | Regeneration specialist | Fractal Cluster |
| 3    | Rare      | Bastion      | Team-wide defensive support | Gyroscopic Rings |
| 4    | Epic      | Regenerator  | Top-tier healing | Vibrating Lattice |
| 4    | Epic      | Savior       | Revival powers | Quantum Core |
| 5    | Legendary | Eternal      | Unmatched support power | Singularity Point |
| 5    | Legendary | Phoenix      | Resurrection master | Eternal Vortex |
| 6    | Mythic    | Immortal     | Supreme healing and revival | Crystalline Matrix |

### CONTROL Subclasses

CONTROL subclasses excel in spellcasting and utility, manipulating the battlefield with crowd control and strategic abilities.

| Tier | Rarity    | Subclass Name | Primary Role | Formation Trait |
|------|-----------|--------------|--------------|------------------|
| 1    | Common    | Novice Arcanist | Basic spellcasting | Scattered Sparks |
| 1    | Common    | Spellweaver | Simple magical control | Spiral Threads |
| 1    | Common    | Enchanter | Buffs and debuffs | Wavy Ribbons |
| 1    | Common    | Disruptor | Enemy disruption | Chaotic Swirl |
| 2    | Uncommon  | Adept Caster | Improved spellcasting | Orbiting Rings |
| 2    | Uncommon  | Threadbinder | Binding and control | Woven Lattice |
| 2    | Uncommon  | Mesmer | Mind-bending utility | Hypnotic Spiral |
| 3    | Rare      | Sorcerer | Advanced spellcasting | Pulsing Orbs |
| 3    | Rare      | Spellbinder | Enemy lockdown | Entangled Web |
| 3    | Rare      | Illusionist | Battlefield deception | Shifting Shadows |
| 4    | Epic      | Archmage | Devastating spell power | Radiant Core |
| 4    | Epic      | Dominator | Supreme battlefield control | Binding Matrix |
| 5    | Legendary | Grand Magus | Legendary spellcasting | Celestial Orbit |
| 5    | Legendary | Puppetmaster | Friend and foe manipulation | Marionette Web |
| 6    | Mythic    | Omniweaver | Reality-weaving power | Infinite Helix |

### ATTACK Subclasses

ATTACK subclasses focus on melee damage, delivering high-impact strikes with increasing power at higher rarities.

| Tier | Rarity    | Subclass Name | Primary Role | Formation Trait |
|------|-----------|--------------|--------------|------------------|
| 1    | Common    | Skirmisher | Quick light strikes | Flickering Blades |
| 1    | Common    | Brawler | Raw power melee | Clashing Fists |
| 1    | Common    | Duelist | Precision single-target | Sharp Edges |
| 1    | Common    | Ravager | Area damage | Swirling Chaos |
| 2    | Uncommon  | Bladesman | Swift skilled attacks | Whirling Blades |
| 2    | Uncommon  | Brute | Crushing power | Rumbling Core |
| 2    | Uncommon  | Fencer | Lethal precision | Piercing Lines |
| 3    | Rare      | Swordmaster | Blade combat mastery | Blade Vortex |
| 3    | Rare      | Berserker | Fury-fueled fighting | Raging Flames |
| 3    | Rare      | Reaver | Brutal area attacks | Crimson Waves |
| 4    | Epic      | Warblade | Melee combat expert | Storm of Steel |
| 4    | Epic      | Destroyer | Unstoppable force | Shattering Core |
| 5    | Legendary | Bladelord | Legendary blade mastery | Eternal Edge |
| 5    | Legendary | Warlord | Melee chaos commander | Dominion Aura |
| 6    | Mythic    | Godslayer | Divine destruction | Celestial Wrath |

### DEFENSE Subclasses

DEFENSE subclasses form the tanking backbone, absorbing damage and protecting allies with increasing effectiveness at higher rarities.

| Tier | Rarity    | Subclass Name | Primary Role | Formation Trait |
|------|-----------|--------------|--------------|------------------|
| 1    | Common    | Sentinel | Basic defense | Solid Wall |
| 1    | Common    | Protector | Ally shielding | Shielding Arc |
| 1    | Common    | Ward | Area control | Protective Dome |
| 1    | Common    | Bulwark | Damage soaking | Reinforced Shell |
| 2    | Uncommon  | Guardian | Improved mitigation | Towering Barrier |
| 2    | Uncommon  | Defender | Group protection | Radiant Shield |
| 2    | Uncommon  | Bastion | Enhanced durability | Iron Rings |
| 3    | Rare      | Vanguard | Frontline leadership | Vanguard Wall |
| 3    | Rare      | Aegis | Team-wide shielding | Aegis Dome |
| 3    | Rare      | Fortress | Immovable area control | Stone Core |
| 4    | Epic      | Paragon | Heroic tanking | Radiant Bastion |
| 4    | Epic      | Colossus | Massive damage absorption | Titanic Shell |
| 5    | Legendary | Titan | Legendary defense | Eternal Wall |
| 5    | Legendary | Juggernaut | Unstoppable tanking | Juggernaut Core |
| 6    | Mythic    | Indomitable | Invincible protection | Unyielding Matrix |

### MOVEMENT Subclasses

MOVEMENT subclasses blend agility, hybrid abilities, and rogue-like tactics to outmaneuver enemies with increasing versatility at higher rarities.

| Tier | Rarity    | Subclass Name | Primary Role | Formation Trait |
|------|-----------|--------------|--------------|------------------|
| 1    | Common    | Scout | Fast reconnaissance | Flickering Trail |
| 1    | Common    | Rogue | Stealth and evasion | Shadow Wisps |
| 1    | Common    | Drifter | Mobile area harassment | Flowing Streams |
| 1    | Common    | Skimmer | Hit-and-run tactics | Gliding Particles |
| 2    | Uncommon  | Ranger | Improved mobility | Swift Currents |
| 2    | Uncommon  | Assassin | Precision strikes | Phantom Veil |
| 2    | Uncommon  | Nomad | Versatile movement | Wandering Winds |
| 3    | Rare      | Strider | Swift powerful mobility | Bounding Trails |
| 3    | Rare      | Shadowblade | Lethal stealth | Dark Shroud |
| 3    | Rare      | Wanderer | Battlefield control | Ethereal Flow |
| 4    | Epic      | Pathfinder | Navigation mastery | Guiding Light |
| 4    | Epic      | Nightstalker | Shadow predator | Midnight Veil |
| 5    | Legendary | Trailblazer | Unmatched speed | Blazing Path |
| 5    | Legendary | Phantom | Ghostly evasion | Spectral Mist |
| 6    | Mythic    | Omni-Mover | Supreme speed and power | Infinite Flow |

## Force Calculation Traits

Force Calculation Traits determine how particles interact physically with each other and the environment. These traits govern attraction, repulsion, and other physical forces.

### Attraction Force Traits

| Rarity    | Trait Name           | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Basic Attraction    | Standard attraction force between particles                      |
| Uncommon  | Enhanced Attraction | 25% stronger attraction between particles                        |
| Rare      | Strong Attraction   | 50% stronger attraction between particles                        |
| Epic      | Powerful Attraction | 75% stronger attraction between particles                        |
| Legendary | Magnetic Attraction | 100% stronger attraction between particles                       |
| Mythic    | Quantum Attraction  | 150% stronger attraction with quantum effects                    |

### Repulsion Force Traits

| Rarity    | Trait Name           | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Basic Repulsion     | Standard repulsion force between particles                       |
| Uncommon  | Enhanced Repulsion  | 25% stronger repulsion between particles                         |
| Rare      | Strong Repulsion    | 50% stronger repulsion between particles                         |
| Epic      | Powerful Repulsion  | 75% stronger repulsion between particles                         |
| Legendary | Forceful Repulsion  | 100% stronger repulsion between particles                        |
| Mythic    | Quantum Repulsion   | 150% stronger repulsion with quantum effects                     |

### Alignment Force Traits

| Rarity    | Trait Name           | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Basic Alignment     | Standard alignment force between particles                       |
| Uncommon  | Enhanced Alignment  | 25% stronger alignment between particles                         |
| Rare      | Strong Alignment    | 50% stronger alignment between particles                         |
| Epic      | Powerful Alignment  | 75% stronger alignment between particles                         |
| Legendary | Perfect Alignment   | 100% stronger alignment between particles                        |
| Mythic    | Quantum Alignment   | 150% stronger alignment with quantum effects                     |

### Cohesion Force Traits

| Rarity    | Trait Name           | Description                                                      |
|-----------|---------------------|------------------------------------------------------------------|
| Common    | Basic Cohesion      | Standard cohesion force between particles                        |
| Uncommon  | Enhanced Cohesion   | 25% stronger cohesion between particles                          |
| Rare      | Strong Cohesion     | 50% stronger cohesion between particles                          |
| Epic      | Powerful Cohesion   | 75% stronger cohesion between particles                          |
| Legendary | Unbreakable Cohesion| 100% stronger cohesion between particles                         |
| Mythic    | Quantum Cohesion    | 150% stronger cohesion with quantum effects                      |

## Trait Interaction Matrix

The Trait Interaction Matrix shows how different trait categories influence each other, creating emergent behaviors in Bitcoin Protozoa.

| Trait Category     | Visual Traits | Formation Traits | Class Bonuses | Behavior Traits | Force Calculation Traits |
|-------------------|---------------|-----------------|---------------|----------------|---------------------------|
| **Visual Traits**  | - | Particle appearance adapts to formation | Visual effects enhanced by bonuses | Visual effects change with behavior | Visual distortion based on forces |
| **Formation Traits** | Formation affects particle appearance | - | Formation effectiveness boosted by bonuses | Formation changes based on behavior | Formation adapts to physical forces |
| **Class Bonuses** | Bonuses enhance visual effects | Bonuses improve formation stability | - | Bonuses modify behavior parameters | Bonuses affect force calculations |
| **Behavior Traits** | Behavior influences visual effects | Behavior modifies formation patterns | Behavior effectiveness scaled by bonuses | - | Behavior responds to force interactions |
| **Force Calculation Traits** | Forces affect visual distortion | Forces influence formation stability | Forces scaled by class bonuses | Forces impact behavior execution | - |

## Evolution Effects on Traits

As Bitcoin blocks gain confirmations, protozoa evolve with specific mutation chances at milestone thresholds:

| Confirmation Milestone | Mutation Chance | Rarity Tier Potential | Evolution Effects |
|------------------------|-----------------|----------------------|-------------------|
| 10,000 confirmations   | 1%              | Common, Uncommon     | Minor trait adjustments, slight visual changes |
| 50,000 confirmations   | 5%              | Common - Rare        | Noticeable trait improvements, enhanced formations |
| 100,000 confirmations  | 10%             | Common - Epic        | Significant trait evolution, new behaviors |
| 250,000 confirmations  | 25%             | Uncommon - Legendary | Major trait transformations, powerful abilities |
| 500,000 confirmations  | 50%             | Rare - Legendary     | Dramatic trait metamorphosis, exceptional powers |
| 1,000,000 confirmations| 100%            | Epic - Mythic        | Complete trait transcendence, mythical capabilities |