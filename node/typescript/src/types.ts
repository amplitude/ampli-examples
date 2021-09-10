// Segment Convenience Types
import { TrackOptions } from './ampli/amplitude-node';

export type SegmentIdentityOptions = { anonymousId?: string; };

export type UserTrackExtra = TrackOptions & {
  segment?: SegmentIdentityOptions,
}
