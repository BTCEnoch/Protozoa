# Bitcoin Protozoa - Common ATTACK Abilities

This document details the Common (Tier 1) abilities for the ATTACK role.

## Subclasses

Common ATTACK abilities are organized into four subclasses:

1. **Skirmisher**: Fast, agile attacker focused on mobility and quick strikes
2. **Brawler**: Tough, close-range fighter with powerful single hits
3. **Fencer**: Precise attacker with technical strikes and defensive capabilities
4. **Berserker**: Aggressive attacker that gains power as health decreases

## Primary Abilities

### Skirmisher
- **Quick Strike**
  - Description: Deals 15% max HP damage to one enemy
  - Cooldown: 8s
  - Category: Primary

### Brawler
- **Heavy Strike**
  - Description: Deals 20% max HP damage to one enemy
  - Cooldown: 10s
  - Category: Primary

### Fencer
- **Swift Thrust**
  - Description: Deals 18% max HP damage to one enemy
  - Cooldown: 8s
  - Category: Primary

### Berserker
- **Frenzy Strike**
  - Description: Deals 15-25% max HP damage based on missing health
  - Cooldown: 10s
  - Category: Primary

## Secondary Abilities

### Skirmisher
- **Flurry**
  - Description: Deals 5% max HP damage three times to one enemy
  - Cooldown: 12s
  - Category: Secondary

### Brawler
- **Slam**
  - Description: Deals 15% max HP damage and pushes enemy back
  - Cooldown: 15s
  - Category: Secondary

### Fencer
- **Feint Strike**
  - Description: Deals 12% max HP damage to one enemy
  - Cooldown: 10s
  - Category: Secondary

### Berserker
- **Blood Rage**
  - Description: +15% attack speed for 5s, costs 5% HP
  - Cooldown: 20s
  - Trigger: Manual activation
  - Category: Secondary

## Unique Abilities

### Skirmisher
- **Combat Focus**
  - Description: +10% damage for 5s
  - Cooldown: 20s
  - Category: Unique

### Brawler
- **Toughness**
  - Description: +10% defense for 5s
  - Cooldown: 20s
  - Category: Unique

### Fencer
- **Parrying Stance**
  - Description: +10% evasion for 5s
  - Cooldown: 20s
  - Category: Unique

### Berserker
- **Battle Fury**
  - Description: +10% damage when HP < 50%
  - Cooldown: 25s
  - Trigger: When HP < 50%
  - Category: Unique

## Crowd Control Abilities

### Skirmisher
- **Trip**
  - Description: Knocks down one enemy for 1s
  - Cooldown: 25s
  - Category: Crowd Control

### Brawler
- **Stun**
  - Description: Stuns one enemy for 2s
  - Cooldown: 25s
  - Category: Crowd Control

### Fencer
- **Minor Disarm**
  - Description: Disarms one enemy for 2s
  - Cooldown: 25s
  - Category: Crowd Control

### Berserker
- **Intimidate**
  - Description: Fears one enemy for 2s
  - Cooldown: 25s
  - Category: Crowd Control

## Formation Traits

### Skirmisher
- **Aggressive Stance**
  - Description: Increases damage output of formation.

### Brawler
- **Brute Force**
  - Description: Enhances melee damage.

### Fencer
- **Razor's Edge**
  - Description: Particles form a tight, blade-like pattern, boosting precision and critical chance.

### Berserker
- **Chaotic Swarm**
  - Description: Increases damage as formation breaks apart.

## Implementation Notes

- Each Common ATTACK creature is assigned abilities from one of the four subclasses
- Ability selection is deterministic based on the Bitcoin block nonce
- Common abilities have straightforward effects with moderate power
- These abilities form the foundation for higher tier ATTACK abilities
