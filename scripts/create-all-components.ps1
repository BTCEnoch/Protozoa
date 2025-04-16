# Create All Components Script
# This script runs all the component creation scripts

# Project root directory (current directory)
$rootDir = Get-Location

Write-Host "Starting component creation process..." -ForegroundColor Cyan
Write-Host "This script will create all the React components for the Bitcoin Protozoa project." -ForegroundColor Cyan
Write-Host "Press any key to continue or Ctrl+C to cancel..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Create main components directory
function EnsureDirectory {
    param([string]$path)
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "Created directory: $path" -ForegroundColor Green
    }
}

# Create components directory
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
export { Button, Card, Loader } from './common';
"@
Set-Content -Path $componentsIndexFile -Value $componentsIndexContent
Write-Host "Created components index file: $componentsIndexFile" -ForegroundColor Yellow

# Run each component creation script
Write-Host "`nStep 1: Creating CreatureViewer component..." -ForegroundColor Magenta
& "$rootDir\scripts\create-creature-viewer.ps1"

Write-Host "`nStep 2: Creating ParticleRenderer component..." -ForegroundColor Magenta
& "$rootDir\scripts\create-particle-renderer-component.ps1"

Write-Host "`nStep 3: Creating BlockSelector component..." -ForegroundColor Magenta
& "$rootDir\scripts\create-block-selector-basic.ps1"

Write-Host "`nStep 4: Creating EvolutionTracker component..." -ForegroundColor Magenta
& "$rootDir\scripts\create-evolution-tracker-basic.ps1"

Write-Host "`nStep 5: Creating TraitDisplay component..." -ForegroundColor Magenta
& "$rootDir\scripts\create-trait-display-basic.ps1"

# Create common components
Write-Host "`nStep 6: Creating common components..." -ForegroundColor Magenta

# Create Button component
$buttonDir = "$rootDir\src\components\common\Button"
EnsureDirectory $buttonDir

$buttonFile = "$buttonDir\Button.tsx"
$buttonContent = @"
/**
 * Button Component
 * 
 * Custom button component with various styles and states.
 */

import React from 'react';
import { styled } from '@mui/material/styles';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

/**
 * Button Props
 */
interface ButtonProps extends MuiButtonProps {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
}

/**
 * Button component
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}) => {
  // Map custom variants to MUI variants
  const getMuiVariant = (): MuiButtonProps['variant'] => {
    switch (variant) {
      case 'primary':
        return 'contained';
      case 'secondary':
        return 'outlined';
      case 'text':
        return 'text';
      default:
        return 'contained';
    }
  };
  
  return (
    <StyledButton
      variant={getMuiVariant()}
      size={size}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

// Styled components
const StyledButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 600,
}));

export default Button;
"@
Set-Content -Path $buttonFile -Value $buttonContent
Write-Host "Created Button component file: $buttonFile" -ForegroundColor Yellow

$buttonIndexFile = "$buttonDir\index.ts"
$buttonIndexContent = @"
/**
 * Button Component Exports
 */

export { default } from './Button';
"@
Set-Content -Path $buttonIndexFile -Value $buttonIndexContent
Write-Host "Created Button index file: $buttonIndexFile" -ForegroundColor Yellow

# Create Card component
$cardDir = "$rootDir\src\components\common\Card"
EnsureDirectory $cardDir

$cardFile = "$cardDir\Card.tsx"
$cardContent = @"
/**
 * Card Component
 * 
 * Card component for displaying content in a contained manner.
 */

import React from 'react';
import { styled } from '@mui/material/styles';
import { Card as MuiCard, CardContent, CardHeader, CardProps as MuiCardProps } from '@mui/material';

/**
 * Card Props
 */
interface CardProps extends MuiCardProps {
  title?: string;
  elevation?: number;
}

/**
 * Card component
 */
const Card: React.FC<CardProps> = ({
  title,
  elevation = 1,
  children,
  ...props
}) => {
  return (
    <StyledCard elevation={elevation} {...props}>
      {title && <CardHeader title={title} />}
      <CardContent>
        {children}
      </CardContent>
    </StyledCard>
  );
};

// Styled components
const StyledCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export default Card;
"@
Set-Content -Path $cardFile -Value $cardContent
Write-Host "Created Card component file: $cardFile" -ForegroundColor Yellow

$cardIndexFile = "$cardDir\index.ts"
$cardIndexContent = @"
/**
 * Card Component Exports
 */

export { default } from './Card';
"@
Set-Content -Path $cardIndexFile -Value $cardIndexContent
Write-Host "Created Card index file: $cardIndexFile" -ForegroundColor Yellow

# Create Loader component
$loaderDir = "$rootDir\src\components\common\Loader"
EnsureDirectory $loaderDir

$loaderFile = "$loaderDir\Loader.tsx"
$loaderContent = @"
/**
 * Loader Component
 * 
 * Loading indicator component.
 */

import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * Loader Props
 */
interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}

/**
 * Loader component
 */
const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  color,
  text
}) => {
  // Map size to pixel value
  const getSize = (): number => {
    switch (size) {
      case 'small':
        return 24;
      case 'medium':
        return 40;
      case 'large':
        return 56;
      default:
        return 40;
    }
  };
  
  return (
    <Container>
      <CircularProgress size={getSize()} color="primary" sx={{ color }} />
      {text && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {text}
        </Typography>
      )}
    </Container>
  );
};

// Styled components
const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default Loader;
"@
Set-Content -Path $loaderFile -Value $loaderContent
Write-Host "Created Loader component file: $loaderFile" -ForegroundColor Yellow

$loaderIndexFile = "$loaderDir\index.ts"
$loaderIndexContent = @"
/**
 * Loader Component Exports
 */

export { default } from './Loader';
"@
Set-Content -Path $loaderIndexFile -Value $loaderIndexContent
Write-Host "Created Loader index file: $loaderIndexFile" -ForegroundColor Yellow

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
