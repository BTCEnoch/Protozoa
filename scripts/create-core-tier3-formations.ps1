# Create Core Tier 3 Formations Script
# This script creates the formation trait implementations for core role at tier 3

# Project root directory (current directory)
$rootDir = Get-Location

# Role and tier
$role = "core"
$tier = "tier3"

# Formation patterns for tier 3
$patterns = @(
    @{
        Name = "sphere"
        DisplayName = "Sphere"
        Description = "Arranges particles in a spherical shell around the core."
        Rarity = "RARE"
    },
    @{
        Name = "spiral"
        DisplayName = "Spiral"
        Description = "Arranges particles in a triple spiral pattern with increasing density."
        Rarity = "RARE"
    },
    @{
        Name = "cluster"
        DisplayName = "Cluster"
        Description = "Arranges particles in multiple interconnected clusters."
        Rarity = "RARE"
    },
    @{
        Name = "helix"
        DisplayName = "Helix"
        Description = "Arranges particles in a helical pattern surrounding the core."
        Rarity = "EPIC"
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
  id: 'formation-$role-$($pattern.Name)-t3',
  name: 'Enhanced $role $($pattern.DisplayName) Formation',
  description: '$($pattern.Description)',
  role: Role.$(($role).ToUpper()),
  tier: Tier.TIER_3,
  rarity: Rarity.$($pattern.Rarity),
  category: TraitCategory.FORMATION,
  pattern: FormationPattern.$(($pattern.Name).ToUpper()),
  parameters: {
    spacing: 1.5,
    offset: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1.5, y: 1.5, z: 1.5 },
    jitter: 0.2,
    seed: 34567
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

Write-Host "`nCore tier 3 formation traits creation completed!" -ForegroundColor Cyan
