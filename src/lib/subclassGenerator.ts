/**
 * Subclass Generator for Bitcoin Protozoa
 *
 * This module generates subclasses for creatures based on their role and tier.
 * - For Common and Uncommon tiers: Randomly assigns abilities from pools
 * - For Rare+ tiers: Returns predefined subclasses
 */

import { Tier, Role } from '../types/abilities/ability';
import { DynamicSubclass, PredefinedSubclass } from '../../ability_reference';
import { RNGStream } from './rngSystem';
import { getAbilityPool } from '../data/abilityPools';
import { getPredefinedSubclasses } from '../data/predefinedSubclasses';
import { TierRanges } from '../types/abilities/ability';

/**
 * Generate a dynamic subclass for Common and Uncommon tiers
 * @param role The role (CORE, ATTACK, etc.)
 * @param tier The tier (Common, Uncommon)
 * @param rng The RNG stream to use for randomization
 * @returns A dynamically generated subclass
 */
export function generateDynamicSubclass(role: Role, tier: Tier, rng: RNGStream): DynamicSubclass {
  // Get the ability pool for this role and tier
  const abilityPool = getAbilityPool(role, tier);

  // Randomly select abilities from each category
  const abilities = {
    primary: rng.nextItem(abilityPool.primary),
    secondary: rng.nextItem(abilityPool.secondary),
    unique: rng.nextItem(abilityPool.unique),
    crowdControl: rng.nextItem(abilityPool.crowdControl)
  };

  // Randomly select a formation trait
  const formationTrait = rng.nextItem(abilityPool.formationTraits);

  // Generate a generic synergy description
  const synergy = generateSynergy(role);

  // Create the dynamic subclass
  return {
    name: `${Tier[tier]} ${Role[role]}`,
    tier: tier,
    particleRange: TierRanges[tier],
    abilities: abilities,
    formationTrait: formationTrait,
    synergy: synergy
  };
}

/**
 * Get a predefined subclass for Rare+ tiers
 * @param role The role (CORE, ATTACK, etc.)
 * @param tier The tier (Rare, Epic, Legendary, Mythic)
 * @param rng The RNG stream to use for randomization (for potential variations)
 * @returns A predefined subclass
 */
export function getPredefinedSubclass(role: Role, tier: Tier, rng: RNGStream): PredefinedSubclass {
  // This would fetch from the predefined subclasses
  // For now, we'll return a placeholder

  // In a real implementation, we would select from available subclasses for this role and tier
  // const subclasses = predefinedSubclasses[role][tier];
  // return rng.nextItem(subclasses);

  // Placeholder
  return {
    name: `${Tier[tier]} ${Role[role]} Subclass`,
    tier: tier,
    particleRange: TierRanges[tier],
    description: `A powerful ${Tier[tier]} ${Role[role]} creature`,
    role: role,
    abilities: {
      primary: {
        name: "Placeholder Primary",
        description: "Placeholder description",
        cooldown: 10,
        category: 'primary'
      },
      secondary: {
        name: "Placeholder Secondary",
        description: "Placeholder description",
        cooldown: 15,
        category: 'secondary'
      },
      unique: {
        name: "Placeholder Unique",
        description: "Placeholder description",
        cooldown: 20,
        category: 'unique'
      },
      crowdControl: {
        name: "Placeholder CC",
        description: "Placeholder description",
        cooldown: 25,
        category: 'crowdControl'
      }
    },
    formationTrait: {
      name: "Placeholder Formation",
      description: "Placeholder description"
    },
    synergy: "Placeholder synergy"
  };
}

/**
 * Generate a generic synergy description based on role
 * @param role The role (CORE, ATTACK, etc.)
 * @returns A synergy description
 */
function generateSynergy(role: Role): string {
  switch (role) {
    case Role.CORE:
      return "Supports the party with healing and stability.";
    case Role.ATTACK:
      return "Deals damage and disrupts enemy formations.";
    case Role.CONTROL:
      return "Controls the battlefield with disabling effects.";
    case Role.DEFENSE:
      return "Protects allies and absorbs damage.";
    case Role.MOVEMENT:
      return "Provides mobility and positioning advantages.";
    default:
      return "Enhances the party's capabilities.";
  }
}

/**
 * Determine if a tier should use dynamic subclasses
 * @param tier The tier to check
 * @returns True if the tier should use dynamic subclasses, false otherwise
 */
export function usesDynamicSubclass(tier: Tier): boolean {
  return tier === Tier.Common || tier === Tier.Uncommon;
}

/**
 * Get a subclass for a creature based on its role and tier
 * @param role The role (CORE, ATTACK, etc.)
 * @param tier The tier (Common, Uncommon, Rare, etc.)
 * @param rng The RNG stream to use for randomization
 * @returns A subclass (either dynamic or predefined)
 */
export function getSubclass(role: Role, tier: Tier, rng: RNGStream): DynamicSubclass | PredefinedSubclass {
  if (usesDynamicSubclass(tier)) {
    return generateDynamicSubclass(role, tier, rng);
  } else {
    return getPredefinedSubclass(role, tier, rng);
  }
}

module.exports = { generateDynamicSubclass, getPredefinedSubclass, usesDynamicSubclass, getSubclass };

