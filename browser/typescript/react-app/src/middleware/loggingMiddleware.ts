import { Middleware } from '../ampli';

/**
 * Logging Middleware
 *
 * Logs all the things
 *
 * @param payload
 * @param next
 */
export const loggingMiddleware:Middleware = (payload, next) => {
  const jsons = (o: any) => JSON.stringify(o, undefined, 2);

  const { event: { event_type, event_properties, plan, user_id, device_id } } = payload;

  const id = user_id ?? device_id;
  const propsJson = jsons(event_properties);
  const planJson = plan ? ` plan=${jsons(plan)}` : '';

  console.log(`[ampli] id='${id}' event='${event_type}' properties=${propsJson}${planJson}`);

  next(payload);
};

export default loggingMiddleware;

