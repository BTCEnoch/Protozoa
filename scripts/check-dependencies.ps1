# Check Dependencies Script
# This script checks for missing dependencies and ensures all imports are properly pathed

# Project root directory (current directory)
$rootDir = Get-Location

# Function to check imports in a file
function CheckImports {
    param([string]$filePath)
    
    Write-Host "Checking imports in $filePath..." -ForegroundColor Yellow
    
    # Read the file content
    $content = Get-Content -Path $filePath -Raw
    
    # Extract import statements
    $importRegex = 'import\s+(?:{[^}]*}|\*\s+as\s+[^;]+|[^;]+)\s+from\s+[''"]([^''"]+)[''"];?'
    $imports = [regex]::Matches($content, $importRegex) | ForEach-Object { $_.Groups[1].Value }
    
    # Check each import
    foreach ($import in $imports) {
        # Skip external dependencies
        if ($import -match '^(react|@mui|three)') {
            continue
        }
        
        # Convert relative path to absolute path
        $importPath = $import
        if ($import.StartsWith('.')) {
            $importPath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine([System.IO.Path]::GetDirectoryName($filePath), $import))
            $importPath = $importPath.Replace($rootDir.Path, '').TrimStart('\')
        }
        
        # Add file extension if not present
        if (-not $importPath.Contains('.')) {
            $importPath = "$importPath.ts"
        }
        
        # Check if the file exists
        $fullPath = Join-Path -Path $rootDir -ChildPath $importPath
        if (-not (Test-Path $fullPath)) {
            # Try with .tsx extension
            $fullPath = $fullPath -replace '\.ts$', '.tsx'
            if (-not (Test-Path $fullPath)) {
                # Try with /index.ts
                $fullPath = $fullPath -replace '\.tsx$', '/index.ts'
                if (-not (Test-Path $fullPath)) {
                    # Try with /index.tsx
                    $fullPath = $fullPath -replace '\.ts$', '.tsx'
                    if (-not (Test-Path $fullPath)) {
                        Write-Host "  Missing dependency: $import" -ForegroundColor Red
                    }
                }
            }
        }
    }
    
    Write-Host "Done checking imports in $filePath" -ForegroundColor Green
}

# Check all component files
$componentFiles = Get-ChildItem -Path "$rootDir\src\components" -Recurse -Include "*.tsx", "*.ts" | Where-Object { $_.Name -ne "index.ts" }
foreach ($file in $componentFiles) {
    CheckImports $file.FullName
}

Write-Host "`nDependency check completed!" -ForegroundColor Cyan
