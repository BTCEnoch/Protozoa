# Fix BlockSelector Component Script
# This script fixes the regex in the BlockSelector component

# Project root directory (current directory)
$rootDir = Get-Location

# BlockSelector component file
$componentFile = "$rootDir\src\components\BlockSelector\BlockSelector.tsx"

# Read the file content
$content = Get-Content -Path $componentFile -Raw

# Fix the regex
$fixedContent = $content -replace '(/\^\\\\d\*\$/)', '(/^\d*$/)'

# Write the fixed content back to the file
Set-Content -Path $componentFile -Value $fixedContent

Write-Host "Fixed regex in BlockSelector component" -ForegroundColor Green
