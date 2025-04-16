# Create Particles Inventory Script
# This script creates the particles inventory structure

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

# Create particles directory
$particlesDir = "$rootDir\src\inventory\particles"
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

# Create particles role directories
$particleRoles = @("core", "attack", "defense", "control", "movement")

foreach ($role in $particleRoles) {
    $roleDir = "$particlesDir\$role"
    EnsureDirectory $roleDir
    
    $roleIndexFile = "$roleDir\index.ts"
    $roleIndexContent = @"
/**
 * $role Particles Exports
 */

export * from './tier1';
export * from './tier2';
export * from './tier3';
export * from './tier4';
export * from './tier5';
export * from './tier6';
"@
    Set-Content -Path $roleIndexFile -Value $roleIndexContent
    Write-Host "Created $role particles index file: $roleIndexFile" -ForegroundColor Yellow
}

Write-Host "`nParticles inventory structure creation completed!" -ForegroundColor Cyan
