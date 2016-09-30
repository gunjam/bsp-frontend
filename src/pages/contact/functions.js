'use strict';

const renderForm = require('~/src/lib/render-form');
const isEmpty = require('~/src/utils/is-empty');
const template = require('./template.marko');

module.exports = {
  get: renderForm('contact'),

  post(req, res) {
    const errors = {};
    const values = req.body;
    const address = values.address || {};

    if (isEmpty(address.line1) &&
        isEmpty(address.line2) &&
        isEmpty(address.line3)) {
      errors.address = req.t('contact:form.address.error');
    }

    if (isEmpty(values.postcode)) {
      errors.postcode = req.t('contact:form.postcode.error');
    }

    if (isEmpty(values.telephone)) {
      errors.telephone = req.t('contact:form.telephone.error');
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      res.setSessionAndRedirect('contact', values, '/dependent-children');
    }
  }
};
