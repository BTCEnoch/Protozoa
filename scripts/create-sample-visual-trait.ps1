# Create Sample Visual Trait Script
# This script creates a sample visual trait for the core role

# Project root directory (current directory)
$rootDir = Get-Location

# Create core visual traits directory
$coreVisualTraitsDir = "$rootDir\src\inventory\traits\visual\core"
if (-not (Test-Path $coreVisualTraitsDir)) {
    New-Item -ItemType Directory -Path $coreVisualTraitsDir -Force | Out-Null
    Write-Host "Created directory: $coreVisualTraitsDir" -ForegroundColor Green
}

# Create core visual traits index.ts
$coreVisualTraitsIndexFile = "$coreVisualTraitsDir\index.ts"
$coreVisualTraitsIndexContent = @"
/**
 * Core Visual Traits Exports
 */

export * from './tier1';
export * from './tier2';
export * from './tier3';
export * from './tier4';
export * from './tier5';
export * from './tier6';
"@
Set-Content -Path $coreVisualTraitsIndexFile -Value $coreVisualTraitsIndexContent
Write-Host "Created core visual traits index file: $coreVisualTraitsIndexFile" -ForegroundColor Yellow

# Create tier1 directory
$tier1Dir = "$coreVisualTraitsDir\tier1"
if (-not (Test-Path $tier1Dir)) {
    New-Item -ItemType Directory -Path $tier1Dir -Force | Out-Null
    Write-Host "Created directory: $tier1Dir" -ForegroundColor Green
}

# Create tier1 index.ts
$tier1IndexFile = "$tier1Dir\index.ts"
$tier1IndexContent = @"
/**
 * Tier 1 Core Visual Traits Exports
 */

export * from './basicCore';
"@
Set-Content -Path $tier1IndexFile -Value $tier1IndexContent
Write-Host "Created tier1 index file: $tier1IndexFile" -ForegroundColor Yellow

# Create basicCore.ts
$basicCoreFile = "$tier1Dir\basicCore.ts"
$basicCoreContent = @"
/**
 * Basic Core Visual Trait
 * 
 * This is a sample visual trait for the core role at tier 1.
 */

import { Role, Tier, Rarity, TraitCategory } from '../../../../types/core';
import { VisualTrait, ParticleShape, AnimationType, VisualEffectType } from '../../../../types/visual';

/**
 * Basic Core visual trait
 */
export const basicCore: VisualTrait = {
  id: 'visual-core-basic',
  name: 'Basic Core',
  description: 'A simple core particle with a pulsing blue glow.',
  role: Role.CORE,
  tier: Tier.TIER_1,
  rarity: Rarity.COMMON,
  particleAppearance: {
    shape: ParticleShape.SPHERE,
    color: '#0088FF',
    size: 1.0,
    opacity: 0.9,
    emissive: true,
    emissiveColor: '#00AAFF',
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.8
  },
  animation: {
    type: AnimationType.PULSE,
    speed: 1.0,
    amplitude: 0.2,
    frequency: 0.5
  },
  effects: [
    {
      type: VisualEffectType.GLOW,
      intensity: 0.5,
      color: '#00AAFF'
    }
  ]
};

/**
 * Registry of all tier 1 core visual traits
 */
export const tier1CoreVisualTraits: VisualTrait[] = [
  basicCore
];
"@
Set-Content -Path $basicCoreFile -Value $basicCoreContent
Write-Host "Created basicCore.ts file: $basicCoreFile" -ForegroundColor Yellow

Write-Host "`nSample visual trait creation completed!" -ForegroundColor Cyan
