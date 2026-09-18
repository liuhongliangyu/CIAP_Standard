export type FlowNodeType =
  | 'START'
  | 'ACTION'
  | 'DECISION'
  | 'WAIT_EVENT'
  | 'END';

export interface FlowNode {
  id:string;
  type:FlowNodeType;
  next?:string[];
}

export interface FlowDefinition {
  id:string;
  nodes:FlowNode[];
}

export interface FlowInstance {
  id:string;
  definitionId:string;
  currentNode:string;
}
