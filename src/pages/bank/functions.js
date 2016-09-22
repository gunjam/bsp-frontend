'use strict';

const isEmpty = require('../../utils/is-empty');
const isNumeric = require('../../utils/is-numeric');
const template = require('./template.marko');

module.exports = {
  get(req, res) {
    const isBuildingSoc = (req.originalUrl === '/building-society-details');
    const values = req.getSession('bank');
    template.render({errors: false, values, isBuildingSoc}, res);
  },

  post(req, res) {
    const errors = {};
    const values = req.body;

    if (isEmpty(values.accountName)) {
      errors.accountName = req.t('bank:form.accountName.error');
    }

    if (isEmpty(values.accountNumber)) {
      errors.accountNumber = req.t('bank:form.accountNumber.errorBlank');
    } else if (!isNumeric(values.accountNumber)) {
      errors.accountNumber = req.t('bank:form.accountNumber.errorInvalid');
    }

    if (isEmpty(values.sortCode1) ||
        isEmpty(values.sortCode2) ||
        isEmpty(values.sortCode3)) {
      errors.sortCode = req.t('bank:form.sortCode.error');
    }

    if (Object.keys(errors).length > 0) {
      const isBuildingSoc = (req.originalUrl === '/building-society-details');
      template.render({errors, values, isBuildingSoc}, res);
    } else {
      res.setSessionAndRedirect('bank', values, '/declaration');
    }
  }
};
