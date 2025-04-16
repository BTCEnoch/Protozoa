# Create Basic BlockSelector Component Script
# This script creates a basic implementation of the BlockSelector component

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

# Create BlockSelector directory
$componentDir = "$rootDir\src\components\BlockSelector"
EnsureDirectory $componentDir

# Create BlockSelector component file
$componentFile = "$componentDir\BlockSelector.tsx"
$componentContent = @"
/**
 * BlockSelector Component
 * 
 * Allows selection of Bitcoin blocks to generate creatures.
 */

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useBitcoinData } from '../../hooks/useBitcoinData';
import { getBitcoinService } from '../../services/bitcoin';

/**
 * BlockSelector Props
 */
interface BlockSelectorProps {
  onBlockSelect: (blockNumber: number) => void;
  initialBlock?: number;
}

/**
 * BlockSelector component
 */
const BlockSelector: React.FC<BlockSelectorProps> = ({
  onBlockSelect,
  initialBlock
}) => {
  // State
  const [blockNumber, setBlockNumber] = useState<string>(initialBlock?.toString() || '');
  const [error, setError] = useState<string | null>(null);
  
  // Handle block number input change
  const handleBlockNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\\d*$/.test(value)) {
      setBlockNumber(value);
      setError(null);
    }
  };
  
  // Handle block selection
  const handleSelectBlock = () => {
    if (!blockNumber) {
      setError('Please enter a block number');
      return;
    }
    
    const blockNum = parseInt(blockNumber, 10);
    if (isNaN(blockNum)) {
      setError('Invalid block number');
      return;
    }
    
    // Call the onBlockSelect callback
    onBlockSelect(blockNum);
  };
  
  // Handle latest block selection
  const handleSelectLatestBlock = async () => {
    try {
      const bitcoinService = getBitcoinService();
      const latestBlock = await bitcoinService.getLatestBlockNumber();
      setBlockNumber(latestBlock.toString());
      onBlockSelect(latestBlock);
    } catch (err) {
      setError('Failed to fetch latest block');
      console.error('Failed to fetch latest block:', err);
    }
  };
  
  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Select Bitcoin Block
      </Typography>
      
      <InputContainer>
        <TextField
          label="Block Number"
          variant="outlined"
          fullWidth
          value={blockNumber}
          onChange={handleBlockNumberChange}
          error={!!error}
          helperText={error}
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSelectBlock}
          sx={{ ml: 1 }}
        >
          Select
        </Button>
        
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleSelectLatestBlock}
          sx={{ ml: 1 }}
        >
          Latest
        </Button>
      </InputContainer>
    </Container>
  );
};

// Styled components
const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export default BlockSelector;
"@
Set-Content -Path $componentFile -Value $componentContent
Write-Host "Created BlockSelector component file: $componentFile" -ForegroundColor Yellow

# Create index.ts file
$indexFile = "$componentDir\index.ts"
$indexContent = @"
/**
 * BlockSelector Component Exports
 */

export { default } from './BlockSelector';
"@
Set-Content -Path $indexFile -Value $indexContent
Write-Host "Created index file: $indexFile" -ForegroundColor Yellow

Write-Host "`nBasic BlockSelector component creation completed!" -ForegroundColor Cyan
