import { describe, expect, it } from 'vitest';
import { InMemoryWorldService, type World } from '../src/index.js';

describe('InMemoryWorldService', () => {
  it('resolves an entity', () => {
    const world: World = {
      id: 'w1',
      coordinateSystem: 'metric',
      unit: 'meter',
      entities: [{ id: 'machine-01', type: 'machine' }],
      zones: [],
      topologies: [],
    };
    const service = new InMemoryWorldService(world);
    expect(service.getEntity('machine-01')?.type).toBe('machine');
  });
});
