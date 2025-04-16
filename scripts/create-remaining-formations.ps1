# Create Remaining Formations Script
# This script creates the remaining formation traits needed to reach 75

# Project root directory (current directory)
$rootDir = Get-Location

# Roles
$roles = @("attack", "defense", "control", "movement")

# Patterns by tier
$patternsByTier = @{
    "tier1" = @("grid", "spiral")
    "tier2" = @("circle", "grid", "spiral", "cluster")
    "tier3" = @("sphere", "spiral", "cluster", "helix")
    "tier4" = @("sphere", "cluster", "tree", "swarm")
    "tier5" = @("tree", "swarm", "sierpinski")
    "tier6" = @("sierpinski", "mandelbrot")
}

# Role-specific descriptions
$descriptions = @{
    "attack" = @{
        "circle" = "Arranges attack particles in an outward-facing circle for maximum offensive coverage."
        "grid" = "Arranges attack particles in a grid formation for coordinated strikes."
        "spiral" = "Arranges attack particles in a spiral pattern for sweeping attacks."
        "sphere" = "Arranges attack particles in a spherical formation for omnidirectional offense."
        "helix" = "Arranges attack particles in a helical pattern for drilling attacks."
        "cluster" = "Arranges attack particles in aggressive clusters for focused damage."
        "swarm" = "Arranges attack particles in a swarming pattern for overwhelming opponents."
        "tree" = "Arranges attack particles in a branching structure for multi-vector assaults."
        "sierpinski" = "Arranges attack particles in a fractal pattern for unpredictable attacks."
        "mandelbrot" = "Arranges attack particles in a complex fractal pattern for reality-bending attacks."
    }
    "defense" = @{
        "circle" = "Arranges defense particles in a protective circle to shield the core."
        "grid" = "Arranges defense particles in a grid pattern to create a defensive wall."
        "spiral" = "Arranges defense particles in a spiral pattern for layered protection."
        "sphere" = "Arranges defense particles in a spherical shell for complete protection."
        "helix" = "Arranges defense particles in a helical pattern for dynamic defense."
        "cluster" = "Arranges defense particles in reinforced clusters for targeted protection."
        "swarm" = "Arranges defense particles in a reactive swarm for adaptive defense."
        "tree" = "Arranges defense particles in a branching structure for hierarchical protection."
        "sierpinski" = "Arranges defense particles in a fractal pattern for multi-scale defense."
        "mandelbrot" = "Arranges defense particles in a complex fractal pattern for impenetrable defense."
    }
    "control" = @{
        "circle" = "Arranges control particles in a circular pattern to maintain balance and stability."
        "grid" = "Arranges control particles in a grid pattern for precise regulation."
        "spiral" = "Arranges control particles in a spiral pattern for progressive influence."
        "sphere" = "Arranges control particles in a spherical formation for omnidirectional control."
        "helix" = "Arranges control particles in a helical pattern for temporal regulation."
        "cluster" = "Arranges control particles in strategic clusters for focused influence."
        "swarm" = "Arranges control particles in a collective swarm for distributed governance."
        "tree" = "Arranges control particles in a hierarchical structure for command and control."
        "sierpinski" = "Arranges control particles in a fractal pattern for recursive regulation."
        "mandelbrot" = "Arranges control particles in a complex fractal pattern for reality manipulation."
    }
    "movement" = @{
        "circle" = "Arranges movement particles in a circular pattern for efficient propulsion."
        "grid" = "Arranges movement particles in a grid pattern for stable locomotion."
        "spiral" = "Arranges movement particles in a spiral pattern for rotational momentum."
        "sphere" = "Arranges movement particles in a spherical formation for omnidirectional mobility."
        "helix" = "Arranges movement particles in a helical pattern for corkscrew propulsion."
        "cluster" = "Arranges movement particles in dynamic clusters for burst acceleration."
        "swarm" = "Arranges movement particles in a fluid swarm for agile maneuverability."
        "tree" = "Arranges movement particles in a branching structure for multi-vector propulsion."
        "sierpinski" = "Arranges movement particles in a fractal pattern for dimensional shifting."
        "mandelbrot" = "Arranges movement particles in a complex fractal pattern for reality-bending travel."
    }
}

# Rarities by tier
$raritiesByTier = @{
    "tier1" = "COMMON"
    "tier2" = "UNCOMMON"
    "tier3" = "RARE"
    "tier4" = "EPIC"
    "tier5" = "LEGENDARY"
    "tier6" = "MYTHIC"
}

# Name prefixes by tier
$prefixesByTier = @{
    "tier1" = ""
    "tier2" = "Advanced "
    "tier3" = "Enhanced "
    "tier4" = "Superior "
    "tier5" = "Exceptional "
    "tier6" = "Mythical "
}

# Create formation trait files
foreach ($role in $roles) {
    foreach ($tier in $patternsByTier.Keys) {
        foreach ($pattern in $patternsByTier[$tier]) {
            # Skip if file already exists
            $formationFile = "$rootDir\src\inventory\traits\formation\$role\$tier\${pattern}Formation.ts"
            if (Test-Path $formationFile) {
                Write-Host "Skipping existing file: $formationFile" -ForegroundColor Gray
                continue
            }
            
            $displayName = (Get-Culture).TextInfo.ToTitleCase($pattern)
            $description = $descriptions[$role][$pattern]
            $rarity = $raritiesByTier[$tier]
            $prefix = $prefixesByTier[$tier]
            $tierNumber = $tier.Substring(4)
            
            $formationContent = @"
/**
 * $displayName Formation Trait for $role at $tier
 * 
 * $description
 */

import { Role, Tier, Rarity, TraitCategory, Vector3 } from '../../../../../types/core';
import { FormationTrait, FormationPattern, FormationParameters } from '../../../../types';

/**
 * $displayName Formation trait for $role
 */
export const $($role)$($displayName)Formation: FormationTrait = {
  id: 'formation-$role-$pattern-t$tierNumber',
  name: '${prefix}$role $displayName Formation',
  description: '$description',
  role: Role.$(($role).ToUpper()),
  tier: Tier.TIER_$tierNumber,
  rarity: Rarity.$rarity,
  category: TraitCategory.FORMATION,
  pattern: FormationPattern.$(($pattern).ToUpper()),
  parameters: {
    spacing: $(1.0 + 0.3 * [int]$tierNumber),
    offset: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: $(1.0 + 0.3 * [int]$tierNumber), y: $(1.0 + 0.3 * [int]$tierNumber), z: $(1.0 + 0.3 * [int]$tierNumber) },
    jitter: $(0.1 + 0.05 * [int]$tierNumber),
    seed: $(10000 + 1000 * [int]$tierNumber + [array]::IndexOf($roles, $role) * 100 + [array]::IndexOf($patternsByTier[$tier], $pattern) * 10)
  }
};

/**
 * Registry of all $tier $role $pattern formation traits
 */
export const $tier$($role)$($displayName)Formations: FormationTrait[] = [
  $($role)$($displayName)Formation
];
"@
            Set-Content -Path $formationFile -Value $formationContent
            Write-Host "Created $pattern formation file for $role at $tier" -ForegroundColor Yellow
        }
    }
}

Write-Host "`nRemaining formation traits creation completed!" -ForegroundColor Cyan
