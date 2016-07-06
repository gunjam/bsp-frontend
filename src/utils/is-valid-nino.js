const ninoMatcher = /^(?!BG|GB|NK|KN|TN|NT|ZZ)[ABCEGHJ-PRSTW-Z]{2}\d{6}[A-D]$/;

module.exports = function (nino) {
  const sanitised = nino.toString().toLowerCase().replace(/\s/g);
  return sanitised.match(ninoMatcher) !== null;
};
