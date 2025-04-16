# Bitcoin Protozoa - Compute Architecture

## Overview
This document outlines the compute architecture for the Bitcoin Protozoa project, focusing on optimized computation for particle physics, behaviors, and mutations using Web Workers.

## Compute Challenges
The Bitcoin Protozoa project faces several compute challenges:
- Processing physics calculations for 500 particles per creature
- Implementing complex behaviors and interactions between particles
- Handling mutations and evolution based on Bitcoin block confirmations
- Maintaining responsive UI while performing intensive calculations

## Optimization Strategies

### Web Workers
Web Workers are the primary optimization technique used to offload compute-intensive tasks from the main thread.

#### Implementation
- Create dedicated workers for physics, behavior, and other compute-intensive tasks
- Use transferable objects for efficient data transfer between threads
- Implement a worker pool for managing multiple worker instances

```typescript
// Example implementation in main thread
class PhysicsSystem {
  private worker: Worker;
  private particles: Particle[];
  
  public initialize(): void {
    this.worker = new Worker('workers/physics/forceWorker.ts');
    
    this.worker.onmessage = (e: MessageEvent) => {
      const { forces } = e.data;
      this.applyForces(forces);
    };
  }
  
  public updateForces(): void {
    // Create transferable arrays
    const positions = new Float32Array(this.particles.length * 3);
    const masses = new Float32Array(this.particles.length);
    
    // Fill arrays with particle data
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      const i3 = i * 3;
      
      positions[i3] = particle.position.x;
      positions[i3 + 1] = particle.position.y;
      positions[i3 + 2] = particle.position.z;
      
      masses[i] = particle.mass;
    }
    
    // Send data to worker
    this.worker.postMessage(
      { positions, masses },
      [positions.buffer, masses.buffer]
    );
  }
  
  private applyForces(forces: Float32Array): void {
    // Apply forces to particles
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      const i3 = i * 3;
      
      particle.force.x = forces[i3];
      particle.force.y = forces[i3 + 1];
      particle.force.z = forces[i3 + 2];
    }
  }
}

// Example implementation in worker
// workers/physics/forceWorker.ts
self.onmessage = (e: MessageEvent) => {
  const { positions, masses } = e.data;
  
  // Calculate forces between particles
  const forces = calculateForces(positions, masses);
  
  // Send forces back to main thread
  self.postMessage({ forces }, [forces.buffer]);
};

function calculateForces(positions: Float32Array, masses: Float32Array): Float32Array {
  const particleCount = masses.length;
  const forces = new Float32Array(particleCount * 3);
  
  // Calculate forces between all particles
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    
    for (let j = i + 1; j < particleCount; j++) {
      const j3 = j * 3;
      
      // Calculate force between particles i and j
      // ... force calculation code ...
      
      // Apply force to both particles (action-reaction)
      forces[i3] += forceX;
      forces[i3 + 1] += forceY;
      forces[i3 + 2] += forceZ;
      
      forces[j3] -= forceX;
      forces[j3 + 1] -= forceY;
      forces[j3 + 2] -= forceZ;
    }
  }
  
  return forces;
}
```

### Chunking and Batching
Chunking and batching are used to process particles in smaller groups to reduce per-frame compute load.

#### Implementation
- Divide particles by role or spatial proximity
- Process each group separately
- Stagger updates across frames if necessary

```typescript
// Example implementation
class ChunkedProcessor {
  private particles: Particle[];
  private chunkSize: number = 100;
  private currentChunk: number = 0;
  
  public processNextChunk(): void {
    const startIndex = this.currentChunk * this.chunkSize;
    const endIndex = Math.min(startIndex + this.chunkSize, this.particles.length);
    
    // Process particles in current chunk
    for (let i = startIndex; i < endIndex; i++) {
      this.processParticle(this.particles[i]);
    }
    
    // Move to next chunk
    this.currentChunk = (this.currentChunk + 1) % Math.ceil(this.particles.length / this.chunkSize);
  }
  
  private processParticle(particle: Particle): void {
    // Process individual particle
    // ... processing code ...
  }
}
```

### Spatial Partitioning
Spatial partitioning is used to optimize force calculations by limiting interactions to nearby particles.

#### Implementation
- Use a grid or quadtree to group particles by spatial proximity
- Only calculate forces between particles in the same or adjacent cells
- Update the spatial structure as particles move

