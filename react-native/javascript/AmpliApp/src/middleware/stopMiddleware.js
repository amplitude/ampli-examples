/**
 * Stop Middleware
 *
 * Stops following middleware from running
 *
 */
export const stopMiddleware = () => {
  // We don't call next, so everything after this middleware won't run
  // next(payload);
  console.log('Stopping');
};

export default stopMiddleware;
