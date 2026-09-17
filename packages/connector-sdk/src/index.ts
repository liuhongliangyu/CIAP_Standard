export type ConnectorHealth = 'UP' | 'DOWN' | 'DEGRADED';

export interface Connector {
  id: string;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  health(): Promise<ConnectorHealth>;
}
