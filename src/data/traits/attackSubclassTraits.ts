// Generated from group_traits/trait_banks/subclass/attack_subclass_traits.json
// DO NOT EDIT MANUALLY - This file is generated by scripts/generate_trait_data_better.ps1

import { $1 } from '../../types/trait';

export const ATTACK_SUBCLASS_TRAITS = [
    {
      "name": "Striker",
      "description": "A specialized attacker focused on direct strikes",
      "rarityTier": "Common",
      "role": "ATTACK",
      "formationTrait": "Arrow Formation",
      "abilities": [
        {
          "name": "Piercing Strike",
          "description": "Launches a piercing strike at targets",
          "type": "Primary",
          "cooldown": 4,
          "physicsLogic": {
            "forceMultiplier": 1.8,
            "rangeMultiplier": 1.2,
            "durationSeconds": 2
          },
          "visualEffects": {
            "particleEffect": "piercing_flash",
            "areaEffect": "impact_ripple",
            "colorFlash": "#ff3333"
          }
        },
        {
          "name": "Momentum Surge",
          "description": "Builds up momentum for a powerful strike",
          "type": "Secondary",
          "cooldown": 7,
          "physicsLogic": {
            "forceMultiplier": 2,
            "rangeMultiplier": 1,
            "durationSeconds": 3
          },
          "visualEffects": {
            "particleEffect": "momentum_trail",
            "areaEffect": "none",
            "colorFlash": "#ff5555"
          }
        }
      ],
      "synergy": "Works well with Movement subclasses for enhanced mobility strikes",
      "themeProperties": {
        "primaryColor": "#ff3333",
        "secondaryColor": "#ff5555",
        "particleEffect": "strike_blur",
        "soundEffect": "piercing_whoosh"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Berserker",
          "Assassin"
        ]
      }
    },
    {
      "name": "Berserker",
      "description": "A frenzied attacker that deals area damage",
      "rarityTier": "Uncommon",
      "role": "ATTACK",
      "formationTrait": "Pincer Attack",
      "abilities": [
        {
          "name": "Frenzy",
          "description": "Enters a frenzied state with increased attack speed",
          "type": "Primary",
          "cooldown": 6,
          "physicsLogic": {
            "forceMultiplier": 1.6,
            "rangeMultiplier": 1.3,
            "durationSeconds": 4
          },
          "visualEffects": {
            "particleEffect": "frenzy_aura",
            "areaEffect": "chaos_field",
            "colorFlash": "#ff7777"
          }
        },
        {
          "name": "Whirlwind Strike",
          "description": "Spins rapidly to hit all nearby targets",
          "type": "Secondary",
          "cooldown": 9,
          "physicsLogic": {
            "forceMultiplier": 1.7,
            "rangeMultiplier": 1.5,
            "durationSeconds": 3
          },
          "visualEffects": {
            "particleEffect": "spinning_blur",
            "areaEffect": "whirlwind_trail",
            "colorFlash": "#ff9999"
          }
        }
      ],
      "synergy": "Works well with Core subclasses for enhanced power",
      "themeProperties": {
        "primaryColor": "#ff7777",
        "secondaryColor": "#ff9999",
        "particleEffect": "rage_glow",
        "soundEffect": "battle_cry"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Assassin",
          "Devastator"
        ]
      }
    },
    {
      "name": "Assassin",
      "description": "A precise attacker that targets vulnerabilities",
      "rarityTier": "Rare",
      "role": "ATTACK",
      "formationTrait": "Swarm Assault",
      "abilities": [
        {
          "name": "Precision Strike",
          "description": "Targets weak points for maximum damage",
          "type": "Primary",
          "cooldown": 7,
          "physicsLogic": {
            "forceMultiplier": 2.2,
            "rangeMultiplier": 1.4,
            "durationSeconds": 2
          },
          "visualEffects": {
            "particleEffect": "precision_flash",
            "areaEffect": "target_marker",
            "colorFlash": "#ffaaaa"
          }
        },
        {
          "name": "Shadow Step",
          "description": "Moves quickly to flank targets",
          "type": "Secondary",
          "cooldown": 10,
          "physicsLogic": {
            "forceMultiplier": 1.5,
            "rangeMultiplier": 1.8,
            "durationSeconds": 3
          },
          "visualEffects": {
            "particleEffect": "shadow_trail",
            "areaEffect": "stealth_field",
            "colorFlash": "#ffbbbb"
          }
        }
      ],
      "synergy": "Works well with Control subclasses for strategic targeting",
      "themeProperties": {
        "primaryColor": "#ffaaaa",
        "secondaryColor": "#ffbbbb",
        "particleEffect": "stealth_shimmer",
        "soundEffect": "silent_strike"
      },
      "evolutionParameters": {
        "mutationChance": 0.05,
        "possibleEvolutions": [
          "Devastator",
          "Void Hunter"
        ]
      }
    }
  ];

export default ATTACK_SUBCLASS_TRAITS;

