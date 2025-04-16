# Create All Roles Formations Script
# This script creates the formation traits for all roles

# Project root directory (current directory)
$rootDir = Get-Location

# Roles
$roles = @("attack", "defense", "control", "movement")

# Function to create directory if it doesn't exist
function EnsureDirectory {
    param([string]$path)
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "Created directory: $path" -ForegroundColor Green
    }
}

# Function to create role directory structure
function CreateRoleStructure {
    param([string]$role)
    
    # Create role directory
    $roleDir = "$rootDir\src\inventory\traits\formation\$role"
    EnsureDirectory $roleDir
    
    # Create role index.ts
    $roleIndexFile = "$roleDir\index.ts"
    $roleIndexContent = @"
/**
 * $role Formation Traits Exports
 */

export * from './tier1';
export * from './tier2';
export * from './tier3';
export * from './tier4';
export * from './tier5';
export * from './tier6';
"@
    Set-Content -Path $roleIndexFile -Value $roleIndexContent
    Write-Host "Created $role index file: $roleIndexFile" -ForegroundColor Yellow
    
    # Create tier directories
    $tiers = @("tier1", "tier2", "tier3", "tier4", "tier5", "tier6")
    foreach ($tier in $tiers) {
        $tierDir = "$roleDir\$tier"
        EnsureDirectory $tierDir
        
        # Create tier index.ts
        $tierIndexFile = "$tierDir\index.ts"
        $tierIndexContent = @"
/**
 * $tier $role Formation Traits Exports
 */

export * from './circleFormation';
export * from './gridFormation';
export * from './spiralFormation';
export * from './sphereFormation';
export * from './helixFormation';
export * from './clusterFormation';
export * from './swarmFormation';
export * from './treeFormation';
export * from './sierpinskiFormation';
export * from './mandelbrotFormation';
"@
        Set-Content -Path $tierIndexFile -Value $tierIndexContent
        Write-Host "Created $tier index file: $tierIndexFile" -ForegroundColor Yellow
    }
}

# Create structure for each role
foreach ($role in $roles) {
    CreateRoleStructure $role
    Write-Host "Created structure for $role" -ForegroundColor Cyan
}

Write-Host "`nAll roles formation structure creation completed!" -ForegroundColor Cyan
