/**
 * Logging Middleware
 *
 * Logs all the things
 *
 * @param payload
 * @param next
 */
import { Middleware } from "@amplitude/types";

export const loggingMiddleware:Middleware = (payload, next) => {
  const { event: { event_type, event_properties, plan, user_id, device_id }, extra } = payload;

  const id = user_id ?? device_id;
  const propsJson = jsons(event_properties);
  const planJson = plan ? ` plan=${jsons(plan)}` : '';
  const extraJson = jsons(extra);

  console.log(`[ampli] id='${id}' event='${event_type}' properties=${propsJson}${planJson} extra=${extraJson}`);

  next(payload);
};

const jsons = (o: any) => JSON.stringify(o, undefined, 2);

export default loggingMiddleware;

