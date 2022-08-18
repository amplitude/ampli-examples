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
  const {event, extra} = payload;
  console.log(`[ampli] event=${jsons(event)} extra=${jsons(extra)}`);

  next(payload);
};

const jsons = (o: any) => JSON.stringify(o, undefined, 2);

export default loggingMiddleware;
