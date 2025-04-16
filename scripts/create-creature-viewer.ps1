# Create CreatureViewer Component Script
# This script creates a more detailed implementation of the CreatureViewer component

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

# Create CreatureViewer directory
$componentDir = "$rootDir\src\components\CreatureViewer"
EnsureDirectory $componentDir

# Create CreatureViewer component file
$componentFile = "$componentDir\CreatureViewer.tsx"
$componentContent = @"
/**
 * CreatureViewer Component
 * 
 * Displays the creature with all its particles and traits.
 * This component is responsible for rendering the 3D visualization
 * of the creature using Three.js and the ParticleRenderer component.
 */

import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, CircularProgress, IconButton, Tooltip } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import { useCreature } from '../../hooks/useCreature';
import { useBitcoinData } from '../../hooks/useBitcoinData';
import ParticleRenderer from '../ParticleRenderer';
import { getTraitService } from '../../services/traits';
import { getFormationService } from '../../services/formations';
import { getBehaviorService } from '../../services/behaviors';
import { Role } from '../../types/core';

/**
 * CreatureViewer Props
 */
interface CreatureViewerProps {
  blockNumber?: number;
  width?: number;
  height?: number;
  showControls?: boolean;
  onCreatureLoad?: (creatureId: string) => void;
}

/**
 * CreatureViewer component
 */
