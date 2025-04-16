# Worker System Implementation Plan for Bitcoin Protozoa (Part 2)

## Core Worker System Components (Continued)

### 2. Worker Pool
The Worker Pool manages a collection of workers, distributing tasks among them and handling load balancing.

```typescript
/**
 * Worker Pool class
 * Manages a pool of workers for efficient task distribution
 */
class WorkerPool {
  private workers: Map<number, Worker | SharedWorker> = new Map();
  private taskQueue: ComputeTask[] = [];
  private workerStatus: Map<number, 'idle' | 'busy'> = new Map();
  private options: ComputeOptions;
  
  /**
   * Create a new worker pool
   * @param options Worker pool options
   */
  constructor(options: ComputeOptions) {
    this.options = options;
    this.initialize();
  }
  
  /**
   * Initialize the worker pool
   */
  private initialize(): void {
    // Create workers
    for (let i = 0; i < this.options.workerCount; i++) {
      const { id, worker } = createWorker(this.options.workerUrl);
      this.workers.set(id, worker);
      this.workerStatus.set(id, 'idle');
    }
    
    // Start processing tasks
    this.processQueue();
  }
  
  /**
   * Add a task to the queue
   * @param task Task to add
   * @returns Promise that resolves with the task result
   */
  public addTask(task: Omit<ComputeTask, 'id' | 'created'>): Promise<any> {
    return new Promise((resolve, reject) => {
      const fullTask: ComputeTask = {
        ...task,
        id: crypto.randomUUID(),
        created: Date.now(),
        callback: (result) => {
          resolve(result);
        },
        errorHandler: (error) => {
          reject(error);
        }
      };
      
      this.taskQueue.push(fullTask);
      this.processQueue();
    });
  }
  
  /**
   * Process the task queue
   */
  private processQueue(): void {
    // Find idle workers
    const idleWorkerIds: number[] = [];
    this.workerStatus.forEach((status, id) => {
      if (status === 'idle') {
        idleWorkerIds.push(id);
      }
    });
    
    // Process tasks if we have idle workers and tasks in the queue
    while (idleWorkerIds.length > 0 && this.taskQueue.length > 0) {
      const workerId = idleWorkerIds.pop()!;
      const task = this.taskQueue.shift()!;
      
      this.workerStatus.set(workerId, 'busy');
      
      // Send task to worker
      sendMessage(workerId, {
        type: task.type,
        data: task.data
      }).then((response) => {
        // Task completed
        this.workerStatus.set(workerId, 'idle');
        
        // Call callback with result
        if (task.callback) {
          task.callback(response.data);
        }
        
        // Process more tasks
        this.processQueue();
      }).catch((error) => {
        // Task failed
        this.workerStatus.set(workerId, 'idle');
        
        // Call error handler
        if (task.errorHandler) {
          task.errorHandler(error);
        }
        
        // Process more tasks
        this.processQueue();
      });
    }
  }
  
  /**
   * Terminate all workers
   */
  public terminate(): void {
    this.workers.forEach((worker, id) => {
      terminateWorker(id);
    });
    
    this.workers.clear();
    this.workerStatus.clear();
    this.taskQueue = [];
  }
}
```
