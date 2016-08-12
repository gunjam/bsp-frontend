const renderForm = require('../../lib/render-form');
const template = require('./template.marko');

module.exports = {
  get: renderForm('payment'),

  post(req, res) {
    const values = req.body || {};

    if (values.type === 'bank') {
      req.session.payment = values;
      res.redirect('/bank-details');
    } else if (values.type === 'building') {
      req.session.payment = values;
      res.redirect('/building-society-details');
    } else {
      template.render({
        errors: {type: req.t('payment:form.type.error')},
        values
      }, res);
    }
  }
};
