const isValidNino = require('../../utils/is-valid-nino');
const template = require('./template.marko');

module.exports = {
  render(req, res) {
    template.render({
      errors: false,
      values: false
    }, res);
  },

  validate(req, res) {
    const errors = {};
    const values = req.body;

    if (values.name.trim() === '') {
      errors.name = {msg: req.t('you:question1.error')};
    }

    if (values.nino.trim() === '') {
      errors.nino = {msg: req.t('you:question2.errorEmpty')};
    } else if (isValidNino(values.nino)) {
      errors.nino = {msg: req.t('you:question2.errorInvalid')};
    }

    if (values.birth.day.trim() === '' ||
        values.birth.month.trim() === '' ||
        values.birth.year.trim() === '') {
      errors.birth = {msg: req.t('you:question3.error')};
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      res.redirect('/contact-details');
    }
  }
};
