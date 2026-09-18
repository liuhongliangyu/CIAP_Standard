export interface Scenario {
  id:string;
  mode:'SIMULATION'|'LIVE'|'HYBRID'|'REPLAY';
  parameters:Record<string,unknown>;
}

export interface ExperimentResult {
  scenarioId:string;
  throughput:number;
  leadTime:number;
}

export interface ExperimentRunner {
  run(
    scenario:Scenario
  ):Promise<ExperimentResult>;
}
