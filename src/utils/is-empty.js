module.exports = function (value) {
  return value === undefined || !`${value}`.trim();
};
