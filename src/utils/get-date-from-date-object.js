'use strict';

module.exports = function (dateObj) {
  return new Date(`${dateObj.year}-${dateObj.month}-${dateObj.day}`);
};
