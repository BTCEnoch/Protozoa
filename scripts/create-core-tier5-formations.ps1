# Create Core Tier 5 Formations Script
# This script creates the formation trait implementations for core role at tier 5

# Project root directory (current directory)
$rootDir = Get-Location

# Role and tier
$role = "core"
$tier = "tier5"

# Formation patterns for tier 5
$patterns = @(
    @{
        Name = "tree"
        DisplayName = "Tree"
        Description = "Arranges particles in a complex fractal tree structure with multiple branching levels."
        Rarity = "LEGENDARY"
    },
    @{
        Name = "swarm"
        DisplayName = "Swarm"
        Description = "Arranges particles in an intelligent swarm formation with emergent patterns."
        Rarity = "LEGENDARY"
    },
    @{
        Name = "sierpinski"
        DisplayName = "Sierpinski"
        Description = "Arranges particles in a Sierpinski tetrahedron fractal pattern."
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
  id: 'formation-$role-$($pattern.Name)-t5',
  name: 'Exceptional $role $($pattern.DisplayName) Formation',
  description: '$($pattern.Description)',
  role: Role.$(($role).ToUpper()),
  tier: Tier.TIER_5,
  rarity: Rarity.$($pattern.Rarity),
  category: TraitCategory.FORMATION,
  pattern: FormationPattern.$(($pattern.Name).ToUpper()),
  parameters: {
    spacing: 2.0,
    offset: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 2.0, y: 2.0, z: 2.0 },
    jitter: 0.3,
    seed: 56789
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

Write-Host "`nCore tier 5 formation traits creation completed!" -ForegroundColor Cyan
