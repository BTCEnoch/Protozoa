# Create Mutations Inventory Script
# This script creates the mutations inventory structure

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

# Create mutations directory
$mutationsDir = "$rootDir\src\inventory\mutations"
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

# Create mutations subdirectories
$mutationTypes = @("attribute", "particle", "subclass", "ability", "synergy", "formation", "behavior", "exotic")

foreach ($type in $mutationTypes) {
    $typeDir = "$mutationsDir\$type"
    EnsureDirectory $typeDir
    
    $typeIndexFile = "$typeDir\index.ts"
    $typeIndexContent = @"
/**
 * $type Mutations Exports
 */

export * from './common';
export * from './uncommon';
export * from './rare';
export * from './epic';
export * from './legendary';
export * from './mythic';
"@
    Set-Content -Path $typeIndexFile -Value $typeIndexContent
    Write-Host "Created $type mutations index file: $typeIndexFile" -ForegroundColor Yellow
}

Write-Host "`nMutations inventory structure creation completed!" -ForegroundColor Cyan
