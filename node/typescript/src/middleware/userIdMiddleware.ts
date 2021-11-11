import { Middleware } from '@amplitude/types';

type IdResolver = () => string | undefined;

const defaultIdResolver = () => undefined;

export function getUserIdMiddleware(
  userIdResolver: IdResolver = defaultIdResolver,
  deviceIdResolver: IdResolver = defaultIdResolver
): Middleware {

  /**
   * User Id Middleware
   *
   * Sets userId and deviceId from centralized resolvers
   *
   * @param payload
   * @param next
   */
  const userIdMiddleware: Middleware = (payload, next) => {
    const nextPayload = { ...payload };
    const { user_id, device_id, event_type } = payload.event;

    const resolvedUserId = user_id || (device_id ? undefined : userIdResolver());
    const resolvedDeviceId = device_id || (resolvedUserId ? undefined : deviceIdResolver());

    nextPayload.event.user_id = resolvedUserId;
    nextPayload.event.device_id = resolvedDeviceId;

    if (user_id !== resolvedUserId) {
      console.log(`userIdMiddleware(${event_type}) user_id:${user_id} => ${resolvedUserId}`);
    }
    if (device_id !== resolvedDeviceId) {
      console.log(`userIdMiddleware(${event_type}) device_id:${device_id} => ${resolvedDeviceId}`);
    }

    next(nextPayload);
  };

  return userIdMiddleware;
}

export default getUserIdMiddleware;

