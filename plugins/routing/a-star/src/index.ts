import type { PathPlanner, PathPlanningRequest, Route } from '@ciap/policy-sdk';
import type { NavigationTopology } from '@ciap/world-model';

export class AStarPathPlanner implements PathPlanner {
  readonly id = 'routing.a-star';

  constructor(private readonly topology: NavigationTopology) {}

  async plan(request: PathPlanningRequest): Promise<Route> {
    // Sprint 2: replace placeholder with real A*.
    if (request.startNodeId === request.goalNodeId) {
      return { nodeIds: [request.startNodeId], edgeIds: [], cost: 0 };
    }
    const direct = this.topology.edges.find(
      (e) =>
        (e.from === request.startNodeId && e.to === request.goalNodeId) ||
        (e.bidirectional &&
          e.to === request.startNodeId &&
          e.from === request.goalNodeId),
    );
    if (!direct) {
      throw new Error('A* implementation pending: no direct edge available in Sprint 0 stub');
    }
    return {
      nodeIds: [request.startNodeId, request.goalNodeId],
      edgeIds: [direct.id],
      cost: direct.distance,
    };
  }
}
