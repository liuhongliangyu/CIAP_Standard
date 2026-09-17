export interface ResourceRequirement {
  resourceType: string;
  count: number;
}

export type DurationModel =
  | { type: 'deterministic'; valueMs: number }
  | { type: 'normal'; meanMs: number; stddevMs: number }
  | { type: 'exponential'; meanMs: number };

export interface ProcessOperation {
  id: string;
  requiredCapabilities: string[];
  requiredResources?: ResourceRequirement[];
  durationModel: DurationModel;
}

export interface ProcessTransition {
  from: string;
  to: string;
}

export interface ProcessDefinition {
  id: string;
  version: string;
  operations: ProcessOperation[];
  transitions: ProcessTransition[];
}
