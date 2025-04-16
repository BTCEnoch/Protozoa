// Generated from group_traits/trait_banks/behavior/control_behavior_traits.json
// DO NOT EDIT MANUALLY - This file is generated by scripts/generate_trait_data_better.ps1

import { $1 } from '../../types/trait';

export const CONTROL_BEHAVIOR_TRAITS = [
    {
      "name": "Coordinated Movement",
      "description": "Particles coordinate the movement of other groups",
      "rarityTier": "Common",
      "role": "CONTROL",
      "type": "Flocking",
      "physicsLogic": {
        "strength": 0.6,
        "range": 20,
        "priority": 0.7,
        "persistence": 0.8,
        "frequency": 0.3,
        "additionalParameters": {
          "coordinationFactor": 0.7,
          "influenceRadius": 15
        }
      },
      "visualEffects": {
        "particleEffect": "subtle_pulse",
        "trailEffect": "none",
        "colorModulation": false
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Signal Relay",
          "Harmonic Controller"
        ]
      }
    },
    {
      "name": "Signal Relay",
      "description": "Particles relay signals between other groups",
      "rarityTier": "Uncommon",
      "role": "CONTROL",
      "type": "Flowing",
      "physicsLogic": {
        "strength": 0.65,
        "range": 25,
        "priority": 0.75,
        "persistence": 0.75,
        "frequency": 0.4,
        "additionalParameters": {
          "signalStrength": 0.8,
          "relaySpeed": 0.7
        }
      },
      "visualEffects": {
        "particleEffect": "signal_pulse",
        "trailEffect": "signal_trail",
        "colorModulation": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Harmonic Controller",
          "Neural Network"
        ]
      }
    },
    {
      "name": "Harmonic Controller",
      "description": "Particles control others through harmonic resonance",
      "rarityTier": "Rare",
      "role": "CONTROL",
      "type": "Oscillation",
      "physicsLogic": {
        "strength": 0.7,
        "range": 30,
        "priority": 0.8,
        "persistence": 0.8,
        "frequency": 0.5,
        "additionalParameters": {
          "harmonicFrequencies": [
            0.3,
            0.5,
            0.7
          ],
          "resonanceStrength": 0.8
        }
      },
      "visualEffects": {
        "particleEffect": "harmonic_wave",
        "trailEffect": "frequency_trail",
        "colorModulation": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Neural Network",
          "Quantum Controller"
        ]
      }
    },
    {
      "name": "Neural Network",
      "description": "Particles form a neural network-like control system",
      "rarityTier": "Rare",
      "role": "CONTROL",
      "type": "Flowing",
      "physicsLogic": {
        "strength": 0.75,
        "range": 35,
        "priority": 0.85,
        "persistence": 0.85,
        "frequency": 0.3,
        "additionalParameters": {
          "neuronCount": 12,
          "synapseStrength": 0.8
        }
      },
      "visualEffects": {
        "particleEffect": "neural_pulse",
        "trailEffect": "synapse_trail",
        "colorModulation": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Quantum Controller",
          "Hive Mind"
        ]
      }
    },
    {
      "name": "Quantum Controller",
      "description": "Particles control others through quantum entanglement",
      "rarityTier": "Epic",
      "role": "CONTROL",
      "type": "Quantum Fluctuation",
      "physicsLogic": {
        "strength": 0.8,
        "range": 40,
        "priority": 0.9,
        "persistence": 0.9,
        "frequency": 0.2,
        "additionalParameters": {
          "entanglementStrength": 0.9,
          "quantumCoherence": 0.8
        }
      },
      "visualEffects": {
        "particleEffect": "quantum_link",
        "trailEffect": "entanglement_trail",
        "colorModulation": true
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
      "description": "Particles form a collective intelligence",
      "rarityTier": "Epic",
      "role": "CONTROL",
      "type": "Flowing",
      "physicsLogic": {
        "strength": 0.85,
        "range": 45,
        "priority": 0.95,
        "persistence": 0.95,
        "frequency": 0.25,
        "additionalParameters": {
          "collectiveIntelligence": 0.9,
          "synchronizationRate": 0.8
        }
      },
      "visualEffects": {
        "particleEffect": "hive_glow",
        "trailEffect": "thought_stream",
        "colorModulation": true
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
      "description": "Particles conduct and control temporal energy",
      "rarityTier": "Legendary",
      "role": "CONTROL",
      "type": "Quantum Fluctuation",
      "physicsLogic": {
        "strength": 0.9,
        "range": 50,
        "priority": 1,
        "persistence": 1,
        "frequency": 0.15,
        "additionalParameters": {
          "temporalInfluence": 0.9,
          "timeFlowControl": 0.8
        }
      },
      "visualEffects": {
        "particleEffect": "time_ripple",
        "trailEffect": "temporal_stream",
        "colorModulation": true
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
      "description": "Particles weave and control the fabric of reality",
      "rarityTier": "Legendary",
      "role": "CONTROL",
      "type": "Quantum Fluctuation",
      "physicsLogic": {
        "strength": 0.95,
        "range": 55,
        "priority": 1,
        "persistence": 1,
        "frequency": 0.1,
        "additionalParameters": {
          "realityWarpStrength": 0.9,
          "dimensionalControl": 0.8
        }
      },
      "visualEffects": {
        "particleEffect": "reality_distortion",
        "trailEffect": "dimensional_thread",
        "colorModulation": true
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
      "description": "Particles conduct and control cosmic forces",
      "rarityTier": "Mythic",
      "role": "CONTROL",
      "type": "Quantum Fluctuation",
      "physicsLogic": {
        "strength": 1,
        "range": 60,
        "priority": 1,
        "persistence": 1,
        "frequency": 0.05,
        "additionalParameters": {
          "cosmicInfluence": 1,
          "universalHarmony": 0.9
        }
      },
      "visualEffects": {
        "particleEffect": "cosmic_aura",
        "trailEffect": "stellar_stream",
        "colorModulation": true
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
      "description": "Particles form a nexus of universal control",
      "rarityTier": "Mythic",
      "role": "CONTROL",
      "type": "Quantum Fluctuation",
      "physicsLogic": {
        "strength": 1,
        "range": 65,
        "priority": 1,
        "persistence": 1,
        "frequency": 0.01,
        "additionalParameters": {
          "universalInfluence": 1,
          "multiversalHarmony": 0.9
        }
      },
      "visualEffects": {
        "particleEffect": "universal_glow",
        "trailEffect": "creation_stream",
        "colorModulation": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Cosmic Conductor"
        ]
      }
    }
  ];

export default CONTROL_BEHAVIOR_TRAITS;

