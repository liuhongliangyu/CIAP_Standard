import { describe, expect, it } from 'vitest';
import { InMemoryOperationalStateStore } from '../src/index.js';

describe('OperationalStateStore', () => {
  it('stores latest entity state', () => {
    const store = new InMemoryOperationalStateStore();
    store.set({
      entityId: 'agv-01',
      entityType: 'mobile.agv',
      timestamp: 1,
      source: 'simulation',
      state: { status: 'IDLE' },
    });
    expect(store.get('agv-01')?.entityId).toBe('agv-01');
  });
});
