'use strict';

const path = require('path');

module.exports = function (name) {
  const template = require(path.resolve(`src/pages/${name}/template.marko`));
  return (req, res) => {
    template.render({errors: false, values: req.getSession(name)}, res);
  };
};
