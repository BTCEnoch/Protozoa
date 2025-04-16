# Create BlockSelector Component Script
# This script creates a detailed implementation of the BlockSelector component

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
 * This component provides an interface for users to select
 * specific Bitcoin blocks by number, hash, or to use the latest block.
 */

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress,
  Tooltip,
  IconButton,
  Divider,
  Paper
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import { useBitcoinData } from '../../hooks/useBitcoinData';
import { getBitcoinService } from '../../services/bitcoin';

/**
 * BlockSelector Props
 */
interface BlockSelectorProps {
  onBlockSelect: (blockNumber: number) => void;
  initialBlock?: number;
  showLatestBlock?: boolean;
  showHistory?: boolean;
  maxHistoryItems?: number;
}

/**
 * BlockSelector component
 */
const BlockSelector: React.FC<BlockSelectorProps> = ({
  onBlockSelect,
  initialBlock,
  showLatestBlock = true,
  showHistory = true,
  maxHistoryItems = 5
}) => {
  // State
  const [blockNumber, setBlockNumber] = useState<string>(initialBlock?.toString() || '');
  const [isLoadingLatest, setIsLoadingLatest] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  
  // Bitcoin service
  const bitcoinService = getBitcoinService();
  
  // Load initial history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('blockHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory.slice(0, maxHistoryItems));
        }
      } catch (e) {
        console.error('Failed to parse block history:', e);
      }
    }
  }, [maxHistoryItems]);
  
  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('blockHistory', JSON.stringify(history));
  }, [history]);
  
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
    
    // Add to history
    addToHistory(blockNum);
    
    // Call the onBlockSelect callback
    onBlockSelect(blockNum);
  };
  
  // Handle latest block selection
  const handleSelectLatestBlock = async () => {
    setIsLoadingLatest(true);
    setError(null);
    
    try {
      const latestBlock = await bitcoinService.getLatestBlockNumber();
      setBlockNumber(latestBlock.toString());
      
      // Add to history
      addToHistory(latestBlock);
      
      // Call the onBlockSelect callback
      onBlockSelect(latestBlock);
    } catch (err) {
      setError('Failed to fetch latest block');
      console.error('Failed to fetch latest block:', err);
    } finally {
      setIsLoadingLatest(false);
    }
  };
  
  // Handle history item selection
  const handleSelectHistoryItem = (blockNum: number) => {
    setBlockNumber(blockNum.toString());
    onBlockSelect(blockNum);
  };
  
  // Add a block number to history
  const addToHistory = (blockNum: number) => {
    setHistory(prev => {
      // Remove if already exists
      const filtered = prev.filter(num => num !== blockNum);
      // Add to beginning
      return [blockNum, ...filtered].slice(0, maxHistoryItems);
    });
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
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSelectBlock} size="small">
                <SearchIcon />
              </IconButton>
            )
          }}
        />
        
        {showLatestBlock && (
          <Tooltip title="Get Latest Block">
            <span>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSelectLatestBlock}
                disabled={isLoadingLatest}
                startIcon={isLoadingLatest ? <CircularProgress size={20} /> : <RefreshIcon />}
                sx={{ ml: 1 }}
              >
                Latest
              </Button>
            </span>
          </Tooltip>
        )}
      </InputContainer>
      
      {showHistory && history.length > 0 && (
        <HistoryContainer>
          <Box display="flex" alignItems="center" mb={1}>
            <HistoryIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="subtitle2">Recent Blocks</Typography>
          </Box>
          <Divider sx={{ mb: 1 }} />
          {history.map(blockNum => (
            <HistoryItem 
              key={blockNum}
              onClick={() => handleSelectHistoryItem(blockNum)}
            >
              <Typography variant="body2">
                Block #{blockNum}
              </Typography>
            </HistoryItem>
          ))}
        </HistoryContainer>
      )}
    </Container>
  );
};

// Styled components
const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const HistoryContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const HistoryItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
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

Write-Host "`nBlockSelector component creation completed!" -ForegroundColor Cyan
