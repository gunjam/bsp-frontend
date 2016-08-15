'use strict';

const template = require('./template.marko');

module.exports = function (req, res) {
  template.render({}, res);
};
