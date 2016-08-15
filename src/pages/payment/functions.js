const renderForm = require('../../lib/render-form');
const template = require('./template.marko');

module.exports = {
  get: renderForm('payment'),

  post(req, res) {
    const values = req.body || {};

    if (values.type === 'bank') {
      res.setSessionAndRedirect('payment', values, '/bank-details');
    } else if (values.type === 'building') {
      res.setSessionAndRedirect('payment', values, '/building-society-details');
    } else {
      const errors = {type: req.t('payment:form.type.error')};
      template.render({errors, values}, res);
    }
  }
};
