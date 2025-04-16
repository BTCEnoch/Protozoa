# Get all trait files
$traitFiles = Get-ChildItem -Path "src/data/traits" -Filter "*.ts"

foreach ($file in $traitFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace the $1 import with the proper imports
    $newContent = $content -replace "import \{ \$1 \} from '../../types/trait';", "import { BehaviorTrait, ClassBonusTrait, FormationTrait, ForceCalculationTrait, SubclassTrait, VisualTrait } from '../../types/trait';"
    
    # Write the updated content back to the file
    Set-Content -Path $file.FullName -Value $newContent
}

Write-Host "Updated imports in all trait files"
