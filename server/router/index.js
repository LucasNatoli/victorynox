'use strict'

const routes = [
  require('./accounts'),
  require('./historical'),
  require('./orders'),
  require('./service'),
  require('./user'),
  require('./portfolio')
];

module.exports = function router(app) {
  return routes.forEach((route) => {
    route(app);
  })
};