/**
 * @fileoverview React system configuration that allows proxying all requests
 * to the development server. This file does not need to be included anywhere
 * since it is used when `npm start` is invoked.
 *
 * See: https://bit.ly/2JfbgHX
 */

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  /** Proxies calls to our Google App Engine. */
  app.use(proxy('/gap/*', { target: 'http://localhost:8080/' }));
  /** Proxies calls to the Google Login Server. */
  app.use(proxy('/_ah/*', { target: 'http://localhost:8080/' }));
};
