# Bitcoin Protozoa Formations Summary

This document provides a summary of all the formation traits implemented in the Bitcoin Protozoa project.

## Overview

Total Formations: 100

### By Role
- Core: 20 formations
- Attack: 20 formations
- Defense: 20 formations
- Control: 20 formations
- Movement: 20 formations

### By Tier
- Tier 1: 15 formations
- Tier 2: 20 formations
- Tier 3: 20 formations
- Tier 4: 20 formations
- Tier 5: 15 formations
- Tier 6: 10 formations

## Formation Patterns

### Geometric Formations
1. **Circle Formation**
   - Arranges particles in a circular pattern around a central point
   - Available for all roles and tiers 1-2

2. **Grid Formation**
   - Arranges particles in a 2D or 3D grid pattern
   - Available for all roles and tiers 1-2

3. **Spiral Formation**
   - Arranges particles in a spiral pattern
   - Available for all roles and tiers 1-3

4. **Sphere Formation**
   - Arranges particles on the surface of a sphere
   - Available for all roles and tiers 3-4

5. **Helix Formation**
   - Arranges particles in a helix (3D spiral) pattern
   - Available for all roles at tier 3

### Organic Formations
6. **Cluster Formation**
   - Arranges particles in organic-looking clusters
   - Available for all roles and tiers 2-4

7. **Swarm Formation**
   - Arranges particles in a dynamic swarm-like pattern
   - Available for all roles and tiers 4-5

### Fractal Formations
8. **Tree Formation**
   - Arranges particles in a tree-like branching structure
   - Available for all roles and tiers 4-5

9. **Sierpinski Formation**
   - Arranges particles in a Sierpinski triangle/tetrahedron pattern
   - Available for all roles and tiers 5-6

10. **Mandelbrot Formation**
    - Arranges particles based on the Mandelbrot set
    - Available for all roles at tier 6

## Formation Implementation Details

Each formation trait includes:

1. **Basic Information**
   - ID: Unique identifier for the formation
   - Name: Display name for the formation
   - Description: Detailed description of the formation
   - Role: The particle role this formation is designed for
   - Tier: The power/complexity tier of the formation
   - Rarity: How rare the formation is

2. **Formation Parameters**
   - Spacing: Distance between particles
   - Offset: Center point offset
   - Rotation: Rotation angles
   - Scale: Size scaling factors
   - Jitter: Random variation amount
   - Seed: Random seed for deterministic generation

## Role-Specific Variations

Each formation pattern has role-specific variations:

### Core Formations
- Focus on stability and protection
- Often symmetrical and balanced
- Designed to protect the core particle

### Attack Formations
- Outward-facing arrangements
- Optimized for offensive capabilities
- More aggressive and dynamic patterns

### Defense Formations
- Dense, protective arrangements
- Designed to shield other particles
- Focus on creating barriers and walls

### Control Formations
- Balanced, regulatory arrangements
- Designed for maintaining order and balance
- Focus on influence and regulation

### Movement Formations
- Dynamic, propulsive arrangements
- Designed for efficient locomotion
- Focus on momentum and agility

## Tier Progression

As the tier increases:
- Formations become more complex
- Particle count increases
- Visual complexity increases
- Computational requirements increase
- Rarity increases

## Implementation Notes

All formations are implemented as TypeScript objects with the FormationTrait interface. Each formation includes parameters that control its appearance and behavior.

The formation traits are organized in the codebase by role and tier, making it easy to find and modify specific formations.

```
src/inventory/traits/formation/
  ├── core/
  │    ├── tier1/
  │    ├── tier2/
  │    ├── tier3/
  │    ├── tier4/
  │    ├── tier5/
  │    └── tier6/
  ├── attack/
  │    ├── tier1/
  │    ├── tier2/
  │    ├── tier3/
  │    ├── tier4/
  │    ├── tier5/
  │    └── tier6/
  ├── defense/
  │    ├── tier1/
  │    ├── tier2/
  │    ├── tier3/
  │    ├── tier4/
  │    ├── tier5/
  │    └── tier6/
  ├── control/
  │    ├── tier1/
  │    ├── tier2/
  │    ├── tier3/
  │    ├── tier4/
  │    ├── tier5/
  │    └── tier6/
  └── movement/
       ├── tier1/
       ├── tier2/
       ├── tier3/
       ├── tier4/
       ├── tier5/
       └── tier6/
```
