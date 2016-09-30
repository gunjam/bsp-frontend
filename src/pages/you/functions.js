'use strict';

const renderForm = require('~/src/lib/render-form');
const isEmpty = require('~/src/utils/is-empty');
const isValidNino = require('~/src/utils/is-valid-nino');
const isValidDateObject = require('~/src/utils/is-valid-date-object');
const template = require('./template.marko');

module.exports = {
  get: renderForm('you'),

  post(req, res) {
    const errors = {};
    const values = req.body;
    const birth = values.birth || {};

    if (isEmpty(values.name)) {
      errors.name = req.t('you:form.name.error');
    }

    if (isEmpty(values.nino)) {
      errors.nino = req.t('you:form.nino.errorEmpty');
    } else if (!isValidNino(values.nino)) {
      errors.nino = req.t('you:form.nino.errorInvalid');
    }

    if (isEmpty(birth.day) || isEmpty(birth.month) || isEmpty(birth.year)) {
      errors.birth = req.t('you:form.birth.errorEmpty');
    } else if (!isValidDateObject(birth)) {
      errors.birth = req.t('you:form.birth.errorInvalid');
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      res.setSessionAndRedirect('you', values, '/contact-details');
    }
  }
};
