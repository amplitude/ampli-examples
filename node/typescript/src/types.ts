// Segment Convenience Types
import { Extra } from '@amplitude/types';

export type SegmentIdentityOptions = { anonymousId?: string; };

export type UserTrackExtra = Extra & {
  segment?: SegmentIdentityOptions,
}
