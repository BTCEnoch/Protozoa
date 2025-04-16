# Create Inventory Types Script
# This script creates the inventory types file

# Project root directory (current directory)
$rootDir = Get-Location

# Create inventory types file
$inventoryTypesFile = "$rootDir\src\inventory\types.ts"
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

Write-Host "`nInventory types creation completed!" -ForegroundColor Cyan
