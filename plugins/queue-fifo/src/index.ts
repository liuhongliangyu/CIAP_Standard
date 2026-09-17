import type { QueueItem, QueuePolicy } from '@ciap/policy-sdk';

export class FIFOQueuePolicy implements QueuePolicy {
  readonly id = 'queue.fifo';

  order(items: QueueItem[]): QueueItem[] {
    return [...items].sort((a, b) => a.createdAt - b.createdAt);
  }
}
