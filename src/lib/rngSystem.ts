
/**
 * @ai-navigation
 * System: Core RNG System
 * Dependencies: bitcoinService.ts
 * Consumers: mutationService.ts, creatureGenerator.ts
 * Critical Path: Yes
 *
 * This system provides deterministic random number generation
 * based on Bitcoin block data. It's a core dependency for
 * creature generation and mutation systems.
 */

import type { RNGStream, RNGSystem, RNGStreamName } from '../types/rng';
import type { BlockData } from '../types/bitcoin';
/**
 * Creates a hash from block data for seeding
 * @param blockData Bitcoin block data
 * @returns 32-bit integer for seeding
 */
function createSeedFromBlock(blockData: BlockData): number {
    const { nonce, hash, timestamp } = blockData;

    // Convert nonce to number if it's a string
    const nonceValue = typeof nonce === 'string' ? parseInt(nonce, 16) : nonce;

    // Get first 8 chars of hash as number
    const hashPrefix = parseInt(hash.substring(0, 8), 16);

    // Combine values with XOR
    return nonceValue ^ hashPrefix ^ timestamp;
}

/**
 * Mulberry32 is a simple but high-quality 32-bit RNG
 * @param seed The seed value (derived from Bitcoin block data)
 * @returns A function that generates random numbers between 0 and 1
 */
function mulberry32(seed: number): () => number {
    return function() {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

/**
 * RNG Stream implementation for consistent random sequences
 */
class RNGStreamImpl implements RNGStream {
    private rng: () => number;
    private streamName: RNGStreamName;

    constructor(seed: number, streamName: RNGStreamName) {
        // Create unique seed for each stream based on name
        const streamSeed = seed ^ Array.from(streamName).reduce((acc, char) =>
            acc + char.charCodeAt(0), 0);
        this.rng = mulberry32(streamSeed);
        this.streamName = streamName;
    }

    next(): number {
        return this.rng();
    }

    nextInt(min: number, max: number): number {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    nextBool(probability: number = 0.5): boolean {
        return this.next() < probability;
    }

    nextItem<T>(array: T[]): T {
        if (!array || array.length === 0) {
            throw new Error('Cannot get a random item from an empty array');
        }
        return array[this.nextInt(0, array.length - 1)];
    }

    nextItems<T>(array: T[], count: number): T[] {
        if (!array || array.length === 0) {
            throw new Error('Cannot get random items from an empty array');
        }
        if (count < 0) {
            throw new Error('Count must be a non-negative number');
        }
        return this.shuffle([...array]).slice(0, count);
    }

    shuffle<T>(array: T[]): T[] {
        if (!array) {
            throw new Error('Cannot shuffle undefined or null array');
        }

        // If array is empty, return empty array
        if (array.length === 0) {
            return [];
        }

        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = this.nextInt(0, i);
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    getStreamName(): RNGStreamName {
        return this.streamName;
    }
}

/**
 * RNG System implementation for managing multiple streams
 */
class RNGSystemImpl implements RNGSystem {
    private streams: Map<RNGStreamName, RNGStream>;
    private blockData: BlockData;
    private seed: number;

    constructor(blockData: BlockData) {
        this.blockData = blockData;
        this.seed = createSeedFromBlock(blockData);
        this.streams = new Map();

        // Initialize default streams
        const defaultStreams: RNGStreamName[] = [
            'traits',
            'physics',
            'formation',
            'visual',
            'subclass',
            'ability',
            'mutation',
            'particle',
            'behavior'
        ];

        defaultStreams.forEach(name => this.createStream(name));
    }

    getStream(name: RNGStreamName): RNGStream {
        const stream = this.streams.get(name);
        if (!stream) {
            throw new Error(`RNG stream '${name}' not found. Available streams: ${Array.from(this.streams.keys()).join(', ')}`);
        }
        return stream;
    }

    createStream(name: RNGStreamName): RNGStream {
        const stream = new RNGStreamImpl(this.seed, name);
        this.streams.set(name, stream);
        return stream;
    }

    getBlockData(): BlockData {
        return this.blockData;
    }

    getSeed(): number {
        return this.seed;
    }
}

/**
 * Creates an RNG system from Bitcoin block data
 * @param blockData The Bitcoin block data
 * @returns An RNG system seeded with block data
 * @throws Error if blockData is invalid
 */
export function createRNGFromBlock(blockData: BlockData): RNGSystem {
    // Validate block data
    if (!blockData) {
        throw new Error('Block data is required');
    }

    if (!blockData.hash || !blockData.timestamp) {
        throw new Error('Block data is missing required fields (hash, timestamp)');
    }

    return new RNGSystemImpl(blockData);
}

export type { RNGStream, RNGSystem, RNGStreamName };
export { RNGSystem };


