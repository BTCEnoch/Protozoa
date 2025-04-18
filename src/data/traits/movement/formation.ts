// Generated from group_traits/trait_banks/formation/movement_formation_traits.json
// DO NOT EDIT MANUALLY - This file is generated by scripts/generate_trait_data_better.ps1

import { FormationTrait } from '../../../types/traits/trait';
import { Role, Rarity, FalloffType } from '../../../types/core';

export const MOVEMENT_FORMATION_TRAITS = [
    {
      "name": "Stream Formation",
      "description": "Particles flow in a stream-like formation",
      "rarityTier": "Common",
      "role": "MOVEMENT",
      "pattern": "streamFormationPattern",
      "physicsLogic": {
        "stiffness": 0.6,
        "range": 15,
        "falloff": "linear",
        "targetFunction": "streamFormationPositions",
        "additionalParameters": {
          "streamLength": 25,
          "streamWidth": 5,
          "flowSpeed": 0.5
        }
      },
      "visualProperties": {
        "baseColor": "#3399ff",
        "particleScale": 0.9,
        "trailEffect": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Wave Pattern",
          "Slipstream"
        ]
      }
    },
    {
      "name": "Wave Pattern",
      "description": "Particles move in a wave-like pattern",
      "rarityTier": "Uncommon",
      "role": "MOVEMENT",
      "pattern": "wavePatternPattern",
      "physicsLogic": {
        "stiffness": 0.55,
        "range": 18,
        "falloff": "quadratic",
        "targetFunction": "wavePatternPositions",
        "additionalParameters": {
          "waveLength": 20,
          "waveAmplitude": 8,
          "waveSpeed": 0.4
        }
      },
      "visualProperties": {
        "baseColor": "#55aaff",
        "particleScale": 0.85,
        "trailEffect": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Slipstream",
          "Vortex Flow"
        ]
      }
    },
    {
      "name": "Slipstream",
      "description": "Particles form an aerodynamic slipstream",
      "rarityTier": "Rare",
      "role": "MOVEMENT",
      "pattern": "slipstreamPattern",
      "physicsLogic": {
        "stiffness": 0.5,
        "range": 20,
        "falloff": "exponential",
        "targetFunction": "slipstreamPositions",
        "additionalParameters": {
          "streamlineLength": 30,
          "streamlineCurvature": 0.3,
          "flowAcceleration": 0.6
        }
      },
      "visualProperties": {
        "baseColor": "#77bbff",
        "particleScale": 0.8,
        "trailEffect": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Vortex Flow",
          "Quantum Leap"
        ]
      }
    },
    {
      "name": "Vortex Flow",
      "description": "Particles flow in a vortex pattern",
      "rarityTier": "Rare",
      "role": "MOVEMENT",
      "pattern": "vortexFlowPattern",
      "physicsLogic": {
        "stiffness": 0.45,
        "range": 25,
        "falloff": "inverse",
        "targetFunction": "vortexFlowPositions",
        "additionalParameters": {
          "vortexRadius": 12,
          "vortexHeight": 20,
          "spiralFactor": 0.7
        }
      },
      "visualProperties": {
        "baseColor": "#99ccff",
        "particleScale": 0.75,
        "trailEffect": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Quantum Leap",
          "Hypersonic Array"
        ]
      }
    },
    {
      "name": "Quantum Leap",
      "description": "Particles form a pattern for quantum movement",
      "rarityTier": "Epic",
      "role": "MOVEMENT",
      "pattern": "quantumLeapPattern",
      "physicsLogic": {
        "stiffness": 0.4,
        "range": 30,
        "falloff": "quantum",
        "targetFunction": "quantumLeapPositions",
        "additionalParameters": {
          "leapDistance": 15,
          "quantumStates": 3,
          "probabilityField": 0.6
        }
      },
      "visualProperties": {
        "baseColor": "#aaddff",
        "particleScale": 0.7,
        "trailEffect": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Hypersonic Array",
          "Temporal Slipstream"
        ]
      }
    },
    {
      "name": "Hypersonic Array",
      "description": "Particles form an array for hypersonic movement",
      "rarityTier": "Epic",
      "role": "MOVEMENT",
      "pattern": "hypersonicArrayPattern",
      "physicsLogic": {
        "stiffness": 0.35,
        "range": 35,
        "falloff": "exponential",
        "targetFunction": "hypersonicArrayPositions",
        "additionalParameters": {
          "arrayLength": 35,
          "compressionFactor": 0.5,
          "velocityMultiplier": 2
        }
      },
      "visualProperties": {
        "baseColor": "#bbeeff",
        "particleScale": 0.65,
        "trailEffect": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Temporal Slipstream",
          "Dimensional Shift"
        ]
      }
    },
    {
      "name": "Temporal Slipstream",
      "description": "Particles form a slipstream through time",
      "rarityTier": "Legendary",
      "role": "MOVEMENT",
      "pattern": "temporalSlipstreamPattern",
      "physicsLogic": {
        "stiffness": 0.3,
        "range": 40,
        "falloff": "quantum",
        "targetFunction": "temporalSlipstreamPositions",
        "additionalParameters": {
          "timeWarpFactor": 0.7,
          "slipstreamLength": 40,
          "temporalStability": 0.6
        }
      },
      "visualProperties": {
        "baseColor": "#ccffff",
        "particleScale": 0.6,
        "trailEffect": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Dimensional Shift",
          "Cosmic Traveler"
        ]
      }
    },
    {
      "name": "Dimensional Shift",
      "description": "Particles form a pattern for shifting dimensions",
      "rarityTier": "Legendary",
      "role": "MOVEMENT",
      "pattern": "dimensionalShiftPattern",
      "physicsLogic": {
        "stiffness": 0.25,
        "range": 45,
        "falloff": "quantum",
        "targetFunction": "dimensionalShiftPositions",
        "additionalParameters": {
          "dimensionalLayers": 5,
          "shiftProbability": 0.8,
          "dimensionalStability": 0.5
        }
      },
      "visualProperties": {
        "baseColor": "#ddffff",
        "particleScale": 0.55,
        "trailEffect": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Cosmic Traveler",
          "Reality Surfer"
        ]
      }
    },
    {
      "name": "Cosmic Traveler",
      "description": "Particles form a pattern for cosmic travel",
      "rarityTier": "Mythic",
      "role": "MOVEMENT",
      "pattern": "cosmicTravelerPattern",
      "physicsLogic": {
        "stiffness": 0.2,
        "range": 50,
        "falloff": "quantum",
        "targetFunction": "cosmicTravelerPositions",
        "additionalParameters": {
          "cosmicSpeed": 3,
          "spaceTimeCurvature": 0.9,
          "wormholeStability": 0.7
        }
      },
      "visualProperties": {
        "baseColor": "#eeffff",
        "particleScale": 0.5,
        "trailEffect": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Reality Surfer"
        ]
      }
    },
    {
      "name": "Reality Surfer",
      "description": "Particles form a pattern for surfing between realities",
      "rarityTier": "Mythic",
      "role": "MOVEMENT",
      "pattern": "realitySurferPattern",
      "physicsLogic": {
        "stiffness": 0.15,
        "range": 55,
        "falloff": "quantum",
        "targetFunction": "realitySurferPositions",
        "additionalParameters": {
          "realityWaveAmplitude": 15,
          "multiversalHarmonics": 7,
          "realityTransitionRate": 0.8
        }
      },
      "visualProperties": {
        "baseColor": "#ffffff",
        "particleScale": 0.45,
        "trailEffect": true
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Cosmic Traveler"
        ]
      }
    }
  ];

export default MOVEMENT_FORMATION_TRAITS;





