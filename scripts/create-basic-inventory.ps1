# Create Basic Inventory Structure Script
# This script creates the basic structure for the inventory

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

# Create inventory directory
$inventoryDir = "$rootDir\src\inventory"
EnsureDirectory $inventoryDir

# Create inventory index.ts
$inventoryIndexFile = "$inventoryDir\index.ts"
$inventoryIndexContent = @"
/**
 * Inventory Exports
 */

export * from './traits';
export * from './formations';
export * from './behaviors';
export * from './mutations';
export * from './particles';
"@
Set-Content -Path $inventoryIndexFile -Value $inventoryIndexContent
Write-Host "Created inventory index file: $inventoryIndexFile" -ForegroundColor Yellow

# Create main subdirectories
$traitsDir = "$inventoryDir\traits"
EnsureDirectory $traitsDir

$formationsDir = "$inventoryDir\formations"
EnsureDirectory $formationsDir

$behaviorsDir = "$inventoryDir\behaviors"
EnsureDirectory $behaviorsDir

$mutationsDir = "$inventoryDir\mutations"
EnsureDirectory $mutationsDir

$particlesDir = "$inventoryDir\particles"
EnsureDirectory $particlesDir

Write-Host "`nBasic inventory structure creation completed!" -ForegroundColor Cyan
