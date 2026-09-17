import { describe, expect, it } from 'vitest';
import { SystemClock } from '../src/index.js';

describe('SystemClock', () => {
  it('returns a positive epoch timestamp', () => {
    expect(new SystemClock().now()).toBeGreaterThan(0);
  });
});
