# Create Formation Traits Structure Script
# This script creates the directory structure for all formation traits

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

# Roles and tiers
$roles = @("core", "attack", "defense", "control", "movement")
$tiers = @("tier1", "tier2", "tier3", "tier4", "tier5", "tier6")

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

# Create directories for each role
foreach ($role in $roles) {
    $roleDir = "$rootDir\src\inventory\traits\formation\$role"
    EnsureDirectory $roleDir
    
    # Create role index.ts
    $roleIndexFile = "$roleDir\index.ts"
    $roleIndexContent = @"
/**
 * $role Formation Traits Exports
 */

"@
    
    foreach ($tier in $tiers) {
        $roleIndexContent += "export * from './$tier';" + "`n"
    }
    
    Set-Content -Path $roleIndexFile -Value $roleIndexContent
    Write-Host "Created $role index file: $roleIndexFile" -ForegroundColor Yellow
    
    # Create tier directories
    foreach ($tier in $tiers) {
        $tierDir = "$roleDir\$tier"
        EnsureDirectory $tierDir
        
        # Create tier index.ts
        $tierIndexFile = "$tierDir\index.ts"
        $tierIndexContent = @"
/**
 * $tier $role Formation Traits Exports
 */

"@
        
        foreach ($pattern in $patterns) {
            $tierIndexContent += "export * from './${pattern}Formation';" + "`n"
        }
        
        Set-Content -Path $tierIndexFile -Value $tierIndexContent
        Write-Host "Created $tier index file: $tierIndexFile" -ForegroundColor Yellow
    }
}

Write-Host "`nFormation traits structure creation completed!" -ForegroundColor Cyan
