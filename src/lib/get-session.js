'use strict';

module.exports = function (req, name) {
  return (req.session || {})[name] || {};
};
