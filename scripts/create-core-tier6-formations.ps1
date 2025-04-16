# Create Core Tier 6 Formations Script
# This script creates the formation trait implementations for core role at tier 6

# Project root directory (current directory)
$rootDir = Get-Location

# Role and tier
$role = "core"
$tier = "tier6"

# Formation patterns for tier 6
$patterns = @(
    @{
        Name = "sierpinski"
        DisplayName = "Sierpinski"
        Description = "Arranges particles in a complex multi-dimensional Sierpinski fractal pattern."
        Rarity = "MYTHIC"
    },
    @{
        Name = "mandelbrot"
        DisplayName = "Mandelbrot"
        Description = "Arranges particles based on the Mandelbrot set, creating a mesmerizing fractal pattern."
        Rarity = "MYTHIC"
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
  id: 'formation-$role-$($pattern.Name)-t6',
  name: 'Mythical $role $($pattern.DisplayName) Formation',
  description: '$($pattern.Description)',
  role: Role.$(($role).ToUpper()),
  tier: Tier.TIER_6,
  rarity: Rarity.$($pattern.Rarity),
  category: TraitCategory.FORMATION,
  pattern: FormationPattern.$(($pattern.Name).ToUpper()),
  parameters: {
    spacing: 2.5,
    offset: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 2.5, y: 2.5, z: 2.5 },
    jitter: 0.35,
    seed: 67890
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

Write-Host "`nCore tier 6 formation traits creation completed!" -ForegroundColor Cyan
