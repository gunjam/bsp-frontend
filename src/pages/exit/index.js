const template = require('./template.marko');

module.exports = function (req, res) {
  const data = req.getSession('exit');
  template.render(data, res);
};
