# Bitcoin Protozoa - Behavior System

## Overview
The behavior system defines how creatures act and react in different situations. Behaviors determine movement patterns, target selection, ability usage, and reactions to environmental factors.

## Behavior Traits
Behavior traits define specific aspects of creature behavior:
- Movement patterns
- Target selection priorities
- Ability usage strategies
- Reactions to stimuli
- Group coordination

## Behavior Structure
Each behavior trait has the following properties:
- **Name**: Unique identifier
- **Description**: What the behavior does
- **Role**: The role this behavior is associated with
- **Tier**: The tier level of this behavior
- **Trigger**: Conditions that activate the behavior
- **Action**: What the creature does when the behavior is triggered

## Role-Specific Behaviors

### CORE Behaviors
- Focus on maintaining formation integrity
- Prioritize survival and support
- Examples:
  - "Protective Instinct" - Prioritizes protecting vulnerable group members
  - "Resource Management" - Optimizes ability usage based on resource availability

### ATTACK Behaviors
- Aggressive target selection
- Damage-focused decision making
- Examples:
  - "Predatory Targeting" - Prioritizes low-health targets
  - "Relentless Pursuit" - Continues attacking the same target until defeated

### CONTROL Behaviors
- Strategic positioning
- Crowd control prioritization
- Examples:
  - "Tactical Positioning" - Moves to optimal positions for control abilities
  - "Disruptive Focus" - Prioritizes disrupting enemy formations

### DEFENSE Behaviors
- Protective positioning
- Threat assessment
- Examples:
  - "Guardian Stance" - Positions between threats and vulnerable allies
  - "Threat Assessment" - Prioritizes the most dangerous enemies

### MOVEMENT Behaviors
- Dynamic repositioning
- Path optimization
- Examples:
  - "Fluid Adaptation" - Constantly adjusts position based on battlefield conditions
  - "Pathfinding Mastery" - Finds optimal routes through complex environments

## Tier Progression
Behaviors become more sophisticated at higher tiers:

### Common (Tier 1)
- Basic behaviors with simple decision making
- Reactive rather than proactive
- Limited situational awareness

### Uncommon (Tier 2)
- Improved behaviors with better decision making
- Some proactive elements
- Increased situational awareness

### Rare (Tier 3)
- Specialized behaviors with complex decision making
- Balance of reactive and proactive elements
- Good situational awareness

### Epic (Tier 4)
- Advanced behaviors with sophisticated decision making
- Primarily proactive with smart reactive elements
- Excellent situational awareness

### Legendary (Tier 5)
- Extraordinary behaviors with highly sophisticated decision making
- Strategic proactive planning with optimal reactive responses
- Near-perfect situational awareness

### Mythic (Tier 6)
- The most sophisticated behaviors
- Long-term strategic planning with perfect tactical execution
- Complete situational awareness

## Behavior Interaction
Behaviors interact with other systems:
- **Abilities**: Behaviors determine when and how abilities are used
- **Formations**: Behaviors influence how formations are maintained and adapted
- **Visuals**: Some behaviors have visual tells or effects
- **Mutations**: Mutations can alter and enhance behaviors

## Implementation
The behavior system is implemented through:
- TypeScript interfaces defining behavior structures
- JSON data files containing behavior definitions
- Decision tree algorithms for behavior selection
- Event-driven system for behavior triggers
