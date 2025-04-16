# Bitcoin Protozoa - Bitcoin Integration

## Overview

Bitcoin Protozoa uses Bitcoin block data as the foundation for creature generation and evolution. This document details how the project integrates with Bitcoin data, specifically focusing on the ordinals.com API to fetch **only** the block nonce and confirmations.

## Data Requirements

For Bitcoin Protozoa, we **strictly limit** our data requirements to only two specific pieces of data from each Bitcoin block:

1. **Block Nonce**: Used as a seed for our deterministic RNG system
2. **Confirmations**: Used to determine evolution milestones

We deliberately ignore all other block data (hash, timestamp, merkle root, etc.) as they are not needed for our core functionality. This focused approach simplifies our implementation and reduces dependencies.

## Ordinals.com API Integration

### API Endpoint

We use the ordinals.com API to fetch Bitcoin block data:

```
https://ordinals.com/r/blockinfo/${blockNumber}
```

Where `${blockNumber}` is the block number (height) of the Bitcoin block.

### API Response

The API returns a JSON object with comprehensive block information. Here's an example response structure:

```json
{
  "height": 800000,
  "hash": "00000000000000000002a7c4c1e48d76c5a37902165a270156b7a8d72728a054",
  "nonce": 1765503561,
  "confirmations": 25000,
  "time": 1677808150,
  "merkleroot": "8e8a3733d34a197c187f3a5f4f3d5c343a77b4c6e19c3d1d427b98b1dda0c2a0",
  "difficulty": 43.05,
  "size": 1562024,
  "weight": 3993385,
  "version": 536870912
}
```

### Data Extraction

From this entire response, we extract and use **only** these two fields:

- `nonce`: Used as the seed for our RNG system
- `confirmations`: Used to determine evolution milestones

### Implementation

```typescript
// Bitcoin Block Data interface - ONLY what we need
interface BlockData {
  nonce: number;
  confirmations: number;
}

async function fetchBlockData(blockNumber: number): Promise<BlockData> {
  try {
    // Construct the API URL
    const apiUrl = `https://ordinals.com/r/blockinfo/${blockNumber}`;

    // Fetch the data
    const response = await fetch(apiUrl);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch block data: ${response.status} ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Extract ONLY the nonce and confirmations
    // Deliberately ignore all other fields
    return {
      nonce: data.nonce,
      confirmations: data.confirmations
    };
  } catch (error) {
    console.error('Error fetching Bitcoin block data:', error);

    // For development/testing, return mock data if the API call fails
    return createMockBlockData(blockNumber);
  }
}
```

## Fallback Mechanism

For development, testing, or when the API is unavailable, we implement a fallback mechanism that generates deterministic mock data for **only** the nonce and confirmations:

```typescript
function createMockBlockData(blockNumber: number): BlockData {
  // Use the block number as a seed for deterministic mock data
  const seed = blockNumber * 1000;

  // Return ONLY nonce and confirmations - nothing else
  return {
    nonce: seed % 4294967295, // Nonce is a 32-bit number
    confirmations: Math.min(1000000, blockNumber > 700000 ? 1000000 - (800000 - blockNumber) * 100 : 1000000)
  };
}
```

## Confirmation Milestones

Bitcoin block confirmations are used to trigger evolution milestones:

| Confirmations | Mutation Chance | Rarity Tier |
|---------------|----------------|-------------|
| 10,000        | 1%             | Common      |
| 50,000        | 5%             | Uncommon    |
| 100,000       | 10%            | Rare        |
| 250,000       | 25%            | Epic        |
| 500,000       | 50%            | Legendary   |
| 1,000,000     | 100%           | Mythic      |

When a block reaches a confirmation milestone, the creature has a chance to mutate based on the corresponding mutation chance.

## User Interface Integration

The user interface includes an input field where users can specify a Bitcoin block number to generate a new creature. The application then:

1. Fetches **only** the nonce and confirmations from the ordinals.com API
2. Uses the nonce as a seed for the RNG system
3. Generates a creature based on the RNG output
4. Checks the confirmations to determine if any mutations should occur

## Caching Strategy

To reduce API calls and improve performance, we implement a caching strategy for the nonce and confirmations data:

1. Block data (nonce and confirmations only) is cached locally after the first fetch
2. Cached data is used for subsequent requests for the same block
3. For blocks that are still being confirmed, we periodically refresh the confirmations count
4. For blocks with over 1,000,000 confirmations, we consider them "fully evolved" and no longer refresh the data

## Error Handling

The integration includes robust error handling:

1. Network errors are caught and logged
2. API rate limiting is respected with exponential backoff
3. Invalid block numbers are validated before making API calls
4. Fallback to mock data when the API is unavailable

## Security Considerations

While this integration is relatively simple, we still implement security best practices:

1. Input validation for block numbers
2. Rate limiting for API calls
3. Error handling to prevent application crashes
4. No sensitive data is transmitted or stored
