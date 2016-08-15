const template = require('./template.marko');

module.exports = function (req, res) {
  const type = req.getSession('payment').type;
  template.render({type}, res);
};
