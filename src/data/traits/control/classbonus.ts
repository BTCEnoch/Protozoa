// Generated from group_traits/trait_banks/class_bonus/control_class_bonus_traits.json
// DO NOT EDIT MANUALLY - This file is generated by scripts/generate_trait_data_better.ps1

import { ClassBonusTrait } from '../../../types/traits/trait';
import { Role, Rarity } from '../../../types/core';

export const CONTROL_CLASS_BONUS_TRAITS = [
    {
      "name": "Command Influence",
      "description": "Increases influence of control particles",
      "rarityTier": "Common",
      "role": "CONTROL",
      "statType": "Influence",
      "bonusAmount": 15,
      "physicsLogic": {
        "forceMultiplier": 1.15,
        "rangeMultiplier": 1.1,
        "speedMultiplier": 1,
        "stabilityMultiplier": 1
      },
      "visualEffects": {
        "particleGlow": false,
        "particleSize": 1,
        "particleColor": "#cc33cc"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Signal Strength",
          "Coordination Field"
        ]
      }
    },
    {
      "name": "Signal Strength",
      "description": "Increases signal strength of control particles",
      "rarityTier": "Uncommon",
      "role": "CONTROL",
      "statType": "Signal",
      "bonusAmount": 20,
      "physicsLogic": {
        "forceMultiplier": 1.1,
        "rangeMultiplier": 1.2,
        "speedMultiplier": 1,
        "stabilityMultiplier": 1
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1,
        "particleColor": "#dd55dd"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Coordination Field",
          "Neural Network"
        ]
      }
    },
    {
      "name": "Coordination Field",
      "description": "Control particles generate a coordination field",
      "rarityTier": "Rare",
      "role": "CONTROL",
      "statType": "Coordination",
      "bonusAmount": 25,
      "physicsLogic": {
        "forceMultiplier": 1.15,
        "rangeMultiplier": 1.15,
        "speedMultiplier": 1.1,
        "stabilityMultiplier": 1
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.05,
        "particleColor": "#ee77ee"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Neural Network",
          "Quantum Entanglement"
        ]
      }
    },
    {
      "name": "Neural Network",
      "description": "Control particles form a neural network",
      "rarityTier": "Rare",
      "role": "CONTROL",
      "statType": "Neural",
      "bonusAmount": 30,
      "physicsLogic": {
        "forceMultiplier": 1.2,
        "rangeMultiplier": 1.2,
        "speedMultiplier": 1.1,
        "stabilityMultiplier": 1.1
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.1,
        "particleColor": "#ff99ff"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Quantum Entanglement",
          "Hive Mind"
        ]
      }
    },
    {
      "name": "Quantum Entanglement",
      "description": "Control particles entangle with others",
      "rarityTier": "Epic",
      "role": "CONTROL",
      "statType": "Entanglement",
      "bonusAmount": 35,
      "physicsLogic": {
        "forceMultiplier": 1.25,
        "rangeMultiplier": 1.25,
        "speedMultiplier": 1.15,
        "stabilityMultiplier": 1.15
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.15,
        "particleColor": "#ffaaff"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Hive Mind",
          "Temporal Conductor"
        ]
      }
    },
    {
      "name": "Hive Mind",
      "description": "Control particles form a hive mind",
      "rarityTier": "Epic",
      "role": "CONTROL",
      "statType": "Hive",
      "bonusAmount": 40,
      "physicsLogic": {
        "forceMultiplier": 1.3,
        "rangeMultiplier": 1.3,
        "speedMultiplier": 1.2,
        "stabilityMultiplier": 1.2
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.2,
        "particleColor": "#ffbbff"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Temporal Conductor",
          "Reality Weaver"
        ]
      }
    },
    {
      "name": "Temporal Conductor",
      "description": "Control particles conduct temporal energy",
      "rarityTier": "Legendary",
      "role": "CONTROL",
      "statType": "Temporal",
      "bonusAmount": 45,
      "physicsLogic": {
        "forceMultiplier": 1.35,
        "rangeMultiplier": 1.35,
        "speedMultiplier": 1.25,
        "stabilityMultiplier": 1.25
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.25,
        "particleColor": "#ffccff"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Reality Weaver",
          "Cosmic Conductor"
        ]
      }
    },
    {
      "name": "Reality Weaver",
      "description": "Control particles weave reality",
      "rarityTier": "Legendary",
      "role": "CONTROL",
      "statType": "Reality",
      "bonusAmount": 50,
      "physicsLogic": {
        "forceMultiplier": 1.4,
        "rangeMultiplier": 1.4,
        "speedMultiplier": 1.3,
        "stabilityMultiplier": 1.3
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.3,
        "particleColor": "#ffddff"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Cosmic Conductor",
          "Universal Nexus"
        ]
      }
    },
    {
      "name": "Cosmic Conductor",
      "description": "Control particles conduct cosmic forces",
      "rarityTier": "Mythic",
      "role": "CONTROL",
      "statType": "Cosmic",
      "bonusAmount": 55,
      "physicsLogic": {
        "forceMultiplier": 1.45,
        "rangeMultiplier": 1.45,
        "speedMultiplier": 1.35,
        "stabilityMultiplier": 1.35
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.35,
        "particleColor": "#ffeeff"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Universal Nexus"
        ]
      }
    },
    {
      "name": "Universal Nexus",
      "description": "Control particles form a universal nexus",
      "rarityTier": "Mythic",
      "role": "CONTROL",
      "statType": "Universal",
      "bonusAmount": 60,
      "physicsLogic": {
        "forceMultiplier": 1.5,
        "rangeMultiplier": 1.5,
        "speedMultiplier": 1.4,
        "stabilityMultiplier": 1.4
      },
      "visualEffects": {
        "particleGlow": true,
        "particleSize": 1.4,
        "particleColor": "#ffffff"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Cosmic Conductor"
        ]
      }
    }
  ];

export default CONTROL_CLASS_BONUS_TRAITS;





