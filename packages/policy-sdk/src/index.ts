export interface PathPlanningRequest {
  agentId: string;
  topologyId: string;
  startNodeId: string;
  goalNodeId: string;
  constraints?: Record<string, unknown>;
}

export interface Route {
  nodeIds: string[];
  edgeIds: string[];
  cost: number;
}

export interface PathPlanner {
  id: string;
  plan(request: PathPlanningRequest): Promise<Route>;
}

export interface TransportTask {
  id: string;
  pickupEntityId: string;
  dropoffEntityId: string;
  priority?: number;
  createdAt?: number;
}

export interface MobileAgentSnapshot {
  id: string;
  status: string;
  nodeId?: string;
  soc?: number;
  capacity?: number;
}

export interface DispatchPolicy {
  id: string;
  assign(
    tasks: TransportTask[],
    agents: MobileAgentSnapshot[],
  ): Promise<Array<{ taskId: string; agentId: string }>>;
}

export interface QueueItem {
  id: string;
  priority?: number;
  createdAt: number;
  dueAt?: number;
  processingTimeMs?: number;
}

export interface QueuePolicy {
  id: string;
  order(items: QueueItem[]): QueueItem[];
}

export interface SchedulingInput {
  orders: unknown[];
  resources: unknown[];
  currentState?: unknown;
}

export interface SchedulingPlan {
  assignments: unknown[];
}

export interface Scheduler {
  id: string;
  schedule(input: SchedulingInput): Promise<SchedulingPlan>;
}
