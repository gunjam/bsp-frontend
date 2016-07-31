const template = require('./template.marko');

module.exports = {
  render(req, res) {
    const buildingSociety = (req.originalUrl === '/building-society-details');

    template.render({
      errors: false,
      values: false,
      buildingSociety
    }, res);
  },

  validate(req, res) {
    const errors = {};
    const values = req.body;

    if (typeof values['account-name'] === 'undefined' ||
        values['account-name'] === '') {
      errors['account-name'] = {msg: req.t('bank:question1.error')};
    }

    if (typeof values['account-number'] === 'undefined' ||
        values['account-number'] === '') {
      errors['account-number'] = {msg: req.t('bank:question2.errorBlank')};
    } else if (values['account-number'].trim().match(/[^\d]/)) {
      errors['account-number'] = {msg: req.t('bank:question2.errorInvalid')};
    }

    if (typeof values['sort-code-1'] === 'undefined' ||
        values['sort-code-1'] === '') {
      errors['sort-code'] = {msg: req.t('bank:question3.error')};
    }

    if (Object.keys(errors).length > 0) {
      const buildingSociety = (req.originalUrl === '/building-society-details');
      template.render({errors, values, buildingSociety}, res);
    } else {
      res.redirect('declaration');
    }
  }
};
