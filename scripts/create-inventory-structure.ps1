# Create Inventory Structure Script
# This script creates the base structure for the inventory

# Project root directory (current directory)
$rootDir = Get-Location

# Function to create directory if it doesn't exist
function EnsureDirectory {
    param([string]$path)
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "Created directory: $path" -ForegroundColor Green
    }
}

# Create inventory directory
$inventoryDir = "$rootDir\src\inventory"
EnsureDirectory $inventoryDir

# Create inventory index.ts
$inventoryIndexFile = "$inventoryDir\index.ts"
$inventoryIndexContent = @"
/**
 * Inventory Exports
 */

export * from './traits';
export * from './formations';
export * from './behaviors';
export * from './mutations';
export * from './particles';
"@
Set-Content -Path $inventoryIndexFile -Value $inventoryIndexContent
Write-Host "Created inventory index file: $inventoryIndexFile" -ForegroundColor Yellow

# Create traits directory
$traitsDir = "$inventoryDir\traits"
EnsureDirectory $traitsDir

# Create traits index.ts
$traitsIndexFile = "$traitsDir\index.ts"
$traitsIndexContent = @"
/**
 * Traits Inventory Exports
 */

export * from './visual';
export * from './formation';
export * from './behavior';
"@
Set-Content -Path $traitsIndexFile -Value $traitsIndexContent
Write-Host "Created traits index file: $traitsIndexFile" -ForegroundColor Yellow

# Create visual traits directory
$visualTraitsDir = "$traitsDir\visual"
EnsureDirectory $visualTraitsDir

# Create visual traits index.ts
$visualTraitsIndexFile = "$visualTraitsDir\index.ts"
$visualTraitsIndexContent = @"
/**
 * Visual Traits Exports
 */

export * from './core';
export * from './attack';
export * from './defense';
export * from './control';
export * from './movement';
"@
Set-Content -Path $visualTraitsIndexFile -Value $visualTraitsIndexContent
Write-Host "Created visual traits index file: $visualTraitsIndexFile" -ForegroundColor Yellow

# Create formation traits directory
$formationTraitsDir = "$traitsDir\formation"
EnsureDirectory $formationTraitsDir

# Create formation traits index.ts
$formationTraitsIndexFile = "$formationTraitsDir\index.ts"
$formationTraitsIndexContent = @"
/**
 * Formation Traits Exports
 */

export * from './core';
export * from './attack';
export * from './defense';
export * from './control';
export * from './movement';
"@
Set-Content -Path $formationTraitsIndexFile -Value $formationTraitsIndexContent
Write-Host "Created formation traits index file: $formationTraitsIndexFile" -ForegroundColor Yellow

# Create behavior traits directory
$behaviorTraitsDir = "$traitsDir\behavior"
EnsureDirectory $behaviorTraitsDir

# Create behavior traits index.ts
$behaviorTraitsIndexFile = "$behaviorTraitsDir\index.ts"
$behaviorTraitsIndexContent = @"
/**
 * Behavior Traits Exports
 */

export * from './core';
export * from './attack';
export * from './defense';
export * from './control';
export * from './movement';
"@
Set-Content -Path $behaviorTraitsIndexFile -Value $behaviorTraitsIndexContent
Write-Host "Created behavior traits index file: $behaviorTraitsIndexFile" -ForegroundColor Yellow

# Create formations directory
$formationsDir = "$inventoryDir\formations"
EnsureDirectory $formationsDir

# Create formations index.ts
$formationsIndexFile = "$formationsDir\index.ts"
$formationsIndexContent = @"
/**
 * Formations Inventory Exports
 */

export * from './patterns';
export * from './parameters';
"@
Set-Content -Path $formationsIndexFile -Value $formationsIndexContent
Write-Host "Created formations index file: $formationsIndexFile" -ForegroundColor Yellow

# Create formations patterns directory
$formationsPatternsDir = "$formationsDir\patterns"
EnsureDirectory $formationsPatternsDir

# Create formations patterns index.ts
$formationsPatternsIndexFile = "$formationsPatternsDir\index.ts"
$formationsPatternsIndexContent = @"
/**
 * Formation Patterns Exports
 */

export * from './geometric';
export * from './organic';
export * from './fractal';
"@
Set-Content -Path $formationsPatternsIndexFile -Value $formationsPatternsIndexContent
Write-Host "Created formation patterns index file: $formationsPatternsIndexFile" -ForegroundColor Yellow

# Create behaviors directory
$behaviorsDir = "$inventoryDir\behaviors"
EnsureDirectory $behaviorsDir

# Create behaviors index.ts
$behaviorsIndexFile = "$behaviorsDir\index.ts"
$behaviorsIndexContent = @"
/**
 * Behaviors Inventory Exports
 */

export * from './patterns';
export * from './parameters';
"@
Set-Content -Path $behaviorsIndexFile -Value $behaviorsIndexContent
Write-Host "Created behaviors index file: $behaviorsIndexFile" -ForegroundColor Yellow

# Create behaviors patterns directory
$behaviorsPatternsDir = "$behaviorsDir\patterns"
EnsureDirectory $behaviorsPatternsDir

