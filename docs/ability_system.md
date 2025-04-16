# Bitcoin Protozoa - Ability System

## Overview
The ability system defines the active and passive skills that creatures can use. It uses a hybrid approach combining ability pools for lower tiers and more specialized abilities for higher tiers.

## Ability Structure
Each ability has the following properties:
- **Name**: Unique identifier
- **Description**: What the ability does
- **Cooldown**: Time between uses (in seconds)
- **Category**: Primary, Secondary, Unique, or Crowd Control
- **Subclass**: The subclass this ability belongs to
- **Trigger** (optional): Condition that activates the ability

## Ability Categories

### Primary Abilities
- Main offensive or supportive abilities
- Core to the role's function
- Generally have shorter cooldowns
- Example: "Quick Strike" - Deals 15% max HP damage to one enemy

### Secondary Abilities
- Complementary abilities that enhance the primary role
- Provide utility or alternative options
- Example: "Flurry" - Deals 5% max HP damage three times to one enemy

### Unique Abilities
- Special abilities that define the subclass's identity
- Often have passive effects or conditional triggers
- Example: "Combat Focus" - +10% damage for 5s

### Crowd Control Abilities
- Abilities that control or disrupt enemies
- Stuns, slows, fears, etc.
- Example: "Trip" - Knocks down one enemy for 1s

## Tier Progression
Abilities become more powerful and specialized at higher tiers:

### Common (Tier 1)
- Basic abilities with straightforward effects
- Moderate damage/healing values
- Longer cooldowns
- Example subclasses: Skirmisher, Brawler, Fencer, Berserker

### Uncommon (Tier 2)
- Improved abilities with enhanced effects
- Higher damage/healing values
- Slightly reduced cooldowns
- Example subclasses: Duelist, Bladesman, Reaver

### Rare (Tier 3)
- Specialized abilities with unique effects
- Significant damage/healing values
- Multiple effects on single abilities
- Example subclasses: Berserker, Duelist, Gladiator

### Epic (Tier 4)
- Powerful abilities with complex effects
- High damage/healing values
- Shorter cooldowns
- Example subclasses: Warlord, Blademaster, Champion

### Legendary (Tier 5)
- Extremely powerful abilities with game-changing effects
- Very high damage/healing values
- Multiple powerful effects
- Example subclasses: Conqueror, Warchief, Dreadnought

### Mythic (Tier 6)
- The most powerful abilities in the game
- Extraordinary damage/healing values
- Unique mechanics not available at lower tiers
- Example subclasses: Titan, Demigod, Avatar

## Role-Specific Abilities

### CORE Abilities
- Focus on support, healing, and resource management
- Enhance other groups' abilities
- Provide stability to the formation

### ATTACK Abilities
- Focus on dealing damage
- Melee-oriented combat
- Burst and sustained damage options

### CONTROL Abilities
- Focus on manipulating the battlefield
- Crowd control and debuffs
- Tactical positioning

### DEFENSE Abilities
- Focus on protection and damage mitigation
- Shields, damage reduction, and taunts
- Survivability enhancements

### MOVEMENT Abilities
- Focus on mobility and positioning
- Speed boosts and teleportation
- Formation adjustments

## Ability Selection
Abilities are selected based on:
1. **Role**: Determines the ability pool
2. **Tier**: Determines the power level
3. **RNG**: Deterministic selection based on Bitcoin block nonce
4. **Subclass**: For higher tiers, determines specific abilities

## Implementation
The ability system is implemented through:
- TypeScript interfaces defining ability structures
- JSON data files containing ability definitions
- Ability pools organized by role, tier, and category
- RNG system for deterministic selection
