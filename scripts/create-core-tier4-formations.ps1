# Create Core Tier 4 Formations Script
# This script creates the formation trait implementations for core role at tier 4

# Project root directory (current directory)
$rootDir = Get-Location

# Role and tier
$role = "core"
$tier = "tier4"

# Formation patterns for tier 4
$patterns = @(
    @{
        Name = "sphere"
        DisplayName = "Sphere"
        Description = "Arranges particles in a multi-layered spherical formation with orbital patterns."
        Rarity = "EPIC"
    },
    @{
        Name = "cluster"
        DisplayName = "Cluster"
        Description = "Arranges particles in a complex network of interconnected clusters."
        Rarity = "EPIC"
    },
    @{
        Name = "tree"
        DisplayName = "Tree"
        Description = "Arranges particles in a tree-like branching structure emanating from the core."
        Rarity = "EPIC"
    },
    @{
        Name = "swarm"
        DisplayName = "Swarm"
        Description = "Arranges particles in a dynamic swarm-like pattern surrounding the core."
        Rarity = "LEGENDARY"
    }
)

# Create formation trait files
foreach ($pattern in $patterns) {
    $formationFile = "$rootDir\src\inventory\traits\formation\$role\$tier\$($pattern.Name)Formation.ts"
    $formationContent = @"
/**
 * $($pattern.DisplayName) Formation Trait for $role at $tier
 * 
 * $($pattern.Description)
 */

import { Role, Tier, Rarity, TraitCategory, Vector3 } from '../../../../../types/core';
import { FormationTrait, FormationPattern, FormationParameters } from '../../../../types';

/**
 * $($pattern.DisplayName) Formation trait for $role
 */
export const $($role)$($pattern.DisplayName)Formation: FormationTrait = {
  id: 'formation-$role-$($pattern.Name)-t4',
  name: 'Superior $role $($pattern.DisplayName) Formation',
  description: '$($pattern.Description)',
  role: Role.$(($role).ToUpper()),
  tier: Tier.TIER_4,
  rarity: Rarity.$($pattern.Rarity),
  category: TraitCategory.FORMATION,
  pattern: FormationPattern.$(($pattern.Name).ToUpper()),
  parameters: {
    spacing: 1.8,
    offset: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1.8, y: 1.8, z: 1.8 },
    jitter: 0.25,
    seed: 45678
  }
};

/**
 * Registry of all $tier $role $($pattern.Name) formation traits
 */
export const $tier$($role)$($pattern.DisplayName)Formations: FormationTrait[] = [
  $($role)$($pattern.DisplayName)Formation
];
"@
    Set-Content -Path $formationFile -Value $formationContent
    Write-Host "Created $($pattern.Name) formation file: $formationFile" -ForegroundColor Yellow
}

Write-Host "`nCore tier 4 formation traits creation completed!" -ForegroundColor Cyan
