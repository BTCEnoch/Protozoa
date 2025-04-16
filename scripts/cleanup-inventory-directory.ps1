# Cleanup Inventory Directory Script
# This script removes the inventory directory after moving formations to the correct location

# Project root directory (current directory)
$rootDir = Get-Location

# Check if inventory directory exists
$inventoryDir = "$rootDir\src\inventory"
if (Test-Path $inventoryDir) {
    Write-Host "Removing inventory directory: $inventoryDir" -ForegroundColor Yellow
    Remove-Item -Path $inventoryDir -Recurse -Force
    Write-Host "Inventory directory removed successfully!" -ForegroundColor Green
} else {
    Write-Host "Inventory directory does not exist: $inventoryDir" -ForegroundColor Red
}

Write-Host "`nCleanup completed!" -ForegroundColor Cyan
