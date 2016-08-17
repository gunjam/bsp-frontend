'use strict';

const twoDigits = /^[0-9]{2}$/;
const fourDigits = /^[0-9]{4}$/;

module.exports = function (input) {
  return twoDigits.test(input.day) && twoDigits.test(input.month) &&
    fourDigits.test(input.year);
};
