const template = require('./template.marko');

module.exports = {
  render(req, res) {
    template.render({
      errors: false,
      values: false
    }, res);
  },

  validate(req, res) {
    const values = req.body || {};

    if (values.type === 'bank') {
      res.redirect('bank-details');
    } else if (values.type === 'building') {
      res.redirect('building-society-details');
    } else {
      template.render({
        errors: {type: {msg: req.t('payment:error')}},
        values
      }, res);
    }
  }
};
