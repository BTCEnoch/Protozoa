# Bitcoin Protozoa - Visual System

## Overview
The visual system defines the appearance of creatures and their particles. Visual traits determine colors, sizes, effects, and animation patterns, creating a unique visual identity for each creature.

## Visual Traits
Visual traits define specific aspects of creature appearance:
- Particle colors and gradients
- Particle sizes and shapes
- Emission effects and particles
- Animation patterns and speeds
- Special visual effects

## Visual Trait Structure
Each visual trait has the following properties:
- **Name**: Unique identifier
- **Description**: What the visual trait looks like
- **Role**: The role this visual trait is associated with
- **Tier**: The tier level of this visual trait
- **Parameters**: Specific visual parameters (colors, sizes, etc.)
- **Animation**: How the visual trait animates over time

## Role-Specific Visuals

### CORE Visuals
- Central, bright, pulsating particles
- Often feature radial patterns
- Examples:
  - "Radiant Core" - Bright, pulsating particles with a golden hue
  - "Energy Nexus" - Particles with energy tendrils connecting to other groups

### ATTACK Visuals
- Sharp, aggressive, fast-moving particles
- Often feature red/orange color schemes
- Examples:
  - "Blade Particles" - Sharp, elongated particles with a metallic sheen
  - "Fiery Aura" - Particles surrounded by small flame effects

### CONTROL Visuals
- Complex, intricate, flowing particles
- Often feature purple/blue color schemes
- Examples:
  - "Arcane Particles" - Mystical, rune-inscribed particles
  - "Void Essence" - Dark particles with small void rifts

### DEFENSE Visuals
- Dense, solid, stable particles
- Often feature blue/green color schemes
- Examples:
  - "Shield Particles" - Hexagonal particles with a translucent shield effect
  - "Stone Skin" - Rocky, textured particles with a solid appearance

### MOVEMENT Visuals
- Streamlined, fluid, fast particles
- Often feature cyan/white color schemes
- Examples:
  - "Wind Stream" - Elongated particles with trailing wind effects
  - "Phasing Matter" - Particles that fade in and out with motion blur

## Tier Progression
Visuals become more elaborate and impressive at higher tiers:

### Common (Tier 1)
- Basic visuals with simple colors
- Minimal animation
- Few special effects

### Uncommon (Tier 2)
- Improved visuals with color gradients
- Basic animation patterns
- Some minor special effects

### Rare (Tier 3)
- Specialized visuals with complex colors
- Distinct animation patterns
- Notable special effects

### Epic (Tier 4)
- Advanced visuals with intricate color schemes
- Complex animation sequences
- Impressive special effects

### Legendary (Tier 5)
- Extraordinary visuals with unique color patterns
- Sophisticated animation systems
- Spectacular special effects

### Mythic (Tier 6)
- The most elaborate visuals
- Dynamic, responsive animations
- Awe-inspiring special effects

## Visual Interaction
Visuals interact with other systems:
- **Abilities**: Abilities have visual effects that match their function
- **Formations**: Formations determine the arrangement of visual elements
- **Behaviors**: Behaviors influence animation patterns
- **Mutations**: Mutations can dramatically alter visual traits

## Implementation
The visual system is implemented through:
- TypeScript interfaces defining visual trait structures
- JSON data files containing visual definitions
- Three.js for 3D rendering
- Particle system for visual effects
- Animation system for dynamic movement
