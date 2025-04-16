/**
 * Types index
 *
 * This file exports all types for the Bitcoin Protozoa project.
 */

// Core and common types
export * from './core';  // Base types come first

// Domain-specific types
export * from './bitcoin';
export * from './rng';
export * from './creature';
export * from './gameTheory';

// Trait and related systems
export * from './trait';

// Game systems
export * from './formation';
export * from './events';

// Technical systems
export * from './rendering';
export * from './workers';
