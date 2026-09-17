import type { ActionExecutor, EventBus } from '@ciap/contracts';
import type { Clock } from '@ciap/core';
import type { OperationalStateStore } from '@ciap/operational-state';
import type { InMemoryWorldService } from '@ciap/world-model';
import type { RuntimeMode } from '@ciap/simulation-kernel';
import type { DecisionEngine } from '@ciap/decision-engine';

export interface RuntimeContext {
  mode: RuntimeMode;
  clock: Clock;
  world: InMemoryWorldService;
  state: OperationalStateStore;
  events: EventBus;
  actions: ActionExecutor;
  decisions: DecisionEngine;
}

export interface CIAPRuntime {
  loadProduct(productId: string): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
}
