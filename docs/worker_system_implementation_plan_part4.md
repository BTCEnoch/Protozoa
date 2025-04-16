# Worker System Implementation Plan for Bitcoin Protozoa (Part 4)

## Worker Types

### 1. Physics Workers
Physics workers handle force calculations and position updates for particles.

```typescript
// physics/forceWorker.ts
self.addEventListener('message', (event) => {
  const message = event.data as PhysicsWorkerMessage;
  
  try {
    switch (message.type) {
      case 'calculateForces':
        const result = calculateForces(message.data);
        self.postMessage({
          type: 'result',
          id: message.id,
          data: result
        }, result.transferables);
        break;
        
      case 'initialize':
        // Initialize worker state
        self.postMessage({
          type: 'result',
          id: message.id,
          data: { initialized: true }
        });
        break;
        
      case 'reset':
        // Reset worker state
        self.postMessage({
          type: 'result',
          id: message.id,
          data: { reset: true }
        });
        break;
        
      default:
        throw new Error(`Unknown message type: ${message.type}`);
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      id: message.id,
      error: {
        message: error.message,
        stack: error.stack
      }
    });
  }
});

/**
 * Calculate forces for particles
 * @param data Physics data
 * @returns Force calculation result
 */
function calculateForces(data: any): {
  forces: Float32Array;
  transferables: Transferable[];
} {
  const {
    positions,
    velocities,
    masses,
    forceFields,
    constraints
  } = data;
  
  // Create forces array
  const forces = new Float32Array(positions.length);
  
  // Calculate forces
  // ... implementation details ...
  
  return {
    forces,
    transferables: [forces.buffer]
  };
}
```

### 2. Behavior Workers
Behavior workers handle complex behaviors like flocking and pattern formation.

```typescript
// behavior/flockingWorker.ts
self.addEventListener('message', (event) => {
  const message = event.data as BehaviorWorkerMessage;
  
  try {
    switch (message.type) {
      case 'calculateBehavior':
        const result = calculateFlockingBehavior(message.data);
        self.postMessage({
          type: 'result',
          id: message.id,
          data: result
        }, result.transferables);
        break;
        
      case 'initialize':
        // Initialize worker state
        self.postMessage({
          type: 'result',
          id: message.id,
          data: { initialized: true }
        });
        break;
        
      case 'reset':
        // Reset worker state
        self.postMessage({
          type: 'result',
          id: message.id,
          data: { reset: true }
        });
        break;
        
      default:
        throw new Error(`Unknown message type: ${message.type}`);
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      id: message.id,
      error: {
        message: error.message,
        stack: error.stack
      }
    });
  }
});

/**
 * Calculate flocking behavior for particles
 * @param data Behavior data
 * @returns Flocking behavior result
 */
function calculateFlockingBehavior(data: any): {
  velocities: Float32Array;
  transferables: Transferable[];
} {
  const {
    positions,
    velocities,
    groups,
    behaviors
  } = data;
  
  // Create new velocities array
  const newVelocities = new Float32Array(velocities.length);
  
  // Calculate flocking behavior
  // ... implementation details ...
  
  return {
    velocities: newVelocities,
    transferables: [newVelocities.buffer]
  };
}
```
