export type RuntimeMode = 'SIMULATION' | 'LIVE' | 'HYBRID' | 'REPLAY';

export interface SimulationEvent<T = unknown> {
  id: string;
  time: number;
  type: string;
  payload?: T;
}

export interface SimulationClock {
  now(): number;
  setSpeed(multiplier: number): void;
  pause(): void;
  resume(): void;
}

export interface SimulationKernel {
  schedule(event: SimulationEvent): void;
  cancel(eventId: string): void;
  step(): Promise<SimulationEvent | undefined>;
  runUntil(time: number): Promise<void>;
}

export class DiscreteEventKernel implements SimulationKernel, SimulationClock {
  private nowValue = 0;
  private events: SimulationEvent[] = [];
  private speed = 1;
  private paused = false;

  now(): number {
    return this.nowValue;
  }

  setSpeed(multiplier: number): void {
    if (multiplier <= 0) throw new Error('Simulation speed must be > 0');
    this.speed = multiplier;
  }

  pause(): void {
    this.paused = true;
  }

  resume(): void {
    this.paused = false;
  }

  schedule(event: SimulationEvent): void {
    this.events.push(event);
    this.events.sort((a, b) => a.time - b.time);
  }

  cancel(eventId: string): void {
    this.events = this.events.filter((x) => x.id !== eventId);
  }

  async step(): Promise<SimulationEvent | undefined> {
    if (this.paused) return undefined;
    const event = this.events.shift();
    if (!event) return undefined;
    this.nowValue = event.time;
    return event;
  }

  async runUntil(time: number): Promise<void> {
    while (!this.paused && this.events.length > 0 && this.events[0]!.time <= time) {
      await this.step();
    }
    this.nowValue = Math.max(this.nowValue, time);
    void this.speed;
  }
}
