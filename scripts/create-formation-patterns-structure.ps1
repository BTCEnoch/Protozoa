# Create Formation Patterns Structure Script
# This script creates the correct directory structure for formation patterns

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

# Create patterns directory
$patternsDir = "$rootDir\src\services\formations\patterns"
EnsureDirectory $patternsDir

# Create pattern type directories
$patternTypes = @(
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

foreach ($pattern in $patternTypes) {
    $patternDir = "$patternsDir\$pattern"
    EnsureDirectory $patternDir
    
    # Create pattern index.ts
    $patternIndexFile = "$patternDir\index.ts"
    $patternIndexContent = @"
/**
 * $pattern Formation Pattern Exports
 */

export * from './${pattern}Formation';
export * from './${pattern}Generator';
"@
    Set-Content -Path $patternIndexFile -Value $patternIndexContent
    Write-Host "Created $pattern index file: $patternIndexFile" -ForegroundColor Yellow
}

# Create patterns index.ts
$patternsIndexFile = "$patternsDir\index.ts"
$patternsIndexContent = @"
/**
 * Formation Patterns Exports
 */

"@

foreach ($pattern in $patternTypes) {
    $patternsIndexContent += "export * from './$pattern';" + "`n"
}

Set-Content -Path $patternsIndexFile -Value $patternsIndexContent
Write-Host "Created patterns index file: $patternsIndexFile" -ForegroundColor Yellow

Write-Host "`nFormation patterns structure creation completed!" -ForegroundColor Cyan
