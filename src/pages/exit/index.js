const getSession = require('../../lib/get-session');
const template = require('./template.marko');

module.exports = function (req, res) {
  const data = getSession(req, 'exit');
  template.render(data, res);
};
