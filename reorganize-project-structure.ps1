# Reorganize Project Structure Script
# This script reorganizes the project structure according to the desired directory structure

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

# Function to move directory if it exists
function MoveDirectory {
    param(
        [string]$sourcePath,
        [string]$destinationPath
    )
    if (Test-Path $sourcePath) {
        # Create the destination directory if it doesn't exist
        $destinationDir = Split-Path -Parent $destinationPath
        if (-not (Test-Path $destinationDir)) {
            New-Item -ItemType Directory -Path $destinationDir -Force | Out-Null
        }
        
        # Check if the destination already exists
        if (Test-Path $destinationPath) {
            Write-Host "Destination already exists: $destinationPath" -ForegroundColor Yellow
            # Copy files from source to destination
            Get-ChildItem -Path $sourcePath -Recurse | ForEach-Object {
                $targetPath = $_.FullName.Replace($sourcePath, $destinationPath)
                if (-not (Test-Path $targetPath)) {
                    if ($_.PSIsContainer) {
                        New-Item -ItemType Directory -Path $targetPath -Force | Out-Null
                    } else {
                        Copy-Item -Path $_.FullName -Destination $targetPath -Force
                    }
                }
            }
        } else {
            # Move the directory
            Move-Item -Path $sourcePath -Destination $destinationPath
            Write-Host "Moved directory: $sourcePath -> $destinationPath" -ForegroundColor Cyan
        }
    } else {
        Write-Host "Source directory does not exist: $sourcePath" -ForegroundColor Yellow
    }
}

# Step 1: Move directories to their correct locations

# Move src/demo to examples/
Write-Host "Moving src/demo to examples/" -ForegroundColor Magenta
MoveDirectory "$rootDir\src\demo" "$rootDir\examples"

# Move src/scripts to scripts/
Write-Host "Moving src/scripts to scripts/" -ForegroundColor Magenta
MoveDirectory "$rootDir\src\scripts" "$rootDir\scripts\tests"

# Move src/tests to tests/
Write-Host "Moving src/tests to tests/unit/lib/" -ForegroundColor Magenta
MoveDirectory "$rootDir\src\tests" "$rootDir\tests\unit\lib"

# Step 2: Create missing directories

# Root level directories
$rootDirectories = @(
    "assets",
    "config",
    "public",
    "scripts",
    "tests",
    "dist",
    ".github",
    ".vscode"
)

# Source directories
$srcDirectories = @(
    "src/models",
    "src/components",
    "src/contexts",
    "src/pages",
    "src/styles",
    "src/constants"
)

# Worker directories
$workerDirectories = @(
    "src/workers/evolution",
    "src/workers/gameTheory",
    "src/workers/formation",
    "src/workers/analytics",
    "src/workers/optimization"
)

# Config directories
$configDirectories = @(
    "config/webpack",
    "config/jest",
    "config/eslint",
    "config/typescript",
    "config/app",
    "config/env"
)

# Test directories
$testDirectories = @(
    "tests/unit/models",
    "tests/unit/services",
    "tests/unit/lib",
    "tests/unit/workers",
    "tests/unit/utils",
    "tests/unit/components",
    "tests/unit/hooks",
    "tests/unit/contexts",
    "tests/unit/constants",
    "tests/integration",
    "tests/integration/api",
    "tests/integration/services",
    "tests/integration/bitcoin",
    "tests/integration/evolution",
    "tests/integration/rendering",
    "tests/integration/workers",
    "tests/e2e",
    "tests/e2e/viewer",
    "tests/e2e/generation",
    "tests/e2e/evolution",
    "tests/performance",
    "tests/performance/rendering",
    "tests/performance/workers",
    "tests/performance/compute",
    "tests/performance/memory",
    "tests/mocks",
    "tests/fixtures",
    "tests/fixtures/blockData",
    "tests/fixtures/creatures",
    "tests/fixtures/traits",
    "tests/helpers"
)

