# Bitcoin Protozoa - ATTACK Visuals

This document serves as the index for all ATTACK role visual traits in the Bitcoin Protozoa project.

## Overview

ATTACK visuals define the appearance of ATTACK particles and their effects. These visual traits determine colors, sizes, shapes, emission effects, and animation patterns for ATTACK particles.

## Visual Tiers

- [Common ATTACK Visuals](./common.md)
- [Uncommon ATTACK Visuals](./uncommon.md)
- [Rare ATTACK Visuals](./rare.md)
- [Epic ATTACK Visuals](./epic.md)
- [Legendary ATTACK Visuals](./legendary.md)
- [Mythic ATTACK Visuals](./mythic.md)

## Visual Characteristics

ATTACK visuals typically feature:

- Sharp, aggressive particle shapes
- Red/orange/yellow color schemes
- Fast, dynamic animations
- Impact-focused effects
- Aggressive particle trails

## Common Visual Patterns

### Swift Striker
- **Description**: Small, fast-moving particles with light trails.
- **Subclass**: Skirmisher
- **Colors**: Bright red with orange trails
- **Animation**: Quick, darting movements with motion blur
- **Effects**: Small impact flashes on ability use

### Heavy Impact
- **Description**: Large, dense particles with powerful impact effects.
- **Subclass**: Brawler
- **Colors**: Deep red with yellow impact flashes
- **Animation**: Slow, weighty movements with momentum
- **Effects**: Shockwave ripples on ability use

### Precision Edge
- **Description**: Sharp, blade-like particles with metallic sheen.
- **Subclass**: Fencer
- **Colors**: Silver-red with white highlights
- **Animation**: Precise, calculated movements with sharp turns
- **Effects**: Slicing visual trails on ability use

### Rage Aura
- **Description**: Chaotic, flame-like particles that intensify at low health.
- **Subclass**: Berserker
- **Colors**: Dark red to bright orange gradient based on health
- **Animation**: Erratic, pulsating movements that speed up at low health
- **Effects**: Fire-like aura that grows more intense as health decreases

## Visual Interactions

ATTACK visuals interact with other systems:

- **Abilities**: Abilities have matching visual effects
- **Formations**: Formations influence the arrangement of visual elements
- **Behaviors**: Behaviors influence animation patterns
- **Mutations**: Mutations can dramatically alter visual traits

## Implementation Notes

- Visuals are implemented through Three.js and WebGL
- Each visual trait has specific shader parameters
- Particle systems handle emission effects and trails
- Animation systems control movement patterns
- Visual effects are synchronized with ability usage
