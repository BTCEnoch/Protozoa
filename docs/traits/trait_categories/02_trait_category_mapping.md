# Trait Category Mapping

Detailed mapping of trait categories and their relationships.

## Source Content

# Detailed Trait Category Mapping

This document provides a comprehensive mapping between the role-based traits in Bitcoin Protozoa and the trait categories defined in the balancing system.

## Table of Contents

1. [Overview](#overview)
2. [Trait Categories](#trait-categories)
3. [Role-Based Traits](#role-based-traits)
4. [Mapping Approach](#mapping-approach)
5. [Formation Traits Mapping](#formation-traits-mapping)
6. [Behavior Traits Mapping](#behavior-traits-mapping)
7. [Mutation Traits Mapping](#mutation-traits-mapping)
8. [Category Distribution Analysis](#category-distribution-analysis)
9. [Implementation Guidelines](#implementation-guidelines)

## Overview

Bitcoin Protozoa has two organizational systems for traits:

1. **Role-Based Organization**: Traits are organized by particle role (CORE, CONTROL, MOVEMENT, DEFENSE, ATTACK)
2. **Category-Based Organization**: Traits are categorized by effect type (Stat Buffs, Special Formations, Special Abilities, Special Behaviors, Strange Occurrences)

This document maps between these two systems to ensure consistent implementation and balanced gameplay.

## Trait Categories

The balancing system defines five trait categories:

1. **Stat Buffs**: Enhances a stat (e.g., +15% Attack)
   - Direct numerical improvements to attributes
   - Examples: HP boost, damage increase, speed enhancement

2. **Special Formations**: Alters combat positioning (e.g., shield allies)
   - Spatial arrangements of particles
   - Examples: protective formations, offensive formations, evasive patterns

3. **Special Abilities**: Unique skills (e.g., poison, teleport)
   - Active abilities that can be triggered
   - Examples: projectile attacks, healing pulses, teleportation

4. **Special Behaviors**: Reactive effects (e.g., retaliate when hit)
   - Passive or reactive behaviors
   - Examples: counterattacks, automatic healing, passive auras

5. **Strange Occurrences**: Rare, situational effects (e.g., revive once per battle)
   - Unusual or powerful effects that don't fit other categories
   - Examples: resurrection, time manipulation, reality warping

## Role-Based Traits

The Bitcoin Protozoa project organizes traits by particle role:

1. **CORE Traits**: Related to the central, stabilizing force of the creature
   - Purpose: Provides durability and constitution
   - Examples: energy management, stability enhancement, regeneration

2. **CONTROL Traits**: Related to the directive force of the creature
   - Purpose: Provides intelligence and control effects
   - Examples: coordination enhancement, skill manipulation, debuff application

3. **MOVEMENT Traits**: Related to the locomotive force of the creature
   - Purpose: Provides agility and speed
   - Examples: speed boosts, evasion techniques, terrain navigation

4. **DEFENSE Traits**: Related to the protective force of the creature
   - Purpose: Provides damage mitigation and resilience
   - Examples: shields, damage reduction, status resistance

5. **ATTACK Traits**: Related to the offensive force of the creature
   - Purpose: Provides damage and combat strength
   - Examples: damage enhancement, critical strikes, penetration

## Mapping Approach

To map between role-based traits and trait categories, we use the following approach:

1. **Primary Effect Analysis**: Examine the primary effect of each trait to determine its category
2. **Role Consideration**: Consider the role's natural tendencies when categorizing ambiguous traits
3. **Balance Maintenance**: Ensure a balanced distribution of categories across roles
4. **Rarity Alignment**: Align rarity tiers with appropriate category power levels

### Trait Mapping Flowchart

```
                                 ┌─────────────────┐
                                 │    Trait to     │
                                 │    Categorize   │
                                 └────────┬────────┘
                                          │
                                          ▼
                          ┌───────────────────────────┐
                          │  What is the primary      │
                          │  effect of the trait?     │
                          └───────────────┬───────────┘
                                          │
           ┌───────────────┬──────────────┼──────────────┬───────────────┐
           │               │              │              │               │
           ▼               ▼              ▼              ▼               ▼
┌─────────────────┐ ┌─────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────────────┐
│  Directly       │ │ Changes     │ │ Provides     │ │ Responds to  │ │ Rare, unusual,  │
│  enhances       │ │ spatial     │ │ active       │ │ events or    │ │ or powerful     │
│  stats?         │ │ arrangement?│ │ ability?     │ │ conditions?  │ │ effect?         │
└────────┬────────┘ └──────┬──────┘ └──────┬───────┘ └──────┬───────┘ └────────┬────────┘
         │                 │               │                │                   │
         ▼                 ▼               ▼                ▼                   ▼
┌─────────────────┐ ┌─────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────────────┐
│   Stat Buffs    │ │   Special   │ │   Special    │ │   Special    │ │     Strange     │
│                 │ │  Formations │ │  Abilities   │ │  Behaviors   │ │   Occurrences   │
└─────────────────┘ └─────────────┘ └──────────────┘ └──────────────┘ └─────────────────┘
```

This flowchart guides the categorization process for each trait, ensuring consistent mapping between role-based traits and trait categories.

## Formation Traits Mapping

Formation traits define how particles arrange themselves spatially. Here's how they map to trait categories:

### CORE Formation Traits

| Formation Name | Rarity | Category | Justification |
|----------------|--------|----------|---------------|
| Dense Cluster | Common | Stat Buffs | Enhances stability and reduces energy use |
| Cubic Lattice | Common | Special Formations | Provides structured base for alignment |
| Tetrahedral Formation | Common | Special Formations | Provides balanced structure |
| Spherical Shell | Common | Special Formations | Provides protective layer |
| Pulsating Sphere | Uncommon | Special Abilities | Emits energy pulse to influence nearby particles |
| Rotating Cube | Uncommon | Special Behaviors | Affects orientation through motion |
| Helical Core | Uncommon | Special Formations | Creates spiral energy flow |
| Toroidal Formation | Rare | Special Formations | Circulates energy efficiently |
| Fractal Cluster | Rare | Special Abilities | Extends influence over wider area |
| Gyroscopic Rings | Epic | Special Behaviors | Stabilizes against external forces |
| Vibrating Lattice | Epic | Special Abilities | Generates resonance to influence other roles |
| Quantum Core | Legendary | Strange Occurrences | Exists in multiple positions simultaneously |
| Singularity Point | Legendary | Strange Occurrences | Concentrates energy maximally |
| Eternal Vortex | Mythic | Strange Occurrences | Creates powerful energy field |
| Crystalline Matrix | Mythic | Stat Buffs | Amplifies energy, boosting power |

### CONTROL Formation Traits

| Formation Name | Rarity | Category | Justification |
|----------------|--------|----------|---------------|
| Orbital Rings | Common | Special Formations | Provides stable platform for directing |
| Spiral Arms | Common | Special Formations | Distributes energy efficiently |
| Gyroscopic Spheres | Common | Special Behaviors | Enables quick directional changes |
| Triangular Formation | Common | Special Formations | Offers balanced control |
| Pulsating Orbits | Uncommon | Special Behaviors | Synchronizes movements via pulses |
| Helical Paths | Uncommon | Special Formations | Ensures continuous influence flow |
| Rotating Planes | Uncommon | Special Abilities | Enables multi-directional control |
| Fractal Orbits | Rare | Special Abilities | Boosts complexity and precision |
| Quantum Entanglement | Rare | Strange Occurrences | Allows instant influence across distances |
| Vibrational Resonance | Epic | Special Abilities | Amplifies control over other roles |
| Toroidal Flow | Epic | Special Formations | Creates self-sustaining control loop |
| Singularity Control | Legendary | Strange Occurrences | Maximizes control over the creature |
| Eternal Gyroscope | Legendary | Special Behaviors | Offers unwavering stability |
| Crystalline Control Matrix | Mythic | Stat Buffs | Enhances precision and range |
| Quantum Vortex | Mythic | Strange Occurrences | Manipulates space-time for control |

### MOVEMENT Formation Traits

| Formation Name | Rarity | Category | Justification |
|----------------|--------|----------|---------------|
| Fin-like Extensions | Common | Special Formations | Provides basic propulsion |
| Tentacle Arms | Common | Special Formations | Enables versatile movement |
| Propeller Blades | Common | Special Formations | Generates forward thrust |
| Jet Streams | Common | Special Abilities | Allows rapid, directed movement |
| Pulsating Fins | Uncommon | Special Behaviors | Creates wave-like propulsion |
| Rotating Tentacles | Uncommon | Special Behaviors | Offers multi-directional capabilities |
| Helical Propellers | Uncommon | Special Formations | Boosts propulsion efficiency |
| Fractal Fins | Rare | Stat Buffs | Enhances speed and maneuverability |
| Quantum Jets | Rare | Strange Occurrences | Enables rapid, unpredictable bursts |
| Vibrational Propulsion | Epic | Special Abilities | Ensures smooth, continuous movement |
| Toroidal Movement | Epic | Special Formations | Enables perpetual motion |
| Singularity Drive | Legendary | Strange Occurrences | Allows near-instant travel |
| Eternal Propeller | Legendary | Special Behaviors | Provides constant propulsion |
| Crystalline Movement Matrix | Mythic | Stat Buffs | Boosts speed and agility |
| Quantum Vortex Drive | Mythic | Strange Occurrences | Grants unparalleled speed |

### DEFENSE Formation Traits

| Formation Name | Rarity | Category | Justification |
|----------------|--------|----------|---------------|
| Spherical Shell | Common | Special Formations | Offers basic protection |
| Cubic Lattice | Common | Special Formations | Provides structured defense |
| Tetrahedral Formation | Common | Special Formations | Balances simplicity and complexity |
| Helical Barrier | Common | Special Formations | Deflects attacks dynamically |
| Pulsating Shell | Uncommon | Special Behaviors | Repels attackers with pulses |
| Rotating Lattice | Uncommon | Special Behaviors | Hides weak points through motion |
| Fractal Barrier | Uncommon | Special Formations | Increases defensive complexity |
| Toroidal Shield | Rare | Special Formations | Circulates energy for enhanced defense |
| Quantum Shield | Rare | Strange Occurrences | Redirects attacks via quantum entanglement |
| Vibrational Defense | Epic | Special Abilities | Disrupts incoming attacks |
| Singularity Barrier | Epic | Strange Occurrences | Warps space to deflect attacks |
| Eternal Shell | Legendary | Special Behaviors | Regenerates instantly |
| Crystalline Defense Matrix | Legendary | Stat Buffs | Boosts resilience and strength |
| Quantum Vortex Shield | Mythic | Strange Occurrences | Provides multi-dimensional protection |
| Astral Barrier | Mythic | Strange Occurrences | Protects against all attack forms |

### ATTACK Formation Traits

| Formation Name | Rarity | Category | Justification |
|----------------|--------|----------|---------------|
| Spike Extensions | Common | Special Formations | Provides basic offense |
| Tentacle Arms | Common | Special Formations | Enables versatile attacks |
| Projectile Launchers | Common | Special Abilities | Offers ranged attacks |
| Blade Formations | Common | Special Formations | Enhances close-range combat |
| Pulsating Spikes | Uncommon | Special Behaviors | Creates unpredictable attack patterns |
| Rotating Tentacles | Uncommon | Special Behaviors | Increases attack range and speed |
| Helical Projectiles | Uncommon | Special Abilities | Creates complex trajectories |
| Fractal Blades | Rare | Stat Buffs | Boosts damage potential |
| Quantum Projectiles | Rare | Strange Occurrences | Enables rapid, unpredictable strikes |
| Vibrational Attacks | Epic | Special Abilities | Provides area-of-effect damage |
| Toroidal Offense | Epic | Special Formations | Ensures continuous, efficient offense |
| Singularity Strike | Legendary | Strange Occurrences | Delivers devastating, unavoidable damage |
| Eternal Blades | Legendary | Special Behaviors | Offers constant offensive power |
| Crystalline Attack Matrix | Mythic | Stat Buffs | Boosts attack strength and precision |
| Quantum Vortex Assault | Mythic | Strange Occurrences | Grants unparalleled offensive power |

## Behavior Traits Mapping

Behavior traits define how particles move and interact. Here's how they map to trait categories:

### CORE Behavior Traits

| Behavior Name | Rarity | Category | Justification |
|---------------|--------|----------|---------------|
| Stable Oscillation | Common | Special Behaviors | Synchronizes nearby particles |
| Energy Pulse | Common | Special Abilities | Influences movement of nearby particles |
| Gravity Well | Common | Special Abilities | Prevents particles from drifting |
| Thermal Regulation | Common | Stat Buffs | Stabilizes energy levels |
| Resonance Field | Uncommon | Special Abilities | Amplifies effects of other roles |
| Phase Shift | Uncommon | Special Behaviors | Becomes temporarily intangible |
| Magnetic Anchor | Uncommon | Special Formations | Holds particles in place |
| Harmonic Anchor | Rare | Special Behaviors | Binds particles together |
| Flux Capacitor | Rare | Special Abilities | Provides energy boost to other roles |
| Vortex Core | Epic | Special Abilities | Pulls in energy to replenish |
| Density Matrix | Epic | Stat Buffs | Increases resistance to disruptions |
| Photon Sink | Legendary | Special Abilities | Converts light into energy |
| Equilibrium Node | Legendary | Special Behaviors | Balances energy distribution |
| Pulse Amplifier | Mythic | Stat Buffs | Increases range and impact of effects |
| Temporal Stabilizer | Mythic | Strange Occurrences | Slows decay of energy states |

### CONTROL Behavior Traits

| Behavior Name | Rarity | Category | Justification |
|---------------|--------|----------|---------------|
| Synchronized Movement | Common | Special Behaviors | Enhances coordination |
| Directive Pulse | Common | Special Abilities | Guides movement of other roles |
| Feedback Loop | Common | Special Behaviors | Adjusts based on real-time input |
| Pattern Recognition | Common | Special Abilities | Optimizes control strategies |
| Neural Network | Uncommon | Special Abilities | Improves decision-making |
| Holographic Projection | Uncommon | Special Abilities | Confuses or directs entities |
| Command Helix | Uncommon | Special Formations | Broadcasts control signals |
| Echo Relay | Rare | Special Behaviors | Ensures instructions persist |
| Phase Conductor | Rare | Special Abilities | Aligns phase states of particles |
| Kinetic Router | Epic | Special Abilities | Redirects energy to specific roles |
| Priority Matrix | Epic | Special Behaviors | Optimizes resource allocation |
| Vector Sync | Legendary | Special Behaviors | Aligns movement vectors |
| Pulse Modulator | Legendary | Special Abilities | Fine-tunes control signals |
| Swarm Intelligence | Mythic | Strange Occurrences | Enables decentralized decision-making |
| Quantum Entanglement | Mythic | Strange Occurrences | Allows instantaneous communication |

### MOVEMENT Behavior Traits

| Behavior Name | Rarity | Category | Justification |
|---------------|--------|----------|---------------|
| Propulsive Burst | Common | Special Abilities | Generates quick speed bursts |
| Agile Maneuvering | Common | Stat Buffs | Enhances agility for turns |
| Energy Efficiency | Common | Stat Buffs | Optimizes energy use |
| Terrain Adaptation | Common | Special Behaviors | Adapts to different terrains |
| Gravitational Slingshot | Uncommon | Special Abilities | Uses gravity for acceleration |
| Quantum Leap | Uncommon | Strange Occurrences | Performs instant repositioning |
| Momentum Cascade | Uncommon | Special Behaviors | Builds momentum for charges |
| Slipstream Wake | Rare | Special Formations | Reduces resistance for followers |
| Gyroscopic Balance | Rare | Special Behaviors | Maintains balance during maneuvers |
| Elastic Rebound | Epic | Special Behaviors | Bounces off surfaces |
| Drift Field | Epic | Special Abilities | Reduces friction for gliding |
| Inertial Dampener | Legendary | Special Abilities | Reduces inertia for control |
| Wave Rider | Legendary | Special Abilities | Harnesses energy waves |
| Warp Drive | Mythic | Strange Occurrences | Teleports instantly |
| Quantum Tunneling | Mythic | Strange Occurrences | Moves through barriers |

### DEFENSE Behavior Traits

| Behavior Name | Rarity | Category | Justification |
|---------------|--------|----------|---------------|
| Energy Shield | Common | Special Formations | Blocks incoming attacks |
| Reactive Armor | Common | Special Behaviors | Absorbs and dissipates energy |
| Camouflage | Common | Special Abilities | Avoids detection |
| Regenerative Tissue | Common | Special Behaviors | Heals minor damage |
| Gravitational Deflection | Uncommon | Special Abilities | Deflects projectiles |
| Quantum Phasing | Uncommon | Strange Occurrences | Becomes intangible during attacks |
| Kinetic Absorber | Uncommon | Special Abilities | Converts kinetic energy to power |
| Refraction Cloak | Rare | Special Abilities | Bends light for invisibility |
| Shockwave Barrier | Rare | Special Abilities | Repels close-range threats |
| Hardened Shell | Epic | Stat Buffs | Increases durability |
| Distortion Field | Epic | Special Abilities | Misdirects attacks |
| Thermal Cloak | Legendary | Special Abilities | Masks heat signature |
| Adaptive Plating | Legendary | Special Behaviors | Adjusts to attack types |
| Absolute Barrier | Mythic | Strange Occurrences | Nullifies all incoming damage |
| Quantum Invulnerability | Mythic | Strange Occurrences | Probabilistically nullifies damage |

### ATTACK Behavior Traits

| Behavior Name | Rarity | Category | Justification |
|---------------|--------|----------|---------------|
| Energy Blast | Common | Special Abilities | Fires energy projectiles |
| Melee Strike | Common | Special Abilities | Delivers close-range attacks |
| Stealth Assault | Common | Special Behaviors | Attacks from stealth |
| Area Denial | Common | Special Abilities | Creates damaging zones |
| Gravitational Pull | Uncommon | Special Abilities | Pulls enemies into range |
| Quantum Strike | Uncommon | Special Abilities | Strikes with enhanced precision |
| Plasma Arc | Uncommon | Special Abilities | Fires concentrated plasma |
| Shock Pulse | Rare | Special Abilities | Emits stunning electrical pulse |
| Vortex Strike | Rare | Special Abilities | Creates damaging vortex |
| Piercing Lance | Epic | Special Abilities | Projects penetrating beam |
| Corrosive Burst | Epic | Special Abilities | Releases damaging particles |
| Momentum Slash | Legendary | Special Behaviors | Uses speed for power |
| Disruption Wave | Legendary | Special Abilities | Scrambles enemy systems |
| Quantum Annihilation | Mythic | Strange Occurrences | Disintegrates targets |
| Singularity Cannon | Mythic | Strange Occurrences | Fires imploding micro-singularity |

## Mutation Traits Mapping

Mutation traits provide bonuses to various aspects of a creature. Here's how they map to trait categories:

### Single-Group Boosts

| Mutation Name | Rarity | Category | Justification |
|---------------|--------|----------|---------------|
| Core Vitality | Common | Stat Buffs | Directly increases HP |
| Control Insight | Common | Stat Buffs | Directly increases Int |
| Attack Precision | Common | Stat Buffs | Directly increases Damage |
| Defense Fortitude | Common | Stat Buffs | Directly increases Defense |
| Movement Swiftness | Common | Stat Buffs | Directly increases Agility |
| Enhanced Core | Uncommon | Stat Buffs | Directly increases HP by larger amount |
| Rare Core Boost | Rare | Stat Buffs | Directly increases HP by significant amount |
| Epic Core Boost | Epic | Stat Buffs | Directly increases HP by major amount |
| Legendary Core Boost | Legendary | Stat Buffs | Directly increases HP by massive amount |

### Multi-Group Boosts

| Mutation Name | Rarity | Category | Justification |
|---------------|--------|----------|---------------|
| CORE-CONTROL Synergy | Common | Stat Buffs | Increases multiple stats |
| Durable Mage | Uncommon | Stat Buffs | Increases multiple stats by larger amount |
| Vital Intel | Rare | Stat Buffs | Increases multiple stats by significant amount |
| Epic Vitality | Epic | Stat Buffs | Increases multiple stats by major amount |
| Legendary Might | Legendary | Stat Buffs | Increases multiple stats by massive amount |
| Mythic Synergy | Mythic | Stat Buffs | Increases multiple stats by extreme amount |

### Global Boosts

| Mutation Name | Rarity | Category | Justification |
|---------------|--------|----------|---------------|
| Minor Global Boost | Common | Stat Buffs | Increases all stats slightly |
| Uncommon Global Boost | Uncommon | Stat Buffs | Increases all stats moderately |
| Rare Global Boost | Rare | Stat Buffs | Increases all stats significantly |
| Epic Global Boost | Epic | Stat Buffs | Increases all stats substantially |
| Legendary Global Boost | Legendary | Stat Buffs | Increases all stats massively |
| Mythic Global Boost | Mythic | Stat Buffs | Increases all stats extremely |

### Special Effects

| Mutation Name | Rarity | Category | Justification |
|---------------|--------|----------|---------------|
| Minor Dodge | Common | Special Behaviors | Provides reactive dodge chance |
| Quick Cast | Common | Special Abilities | Enhances skill usage |
| Stable Form | Common | Special Formations | Improves formation stability |
| Improved Dodge | Uncommon | Special Behaviors | Provides better reactive dodge chance |
| Advanced Dodge | Rare | Special Behaviors | Provides significant dodge chance |
| Skill Debuff | Rare | Special Abilities | Adds effect to skills |
| Epic Dodge | Epic | Special Behaviors | Provides major dodge chance |
| Skill Power | Epic | Special Abilities | Significantly enhances skills |
| Energy Burst | Legendary | Special Abilities | Provides powerful skill enhancement |
| Iron Will | Legendary | Special Behaviors | Grants significant defensive reaction |
| Mythic Resilience | Mythic | Strange Occurrences | Provides resurrection capability |

### Particle Count Bonuses

| Mutation Name | Rarity | Category | Justification |
|---------------|--------|----------|---------------|
| Minor Particle Boost | Rare | Stat Buffs | Adds particles, increasing stats |
| Moderate Particle Boost | Epic | Stat Buffs | Adds more particles, increasing stats further |
| Major Particle Boost | Legendary | Stat Buffs | Adds significant particles, greatly increasing stats |
| Supreme Particle Boost | Mythic | Stat Buffs | Adds maximum particles, massively increasing stats |

## Category Distribution Analysis

### Formation Traits Category Distribution

| Category | Count | Percentage |
|----------|-------|------------|
| Stat Buffs | 8 | 10.7% |
| Special Formations | 25 | 33.3% |
| Special Abilities | 13 | 17.3% |
| Special Behaviors | 14 | 18.7% |
| Strange Occurrences | 15 | 20.0% |
| **Total** | **75** | **100%** |

### Behavior Traits Category Distribution

| Category | Count | Percentage |
|----------|-------|------------|
| Stat Buffs | 6 | 8.0% |
| Special Formations | 2 | 2.7% |
| Special Abilities | 36 | 48.0% |
| Special Behaviors | 16 | 21.3% |
| Strange Occurrences | 15 | 20.0% |
| **Total** | **75** | **100%** |

### Mutation Traits Category Distribution

| Category | Count | Percentage |
|----------|-------|------------|
| Stat Buffs | 80 | 40.0% |
| Special Formations | 20 | 10.0% |
| Special Abilities | 40 | 20.0% |
| Special Behaviors | 40 | 20.0% |
| Strange Occurrences | 20 | 10.0% |
| **Total** | **200** | **100%** |

### Combined Category Distribution

| Category | Count | Percentage |
|----------|-------|------------|
| Stat Buffs | 94 | 26.9% |
| Special Formations | 47 | 13.4% |
| Special Abilities | 89 | 25.4% |
| Special Behaviors | 70 | 20.0% |
| Strange Occurrences | 50 | 14.3% |
| **Total** | **350** | **100%** |

> **Note**: The mutation trait distribution has been rebalanced from the original implementation to ensure a more even distribution across categories. This provides better gameplay balance and more variety in trait effects.

## Implementation Guidelines

### 1. Trait Selection Algorithm

When implementing the trait selection system, consider the following guidelines:

- **Formation and Behavior Traits**: Select one trait per role using deterministic RNG based on Bitcoin block nonce.
- **Mutation Traits**: Select based on Bitcoin confirmation milestones, with rarity distribution dependent on confirmation count.
- **Category Balance**: Consider the category distribution when selecting traits to ensure balanced gameplay.

### 2. Class System Integration

The class system should integrate with the trait system as follows:

- **Main Class**: Determined by the highest particle group (CORE → Healer, CONTROL → Caster, etc.).
- **Subclass**: Determined by the full ranking of all five groups (15 subclasses per main class).
- **Subclass Distribution by Rarity**:
  - Common: 4 subclasses per main class
  - Uncommon: 3 subclasses per main class
  - Rare: 3 subclasses per main class
  - Epic: 2 subclasses per main class
  - Legendary: 2 subclasses per main class
  - Mythic: 1 subclass per main class
- **CORE Crowd Control Effects**:
  - Silence: Prevents enemies from using abilities
  - Confuse: Causes enemies to act unpredictably or attack allies
  - Blind: Reduces enemy accuracy or vision
- **Behavior Pool**: 15 behaviors per group, role-specific and tied to the main class category.
- **Trait Effects**: Traits should modify class abilities based on their category:
  - Stat Buffs: Enhance base stats of the class.
  - Special Formations: Modify positioning and spatial effects.
  - Special Abilities: Add or enhance active abilities.
  - Special Behaviors: Add or enhance passive or reactive behaviors.
  - Strange Occurrences: Provide unique, powerful effects.

### 3. Balancing Considerations

- **Rarity Scaling**: Ensure trait effects scale appropriately with rarity.
- **Category Synergy**: Consider how traits from different categories interact.
- **Role Compatibility**: Ensure traits are compatible with their roles.
- **Class Synergy**: Consider how traits interact with class abilities.
- **Particle Count Ranges**: Ensure particle counts fall within the rarity tier ranges:
  - Common (40%): 43–95 particles
  - Uncommon (30%): 96–110 particles
  - Rare (20%): 111–125 particles
  - Epic (8%): 126–141 particles
  - Legendary (1.5%): 142–151 particles
  - Mythic (0.5%): 152–220 particles

### 4. Implementation Approach

1. **Define Trait Data**: Store trait definitions in TypeScript files organized by role and category.
2. **Implement Selection Logic**: Create functions to select traits based on Bitcoin data.
3. **Create Effect System**: Implement a system to apply trait effects to creatures.
4. **Integrate with Class System**: Ensure traits modify class abilities appropriately.
5. **Test and Balance**: Test with various Bitcoin data to ensure balanced trait distribution.

