# Create All Inventory Script
# This script runs all the inventory creation scripts

# Project root directory (current directory)
$rootDir = Get-Location

Write-Host "Starting inventory creation process..." -ForegroundColor Cyan
Write-Host "This script will create the complete inventory structure for the Bitcoin Protozoa project." -ForegroundColor Cyan
Write-Host "Press any key to continue or Ctrl+C to cancel..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Run each inventory creation script
Write-Host "`nStep 1: Creating basic inventory structure..." -ForegroundColor Magenta
& "$rootDir\scripts\create-basic-inventory.ps1"

Write-Host "`nStep 2: Creating traits inventory..." -ForegroundColor Magenta
& "$rootDir\scripts\create-traits-inventory.ps1"

Write-Host "`nStep 3: Creating formations inventory..." -ForegroundColor Magenta
& "$rootDir\scripts\create-formations-inventory.ps1"

Write-Host "`nStep 4: Creating behaviors inventory..." -ForegroundColor Magenta
& "$rootDir\scripts\create-behaviors-inventory.ps1"

Write-Host "`nStep 5: Creating mutations inventory..." -ForegroundColor Magenta
& "$rootDir\scripts\create-mutations-inventory.ps1"

Write-Host "`nStep 6: Creating particles inventory..." -ForegroundColor Magenta
& "$rootDir\scripts\create-particles-inventory.ps1"

Write-Host "`nStep 7: Creating inventory types..." -ForegroundColor Magenta
& "$rootDir\scripts\create-inventory-types.ps1"

Write-Host "`nInventory creation completed!" -ForegroundColor Cyan
Write-Host "The following inventory structures have been created:" -ForegroundColor Cyan
Write-Host "- Basic inventory structure" -ForegroundColor Cyan
Write-Host "- Traits inventory" -ForegroundColor Cyan
Write-Host "- Formations inventory" -ForegroundColor Cyan
Write-Host "- Behaviors inventory" -ForegroundColor Cyan
Write-Host "- Mutations inventory" -ForegroundColor Cyan
Write-Host "- Particles inventory" -ForegroundColor Cyan
Write-Host "- Inventory types" -ForegroundColor Cyan
