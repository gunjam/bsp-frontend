const template = require('./template.marko');

module.exports = function (req, res) {
  const data = req.session.exit || {};
  template.render(data, res);
};
