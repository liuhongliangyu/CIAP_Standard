export interface SpatialComponent {
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number, number];
}

export interface WorldEntity {
  id: string;
  type: string;
  templateId?: string;
  spatial?: SpatialComponent;
  attributes?: Record<string, unknown>;
}

export interface ZoneRule {
  type: string;
  value: unknown;
}

export interface Zone {
  id: string;
  type: string;
  polygon?: Array<[number, number]>;
  rules?: ZoneRule[];
}

export interface NavNode {
  id: string;
  position: [number, number, number];
}

export interface NavEdge {
  id: string;
  from: string;
  to: string;
  distance: number;
  speedLimit?: number;
  capacity?: number;
  bidirectional?: boolean;
}

export interface NavigationTopology {
  id: string;
  nodes: NavNode[];
  edges: NavEdge[];
}

export interface World {
  id: string;
  coordinateSystem: 'metric';
  unit: 'meter';
  entities: WorldEntity[];
  zones: Zone[];
  topologies: NavigationTopology[];
}

export interface WorldService {
  getWorld(): World;
  getEntity(id: string): WorldEntity | undefined;
  getTopology(id: string): NavigationTopology | undefined;
}

export class InMemoryWorldService implements WorldService {
  constructor(private readonly world: World) {}

  getWorld(): World {
    return this.world;
  }

  getEntity(id: string): WorldEntity | undefined {
    return this.world.entities.find((x) => x.id === id);
  }

  getTopology(id: string): NavigationTopology | undefined {
    return this.world.topologies.find((x) => x.id === id);
  }
}