# Create behaviors patterns index.ts
$behaviorsPatternsIndexFile = "$behaviorsPatternsDir\index.ts"
$behaviorsPatternsIndexContent = @"
/**
 * Behavior Patterns Exports
 */

export * from './flocking';
export * from './predator';
export * from './prey';
export * from './swarm';
"@
Set-Content -Path $behaviorsPatternsIndexFile -Value $behaviorsPatternsIndexContent
Write-Host "Created behavior patterns index file: $behaviorsPatternsIndexFile" -ForegroundColor Yellow

# Create mutations directory
$mutationsDir = "$inventoryDir\mutations"
EnsureDirectory $mutationsDir

# Create mutations index.ts
$mutationsIndexFile = "$mutationsDir\index.ts"
$mutationsIndexContent = @"
/**
 * Mutations Inventory Exports
 */

export * from './attribute';
export * from './particle';
export * from './subclass';
export * from './ability';
export * from './synergy';
export * from './formation';
export * from './behavior';
export * from './exotic';
"@
Set-Content -Path $mutationsIndexFile -Value $mutationsIndexContent
Write-Host "Created mutations index file: $mutationsIndexFile" -ForegroundColor Yellow

# Create particles directory
$particlesDir = "$inventoryDir\particles"
EnsureDirectory $particlesDir

# Create particles index.ts
$particlesIndexFile = "$particlesDir\index.ts"
$particlesIndexContent = @"
/**
 * Particles Inventory Exports
 */

export * from './core';
export * from './attack';
export * from './defense';
export * from './control';
export * from './movement';
"@
Set-Content -Path $particlesIndexFile -Value $particlesIndexContent
Write-Host "Created particles index file: $particlesIndexFile" -ForegroundColor Yellow

# Create inventory types file
$inventoryTypesFile = "$inventoryDir\types.ts"
$inventoryTypesContent = @"
/**
 * Inventory Types
 * 
 * This file contains the type definitions for the inventory system.
 */

import { Role, Tier, Rarity, TraitCategory, Vector3, Color, FalloffType, ForceType, BehaviorType } from '../types/core';
import { VisualTrait, ParticleAppearance, Animation, VisualEffect } from '../types/visual';

/**
 * Base Trait interface
 * Defines the common properties for all traits
 */
export interface BaseTrait {
  id: string;
  name: string;
  description: string;
  role: Role;
  tier: Tier;
  rarity: Rarity;
  category: TraitCategory;
  subclass?: string;
}

/**
 * Formation Trait interface
 * Defines a formation trait for particles
 */
export interface FormationTrait extends BaseTrait {
  category: TraitCategory.FORMATION;
  pattern: FormationPattern;
  parameters: FormationParameters;
}

/**
 * Formation Pattern enum
 * Defines the different patterns for formations
 */
export enum FormationPattern {
  GRID = 'GRID',
  CIRCLE = 'CIRCLE',
  SPHERE = 'SPHERE',
  SPIRAL = 'SPIRAL',
  HELIX = 'HELIX',
  CLUSTER = 'CLUSTER',
  RANDOM = 'RANDOM',
  CUSTOM = 'CUSTOM'
}

/**
 * Formation Parameters interface
 * Defines the parameters for a formation
 */
export interface FormationParameters {
  spacing: number;
  offset: Vector3;
  rotation: Vector3;
  scale: Vector3;
  jitter: number;
  seed: number;
  customFunction?: string;
}

/**
 * Behavior Trait interface
 * Defines a behavior trait for particles
 */
export interface BehaviorTrait extends BaseTrait {
  category: TraitCategory.BEHAVIOR;
  behaviorType: BehaviorType;
  parameters: BehaviorParameters;
}

/**
 * Behavior Parameters interface
 * Defines the parameters for a behavior
 */
export interface BehaviorParameters {
  forces: Force[];
  maxSpeed: number;
  maxForce: number;
  perception: number;
  separationWeight: number;
  alignmentWeight: number;
  cohesionWeight: number;
  seed: number;
}

/**
 * Force interface
 * Defines a force for a behavior
 */
export interface Force {
  type: ForceType;
  strength: number;
  falloff: FalloffType;
  range: number;
  target?: Vector3;
  affectedRoles: Role[];
}

/**
 * Particle interface
 * Defines a particle
 */
export interface Particle {
  id: string;
  role: Role;
  position: Vector3;
  velocity: Vector3;
  acceleration: Vector3;
  mass: number;
  groupId: string;
  visualTrait?: VisualTrait;
  formationTrait?: FormationTrait;
  behaviorTrait?: BehaviorTrait;
}

/**
 * Mutation interface
 * Defines a mutation
 */
export interface Mutation {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  category: string;
  confirmationThreshold: number;
  probability: number;
  apply: (creature: any) => void;
}

/**
 * Creature interface
 * Defines a creature
 */
export interface Creature {
  id: string;
  name: string;
  blockHeight: number;
  blockHash: string;
  particles: Particle[];
  traits: BaseTrait[];
  mutations: Mutation[];
  evolutionHistory: any[];
}
"@
Set-Content -Path $inventoryTypesFile -Value $inventoryTypesContent
Write-Host "Created inventory types file: $inventoryTypesFile" -ForegroundColor Yellow

Write-Host "`nInventory structure creation completed!" -ForegroundColor Cyan
