export interface ActionContract<I = unknown, O = unknown> {
  id: string;
  version: number;
  inputSchema: unknown;
  outputSchema: unknown;
  permission?: string;
  timeoutMs?: number;
  idempotent?: boolean;
}

export interface DomainEvent<T = unknown> {
  id: string;
  version: number;
  eventId: string;
  occurredAt: number;
  source: string;
  correlationId?: string;
  payload: T;
}

export interface EventBus {
  publish<T>(event: DomainEvent<T>): Promise<void>;
  subscribe<T>(
    eventId: string,
    handler: (event: DomainEvent<T>) => Promise<void> | void,
  ): () => void;
}

export interface ActionExecutor {
  execute<I = unknown, O = unknown>(
    actionId: string,
    input: I,
  ): Promise<O>;
}
