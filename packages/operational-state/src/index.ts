export type StateSource = 'simulation' | 'live' | 'hybrid' | 'replay';

export interface EntityState<T = unknown> {
  entityId: string;
  entityType: string;
  timestamp: number;
  state: T;
  source: StateSource;
}

export interface OperationalStateStore {
  get<T = unknown>(entityId: string): EntityState<T> | undefined;
  set<T = unknown>(next: EntityState<T>): void;
  subscribe(
    entityId: string,
    handler: (state: EntityState) => void,
  ): () => void;
}

export class InMemoryOperationalStateStore implements OperationalStateStore {
  private readonly states = new Map<string, EntityState>();
  private readonly listeners = new Map<string, Set<(state: EntityState) => void>>();

  get<T = unknown>(entityId: string): EntityState<T> | undefined {
    return this.states.get(entityId) as EntityState<T> | undefined;
  }

  set<T = unknown>(next: EntityState<T>): void {
    this.states.set(next.entityId, next);
    this.listeners.get(next.entityId)?.forEach((fn) => fn(next));
  }

  subscribe(entityId: string, handler: (state: EntityState) => void): () => void {
    const set = this.listeners.get(entityId) ?? new Set();
    set.add(handler);
    this.listeners.set(entityId, set);
    return () => set.delete(handler);
  }
}

export type MachineStatus =
  | 'OFFLINE'
  | 'IDLE'
  | 'SETUP'
  | 'READY'
  | 'PROCESSING'
  | 'BLOCKED'
  | 'STARVED'
  | 'FAULT'
  | 'MAINTENANCE';

export type AGVStatus =
  | 'IDLE'
  | 'ASSIGNED'
  | 'MOVING_TO_PICKUP'
  | 'LOADING'
  | 'TRANSPORTING'
  | 'UNLOADING'
  | 'CHARGING'
  | 'BLOCKED'
  | 'FAULT';
