# Create Behaviors Inventory Script
# This script creates the behaviors inventory structure

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

# Create behaviors directory
$behaviorsDir = "$rootDir\src\inventory\behaviors"
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

# Create behaviors parameters directory
$behaviorsParametersDir = "$behaviorsDir\parameters"
EnsureDirectory $behaviorsParametersDir

# Create behaviors parameters index.ts
$behaviorsParametersIndexFile = "$behaviorsParametersDir\index.ts"
$behaviorsParametersIndexContent = @"
/**
 * Behavior Parameters Exports
 */

export * from './forces';
export * from './speeds';
export * from './weights';
"@
Set-Content -Path $behaviorsParametersIndexFile -Value $behaviorsParametersIndexContent
Write-Host "Created behavior parameters index file: $behaviorsParametersIndexFile" -ForegroundColor Yellow

Write-Host "`nBehaviors inventory structure creation completed!" -ForegroundColor Cyan
