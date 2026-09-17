export interface StateTransition<S extends string = string> {
  from: S;
  event: string;
  to: S;
  guard?: string;
  effect?: string;
}

export interface StateMachineDefinition<S extends string = string> {
  id: string;
  initialState: S;
  states: S[];
  transitions: StateTransition<S>[];
}

export function nextState<S extends string>(
  machine: StateMachineDefinition<S>,
  current: S,
  event: string,
): S {
  const transition = machine.transitions.find(
    (x) => x.from === current && x.event === event,
  );
  return transition?.to ?? current;
}
