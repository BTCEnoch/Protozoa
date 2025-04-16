# Count Formations Script
# This script counts the number of formation traits created

# Project root directory (current directory)
$rootDir = Get-Location

# Count formation trait files
$formationFiles = Get-ChildItem -Path "$rootDir\src\inventory\traits\formation" -Recurse -Filter "*Formation.ts" | Where-Object { $_.Name -ne "index.ts" }
$formationCount = $formationFiles.Count

# Count by role
$roles = @("core", "attack", "defense", "control", "movement")
$roleCount = @{}

foreach ($role in $roles) {
    $roleFiles = Get-ChildItem -Path "$rootDir\src\inventory\traits\formation\$role" -Recurse -Filter "*Formation.ts" | Where-Object { $_.Name -ne "index.ts" }
    $roleCount[$role] = $roleFiles.Count
}

# Count by tier
$tiers = @("tier1", "tier2", "tier3", "tier4", "tier5", "tier6")
$tierCount = @{}

foreach ($tier in $tiers) {
    $tierFiles = Get-ChildItem -Path "$rootDir\src\inventory\traits\formation" -Recurse -Filter "*Formation.ts" | Where-Object { $_.FullName -like "*\$tier\*" }
    $tierCount[$tier] = $tierFiles.Count
}

# Display counts
Write-Host "Formation Traits Count:" -ForegroundColor Cyan
Write-Host "Total: $formationCount" -ForegroundColor Yellow

Write-Host "`nBy Role:" -ForegroundColor Cyan
foreach ($role in $roles) {
    Write-Host "$role`: $($roleCount[$role])" -ForegroundColor Yellow
}

Write-Host "`nBy Tier:" -ForegroundColor Cyan
foreach ($tier in $tiers) {
    Write-Host "$tier`: $($tierCount[$tier])" -ForegroundColor Yellow
}

# Calculate how many more formations are needed to reach 75
$remaining = 75 - $formationCount
Write-Host "`nRemaining formations needed to reach 75: $remaining" -ForegroundColor Magenta
