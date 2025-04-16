# Script to fix import paths in trait files

# Define the roles
$roles = @("attack", "control", "core", "defense", "movement")

# Fix import paths in all trait files
foreach ($role in $roles) {
    $traitFiles = Get-ChildItem -Path "src/data/traits/$role" -File
    
    foreach ($file in $traitFiles) {
        $content = Get-Content -Path $file.FullName -Raw
        
        # Update import paths
        $content = $content -replace "from '../../types/", "from '../../../types/"
        $content = $content -replace "from '../../ability_reference'", "from '../../../ability_reference'"
        
        # Write the updated content back to the file
        Set-Content -Path $file.FullName -Value $content
    }
}

Write-Host "Import paths fixed!"
