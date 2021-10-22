// Segment Convenience Types
import { MiddlewareExtra } from '@amplitude/types';

export type SegmentIdentityOptions = { anonymousId?: string; };

export type UserTrackExtra = MiddlewareExtra & {
  segment?: SegmentIdentityOptions,
}
