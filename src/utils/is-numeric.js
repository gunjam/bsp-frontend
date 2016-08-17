'use strict';

const isNumeric = /^[0-9]+$/;

module.exports = function (input) {
  return (typeof input === 'string') ? isNumeric.test(input) : false;
};
