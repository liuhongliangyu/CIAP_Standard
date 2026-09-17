import type { EntityState } from '@ciap/operational-state';
import type { WorldEntity } from '@ciap/world-model';

export interface ProjectionContext {
  runtimeType: string;
  worldEntity: WorldEntity;
  operationalState?: EntityState;
}

export interface ProjectionAdapter<T = unknown> {
  entityType: string;
  create(ctx: ProjectionContext): Promise<T>;
  update(object: T, ctx: ProjectionContext): Promise<void>;
  dispose(object: T): Promise<void>;
}
