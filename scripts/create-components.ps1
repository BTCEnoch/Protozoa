# Create Components Script
# This script creates the React component structure for the Bitcoin Protozoa project

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

# Function to create a component
function CreateComponent {
    param(
        [string]$componentName,
        [string]$description,
        [string]$props = ""
    )
    
    # Create component directory
    $componentDir = "$rootDir\src\components\$componentName"
    EnsureDirectory $componentDir
    
    # Create component file
    $componentFile = "$componentDir\$componentName.tsx"
    $componentContent = @"
/**
 * $componentName Component
 * 
 * $description
 */

import React from 'react';
import { styled } from '@mui/material/styles';
$props

/**
 * $componentName component
 */
const $componentName: React.FC<${componentName}Props> = (props) => {
  return (
    <StyledContainer>
      <h2>$componentName</h2>
      {/* Component implementation */}
    </StyledContainer>
  );
};

// Styled components
const StyledContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

export default $componentName;
"@
    Set-Content -Path $componentFile -Value $componentContent
    Write-Host "Created component file: $componentFile" -ForegroundColor Yellow
    
    # Create index.ts file
    $indexFile = "$componentDir\index.ts"
    $indexContent = @"
/**
 * $componentName Component Exports
 */

export { default } from './$componentName';
"@
    Set-Content -Path $indexFile -Value $indexContent
    Write-Host "Created index file: $indexFile" -ForegroundColor Yellow
    
    # Create styles file
    $stylesFile = "$componentDir\$componentName.styles.ts"
    $stylesContent = @"
/**
 * $componentName Styles
 */

import { styled } from '@mui/material/styles';

// Add styled components here
"@
    Set-Content -Path $stylesFile -Value $stylesContent
    Write-Host "Created styles file: $stylesFile" -ForegroundColor Yellow
    
    # Create test file
    $testFile = "$componentDir\$componentName.test.tsx"
    $testContent = @"
/**
 * $componentName Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import $componentName from './$componentName';

describe('$componentName', () => {
  it('renders correctly', () => {
    render(<$componentName />);
    expect(screen.getByText('$componentName')).toBeInTheDocument();
  });
});
"@
    Set-Content -Path $testFile -Value $testContent
    Write-Host "Created test file: $testFile" -ForegroundColor Yellow
}

# Create main components directory
EnsureDirectory "$rootDir\src\components"

# Create common components directory
EnsureDirectory "$rootDir\src\components\common"

# Create components index.ts
$componentsIndexFile = "$rootDir\src\components\index.ts"
$componentsIndexContent = @"
/**
 * Components Exports
 */

// Main components
export { default as CreatureViewer } from './CreatureViewer';
export { default as BlockSelector } from './BlockSelector';
export { default as ParticleRenderer } from './ParticleRenderer';
export { default as EvolutionTracker } from './EvolutionTracker';
export { default as TraitDisplay } from './TraitDisplay';

// Common components
// export { Button, Card, etc. } from './common';
"@
Set-Content -Path $componentsIndexFile -Value $componentsIndexContent
Write-Host "Created components index file: $componentsIndexFile" -ForegroundColor Yellow

# Create CreatureViewer component
CreateComponent "CreatureViewer" "Displays the creature with all its particles and traits" @"
import { useCreature } from '../../hooks/useCreature';
import { useBitcoinData } from '../../hooks/useBitcoinData';

/**
 * CreatureViewer Props
 */
interface CreatureViewerProps {
  blockNumber?: number;
  width?: number;
  height?: number;
}
"@

# Create BlockSelector component
CreateComponent "BlockSelector" "Allows selection of Bitcoin blocks to generate creatures" @"
import { useBitcoinData } from '../../hooks/useBitcoinData';

/**
 * BlockSelector Props
 */
interface BlockSelectorProps {
  onBlockSelect: (blockNumber: number) => void;
  initialBlock?: number;
}
"@

# Create ParticleRenderer component
CreateComponent "ParticleRenderer" "Renders particles using Three.js with instanced rendering" @"
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useRender } from '../../hooks/useRender';

