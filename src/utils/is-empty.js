'use strict';

module.exports = function (input) {
  return input === undefined || !`${input}`.trim();
};
