export type MachineState =
  | 'IDLE'
  | 'PROCESSING'
  | 'FAULT';

export interface MachineJob {
  id: string;
  operation: string;
  durationMs: number;
}

export class BasicMachine {

  public state: MachineState = 'IDLE';

  constructor(
    public readonly id: string
  ) {}

  start(job: MachineJob) {
    if (this.state !== 'IDLE') {
      throw new Error('Machine unavailable');
    }

    this.state = 'PROCESSING';

    return {
      type: 'machine.processing.started',
      machineId: this.id,
      jobId: job.id
    };
  }

  complete() {
    this.state = 'IDLE';

    return {
      type: 'machine.processing.completed',
      machineId: this.id
    };
  }
}