```typescript
// Example implementation
class SpatialGrid {
  private grid: Map<string, Particle[]>;
  private cellSize: number;
  
  constructor(cellSize: number) {
    this.grid = new Map();
    this.cellSize = cellSize;
  }
  
  public updateGrid(particles: Particle[]): void {
    // Clear grid
    this.grid.clear();
    
    // Add particles to grid
    for (const particle of particles) {
      const cellX = Math.floor(particle.position.x / this.cellSize);
      const cellY = Math.floor(particle.position.y / this.cellSize);
      const cellZ = Math.floor(particle.position.z / this.cellSize);
      
      const cellKey = `${cellX},${cellY},${cellZ}`;
      
      if (!this.grid.has(cellKey)) {
        this.grid.set(cellKey, []);
      }
      
      this.grid.get(cellKey)!.push(particle);
    }
  }
  
  public getNeighbors(particle: Particle): Particle[] {
    const cellX = Math.floor(particle.position.x / this.cellSize);
    const cellY = Math.floor(particle.position.y / this.cellSize);
    const cellZ = Math.floor(particle.position.z / this.cellSize);
    
    const neighbors: Particle[] = [];
    
    // Check current cell and adjacent cells
    for (let x = cellX - 1; x <= cellX + 1; x++) {
      for (let y = cellY - 1; y <= cellY + 1; y++) {
        for (let z = cellZ - 1; z <= cellZ + 1; z++) {
          const cellKey = `${x},${y},${z}`;
          
          if (this.grid.has(cellKey)) {
            neighbors.push(...this.grid.get(cellKey)!);
          }
        }
      }
    }
    
    return neighbors;
  }
}
```

### Throttled Compute Updates
Throttled compute updates are used to reduce the frequency of expensive calculations.

#### Implementation
- Run physics and behavior calculations at a lower frequency than rendering
- Interpolate between states for smooth visuals
- Use a timer to control update frequency

```typescript
// Example implementation
class ThrottledCompute {
  private lastUpdateTime: number = 0;
  private updateInterval: number = 33; // ~30 FPS
  
  public update(time: number): void {
    // Check if it's time to update
    if (time - this.lastUpdateTime >= this.updateInterval) {
      // Perform expensive computation
      this.computePhysics();
      
      // Update last update time
      this.lastUpdateTime = time;
    }
  }
  
  private computePhysics(): void {
    // Perform physics calculations
    // ... physics code ...
  }
}
```

## Compute Pipeline

### Initialization
1. Create worker instances for physics, behavior, and other compute tasks
2. Initialize spatial partitioning structures
3. Set up throttled compute updates
4. Initialize worker message handlers

### Per-Frame Computation
1. Update spatial partitioning structure
2. Send particle data to physics worker
3. Receive and apply forces from physics worker
4. Update particle positions
5. Send updated positions to behavior worker
6. Receive and apply behavior changes
7. Check for mutation triggers based on confirmations
8. Apply mutations if necessary

### Worker Communication
1. Use transferable objects for efficient data transfer
2. Minimize message size by sending only necessary data
3. Use structured clone algorithm for complex objects
4. Handle worker errors gracefully

## Integration with Domain Model

### Particle Physics
- Physics calculations are based on particle properties defined in the domain model
- Forces are calculated based on particle roles and attributes
- Physics results are applied to the domain model

### Behavior Patterns
- Behavior patterns are defined in the domain model
- Compute system applies these patterns to particles
- Behavior results are reflected in particle movement and interactions

### Mutation Effects
- Mutations are defined in the domain model
- Compute system applies mutation effects to particles
- Mutation results affect particle properties and behaviors

## Performance Considerations

### Memory Management
- Reuse typed arrays to minimize garbage collection
- Use transferable objects to avoid copying large data structures
- Preallocate arrays for known-size collections

### Worker Lifecycle
- Create workers at initialization to avoid startup costs during animation
- Terminate unused workers to free resources
- Use a worker pool to manage worker instances

### Computation Optimization
- Use optimized algorithms for force calculations
- Implement early-out conditions for negligible forces
- Use approximations for distant interactions

## Conclusion
The compute architecture for Bitcoin Protozoa balances computational accuracy with performance through the use of Web Workers, spatial partitioning, chunking, and throttled updates. This approach allows for complex physics and behavior calculations while maintaining a responsive user interface.