const CreatureViewer: React.FC<CreatureViewerProps> = ({
  blockNumber,
  width = 800,
  height = 600,
  showControls = true,
  onCreatureLoad
}) => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hooks
  const { blockData, isLoading: isLoadingBlock, error: blockError } = useBitcoinData(blockNumber);
  const { creature, isLoading: isLoadingCreature, error: creatureError } = useCreature(blockData);
  
  // Effects
  useEffect(() => {
    // Update loading state
    setIsLoading(isLoadingBlock || isLoadingCreature);
    
    // Handle errors
    if (blockError) {
      setError(\`Error loading block data: \${blockError}\`);
    } else if (creatureError) {
      setError(\`Error generating creature: \${creatureError}\`);
    } else {
      setError(null);
    }
  }, [isLoadingBlock, isLoadingCreature, blockError, creatureError]);
  
  useEffect(() => {
    // Notify parent when creature is loaded
    if (creature && onCreatureLoad) {
      onCreatureLoad(creature.id);
    }
  }, [creature, onCreatureLoad]);
  
  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Handle zoom
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };
  
  const handleResetView = () => {
    setZoom(1);
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          {isLoadingBlock ? 'Loading block data...' : 'Generating creature...'}
        </Typography>
      </LoadingContainer>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <ErrorContainer>
        <Typography variant="h6" color="error">
          Error
        </Typography>
        <Typography variant="body1">
          {error}
        </Typography>
      </ErrorContainer>
    );
  }
  
  // Render creature
  return (
    <ViewerContainer ref={containerRef} style={{ width, height }}>
      {creature && (
        <>
          <ParticleRenderer 
            particles={creature.particles} 
            width={isFullscreen ? window.innerWidth : width}
            height={isFullscreen ? window.innerHeight : height}
            zoom={zoom}
          />
          
          {showControls && (
            <ControlsContainer>
              <Tooltip title="Zoom In">
                <IconButton onClick={handleZoomIn} size="small">
                  <ZoomInIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Zoom Out">
                <IconButton onClick={handleZoomOut} size="small">
                  <ZoomOutIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reset View">
                <IconButton onClick={handleResetView} size="small">
                  <RotateLeftIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
                <IconButton onClick={toggleFullscreen} size="small">
                  <FullscreenIcon />
                </IconButton>
              </Tooltip>
            </ControlsContainer>
          )}
          
          <InfoOverlay>
            <Typography variant="h6">
              {creature.name}
            </Typography>
            <Typography variant="body2">
              Block: {blockData?.height || 'Unknown'}
            </Typography>
            <Typography variant="body2">
              Particles: {creature.particles.length}
            </Typography>
          </InfoOverlay>
        </>
      )}
    </ViewerContainer>
  );
};

// Styled components
const ViewerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  backgroundColor: '#000',
  '&:fullscreen': {
    width: '100vw !important',
    height: '100vh !important',
  }
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  minHeight: 300,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  minHeight: 300,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));

const ControlsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(1),
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
}));

const InfoOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  color: theme.palette.common.white,
}));

export default CreatureViewer;
"@
Set-Content -Path $componentFile -Value $componentContent
Write-Host "Created CreatureViewer component file: $componentFile" -ForegroundColor Yellow

# Create index.ts file
$indexFile = "$componentDir\index.ts"
$indexContent = @"
/**
 * CreatureViewer Component Exports
 */

export { default } from './CreatureViewer';
"@
Set-Content -Path $indexFile -Value $indexContent
Write-Host "Created index file: $indexFile" -ForegroundColor Yellow

# Create styles file
$stylesFile = "$componentDir\CreatureViewer.styles.ts"
$stylesContent = @"
/**
 * CreatureViewer Styles
 */

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ViewerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  backgroundColor: '#000',
  '&:fullscreen': {
    width: '100vw !important',
    height: '100vh !important',
  }
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  minHeight: 300,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

export const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  minHeight: 300,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));

export const ControlsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(1),
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
}));

export const InfoOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  color: theme.palette.common.white,
}));
"@
Set-Content -Path $stylesFile -Value $stylesContent
Write-Host "Created styles file: $stylesFile" -ForegroundColor Yellow

# Create test file
$testFile = "$componentDir\CreatureViewer.test.tsx"
$testContent = @"
/**
 * CreatureViewer Tests
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CreatureViewer from './CreatureViewer';
import { useCreature } from '../../hooks/useCreature';
import { useBitcoinData } from '../../hooks/useBitcoinData';

// Mock the hooks
jest.mock('../../hooks/useCreature');
jest.mock('../../hooks/useBitcoinData');
jest.mock('../ParticleRenderer', () => ({
  __esModule: true,
  default: () => <div data-testid="particle-renderer" />
}));

describe('CreatureViewer', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Default mock implementations
    (useCreature as jest.Mock).mockReturnValue({
      creature: null,
      isLoading: true,
      error: null
    });
    
    (useBitcoinData as jest.Mock).mockReturnValue({
      blockData: null,
      isLoading: true,
      error: null
    });
  });
  
  it('renders loading state', () => {
    render(<CreatureViewer />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  
  it('renders error state', () => {
    (useBitcoinData as jest.Mock).mockReturnValue({
      blockData: null,
      isLoading: false,
      error: 'Failed to fetch block data'
    });
    
    render(<CreatureViewer />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to fetch block data/i)).toBeInTheDocument();
  });
  
  it('renders creature when data is loaded', async () => {
    const mockCreature = {
      id: 'creature-123',
      name: 'Test Creature',
      particles: []
    };
    
    const mockBlockData = {
      height: 123456,
      nonce: '12345',
      confirmations: 1000
    };
    
    (useCreature as jest.Mock).mockReturnValue({
      creature: mockCreature,
      isLoading: false,
      error: null
    });
    
    (useBitcoinData as jest.Mock).mockReturnValue({
      blockData: mockBlockData,
      isLoading: false,
      error: null
    });
    
    render(<CreatureViewer />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Creature')).toBeInTheDocument();
      expect(screen.getByText(/block: 123456/i)).toBeInTheDocument();
      expect(screen.getByTestId('particle-renderer')).toBeInTheDocument();
    });
  });
  
  it('calls onCreatureLoad callback when creature is loaded', async () => {
    const mockCreature = {
      id: 'creature-123',
      name: 'Test Creature',
      particles: []
    };
    
    (useCreature as jest.Mock).mockReturnValue({
      creature: mockCreature,
      isLoading: false,
      error: null
    });
    
    (useBitcoinData as jest.Mock).mockReturnValue({
      blockData: { height: 123456 },
      isLoading: false,
      error: null
    });
    
    const onCreatureLoad = jest.fn();
    
    render(<CreatureViewer onCreatureLoad={onCreatureLoad} />);
    
    await waitFor(() => {
      expect(onCreatureLoad).toHaveBeenCalledWith('creature-123');
    });
  });
});
"@
Set-Content -Path $testFile -Value $testContent
Write-Host "Created test file: $testFile" -ForegroundColor Yellow

Write-Host "`nCreatureViewer component creation completed!" -ForegroundColor Cyan
