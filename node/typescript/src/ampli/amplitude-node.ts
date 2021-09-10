/**
 * This is the "Iteratively" functionality that needs to be added to @amplitude/node
 */
import * as Amplitude from '@amplitude/node';

export function cloneDeep(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export type Properties = { [name: string]: any; };

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
export type TrackOptions = Omit<Amplitude.Event, 'event_type' | 'event_properties'>;
export type IdentifyOptions = TrackOptions;

// Middleware

// Generic blob to let users pass data to middleware
export type Extra = { [name: string]: any; };

export type IdentifyArgs = {
  deviceId?: string;
};

export enum AmpliMethod {
  Identify,
  Group,
  Track,
  Flush,
  Reset
}

export type Payload = {
  userId?: string,
  event: Event,
  method: AmpliMethod,
  args?: IdentifyArgs;
  options?: TrackOptions | IdentifyOptions,
  extra?: Extra,
}
export type Next = () => void;

export type PayloadInternal = Payload & { out: Payload }

export type Middleware = (payload: PayloadInternal, next: Next) => void

export class NodeClient extends Amplitude.NodeClient {
  private middlewares: Middleware[] = [];

  addMiddleware(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  runMiddleware(payload: Payload, next: (p: Payload) => void): void {
    let mIndex = 0;
    const mCount = this.middlewares.length;
    let curPayload: PayloadInternal = {
      ...payload,
      out: {
        ...payload,
      }
    }

    if (mCount > 0) {
      const _next = () => {
        mIndex += 1;
        const { out } = curPayload;
        curPayload = { ...out, out: { ...out }};
        if (mIndex < mCount) {
          this.middlewares[mIndex](curPayload, _next)
        } else {
          next(out)
        }
      }

      this.middlewares[0](curPayload, _next)
    } else {
      next(curPayload);
    }
  }
}

/**
 * Internal function to create a new SDK client instance. The client is
 * installed and then bound to the current scope.
 *
 * @param apiKey API Key for project.
 * @param options Options to pass to the client.
 */
export function init(apiKey: string, options?: Partial<Amplitude.Options>) {
  return new NodeClient(apiKey, options);
}