# Asset directories
$assetDirectories = @(
    "assets/images",
    "assets/images/icons",
    "assets/images/backgrounds",
    "assets/images/particles",
    "assets/images/ui",
    "assets/sounds",
    "assets/sounds/effects",
    "assets/sounds/music",
    "assets/sounds/ambient",
    "assets/shaders",
    "assets/shaders/particle",
    "assets/shaders/particle/vertex",
    "assets/shaders/particle/fragment",
    "assets/shaders/particle/compute",
    "assets/shaders/post",
    "assets/shaders/effects",
    "assets/shaders/instanced",
    "assets/shaders/lod",
    "assets/models",
    "assets/models/particles",
    "assets/models/environments",
    "assets/fonts",
    "assets/fonts/display",
    "assets/fonts/text",
    "assets/textures",
    "assets/textures/particles",
    "assets/textures/backgrounds",
    "assets/textures/effects",
    "assets/animations",
    "assets/animations/particles",
    "assets/animations/ui",
    "assets/animations/effects"
)

# Public directories
$publicDirectories = @(
    "public/images",
    "public/images/icons",
    "public/static",
    "public/static/js",
    "public/static/css",
    "public/locales",
    "public/locales/en",
    "public/locales/es"
)

# Script directories
$scriptDirectories = @(
    "scripts/build",
    "scripts/deploy",
    "scripts/test",
    "scripts/data",
    "scripts/utils",
    "scripts/phase1",
    "scripts/phase1/generate",
    "scripts/phase1/setup",
    "scripts/phase2",
    "scripts/phase2/generate",
    "scripts/phase2/setup",
    "scripts/phase3",
    "scripts/phase3/generate",
    "scripts/phase3/setup",
    "scripts/phase4",
    "scripts/phase4/generate",
    "scripts/phase4/setup"
)

# Create all directories
Write-Host "Creating root directories..." -ForegroundColor Magenta
foreach ($dir in $rootDirectories) {
    EnsureDirectory "$rootDir\$dir"
}

Write-Host "Creating source directories..." -ForegroundColor Magenta
foreach ($dir in $srcDirectories) {
    EnsureDirectory "$rootDir\$dir"
}

Write-Host "Creating worker directories..." -ForegroundColor Magenta
foreach ($dir in $workerDirectories) {
    EnsureDirectory "$rootDir\$dir"
}

Write-Host "Creating config directories..." -ForegroundColor Magenta
foreach ($dir in $configDirectories) {
    EnsureDirectory "$rootDir\$dir"
}

Write-Host "Creating test directories..." -ForegroundColor Magenta
foreach ($dir in $testDirectories) {
    EnsureDirectory "$rootDir\$dir"
}

Write-Host "Creating asset directories..." -ForegroundColor Magenta
foreach ($dir in $assetDirectories) {
    EnsureDirectory "$rootDir\$dir"
}

Write-Host "Creating public directories..." -ForegroundColor Magenta
foreach ($dir in $publicDirectories) {
    EnsureDirectory "$rootDir\$dir"
}

Write-Host "Creating script directories..." -ForegroundColor Magenta
foreach ($dir in $scriptDirectories) {
    EnsureDirectory "$rootDir\$dir"
}

# Create basic configuration files
$configFiles = @{
    "config/default.json" = "{`n  `"app`": {`n    `"name`": `"protozoa`"`n  }`n}"
    "public/index.html" = "<!DOCTYPE html>`n<html>`n<head>`n  <meta charset=`"UTF-8`">`n  <title>Bitcoin Protozoa</title>`n</head>`n<body>`n  <div id=`"root`"></div>`n</body>`n</html>"
    "public/manifest.json" = "{`n  `"short_name`": `"Protozoa`",`n  `"name`": `"Bitcoin Protozoa`",`n  `"icons`": [],`n  `"start_url`": `".`",`n  `"display`": `"standalone`",`n  `"theme_color`": `"#000000`",`n  `"background_color`": `"#ffffff`"`n}"
    ".vscode/settings.json" = "{`n  `"editor.formatOnSave`": true,`n  `"editor.defaultFormatter`": `"esbenp.prettier-vscode`",`n  `"editor.tabSize`": 2`n}"
}

foreach ($file in $configFiles.GetEnumerator()) {
    $filePath = "$rootDir\$($file.Key)"
    if (-not (Test-Path $filePath)) {
        $fileDir = Split-Path -Parent $filePath
        if (-not (Test-Path $fileDir)) {
            New-Item -ItemType Directory -Path $fileDir -Force | Out-Null
        }
        Set-Content -Path $filePath -Value $file.Value
        Write-Host "Created file: $filePath" -ForegroundColor Yellow
    }
}

Write-Host "`nProject structure reorganization completed!" -ForegroundColor Cyan
Write-Host "The project structure has been reorganized according to the desired directory structure." -ForegroundColor Cyan
