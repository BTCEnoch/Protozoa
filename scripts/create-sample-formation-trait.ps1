# Create Sample Formation Trait Script
# This script creates a sample formation trait for the core role

# Project root directory (current directory)
$rootDir = Get-Location

# Create core formation traits directory
$coreFormationTraitsDir = "$rootDir\src\inventory\traits\formation\core"
if (-not (Test-Path $coreFormationTraitsDir)) {
    New-Item -ItemType Directory -Path $coreFormationTraitsDir -Force | Out-Null
    Write-Host "Created directory: $coreFormationTraitsDir" -ForegroundColor Green
}

# Create core formation traits index.ts
$coreFormationTraitsIndexFile = "$coreFormationTraitsDir\index.ts"
$coreFormationTraitsIndexContent = @"
/**
 * Core Formation Traits Exports
 */

export * from './tier1';
export * from './tier2';
export * from './tier3';
export * from './tier4';
export * from './tier5';
export * from './tier6';
"@
Set-Content -Path $coreFormationTraitsIndexFile -Value $coreFormationTraitsIndexContent
Write-Host "Created core formation traits index file: $coreFormationTraitsIndexFile" -ForegroundColor Yellow

# Create tier1 directory
$tier1Dir = "$coreFormationTraitsDir\tier1"
if (-not (Test-Path $tier1Dir)) {
    New-Item -ItemType Directory -Path $tier1Dir -Force | Out-Null
    Write-Host "Created directory: $tier1Dir" -ForegroundColor Green
}

# Create tier1 index.ts
$tier1IndexFile = "$tier1Dir\index.ts"
$tier1IndexContent = @"
/**
 * Tier 1 Core Formation Traits Exports
 */

export * from './circleFormation';
"@
Set-Content -Path $tier1IndexFile -Value $tier1IndexContent
Write-Host "Created tier1 index file: $tier1IndexFile" -ForegroundColor Yellow

# Create circleFormation.ts
$circleFormationFile = "$tier1Dir\circleFormation.ts"
$circleFormationContent = @"
/**
 * Circle Formation Trait
 * 
 * This is a sample formation trait for the core role at tier 1.
 */

import { Role, Tier, Rarity, TraitCategory } from '../../../../types/core';
import { FormationTrait, FormationPattern, FormationParameters } from '../../../types';

/**
 * Circle Formation trait
 */
export const circleFormation: FormationTrait = {
  id: 'formation-core-circle',
  name: 'Circle Formation',
  description: 'Arranges particles in a circular pattern around the core.',
  role: Role.CORE,
  tier: Tier.TIER_1,
  rarity: Rarity.COMMON,
  category: TraitCategory.FORMATION,
  pattern: FormationPattern.CIRCLE,
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
 * Registry of all tier 1 core formation traits
 */
export const tier1CoreFormationTraits: FormationTrait[] = [
  circleFormation
];
"@
Set-Content -Path $circleFormationFile -Value $circleFormationContent
Write-Host "Created circleFormation.ts file: $circleFormationFile" -ForegroundColor Yellow

Write-Host "`nSample formation trait creation completed!" -ForegroundColor Cyan
