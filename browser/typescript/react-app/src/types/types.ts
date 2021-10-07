import { Callback } from "amplitude-js";

export type Plan = {
  branch?: string;
  source?: string;
  version?: string;
  event_id?: string;
  event_version?: string;
}

export type BaseEvent = {
  event_type: string;
  plan: Plan;
  event_properties?: { [key: string]: any },
}

export type Event = BaseEvent;
export type IdentifyEvent = BaseEvent;
export type GroupEvent = BaseEvent;

type BaseEventOptions = Omit<BaseEvent, 'event_type' | 'event_properties'> & {
  callback: Callback;
  errorCallback: Callback,
};
export type EventOptions = BaseEventOptions ;
export type IdentifyOptions = BaseEventOptions;
export type GroupOptions = BaseEventOptions;

/**
 * Unstructured object to let users pass extra data to middleware
 */
export interface Extra {
  [name: string]: any;
}

/**
 * Data to be processed by middleware
 */
export interface MiddlewarePayload {
  event: Event;
  extra?: Extra;
}

/**
 * Function called at the end of each Middleware to run the next middleware in the chain
 */
export type Next = (payload: MiddlewarePayload) => void;

/**
 * A function to run on the Event stream (each logEvent call)
 *
 * @param payload The event and extra data being sent
 * @param next Function to run the next middleware in the chain, not calling next will end the middleware chain
 */
export type Middleware = (payload: MiddlewarePayload, next: Next) => void;