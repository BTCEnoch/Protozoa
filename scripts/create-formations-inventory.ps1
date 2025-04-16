# Create Formations Inventory Script
# This script creates the formations inventory structure

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

# Create formations directory
$formationsDir = "$rootDir\src\inventory\formations"
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

# Create formations parameters directory
$formationsParametersDir = "$formationsDir\parameters"
EnsureDirectory $formationsParametersDir

# Create formations parameters index.ts
$formationsParametersIndexFile = "$formationsParametersDir\index.ts"
$formationsParametersIndexContent = @"
/**
 * Formation Parameters Exports
 */

export * from './spacing';
export * from './rotation';
export * from './scale';
"@
Set-Content -Path $formationsParametersIndexFile -Value $formationsParametersIndexContent
Write-Host "Created formation parameters index file: $formationsParametersIndexFile" -ForegroundColor Yellow

Write-Host "`nFormations inventory structure creation completed!" -ForegroundColor Cyan
