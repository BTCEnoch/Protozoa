# Bitcoin Protozoa - Web Worker Architecture

## Overview
This document outlines the Web Worker architecture for the Bitcoin Protozoa project, focusing on how workers are used to optimize performance by offloading compute-intensive tasks from the main thread.

## Worker Types

### Physics Workers
Physics workers handle force calculations and position updates for particles.

#### Force Worker
- Calculates forces between particles
- Handles attraction, repulsion, and other physics interactions
- Returns force vectors to be applied to particles

#### Position Worker
- Updates particle positions based on forces
- Handles velocity, acceleration, and damping
- Returns updated positions for rendering

### Behavior Workers
Behavior workers handle the application of behavior patterns to particles.

#### Flocking Worker
- Implements flocking behaviors (separation, alignment, cohesion)
- Calculates steering forces for groups of particles
- Returns behavior-based forces to be applied to particles

#### Pattern Worker
- Implements formation patterns and transitions
- Calculates target positions for particles in formations
- Returns pattern-based position targets

### Rendering Workers
Rendering workers handle compute-intensive aspects of the rendering pipeline.

#### Particle Worker
- Prepares particle data for rendering
- Calculates visual effects and animations
- Returns optimized data for the renderer

### Bitcoin Workers
Bitcoin workers handle fetching and processing Bitcoin block data.

#### Fetch Worker
- Fetches Bitcoin block data from the API
- Extracts relevant information (nonce, confirmations)
- Returns processed block data for use in creature generation and evolution

## Worker Pool
The worker pool manages a collection of workers to optimize resource usage and performance.

### Implementation
```typescript
class WorkerPool {
  private workers: Worker[] = [];
  private taskQueue: Task[] = [];
  private availableWorkers: Worker[] = [];

  constructor(workerCount: number, workerScript: string) {
    // Create workers
    for (let i = 0; i < workerCount; i++) {
      const worker = new Worker(workerScript);

      worker.onmessage = (e: MessageEvent) => {
        // Handle worker response
        this.handleWorkerResponse(worker, e.data);

        // Mark worker as available
        this.availableWorkers.push(worker);

        // Process next task if available
        this.processNextTask();
      };

      this.workers.push(worker);
      this.availableWorkers.push(worker);
    }
  }

  public scheduleTask(task: Task): void {
    // Add task to queue
    this.taskQueue.push(task);

    // Process task if workers are available
    this.processNextTask();
  }

  private processNextTask(): void {
    // Check if there are tasks and available workers
    if (this.taskQueue.length === 0 || this.availableWorkers.length === 0) {
      return;
    }

    // Get next task and worker
    const task = this.taskQueue.shift()!;
    const worker = this.availableWorkers.shift()!;

    // Send task to worker
    worker.postMessage(task.data, task.transferables);
  }

  private handleWorkerResponse(worker: Worker, response: any): void {
    // Find task associated with worker
    // Call task callback with response
  }
}
```

## Worker Bridge
The worker bridge provides a simplified interface for communicating with workers from the main thread.

### Implementation
```typescript
class WorkerBridge {
  private worker: Worker;
  private messageHandlers: Map<string, (data: any) => void> = new Map();

  constructor(workerScript: string) {
    this.worker = new Worker(workerScript);

    this.worker.onmessage = (e: MessageEvent) => {
      const { type, data } = e.data;

      // Call handler for message type
      const handler = this.messageHandlers.get(type);
      if (handler) {
        handler(data);
      }
    };
  }

  public registerHandler(type: string, handler: (data: any) => void): void {
    this.messageHandlers.set(type, handler);
  }

  public sendMessage(type: string, data: any, transferables?: Transferable[]): void {
    this.worker.postMessage({ type, data }, transferables);
  }

  public terminate(): void {
    this.worker.terminate();
  }
}
```

## Transferable Objects
Transferable objects are used to efficiently transfer data between the main thread and workers without copying.

### Implementation
```typescript
class TransferUtils {
  /**
   * Creates a transferable position array from particles
   */
  public static createPositionArray(particles: Particle[]): {
    positions: Float32Array;
    transferables: Transferable[];
  } {
    const positions = new Float32Array(particles.length * 3);

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const i3 = i * 3;

      positions[i3] = particle.position.x;
      positions[i3 + 1] = particle.position.y;
      positions[i3 + 2] = particle.position.z;
    }

    return {
      positions,
      transferables: [positions.buffer]
    };
  }

  /**
   * Applies position array back to particles
   */
  public static applyPositionArray(particles: Particle[], positions: Float32Array): void {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const i3 = i * 3;

      particle.position.x = positions[i3];
      particle.position.y = positions[i3 + 1];
      particle.position.z = positions[i3 + 2];
    }
  }
}
```

## Worker Communication Patterns

### Request-Response
The request-response pattern is used for one-off calculations where the main thread sends data to a worker and receives a response.

```typescript
// Main thread
worker.postMessage({ type: 'calculateForces', positions, masses }, [positions.buffer, masses.buffer]);

worker.onmessage = (e) => {
  const { forces } = e.data;
  // Apply forces to particles
};

// Worker
self.onmessage = (e) => {
  const { type, positions, masses } = e.data;

  if (type === 'calculateForces') {
    const forces = calculateForces(positions, masses);
    self.postMessage({ forces }, [forces.buffer]);
  }
};
```

### Streaming
The streaming pattern is used for continuous calculations where the worker processes data in a loop.

```typescript
// Main thread
worker.postMessage({ type: 'startPhysics', config });

worker.onmessage = (e) => {
  const { type, positions } = e.data;

  if (type === 'physicsUpdate') {
    // Apply updated positions to particles
    // Send new data to worker for next frame
    worker.postMessage({ type: 'updateData', newData }, [newData.buffer]);
  }
};

// Worker
let running = false;

self.onmessage = (e) => {
  const { type, config, newData } = e.data;

  if (type === 'startPhysics') {
    running = true;
    runPhysicsLoop(config);
  } else if (type === 'updateData') {
    // Update internal data with new data from main thread
  } else if (type === 'stopPhysics') {
    running = false;
  }
};

function runPhysicsLoop(config) {
  if (!running) return;

  // Perform physics calculations
  const positions = updatePositions();

  // Send updated positions to main thread
  self.postMessage({ type: 'physicsUpdate', positions }, [positions.buffer]);

  // Schedule next iteration
  setTimeout(() => runPhysicsLoop(config), config.interval);
}
```

## Conclusion
The Web Worker architecture for Bitcoin Protozoa enables efficient parallel processing of compute-intensive tasks, keeping the main thread free for rendering and UI updates. By using specialized workers for different tasks, transferable objects for efficient data transfer, and a worker pool for resource management, the architecture provides a scalable and performant foundation for the particle-based simulation.
