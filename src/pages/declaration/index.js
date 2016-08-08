const template = require('./template.marko');

module.exports = function (req, res) {
  const backLink = req.session.payment.type === 'bank' ? '/bank-details' :
    '/building-society-details';
  template.render({backLink}, res);
};
