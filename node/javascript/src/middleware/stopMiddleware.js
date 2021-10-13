/**
 * Stop Middleware
 *
 * Stops following middleware from running
 *
 * @type {Middleware}
 */
const stopMiddleware = (payload, next) => {
  // We don't call next, so everything after this middleware won't run
  // next()
};

module.exports.stopMiddleware = stopMiddleware;

