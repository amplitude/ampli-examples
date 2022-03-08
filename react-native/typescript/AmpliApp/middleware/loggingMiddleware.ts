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

  const {
    event: {event_type, event_properties, user_properties, group_properties},
  } = payload as any;

  const eventPropertiesJson = jsons(event_properties);
  const userPropertiesJson = jsons(user_properties);
  const groupPropertiesJson = jsons(group_properties);

  console.log(
    `[ampli] event='${event_type}' event_properties=${eventPropertiesJson} user_properties=${userPropertiesJson} group_properties=${groupPropertiesJson}`,
  );

  next(payload);
};

export default loggingMiddleware;
