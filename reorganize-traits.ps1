# Script to reorganize trait files according to the directory structure

# Define the trait types
$traitTypes = @("Visual", "Formation", "Behavior", "ForceCalculation", "ClassBonus", "Subclass")

# Define the roles
$roles = @("attack", "control", "core", "defense", "movement")

# Move files to their new locations
foreach ($role in $roles) {
    foreach ($traitType in $traitTypes) {
        $oldFileName = "${role}${traitType}Traits.ts"
        $newFileName = "$traitType.ts".ToLower()
        $oldPath = "src/data/traits/$oldFileName"
        $newPath = "src/data/traits/$role/$newFileName"
        
        if (Test-Path $oldPath) {
            Write-Host "Moving $oldPath to $newPath"
            Move-Item -Path $oldPath -Destination $newPath -Force
        } else {
            Write-Host "File not found: $oldPath"
        }
    }
}

Write-Host "File reorganization complete!"
