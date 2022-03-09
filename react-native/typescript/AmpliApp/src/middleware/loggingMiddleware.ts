import {Middleware} from '@amplitude/react-native';

/**
 * Logging Middleware
 *
 * Logs all the things
 *
 * @param payload
 * @param next
 */
export const loggingMiddleware: Middleware = (payload, next) => {
  const jsons = (o: any) => JSON.stringify(o, undefined, 2);

  const {event} = payload as any;

  const eventJson = jsons(event);

  console.log(`[ampli] event='${eventJson}`);

  next(payload);
};

export default loggingMiddleware;
