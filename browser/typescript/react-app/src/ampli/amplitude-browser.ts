import * as Ampltiude from 'amplitude-js';

export type Properties = { [name: string]: any };

export type Event = {
  name: string;
  properties?: Properties;
  id?: string;
  version?: string;
  destinations?: Record<string, boolean>;
};

export enum Validation {
  Disabled,
  ErrorOnInvalid,
}

// Amplitude specific options
export type TrackOptions = {
  callback?: Ampltiude.Callback;
};

export type IdentifyOptions = {
  callback?: Ampltiude.Callback;
};

export const AmpIdentify = Ampltiude.Identify;

// Middleware

// Generic blob to let users pass data to middleware
export type Extra = { [name: string]: any };

export type IdentifyArgs = {
  deviceId?: string;
};

export enum AmpliMethod {
  Identify,
  Group,
  Track,
  Flush,
  Reset,
}

export type Payload = {
  userId?: string;
  event: Event;
  method: AmpliMethod;
  args?: IdentifyArgs;
  options?: TrackOptions | IdentifyOptions;
  extra?: Extra;
};

export type Next = () => void;

export type PayloadInternal = Payload & { out: Payload };

export type Middleware = (payload: PayloadInternal, next: Next) => void;
