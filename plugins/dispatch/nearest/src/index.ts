import type {
  DispatchPolicy,
  MobileAgentSnapshot,
  TransportTask,
} from '@ciap/policy-sdk';

export class NearestAvailableDispatchPolicy implements DispatchPolicy {
  readonly id = 'dispatch.nearest-available';

  async assign(
    tasks: TransportTask[],
    agents: MobileAgentSnapshot[],
  ): Promise<Array<{ taskId: string; agentId: string }>> {
    const available = agents.filter((a) => a.status === 'IDLE' && (a.soc ?? 100) >= 20);
    return tasks.slice(0, available.length).map((task, index) => ({
      taskId: task.id,
      agentId: available[index]!.id,
    }));
  }
}
