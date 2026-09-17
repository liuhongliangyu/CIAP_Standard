import type {
  DispatchPolicy,
  MobileAgentSnapshot,
  TransportTask,
} from '@ciap/policy-sdk';

export class DecisionEngine {
  constructor(private readonly dispatchPolicy: DispatchPolicy) {}

  dispatch(
    tasks: TransportTask[],
    agents: MobileAgentSnapshot[],
  ): Promise<Array<{ taskId: string; agentId: string }>> {
    return this.dispatchPolicy.assign(tasks, agents);
  }
}
