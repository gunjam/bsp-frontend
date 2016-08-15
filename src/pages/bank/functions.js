'use strict';

const isEmpty = require('../../utils/is-empty');
const isNumeric = require('../../utils/is-numeric');
const template = require('./template.marko');

module.exports = {
  get(req, res) {
    const isBuildingSoc = (req.originalUrl === '/building-society-details');
    const values = req.getSession('bank');
    const csrfToken = req.csrfToken();
    template.render({errors: false, values, isBuildingSoc, csrfToken}, res);
  },

  post(req, res) {
    const errors = {};
    const values = req.body;

    if (isEmpty(values['account-name'])) {
      errors['account-name'] = req.t('bank:form.accountName.error');
    }

    if (isEmpty(values['account-number'])) {
      errors['account-number'] = req.t('bank:form.accountNumber.errorBlank');
    } else if (!isNumeric(values['account-number'])) {
      errors['account-number'] = req.t('bank:form.accountNumber.errorInvalid');
    }

    if (isEmpty(values['sort-code-1']) ||
        isEmpty(values['sort-code-2']) ||
        isEmpty(values['sort-code-3'])) {
      errors['sort-code'] = req.t('bank:form.sortCode.error');
    }

    if (Object.keys(errors).length > 0) {
      const buildingSociety = (req.originalUrl === '/building-society-details');
      const csrfToken = req.csrfToken();
      template.render({errors, values, buildingSociety, csrfToken}, res);
    } else {
      res.setSessionAndRedirect('bank', values, '/declaration');
    }
  }
};
