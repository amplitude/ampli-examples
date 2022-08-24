/**
 * Logging Middleware
 *
 * Logs all the things
 *
 * @param payload
 * @param next
 */
export const loggingMiddleware = (payload, next) => {
  const {event, extra} = payload;
  console.log(`[ampli] event=${jsons(event)} extra=${jsons(extra)}`);

  next(payload);
};

const jsons = o => JSON.stringify(o, undefined, 2);

export default loggingMiddleware;
