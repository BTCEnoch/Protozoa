# Create Sample Role Formations Script
# This script creates sample formation traits for each role at tier 1

# Project root directory (current directory)
$rootDir = Get-Location

# Roles
$roles = @("attack", "defense", "control", "movement")

# Formation pattern
$pattern = "circle"
$displayName = "Circle"

# Create formation trait files for each role
foreach ($role in $roles) {
    $formationFile = "$rootDir\src\inventory\traits\formation\$role\tier1\${pattern}Formation.ts"

    # Customize description based on role
    $description = switch ($role) {
        "attack" { "Arranges attack particles in an outward-facing circle for maximum offensive coverage." }
        "defense" { "Arranges defense particles in a protective circle to shield the core." }
        "control" { "Arranges control particles in a circular pattern to maintain balance and stability." }
        "movement" { "Arranges movement particles in a circular pattern for efficient propulsion." }
        default { "Arranges particles in a circular pattern." }
    }

    $formationContent = @"
/**
 * $displayName Formation Trait for $role at tier1
 *
 * $description
 */

import { Role, Tier, Rarity, TraitCategory, Vector3 } from '../../../../../types/core';
import { FormationTrait, FormationPattern, FormationParameters } from '../../../../types';

/**
 * $displayName Formation trait for $role
 */
export const $($role)$($displayName)Formation: FormationTrait = {
  id: 'formation-$role-$pattern-t1',
  name: '$role $displayName Formation',
  description: '$description',
  role: Role.$(($role).ToUpper()),
  tier: Tier.TIER_1,
  rarity: Rarity.COMMON,
  category: TraitCategory.FORMATION,
  pattern: FormationPattern.$(($pattern).ToUpper()),
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
 * Registry of all tier1 $role $pattern formation traits
 */
export const tier1$($role)$($displayName)Formations: FormationTrait[] = [
  $($role)$($displayName)Formation
];
"@
    Set-Content -Path $formationFile -Value $formationContent
    Write-Host "Created $pattern formation file for $role" -ForegroundColor Yellow
}

Write-Host "`nSample role formations creation completed!" -ForegroundColor Cyan
