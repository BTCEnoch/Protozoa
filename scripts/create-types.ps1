# Create Types Script
# This script creates placeholder files for the missing types

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

# Create types directory
$typesDir = "$rootDir\src\types"
EnsureDirectory $typesDir

# Create core.ts
$coreFile = "$typesDir\core.ts"
$coreContent = @"
/**
 * Core Types for Bitcoin Protozoa
 * 
 * This file contains the core enums, interfaces, and types used throughout the application.
 */

/**
 * Role enum
 * Defines the different roles that particles can have
 */
export enum Role {
  CORE = 'CORE',
  CONTROL = 'CONTROL',
  MOVEMENT = 'MOVEMENT',
  DEFENSE = 'DEFENSE',
  ATTACK = 'ATTACK'
}

/**
 * Rarity enum
 * Defines the different rarity levels for traits and abilities
 */
export enum Rarity {
  COMMON = 'COMMON',
  UNCOMMON = 'UNCOMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
  MYTHIC = 'MYTHIC'
}

/**
 * Tier enum
 * Defines the different tier levels for traits and abilities
 */
export enum Tier {
  TIER_1 = 'TIER_1',
  TIER_2 = 'TIER_2',
  TIER_3 = 'TIER_3',
  TIER_4 = 'TIER_4',
  TIER_5 = 'TIER_5',
  TIER_6 = 'TIER_6'
}

/**
 * AttributeType enum
 * Defines the different attribute types for particles
 */
export enum AttributeType {
  STRENGTH = 'STRENGTH',
  AGILITY = 'AGILITY',
  INTELLIGENCE = 'INTELLIGENCE',
  VITALITY = 'VITALITY',
  RESILIENCE = 'RESILIENCE'
}

/**
 * TraitCategory enum
 * Defines the different categories for traits
 */
export enum TraitCategory {
  VISUAL = 'VISUAL',
  FORMATION = 'FORMATION',
  BEHAVIOR = 'BEHAVIOR',
  FORCE_CALCULATION = 'FORCE_CALCULATION',
  CLASS_BONUS = 'CLASS_BONUS',
  SUBCLASS = 'SUBCLASS'
}

/**
 * MutationCategory enum
 * Defines the different categories for mutations
 */
export enum MutationCategory {
  ATTRIBUTE = 'ATTRIBUTE',
  PARTICLE = 'PARTICLE',
  SUBCLASS = 'SUBCLASS',
  ABILITY = 'ABILITY',
  SYNERGY = 'SYNERGY',
  FORMATION = 'FORMATION',
  BEHAVIOR = 'BEHAVIOR',
  EXOTIC = 'EXOTIC'
}

/**
 * Vector3 interface
 * Defines a 3D vector
 */
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * Color interface
 * Defines a color
 */
export interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

/**
 * FalloffType enum
 * Defines the different types of falloff for forces
 */
export enum FalloffType {
  LINEAR = 'LINEAR',
  QUADRATIC = 'QUADRATIC',
  EXPONENTIAL = 'EXPONENTIAL',
  NONE = 'NONE'
}

/**
 * ForceType enum
 * Defines the different types of forces
 */
export enum ForceType {
  ATTRACTION = 'ATTRACTION',
  REPULSION = 'REPULSION',
  ALIGNMENT = 'ALIGNMENT',
  COHESION = 'COHESION',
  SEPARATION = 'SEPARATION'
}

/**
 * BehaviorType enum
 * Defines the different types of behaviors
 */
export enum BehaviorType {
  FLOCKING = 'FLOCKING',
  PATTERN = 'PATTERN',
  PREDATOR = 'PREDATOR',
  PREY = 'PREY',
  SWARM = 'SWARM'
}
"@
Set-Content -Path $coreFile -Value $coreContent
Write-Host "Created core types: $coreFile" -ForegroundColor Yellow

# Create bitcoin.ts
$bitcoinFile = "$typesDir\bitcoin.ts"
$bitcoinContent = @"
/**
 * Bitcoin Types for Bitcoin Protozoa
 * 
 * This file contains the types related to Bitcoin block data.
 */

/**
 * BlockData interface
 * Defines the data structure for Bitcoin block data
 */
export interface BlockData {
  height: number;
  nonce: string;
  confirmations: number;
  hash: string;
  timestamp: number;
}

