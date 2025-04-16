/**
 * Event Service
 * 
 * This service provides a centralized interface for working with events in the application.
 * It wraps the EventBus and provides additional functionality for common event scenarios.
 */

import { 
  Event, 
  EventType, 
  EventListener, 
  EventPriority, 
  EventSubscription,
  BlockEvent, 
  CreatureEvent, 
  MutationEvent
} from '../../types/events/events';
import { getEventBus } from '../../lib/eventBus';
import { Creature } from '../../types/creatures/creature';
import { BlockData } from '../../types/bitcoin/bitcoin';

// Singleton instance
let instance: EventService | null = null;

/**
 * Event Service class
 */
class EventService {
  private initialized: boolean = false;
  private serviceEventListeners: Map<string, string[]> = new Map();

  /**
   * Initialize the event service
   * @param enableLogging Whether to enable event logging
   * @param loggedTypes Specific event types to log
   */
  initialize(enableLogging: boolean = false, loggedTypes?: EventType[]): void {
    if (this.initialized) return;
    
    // Enable logging if requested
    if (enableLogging) {
      getEventBus().enableLogging(loggedTypes);
    }
    
    // Register global error handler
    window.addEventListener('error', (event) => {
      this.emitError('GLOBAL', event.error?.message || 'Unknown error', event.error);
    });
    
    // Register unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.emitError('PROMISE', event.reason?.message || 'Unhandled promise rejection', event.reason);
    });
    
    this.initialized = true;
  }

  /**
   * Subscribe to an event
   * @param type Event type to subscribe to
   * @param listener Listener function to be called when event is emitted
   * @param priority Priority of the listener
   * @param serviceId Optional service ID for cleanup
   * @returns Subscription object
   */
  on(
    type: EventType, 
    listener: EventListener, 
    priority: EventPriority = EventPriority.MEDIUM,
    serviceId?: string
  ): EventSubscription {
    const subscription = getEventBus().on(type, listener, priority);
    
    // Track subscription if serviceId is provided
    if (serviceId) {
      const subscriptions = this.serviceEventListeners.get(serviceId) || [];
      subscriptions.push(subscription.id);
      this.serviceEventListeners.set(serviceId, subscriptions);
    }
    
    return subscription;
  }

  /**
   * Subscribe to an event for one-time execution
   * @param type Event type to subscribe to
   * @param listener Listener function to be called when event is emitted
   * @param priority Priority of the listener
   * @param serviceId Optional service ID for cleanup
   * @returns Subscription object
   */
  once(
    type: EventType, 
    listener: EventListener, 
    priority: EventPriority = EventPriority.MEDIUM,
    serviceId?: string
  ): EventSubscription {
    const subscription = getEventBus().once(type, listener, priority);
    
    // Track subscription if serviceId is provided
    if (serviceId) {
      const subscriptions = this.serviceEventListeners.get(serviceId) || [];
      subscriptions.push(subscription.id);
      this.serviceEventListeners.set(serviceId, subscriptions);
    }
    
    return subscription;
  }

  /**
   * Unsubscribe from an event
   * @param subscriptionId ID of the subscription to remove
   * @returns True if subscription was removed, false otherwise
   */
  off(subscriptionId: string): boolean {
    return getEventBus().off(subscriptionId);
  }

  /**
   * Emit an event
   * @param event Event to emit
   */
  emit(event: Event): void {
    getEventBus().emit(event);
  }

  /**
   * Emit a block fetched event
   * @param blockNumber Block number
   * @param blockData Block data
   */
  emitBlockFetched(blockNumber: number, blockData: BlockData): void {
    const event: BlockEvent = {
      type: EventType.BLOCK_FETCHED,
      timestamp: Date.now(),
      source: 'BitcoinService',
      data: {
        blockNumber,
        blockData
      }
    };
    
    this.emit(event);
  }

  /**
   * Emit a creature created event
   * @param creature The created creature
   */
  emitCreatureCreated(creature: Creature): void {
    const event: CreatureEvent = {
      type: EventType.CREATURE_CREATED,
      timestamp: Date.now(),
      source: 'CreatureGenerator',
      data: {
        creatureId: creature.id,
        blockNumber: creature.blockNumber
      }
    };
    
    this.emit(event);
  }

  /**
   * Emit a mutation applied event
   * @param event Mutation event data
   */
  emitMutationApplied(event: MutationEvent): void {
    this.emit(event);
  }

  /**
   * Emit an error event
   * @param source Source of the error
   * @param message Error message
   * @param error Error object
   */
  emitError(source: string, message: string, error?: any): void {
    this.emit({
      type: EventType.ERROR,
      timestamp: Date.now(),
      source,
      priority: EventPriority.HIGH,
      data: {
        message,
        error
      }
    });
  }

  /**
   * Emit a warning event
   * @param source Source of the warning
   * @param message Warning message
   * @param data Additional data
   */
  emitWarning(source: string, message: string, data?: any): void {
    this.emit({
      type: EventType.WARNING,
      timestamp: Date.now(),
      source,
      data: {
        message,
        ...data
      }
    });
  }

  /**
   * Unsubscribe all listeners for a service
   * @param serviceId Service ID
   * @returns Number of subscriptions removed
   */
  unsubscribeService(serviceId: string): number {
    const subscriptions = this.serviceEventListeners.get(serviceId) || [];
    let count = 0;
    
    for (const subscriptionId of subscriptions) {
      if (this.off(subscriptionId)) {
        count++;
      }
    }
    
    this.serviceEventListeners.delete(serviceId);
    return count;
  }

  /**
   * Get event history
   * @param type Event type to get history for
   * @param limit Maximum number of events to return
   * @returns Array of events
   */
  getEventHistory(type?: EventType, limit?: number): Event[] {
    return getEventBus().getEventHistory(type, limit);
  }

  /**
   * Clear event history
   */
  clearEventHistory(): void {
    getEventBus().clearEventHistory();
  }

  /**
   * Enable event logging
   * @param types Event types to log
   */
  enableLogging(types?: EventType[]): void {
    getEventBus().enableLogging(types);
  }

  /**
   * Disable event logging
   */
  disableLogging(): void {
    getEventBus().disableLogging();
  }

  /**
   * Purge events older than a specified time
   * @param olderThan Time in milliseconds
   * @returns Number of events purged
   */
  purgeEvents(olderThan: number = 3600000): number {
    return getEventBus().purgeEvents(olderThan);
  }

  /**
   * Check if the service is initialized
   * @returns True if the service is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }
}

/**
 * Get the event service instance
 * @returns The event service singleton instance
 */
export function getEventService(): EventService {
  if (!instance) {
    instance = new EventService();
  }
  return instance;
} 
