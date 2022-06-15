/**
 * Stop Middleware
 *
 * Stops following middleware from running
 *
 * @type {Middleware}
 */
export const stopMiddleware = (payload, next) => {
  // We don't call next, so everything after this middleware won't run
  // next(payload);
  console.log('Skipping following middlewares and next method.');
};

export default stopMiddleware;
