module.exports = function (input) {
  if (typeof input !== 'string') {
    return false;
  }
  const lowerCaseInput = input.toLowerCase();
  return lowerCaseInput === 'yes' || lowerCaseInput === 'no';
};
