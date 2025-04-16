# Create Traits Inventory Script
# This script creates the traits inventory structure

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

# Create traits directory
$traitsDir = "$rootDir\src\inventory\traits"
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

Write-Host "`nTraits inventory structure creation completed!" -ForegroundColor Cyan
