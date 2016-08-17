'use strict';

const validNino = /^(?!BG|GB|NK|KN|TN|NT|ZZ)[ABCEGHJ-PRSTW-Z]{2}\d{6}[A-D]$/i;
const allSpaces = /\s/g;

module.exports = function (input) {
  const sanitised = `${input}`.replace(allSpaces, '');
  return validNino.test(sanitised);
};
