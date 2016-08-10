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
      errors.name = req.t('you:form.name.error');
    }

    if (isEmpty(values.nino)) {
      errors.nino = req.t('you:form.nino.errorEmpty');
    } else if (!isValidNino(values.nino)) {
      errors.nino = req.t('you:form.nino.errorInvalid');
    }

    if (isEmpty(birth.day) || isEmpty(birth.month) || isEmpty(birth.year)) {
      errors.birth = req.t('you:form.birth.error');
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      req.session.you = values;
      res.redirect('/contact-details');
    }
  }
};
