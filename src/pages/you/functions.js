const isEmpty = require('../../utils/is-empty');
const isValidNino = require('../../utils/is-valid-nino');
const template = require('./template.marko');

module.exports = {
  render(req, res) {
    const values = req.session.you || {};
    const errors = false;
    template.render({errors, values}, res);
  },

  validate(req, res) {
    const errors = {};
    const values = req.body;
    const birth = values.birth || {};

    if (isEmpty(values.name)) {
      errors.name = {msg: req.t('you:question1.error')};
    }

    if (isEmpty(values.nino)) {
      errors.nino = {msg: req.t('you:question2.errorEmpty')};
    } else if (!isValidNino(values.nino)) {
      errors.nino = {msg: req.t('you:question2.errorInvalid')};
    }

    if (isEmpty(birth.day) || isEmpty(birth.month) || isEmpty(birth.year)) {
      errors.birth = {msg: req.t('you:question3.error')};
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      req.session.you = values;
      res.redirect('/contact-details');
    }
  }
};
