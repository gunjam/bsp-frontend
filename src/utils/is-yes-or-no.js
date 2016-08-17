'use strict';

const isYesNo = /^yes$|^no$/;

module.exports = function (input) {
  return (typeof input === 'string') ? isYesNo.test(input) : false;
};
