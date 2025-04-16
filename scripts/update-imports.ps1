# PowerShell script to update import paths after reorganizing types

# Define the mapping of old imports to new imports
$importMappings = @{
    "../types/ability" = "../types/abilities/ability"
    "../types/ability_reference" = "../types/abilities/reference"
    "../types/abilityType" = "../types/abilities/types"
    "../types/behavior" = "../types/behaviors/behavior"
    "../types/bitcoin" = "../types/bitcoin/bitcoin"
    "../types/creature" = "../types/creatures/creature"
    "../types/events" = "../types/events/events"
    "../types/formation" = "../types/formations/formation"
    "../types/mutation" = "../types/mutations/mutation"
    "../types/particle" = "../types/particles/particle"
    "../types/rng" = "../types/utils/rng"
    "../types/trait" = "../types/traits/trait"
    "../types/visual" = "../types/visuals/visual"
    "../types/animation" = "../types/rendering/animation"
}

# Get all TypeScript files
$files = Get-ChildItem -Path . -Filter "*.ts" -Recurse

# Process each file
foreach ($file in $files) {
    Write-Host "Processing $($file.FullName)"
    $content = Get-Content -Path $file.FullName -Raw
    $modified = $false
    
    # Apply each mapping
    foreach ($oldImport in $importMappings.Keys) {
        $newImport = $importMappings[$oldImport]
        if ($content -match [regex]::Escape($oldImport)) {
            $content = $content -replace [regex]::Escape($oldImport), $newImport
            $modified = $true
        }
    }
    
    # Save the file if modified
    if ($modified) {
        Write-Host "  Updated imports in $($file.FullName)"
        Set-Content -Path $file.FullName -Value $content
    }
}

Write-Host "Import path updates complete!" 