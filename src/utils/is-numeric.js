'use strict';

const matcher = /[0-9]/;

module.exports = function (value) {
  return matcher.test(value.trim());
};
