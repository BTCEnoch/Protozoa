/**
 * Event Bus Implementation
 * 
 * This file implements the event bus system for the Bitcoin Protozoa project.
 * The event bus enables decoupled communication between different components
 * through an event-driven architecture.
 */

import { 
  Event, 
  EventType, 
  EventBus, 
  EventListener, 
  EventPriority, 
  EventSubscription 
} from '../types/events';
import { v4 as uuidv4 } from 'uuid';

/**
 * Event Bus class
 * Implementation of the EventBus interface
 */
export class EventBusImpl implements EventBus {
  private subscriptions: Map<EventType, EventSubscription[]> = new Map();
  private eventHistory: Event[] = [];
  private loggingEnabled: boolean = false;
  private loggedTypes: Set<EventType> | null = null;
  private pendingEvents: Event[] = [];
  private historyLimit: number = 1000; // Default limit for event history

  /**
   * Subscribe to an event
   * @param type Event type to subscribe to
   * @param listener Listener function to be called when event is emitted
   * @param priority Priority of the listener (optional)
   * @returns Subscription object
   */
  public on(
    type: EventType, 
    listener: EventListener, 
    priority: EventPriority = EventPriority.MEDIUM
  ): EventSubscription {
    const subscription: EventSubscription = {
      id: uuidv4(),
      type,
      listener,
      priority,
      once: false
    };

    this.addSubscription(subscription);
    return subscription;
  }

  /**
   * Subscribe to an event for one-time execution
   * @param type Event type to subscribe to
   * @param listener Listener function to be called when event is emitted
   * @param priority Priority of the listener (optional)
   * @returns Subscription object
   */
  public once(
    type: EventType, 
    listener: EventListener, 
    priority: EventPriority = EventPriority.MEDIUM
  ): EventSubscription {
    const subscription: EventSubscription = {
      id: uuidv4(),
      type,
      listener,
      priority,
      once: true
    };

    this.addSubscription(subscription);
    return subscription;
  }

  /**
   * Unsubscribe from an event
   * @param subscriptionId ID of the subscription to remove
   * @returns True if subscription was removed, false otherwise
   */
  public off(subscriptionId: string): boolean {
    for (const [type, subs] of this.subscriptions.entries()) {
      const index = subs.findIndex(sub => sub.id === subscriptionId);
      if (index !== -1) {
        subs.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  /**
   * Emit an event
   * @param event Event to emit
   */
  public emit(event: Event): void {
    // Add timestamp if not provided
    if (!event.timestamp) {
      event.timestamp = Date.now();
    }

    // Log event if logging is enabled
    this.logEvent(event);

    // Add event to history
    this.addToHistory(event);

    // Get subscriptions for this event type
    const subs = this.subscriptions.get(event.type) || [];

    // Sort subscriptions by priority
    const sortedSubs = [...subs].sort((a, b) => {
      const priorityOrder: Record<EventPriority, number> = {
        [EventPriority.HIGH]: 0,
        [EventPriority.MEDIUM]: 1,
        [EventPriority.LOW]: 2
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    // Execute listeners
    const onceSubs: EventSubscription[] = [];
    
    // Get all the once subscriptions to be removed
    sortedSubs.forEach(sub => {
      try {
        sub.listener(event);
        if (sub.once) {
          onceSubs.push(sub);
        }
      } catch (error) {
        console.error(`Error in event listener for ${event.type}:`, error);
      }
    });

    // Remove once subscriptions
    onceSubs.forEach(sub => this.off(sub.id));
  }

  /**
   * Remove all listeners
   * @param type Event type to remove listeners for (optional)
   */
  public removeAllListeners(type?: EventType): void {
    if (type) {
      this.subscriptions.delete(type);
    } else {
      this.subscriptions.clear();
    }
  }

  /**
   * Get the number of listeners
   * @param type Event type to get listener count for (optional)
   * @returns The number of listeners
   */
  public getListenerCount(type?: EventType): number {
    if (type) {
      return this.subscriptions.get(type)?.length || 0;
    } else {
      let count = 0;
      for (const subs of this.subscriptions.values()) {
        count += subs.length;
      }
      return count;
    }
  }

  /**
   * Get event history
   * @param type Event type to get history for (optional)
   * @param limit Maximum number of events to return (optional)
   * @returns Array of events
   */
  public getEventHistory(type?: EventType, limit?: number): Event[] {
    let filteredHistory = [...this.eventHistory];
    
    if (type) {
      filteredHistory = filteredHistory.filter(event => event.type === type);
    }
    
    const actualLimit = limit || filteredHistory.length;
    return filteredHistory.slice(-actualLimit);
  }

  /**
   * Clear event history
   */
  public clearEventHistory(): void {
    this.eventHistory = [];
  }

  /**
   * Enable event logging
   * @param types Event types to log (optional, logs all if not provided)
   */
  public enableLogging(types?: EventType[]): void {
    this.loggingEnabled = true;
    
    if (types && types.length > 0) {
      this.loggedTypes = new Set(types);
    } else {
      this.loggedTypes = null; // Log all types
    }
  }

  /**
   * Disable event logging
   */
  public disableLogging(): void {
    this.loggingEnabled = false;
  }

  /**
   * Get pending events
   * @returns Array of pending events
   */
  public getPendingEvents(): Event[] {
    return [...this.pendingEvents];
  }

  /**
   * Purge events older than a specified time
   * @param olderThan Time in milliseconds
   * @returns Number of events purged
   */
  public purgeEvents(olderThan: number = 3600000): number { // Default: 1 hour
    const now = Date.now();
    const initialCount = this.eventHistory.length;
    
    this.eventHistory = this.eventHistory.filter(
      event => (now - event.timestamp) <= olderThan
    );
    
    return initialCount - this.eventHistory.length;
  }

  /**
   * Set the history limit
   * @param limit Maximum number of events to keep in history
   */
  public setHistoryLimit(limit: number): void {
    this.historyLimit = limit;
    
    // Trim history if it exceeds the new limit
    if (this.eventHistory.length > this.historyLimit) {
      this.eventHistory = this.eventHistory.slice(-this.historyLimit);
    }
  }

  /**
   * Add a subscription to the event bus
   * @param subscription Subscription to add
   */
  private addSubscription(subscription: EventSubscription): void {
    if (!this.subscriptions.has(subscription.type)) {
      this.subscriptions.set(subscription.type, []);
    }
    
    this.subscriptions.get(subscription.type)!.push(subscription);
  }

  /**
   * Add an event to the history
   * @param event Event to add
   */
  private addToHistory(event: Event): void {
    this.eventHistory.push(event);
    
    // Trim history if it exceeds the limit
    if (this.eventHistory.length > this.historyLimit) {
      this.eventHistory.shift();
    }
  }

  /**
   * Log an event
   * @param event Event to log
   */
  private logEvent(event: Event): void {
    if (!this.loggingEnabled) return;
    
    if (this.loggedTypes === null || this.loggedTypes.has(event.type)) {
      const logData = {
        type: event.type,
        timestamp: new Date(event.timestamp).toISOString(),
        data: event.data
      };
      
      console.log(`[EVENT] ${event.type}:`, logData);
    }
  }
}

// Singleton instance
let eventBusInstance: EventBus | null = null;

/**
 * Get the event bus instance
 * @returns The singleton event bus instance
 */
export function getEventBus(): EventBus {
  if (!eventBusInstance) {
    eventBusInstance = new EventBusImpl();
  }
  return eventBusInstance;
}

/**
 * Reset the event bus instance (for testing)
 */
export function resetEventBus(): void {
  eventBusInstance = null;
} 