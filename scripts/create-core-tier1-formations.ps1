# Create Core Tier 1 Formations Script
# This script creates the formation trait implementations for core role at tier 1

# Project root directory (current directory)
$rootDir = Get-Location

# Role and tier
$role = "core"
$tier = "tier1"

# Formation patterns for tier 1
$patterns = @(
    @{
        Name = "circle"
        DisplayName = "Circle"
        Description = "Arranges particles in a protective circle around the core."
        Rarity = "COMMON"
    },
    @{
        Name = "grid"
        DisplayName = "Grid"
        Description = "Arranges particles in a simple grid pattern."
        Rarity = "COMMON"
    },
    @{
        Name = "spiral"
        DisplayName = "Spiral"
        Description = "Arranges particles in a spiral pattern emanating from the core."
        Rarity = "UNCOMMON"
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
  id: 'formation-$role-$($pattern.Name)-t1',
  name: '$role $($pattern.DisplayName) Formation',
  description: '$($pattern.Description)',
  role: Role.$(($role).ToUpper()),
  tier: Tier.TIER_1,
  rarity: Rarity.$($pattern.Rarity),
  category: TraitCategory.FORMATION,
  pattern: FormationPattern.$(($pattern.Name).ToUpper()),
  parameters: {
    spacing: 1.0,
    offset: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    jitter: 0.1,
    seed: 12345
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

Write-Host "`nCore tier 1 formation traits creation completed!" -ForegroundColor Cyan
