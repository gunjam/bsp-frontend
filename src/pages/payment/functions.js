const template = require('./template.marko');

module.exports = {
  render(req, res) {
    const values = req.session.payment || {};
    const errors = false;
    template.render({errors, values}, res);
  },

  validate(req, res) {
    const values = req.body || {};

    if (values.type === 'bank') {
      req.session.payment = values;
      res.redirect('/bank-details');
    } else if (values.type === 'building') {
      req.session.payment = values;
      res.redirect('/building-society-details');
    } else {
      template.render({
        errors: {type: req.t('payment:error')},
        values
      }, res);
    }
  }
};
