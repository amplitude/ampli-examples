import { Middleware } from '@amplitude/types';

/**
 * Stop Middleware
 *
 * Stops following middleware from running
 *
 * @param payload
 * @param next
 */
export const stopMiddleware:Middleware = (payload, next) => {
  // We don't call next, so everything after this middleware won't run
  // next()
};

export default stopMiddleware;
