# Worker System Implementation Plan for Bitcoin Protozoa (Part 1)

## Overview
This document outlines the implementation plan for the Worker System in the Bitcoin Protozoa project. The Worker System is critical for offloading computationally intensive tasks from the main thread, ensuring smooth performance even with large numbers of particles and complex behaviors.

## Core Worker System Components

### 1. Worker Bridge
The Worker Bridge provides a unified interface for creating, communicating with, and managing workers.

```typescript
/**
 * Create a new worker
 * @param scriptPath Path to the worker script
 * @param options Worker options
 * @returns Worker ID and worker instance
 */
function createWorker(
  scriptPath: string,
  options?: {
    type?: 'module' | 'classic';
    name?: string;
    shared?: boolean;
  }
): { id: number; worker: Worker | SharedWorker } {
  const id = nextWorkerId++;
  
  let worker: Worker | SharedWorker;
  if (options?.shared) {
    worker = new SharedWorker(scriptPath, {
      type: options?.type || 'classic',
      name: options?.name || `worker-${id}`
    });
  } else {
    worker = new Worker(scriptPath, {
      type: options?.type || 'classic',
      name: options?.name || `worker-${id}`
    });
  }
  
  workers.set(id, worker);
  return { id, worker };
}

/**
 * Send a message to a worker
 * @param workerId Worker ID
 * @param message Message to send
 * @param transferables Optional transferable objects
 * @returns Promise that resolves with the worker's response
 */
function sendMessage(
  workerId: number,
  message: WorkerMessage,
  transferables?: Transferable[]
): Promise<WorkerMessage> {
  return new Promise((resolve, reject) => {
    const worker = workers.get(workerId);
    if (!worker) {
      reject(new Error(`Worker with ID ${workerId} not found`));
      return;
    }
    
    const messageId = nextMessageId++;
    const messageWithId: WorkerMessage = {
      ...message,
      id: messageId.toString()
    };
    
    const handleMessage = (event: MessageEvent) => {
      const response = event.data as WorkerMessage;
      if (response.id === messageId.toString()) {
        if (worker instanceof Worker) {
          worker.removeEventListener('message', handleMessage);
        } else {
          (worker as SharedWorker).port.removeEventListener('message', handleMessage);
        }
        
        if (response.error) {
          reject(new Error(response.error.message));
        } else {
          resolve(response);
        }
      }
    };
    
    if (worker instanceof Worker) {
      worker.addEventListener('message', handleMessage);
      worker.postMessage(messageWithId, transferables || []);
    } else {
      (worker as SharedWorker).port.addEventListener('message', handleMessage);
      (worker as SharedWorker).port.postMessage(messageWithId, transferables || []);
    }
  });
}

/**
 * Terminate a worker
 * @param workerId Worker ID
 */
function terminateWorker(workerId: number): void {
  const worker = workers.get(workerId);
  if (!worker) {
    return;
  }
  
  if (worker instanceof Worker) {
    worker.terminate();
  } else {
    // SharedWorker doesn't have a terminate method
    // We can only close the port
    (worker as SharedWorker).port.close();
  }
  
  workers.delete(workerId);
}
```
