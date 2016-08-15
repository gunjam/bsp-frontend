'use strict';

const path = require('path');
const getSession = require('./get-session');

module.exports = function (name) {
  const template = require(path.resolve(`src/pages/${name}/template.marko`));
  return (req, res) => {
    template.render({
      errors: false,
      values: getSession(req, name),
      csrfToken: req.csrfToken()
    }, res);
  };
};
