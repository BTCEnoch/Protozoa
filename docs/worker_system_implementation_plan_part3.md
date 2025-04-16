# Worker System Implementation Plan for Bitcoin Protozoa (Part 3)

## Core Worker System Components (Continued)

### 3. Transferable Utilities
Transferable utilities help efficiently transfer data between the main thread and workers.

```typescript
/**
 * Create a transferable object from a data structure
 * @param data Data to convert to transferable
 * @returns Transferable data and transferable objects
 */
function createTransferable<T>(data: T): { data: T; transferables: Transferable[] } {
  const transferables: Transferable[] = [];
  
  // Deep clone the data to avoid modifying the original
  const clonedData = JSON.parse(JSON.stringify(data));
  
  // Find and collect transferable objects
  collectTransferables(clonedData, transferables);
  
  return { data: clonedData, transferables };
}

/**
 * Collect transferable objects from a data structure
 * @param data Data to search for transferables
 * @param transferables Array to collect transferables into
 */
function collectTransferables(data: any, transferables: Transferable[]): void {
  if (!data) {
    return;
  }
  
  if (data instanceof ArrayBuffer || data instanceof MessagePort) {
    transferables.push(data);
    return;
  }
  
  if (
    data instanceof Float32Array ||
    data instanceof Int32Array ||
    data instanceof Uint32Array ||
    data instanceof Uint8Array ||
    data instanceof Uint16Array
  ) {
    transferables.push(data.buffer);
    return;
  }
  
  if (Array.isArray(data)) {
    for (const item of data) {
      collectTransferables(item, transferables);
    }
    return;
  }
  
  if (typeof data === 'object') {
    for (const key in data) {
      collectTransferables(data[key], transferables);
    }
    return;
  }
}

/**
 * Apply transferable data to a target object
 * @param target Target object to apply data to
 * @param data Transferable data
 */
function applyTransferable(target: any, data: any): void {
  if (!target || !data) {
    return;
  }
  
  if (typeof data !== 'object') {
    return;
  }
  
  for (const key in data) {
    if (
      data[key] instanceof Float32Array ||
      data[key] instanceof Int32Array ||
      data[key] instanceof Uint32Array ||
      data[key] instanceof Uint8Array ||
      data[key] instanceof Uint16Array
    ) {
      target[key] = data[key];
    } else if (Array.isArray(data[key])) {
      if (!target[key]) {
        target[key] = [];
      }
      applyTransferable(target[key], data[key]);
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      if (!target[key]) {
        target[key] = {};
      }
      applyTransferable(target[key], data[key]);
    } else {
      target[key] = data[key];
    }
  }
}
```
