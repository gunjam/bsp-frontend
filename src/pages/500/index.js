'use strict';

const template = require('./template.marko');

const developmentMode = process.env.NODE_ENV === 'development';

module.exports = function (err, req, res, _next) {
  template.render({err, developmentMode}, res);
};
