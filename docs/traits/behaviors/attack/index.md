# Bitcoin Protozoa - ATTACK Behaviors

This document serves as the index for all ATTACK role behaviors in the Bitcoin Protozoa project.

## Overview

ATTACK behaviors define how ATTACK particles act and react in combat situations. These behaviors determine target selection, ability usage, positioning, and reactions to various stimuli.

## Behavior Tiers

- [Common ATTACK Behaviors](./common.md)
- [Uncommon ATTACK Behaviors](./uncommon.md)
- [Rare ATTACK Behaviors](./rare.md)
- [Epic ATTACK Behaviors](./epic.md)
- [Legendary ATTACK Behaviors](./legendary.md)
- [Mythic ATTACK Behaviors](./mythic.md)

## Behavior Characteristics

ATTACK behaviors typically feature:

- Aggressive target selection
- Damage-focused decision making
- Offensive positioning
- Proactive ability usage
- Risk-reward assessment

## Common Behavior Patterns

### Aggressive Pursuit
- **Description**: Prioritizes attacking the nearest enemy, pursuing them relentlessly.
- **Subclass**: Skirmisher
- **Trigger**: Combat initiation
- **Action**: Selects nearest enemy as target and maintains focus until defeated or out of range.

### Heavy Hitter
- **Description**: Focuses on using primary abilities whenever available, prioritizing maximum damage.
- **Subclass**: Brawler
- **Trigger**: Ability cooldown completion
- **Action**: Uses primary ability as soon as it's available, regardless of situation.

### Tactical Striker
- **Description**: Analyzes targets for vulnerabilities, prioritizing enemies with lower defense.
- **Subclass**: Fencer
- **Trigger**: Target selection phase
- **Action**: Selects target with lowest defense value within range.

### Reckless Aggression
- **Description**: Becomes more aggressive as health decreases, prioritizing damage over survival.
- **Subclass**: Berserker
- **Trigger**: Health drops below 50%
- **Action**: Increases attack frequency and prioritizes offensive abilities over defensive ones.

## Behavior Interactions

ATTACK behaviors interact with other systems:

- **Abilities**: Behaviors determine when and how abilities are used
- **Formations**: Behaviors influence how formations are maintained and adapted
- **Other Role Behaviors**: ATTACK behaviors can coordinate with behaviors from other roles
- **Mutations**: Mutations can enhance or transform ATTACK behaviors

## Implementation Notes

- Behaviors are implemented through decision tree algorithms
- Each behavior has priority values that determine action selection
- Behaviors adapt to combat situations while maintaining their core patterns
- Behaviors are influenced by the creature's current state and environment
