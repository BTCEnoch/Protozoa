# Create Core Tier 2 Formations Script
# This script creates the formation trait implementations for core role at tier 2

# Project root directory (current directory)
$rootDir = Get-Location

# Role and tier
$role = "core"
$tier = "tier2"

# Formation patterns for tier 2
$patterns = @(
    @{
        Name = "circle"
        DisplayName = "Circle"
        Description = "Arranges particles in a dual-layer protective circle around the core."
        Rarity = "UNCOMMON"
    },
    @{
        Name = "grid"
        DisplayName = "Grid"
        Description = "Arranges particles in a 3D grid pattern surrounding the core."
        Rarity = "UNCOMMON"
    },
    @{
        Name = "spiral"
        DisplayName = "Spiral"
        Description = "Arranges particles in a double spiral pattern emanating from the core."
        Rarity = "UNCOMMON"
    },
    @{
        Name = "cluster"
        DisplayName = "Cluster"
        Description = "Arranges particles in organic-looking clusters around the core."
        Rarity = "RARE"
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
  id: 'formation-$role-$($pattern.Name)-t2',
  name: 'Advanced $role $($pattern.DisplayName) Formation',
  description: '$($pattern.Description)',
  role: Role.$(($role).ToUpper()),
  tier: Tier.TIER_2,
  rarity: Rarity.$($pattern.Rarity),
  category: TraitCategory.FORMATION,
  pattern: FormationPattern.$(($pattern.Name).ToUpper()),
  parameters: {
    spacing: 1.2,
    offset: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1.2, y: 1.2, z: 1.2 },
    jitter: 0.15,
    seed: 23456
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

Write-Host "`nCore tier 2 formation traits creation completed!" -ForegroundColor Cyan
