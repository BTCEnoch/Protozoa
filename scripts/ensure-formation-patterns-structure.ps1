# Ensure Formation Patterns Structure Script
# This script ensures all formation pattern directories have a consistent structure

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

# Formation patterns
$patterns = @(
    "circle",
    "grid",
    "spiral",
    "sphere",
    "helix",
    "cluster",
    "swarm",
    "tree",
    "sierpinski",
    "mandelbrot"
)

# Check each pattern directory
foreach ($pattern in $patterns) {
    $patternDir = "$rootDir\src\services\formations\patterns\$pattern"
    EnsureDirectory $patternDir
    
    # Check if index.ts exists
    $indexFile = "$patternDir\index.ts"
    if (-not (Test-Path $indexFile)) {
        $indexContent = @"
/**
 * $pattern Formation Pattern Exports
 */

export * from './${pattern}Formation';
export * from './${pattern}Generator';
"@
        Set-Content -Path $indexFile -Value $indexContent
        Write-Host "Created index file: $indexFile" -ForegroundColor Yellow
    }
    
    # Check if formation file exists
    $formationFile = "$patternDir\${pattern}Formation.ts"
    if (-not (Test-Path $formationFile)) {
        $formationContent = @"
/**
 * $pattern Formation Pattern
 * 
 * Defines the $pattern formation pattern and its parameters.
 */

import { Role, Tier, Rarity } from '../../../../types/core';
import { FormationPattern, FormationPatternType } from '../../../../types/formation';
import { Vector3 } from '../../../../types/common';

/**
 * $pattern Formation Pattern interface
 * Extends the base FormationPattern with $pattern-specific parameters
 */
export interface ${pattern.Substring(0,1).ToUpper()}${pattern.Substring(1)}FormationPattern extends FormationPattern {
  type: FormationPatternType.$(($pattern).ToUpper());
  parameters: {
    // Add $pattern-specific parameters here
  };
}

/**
 * Create a $pattern formation pattern
 * @param role The role of the formation
 * @param tier The tier of the formation
 * @param rarity The rarity of the formation
 * @returns A $pattern formation pattern
 */
export function create${pattern.Substring(0,1).ToUpper()}${pattern.Substring(1)}Formation(
  role: Role,
  tier: Tier,
  rarity: Rarity
): ${pattern.Substring(0,1).ToUpper()}${pattern.Substring(1)}FormationPattern {
  // TODO: Implement $pattern formation pattern creation
  
  return {
    type: FormationPatternType.$(($pattern).ToUpper()),
    density: 0.5,
    cohesion: 0.5,
    flexibility: 0.5,
    parameters: {
      // Add $pattern-specific parameters here
    }
  };
}

/**
 * $pattern formation patterns for different roles and tiers
 */
export const ${pattern}Formations = {
  // TODO: Implement $pattern formations for different roles and tiers
};
"@
        Set-Content -Path $formationFile -Value $formationContent
        Write-Host "Created formation file: $formationFile" -ForegroundColor Yellow
    }
    
    # Check if generator file exists
    $generatorFile = "$patternDir\${pattern}Generator.ts"
    if (-not (Test-Path $generatorFile)) {
        $generatorContent = @"
/**
 * $pattern Formation Generator
 * 
 * Generates particle positions for $pattern formations.
 */

import { ${pattern.Substring(0,1).ToUpper()}${pattern.Substring(1)}FormationPattern } from './${pattern}Formation';
import { Vector3 } from '../../../../types/common';
import { createSeededRandom } from '../../../utils/random';

/**
 * Generate positions for a $pattern formation
 * @param pattern The $pattern formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generate${pattern.Substring(0,1).ToUpper()}${pattern.Substring(1)}Formation(
  pattern: ${pattern.Substring(0,1).ToUpper()}${pattern.Substring(1)}FormationPattern,
  seed: number
): Vector3[] {
  // TODO: Implement $pattern formation generation
  
  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);
  
  // Generate positions based on pattern parameters
  
  return positions;
}
"@
        Set-Content -Path $generatorFile -Value $generatorContent
        Write-Host "Created generator file: $generatorFile" -ForegroundColor Yellow
    }
}

Write-Host "`nFormation patterns structure check completed!" -ForegroundColor Cyan
