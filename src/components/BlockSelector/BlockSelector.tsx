/**
 * BlockSelector Component
 *
 * Allows selection of Bitcoin blocks to generate creatures.
 * Follows the Bitcoin implementation rules and RNG requirements.
 */

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button, Typography } from '@mui/material';

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
  initialBlock = 0
}) => {
  // State
  const [blockNumber, setBlockNumber] = useState<string>(initialBlock.toString());
  const [error, setError] = useState<string | null>(null);

  // Initialize with block 0 if no initial block is provided
  useEffect(() => {
    if (initialBlock === 0) {
      onBlockSelect(0);
    }
  }, [initialBlock, onBlockSelect]);

  // Handle block number input change
  const handleBlockNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if ((/^\d*$/).test(value)) {
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

const InputContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export default BlockSelector;

