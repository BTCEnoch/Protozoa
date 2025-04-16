# Bitcoin Protozoa - Formation System

## Overview
The formation system defines how particles arrange themselves and interact within a creature. Formations provide passive bonuses and determine the visual patterns of particle groups.

## Formation Traits
Each role group has specific formation traits that define:
- Particle arrangement patterns
- Group behavior in combat
- Passive bonuses to the group and creature
- Visual appearance

## Formation Structure
Each formation trait has the following properties:
- **Name**: Unique identifier
- **Description**: What the formation does
- **Subclass**: The subclass this formation belongs to
- **Pattern**: The visual arrangement of particles
- **Effect**: The gameplay effect of the formation

## Role-Specific Formations

### CORE Formations
- Central, nucleus-like formations
- Provide stability to the entire creature
- Examples:
  - "Stable Core" - Particles form a dense central nucleus, providing stability to all other formations
  - "Pulsating Core" - Particles expand and contract rhythmically, providing energy to other groups

### ATTACK Formations
- Aggressive, forward-facing formations
- Optimized for damage output
- Examples:
  - "Aggressive Stance" - Particles form an arrow-like formation, increasing damage output
  - "Blade Formation" - Particles form a tight, blade-like pattern, boosting precision

### CONTROL Formations
- Complex, web-like formations
- Designed for area control
- Examples:
  - "Web Pattern" - Particles form an intricate web, enhancing crowd control abilities
  - "Disruptive Field" - Particles create a chaotic field that interferes with enemy formations

### DEFENSE Formations
- Dense, shield-like formations
- Focused on protection
- Examples:
  - "Shield Wall" - Particles form a dense barrier, reducing incoming damage
  - "Reactive Armor" - Particles arrange in layers that respond to attacks

### MOVEMENT Formations
- Fluid, dynamic formations
- Enhance mobility and positioning
- Examples:
  - "Streamlined Form" - Particles arrange in a streamlined shape, increasing movement speed
  - "Phasing Pattern" - Particles maintain a loose, adaptable formation for quick repositioning

## Tier Progression
Formations become more complex and powerful at higher tiers:

### Common (Tier 1)
- Basic formations with simple patterns
- Minor passive bonuses
- Limited visual effects

### Uncommon (Tier 2)
- Improved formations with more defined patterns
- Moderate passive bonuses
- Enhanced visual effects

### Rare (Tier 3)
- Specialized formations with complex patterns
- Significant passive bonuses
- Distinctive visual effects

### Epic (Tier 4)
- Advanced formations with intricate patterns
- Powerful passive bonuses
- Impressive visual effects

### Legendary (Tier 5)
- Extraordinary formations with unique patterns
- Very powerful passive bonuses
- Spectacular visual effects

### Mythic (Tier 6)
- The most sophisticated formations
- Game-changing passive bonuses
- Awe-inspiring visual effects

## Formation Interaction
Formations interact with other systems:
- **Abilities**: Some abilities modify or benefit from specific formations
- **Behaviors**: Formations influence how creatures move and act
- **Visuals**: Formations determine the visual appearance of particle groups
- **Mutations**: Mutations can alter and enhance formations

## Implementation
The formation system is implemented through:
- TypeScript interfaces defining formation structures
- JSON data files containing formation definitions
- Visual rendering system for particle arrangements
- Physics system for particle behavior
