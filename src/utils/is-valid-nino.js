'use strict';
const ninoMatcher = /^(?!BG|GB|NK|KN|TN|NT|ZZ)[ABCEGHJ-PRSTW-Z]{2}\d{6}[A-D]$/i;

module.exports = function (nino) {
  const sanitised = `${nino}`.replace(/\s/g, '');
  return ninoMatcher.test(sanitised);
};
