const isEmpty = require('../../utils/is-empty');
const isNumeric = require('../../utils/is-numeric');
const template = require('./template.marko');

module.exports = {
  render(req, res) {
    const isBuildingSoc = (req.originalUrl === '/building-society-details');
    const values = req.session.bank || {};
    const errors = false;

    template.render({errors, values, isBuildingSoc}, res);
  },

  validate(req, res) {
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
      template.render({errors, values, buildingSociety}, res);
    } else {
      req.session.bank = values;
      res.redirect('/declaration');
    }
  }
};