/**
 * ParticleRenderer Props
 */
interface ParticleRendererProps {
  particles: any[]; // Replace with proper particle type
  width?: number;
  height?: number;
  backgroundColor?: string;
}
"@

# Create EvolutionTracker component
CreateComponent "EvolutionTracker" "Tracks and displays creature evolution based on confirmations" @"
import { useEvolution } from '../../hooks/useEvolution';
import { useBitcoinData } from '../../hooks/useBitcoinData';

/**
 * EvolutionTracker Props
 */
interface EvolutionTrackerProps {
  creatureId: string;
  showHistory?: boolean;
}
"@

# Create TraitDisplay component
CreateComponent "TraitDisplay" "Displays creature traits and attributes" @"
import { useCreature } from '../../hooks/useCreature';

/**
 * TraitDisplay Props
 */
interface TraitDisplayProps {
  creatureId: string;
  showDetails?: boolean;
  filterByRole?: string;
}
"@

# Create common components
$commonComponents = @(
    @{
        Name = "Button";
        Description = "Custom button component with various styles and states";
        Props = @"
/**
 * Button Props
 */
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
"@
    },
    @{
        Name = "Card";
        Description = "Card component for displaying content in a contained manner";
        Props = @"
/**
 * Card Props
 */
interface CardProps {
  title?: string;
  elevation?: number;
  children: React.ReactNode;
}
"@
    },
    @{
        Name = "Loader";
        Description = "Loading indicator component";
        Props = @"
/**
 * Loader Props
 */
interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}
"@
    }
)

foreach ($component in $commonComponents) {
    $componentDir = "$rootDir\src\components\common\$($component.Name)"
    EnsureDirectory $componentDir
    
    # Create component file
    $componentFile = "$componentDir\$($component.Name).tsx"
    $componentContent = @"
/**
 * $($component.Name) Component
 * 
 * $($component.Description)
 */

import React from 'react';
import { styled } from '@mui/material/styles';
$($component.Props)

/**
 * $($component.Name) component
 */
const $($component.Name): React.FC<$($component.Name)Props> = (props) => {
  return (
    <StyledContainer>
      {/* Component implementation */}
    </StyledContainer>
  );
};

// Styled components
const StyledContainer = styled('div')(({ theme }) => ({
  // Styles here
}));

export default $($component.Name);
"@
    Set-Content -Path $componentFile -Value $componentContent
    Write-Host "Created common component file: $componentFile" -ForegroundColor Yellow
    
    # Create index.ts file
    $indexFile = "$componentDir\index.ts"
    $indexContent = @"
/**
 * $($component.Name) Component Exports
 */

export { default } from './$($component.Name)';
"@
    Set-Content -Path $indexFile -Value $indexContent
    Write-Host "Created common component index file: $indexFile" -ForegroundColor Yellow
}

# Create common components index.ts
$commonIndexFile = "$rootDir\src\components\common\index.ts"
$commonIndexContent = @"
/**
 * Common Components Exports
 */

export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Loader } from './Loader';
"@
Set-Content -Path $commonIndexFile -Value $commonIndexContent
Write-Host "Created common components index file: $commonIndexFile" -ForegroundColor Yellow

Write-Host "`nComponent creation completed!" -ForegroundColor Cyan
Write-Host "The following components have been created:" -ForegroundColor Cyan
Write-Host "- CreatureViewer" -ForegroundColor Cyan
Write-Host "- BlockSelector" -ForegroundColor Cyan
Write-Host "- ParticleRenderer" -ForegroundColor Cyan
Write-Host "- EvolutionTracker" -ForegroundColor Cyan
Write-Host "- TraitDisplay" -ForegroundColor Cyan
Write-Host "- Common components: Button, Card, Loader" -ForegroundColor Cyan