/**
 * BlockInfo interface
 * Defines the data structure for Bitcoin block info
 */
export interface BlockInfo {
  height: number;
  hash: string;
  confirmations: number;
  timestamp: number;
  nonce: string;
  difficulty: number;
  merkleRoot: string;
  version: number;
  bits: string;
  size: number;
  weight: number;
  transactions: number;
}
"@
Set-Content -Path $bitcoinFile -Value $bitcoinContent
Write-Host "Created bitcoin types: $bitcoinFile" -ForegroundColor Yellow

# Create visual.ts
$visualFile = "$typesDir\visual.ts"
$visualContent = @"
/**
 * Visual Types for Bitcoin Protozoa
 *
 * This file contains the type definitions for the visual system.
 * It builds on the core types and defines the structure of visual traits,
 * particle appearances, and visual effects.
 */

import { Role, Tier, Rarity, Vector3 } from './core';

/**
 * Visual Trait interface
 * Defines the visual appearance of particles
 */
export interface VisualTrait {
  id: string;
  name: string;
  description: string;
  role: Role;
  tier: Tier;
  rarity?: Rarity;
  subclass?: string;
  particleAppearance: ParticleAppearance;
  animation: Animation;
  effects: VisualEffect[];
}

/**
 * Particle Appearance interface
 * Defines the visual properties of a particle
 */
export interface ParticleAppearance {
  shape: ParticleShape;
  color: string;
  size: number;
  opacity: number;
  emissive: boolean;
  emissiveColor?: string;
  emissiveIntensity?: number;
  texture?: string;
  wireframe?: boolean;
  roughness?: number;
  metalness?: number;
}

/**
 * Particle Shape enum
 * Defines the different shapes for particles
 */
export enum ParticleShape {
  SPHERE = 'SPHERE',
  CUBE = 'CUBE',
  CONE = 'CONE',
  CYLINDER = 'CYLINDER',
  TORUS = 'TORUS',
  ICOSAHEDRON = 'ICOSAHEDRON',
  CUSTOM = 'CUSTOM'
}

/**
 * Animation interface
 * Defines an animation for a particle
 */
export interface Animation {
  type: AnimationType;
  speed: number;
  amplitude?: number;
  frequency?: number;
  direction?: Vector3;
  loop?: boolean;
  easing?: string;
  parameters?: Record<string, any>;
}

/**
 * Animation Type enum
 * Defines the different types of animations
 */
export enum AnimationType {
  PULSE = 'PULSE',
  ROTATE = 'ROTATE',
  OSCILLATE = 'OSCILLATE',
  ORBIT = 'ORBIT',
  TRAIL = 'TRAIL',
  NONE = 'NONE'
}

/**
 * Visual Effect interface
 * Defines a visual effect for a particle
 */
export interface VisualEffect {
  type: VisualEffectType;
  intensity: number;
  color?: string;
  duration?: number;
  trigger?: VisualEffectTrigger;
  parameters?: Record<string, any>;
}

/**
 * Visual Effect Type enum
 * Defines the different types of visual effects
 */
export enum VisualEffectType {
  GLOW = 'GLOW',
  TRAIL = 'TRAIL',
  PARTICLES = 'PARTICLES',
  SHOCKWAVE = 'SHOCKWAVE',
  LIGHTNING = 'LIGHTNING',
  NONE = 'NONE'
}

/**
 * Visual Effect Trigger enum
 * Defines the different triggers for visual effects
 */
export enum VisualEffectTrigger {
  ALWAYS = 'ALWAYS',
  ON_COLLISION = 'ON_COLLISION',
  ON_ABILITY = 'ON_ABILITY',
  ON_MUTATION = 'ON_MUTATION',
  ON_EVOLUTION = 'ON_EVOLUTION',
  NONE = 'NONE'
}

/**
 * Visual Registry interface
 * Registry of visual traits organized by role and tier
 */
export interface VisualRegistry {
  [role: string]: {
    [tier: string]: VisualTrait[];
  };
}
"@
Set-Content -Path $visualFile -Value $visualContent
Write-Host "Created visual types: $visualFile" -ForegroundColor Yellow

Write-Host "`nTypes creation completed!" -ForegroundColor Cyan
