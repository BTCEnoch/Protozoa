# Master Reorganization Script
# This script runs all the individual reorganization scripts in sequence

# Project root directory (current directory)
$rootDir = Get-Location

Write-Host "Starting project reorganization..." -ForegroundColor Cyan
Write-Host "This script will reorganize the project structure according to the desired directory structure." -ForegroundColor Cyan
Write-Host "Press any key to continue or Ctrl+C to cancel..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Run each script in sequence
Write-Host "`nStep 1: Moving directories..." -ForegroundColor Magenta
& "$rootDir\1-move-directories.ps1"

Write-Host "`nStep 2: Creating root directories..." -ForegroundColor Magenta
& "$rootDir\2-create-root-directories.ps1"

Write-Host "`nStep 3: Creating source directories..." -ForegroundColor Magenta
& "$rootDir\3-create-src-directories.ps1"

Write-Host "`nStep 4: Creating config directories..." -ForegroundColor Magenta
& "$rootDir\4-create-config-directories.ps1"

Write-Host "`nStep 5: Creating test directories..." -ForegroundColor Magenta
& "$rootDir\5-create-test-directories.ps1"

Write-Host "`nStep 6: Creating asset directories..." -ForegroundColor Magenta
& "$rootDir\6-create-asset-directories.ps1"

Write-Host "`nStep 7: Creating public directories..." -ForegroundColor Magenta
& "$rootDir\7-create-public-directories.ps1"

Write-Host "`nStep 8: Creating script directories..." -ForegroundColor Magenta
& "$rootDir\8-create-script-directories.ps1"

Write-Host "`nProject reorganization completed!" -ForegroundColor Cyan
Write-Host "The project structure has been reorganized according to the desired directory structure." -ForegroundColor Cyan
Write-Host "You can now delete the individual reorganization scripts (1-8-*.ps1) if you wish." -ForegroundColor Yellow
