const isEmpty = require('../../utils/is-empty');
const isNumeric = require('../../utils/is-numeric');
const template = require('./template.marko');

module.exports = {
  render(req, res) {
    const buildingSociety = (req.originalUrl === '/building-society-details');
    const values = req.session.bank || {};
    const errors = false;

    template.render({errors, values, buildingSociety}, res);
  },

  validate(req, res) {
    const errors = {};
    const values = req.body;

    if (isEmpty(values['account-name'])) {
      errors['account-name'] = {msg: req.t('bank:question1.error')};
    }

    if (isEmpty(values['account-number'])) {
      errors['account-number'] = {msg: req.t('bank:question2.errorBlank')};
    } else if (!isNumeric(values['account-number'])) {
      errors['account-number'] = {msg: req.t('bank:question2.errorInvalid')};
    }

    if (isEmpty(values['sort-code-1']) ||
        isEmpty(values['sort-code-2']) ||
        isEmpty(values['sort-code-3'])) {
      errors['sort-code'] = {msg: req.t('bank:question3.error')};
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
