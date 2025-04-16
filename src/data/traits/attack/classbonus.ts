// Generated from group_traits/trait_banks/class_bonus/attack_class_bonus_traits.json
// DO NOT EDIT MANUALLY - This file is generated by scripts/generate_trait_data_better.ps1

import { ClassBonusTrait } from '../../../types/traits/trait';
import { Role, Rarity } from '../../../types/core';

export const ATTACK_CLASS_BONUS_TRAITS: ClassBonusTrait[] = [
    {
      "name": "Aggressive Force",
      "description": "Increases force of attack particles",
      "id": "attack_class_bonus_aggressive_force",
      "rarityTier": Rarity.COMMON,
      "role": Role.ATTACK,
      "statType": "Force",
      "bonusAmount": 15,
      "physicsLogic": {
        "forceMultiplier": 1.15,
        "rangeMultiplier": 1,
        "speedMultiplier": 1.1,
        "stabilityMultiplier": 1
      },
      "visualEffects": {
        "particleGlow": false,
        "particleSize": 1,
        "particleColor": "#ff3333"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Piercing Power",
          "Kinetic Energy"
        ]
      }
    },
    {
      "name": "Piercing Power",
      "description": "Increases piercing power of attack particles",
      "id": "attack_class_bonus_piercing_power",
      "rarityTier": Rarity.UNCOMMON,
      "role": Role.ATTACK,
      "statType": "Piercing",
      "bonusAmount": 20,
      "physicsLogic": {
        "forceMultiplier": 1.2,
        "rangeMultiplier": 1.1,
        "speedMultiplier": 1.15,
        "stabilityMultiplier": 1
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 0.9,
        "particleColor": "#ff5555"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Kinetic Energy",
          "Explosive Potential"
        ]
      }
    },
    {
      "name": "Kinetic Energy",
      "description": "Increases kinetic energy of attack particles",
      "id": "attack_class_bonus_kinetic_energy",
      "rarityTier": Rarity.RARE,
      "role": Role.ATTACK,
      "statType": "Kinetic",
      "bonusAmount": 25,
      "physicsLogic": {
        "forceMultiplier": 1.25,
        "rangeMultiplier": 1.1,
        "speedMultiplier": 1.2,
        "stabilityMultiplier": 1
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 0.95,
        "particleColor": "#ff7777"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Explosive Potential",
          "Shockwave Generation"
        ]
      }
    },
    {
      "name": "Explosive Potential",
      "description": "Increases explosive potential of attack particles",
      "id": "attack_class_bonus_explosive_potential",
      "rarityTier": Rarity.RARE,
      "role": Role.ATTACK,
      "statType": "Explosive",
      "bonusAmount": 30,
      "physicsLogic": {
        "forceMultiplier": 1.3,
        "rangeMultiplier": 1.2,
        "speedMultiplier": 1.15,
        "stabilityMultiplier": 0.9
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1,
        "particleColor": "#ff9999"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Shockwave Generation",
          "Quantum Disruption"
        ]
      }
    },
    {
      "name": "Shockwave Generation",
      "description": "Attack particles generate shockwaves",
      "id": "attack_class_bonus_shockwave_generation",
      "rarityTier": Rarity.EPIC,
      "role": Role.ATTACK,
      "statType": "Shockwave",
      "bonusAmount": 35,
      "physicsLogic": {
        "forceMultiplier": 1.35,
        "rangeMultiplier": 1.25,
        "speedMultiplier": 1.2,
        "stabilityMultiplier": 0.9
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.05,
        "particleColor": "#ffaaaa"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Quantum Disruption",
          "Temporal Fracture"
        ]
      }
    },
    {
      "name": "Quantum Disruption",
      "description": "Attack particles disrupt quantum states",
      "id": "attack_class_bonus_quantum_disruption",
      "rarityTier": Rarity.EPIC,
      "role": Role.ATTACK,
      "statType": "Quantum",
      "bonusAmount": 40,
      "physicsLogic": {
        "forceMultiplier": 1.4,
        "rangeMultiplier": 1.3,
        "speedMultiplier": 1.25,
        "stabilityMultiplier": 0.85
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.1,
        "particleColor": "#ffbbbb"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Temporal Fracture",
          "Reality Shatter"
        ]
      }
    },
    {
      "name": "Temporal Fracture",
      "description": "Attack particles fracture temporal stability",
      "id": "attack_class_bonus_temporal_fracture",
      "rarityTier": Rarity.LEGENDARY,
      "role": Role.ATTACK,
      "statType": "Temporal",
      "bonusAmount": 45,
      "physicsLogic": {
        "forceMultiplier": 1.45,
        "rangeMultiplier": 1.35,
        "speedMultiplier": 1.3,
        "stabilityMultiplier": 0.8
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.15,
        "particleColor": "#ffcccc"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Reality Shatter",
          "Cosmic Annihilation"
        ]
      }
    },
    {
      "name": "Reality Shatter",
      "description": "Attack particles shatter reality",
      "id": "attack_class_bonus_reality_shatter",
      "rarityTier": Rarity.LEGENDARY,
      "role": Role.ATTACK,
      "statType": "Reality",
      "bonusAmount": 50,
      "physicsLogic": {
        "forceMultiplier": 1.5,
        "rangeMultiplier": 1.4,
        "speedMultiplier": 1.35,
        "stabilityMultiplier": 0.75
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.2,
        "particleColor": "#ffdddd"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Cosmic Annihilation",
          "Void Eruption"
        ]
      }
    },
    {
      "name": "Cosmic Annihilation",
      "description": "Attack particles annihilate with cosmic force",
      "id": "attack_class_bonus_cosmic_annihilation",
      "rarityTier": Rarity.MYTHIC,
      "role": Role.ATTACK,
      "statType": "Cosmic",
      "bonusAmount": 55,
      "physicsLogic": {
        "forceMultiplier": 1.55,
        "rangeMultiplier": 1.45,
        "speedMultiplier": 1.4,
        "stabilityMultiplier": 0.7
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.25,
        "particleColor": "#ffeeee"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Void Eruption"
        ]
      }
    },
    {
      "name": "Void Eruption",
      "description": "Attack particles erupt with void energy",
      "id": "attack_class_bonus_void_eruption",
      "rarityTier": Rarity.MYTHIC,
      "role": Role.ATTACK,
      "statType": "Void",
      "bonusAmount": 60,
      "physicsLogic": {
        "forceMultiplier": 1.6,
        "rangeMultiplier": 1.5,
        "speedMultiplier": 1.45,
        "stabilityMultiplier": 0.65
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.3,
        "particleColor": "#ffffff"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Cosmic Annihilation"
        ]
      }
    }
  ];

export default ATTACK_CLASS_BONUS_TRAITS;





