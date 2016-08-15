'use strict';

const template = require('./template.marko');

module.exports = function (req, res) {
  res.status(404);
  template.render({}, res);
};
