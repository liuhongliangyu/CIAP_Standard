export type CIAPId = string;
export type ISODateTime = string;

export interface Identified {
  id: CIAPId;
}

export interface Versioned {
  version: string;
}

export interface Owned {
  owner: string;
}

export interface Metadata {
  name?: string;
  description?: string;
  tags?: string[];
}

export type LifecycleStatus =
  | 'Draft'
  | 'Experimental'
  | 'Stable'
  | 'Deprecated'
  | 'Retired';

export interface Clock {
  now(): number;
}

export class SystemClock implements Clock {
  now(): number {
    return Date.now();
  }
}

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };
