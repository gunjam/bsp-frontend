'use strict';

const base10 = 10;
const fullYear = 4;

module.exports = function (input) {
  if (input.year.length !== fullYear) {
    return false;
  }
  const day = parseInt(input.day, base10);
  const month = parseInt(input.month, base10) - 1;
  const year = parseInt(input.year, base10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }
  const date = new Date(year, month, day);

  if (date.getDate() !== day ||
      date.getMonth() !== month ||
      date.getFullYear() !== year) {
    return false;
  }
  return true;
};
