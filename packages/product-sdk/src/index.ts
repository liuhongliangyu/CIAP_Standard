export interface ProductRecipe {
  id: string;
  version: string;
  runtimeTarget: 'web' | 'unity' | 'unreal';
  modules: string[];
  worldId: string;
  processIds: string[];
  flowIds: string[];
  policyBindings: Record<string, string>;
  sceneId: string;
  scenarioId?: string;
}
