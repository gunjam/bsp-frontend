const isEmpty = require('../../utils/is-empty');
const isValidNino = require('../../utils/is-valid-nino');
const template = require('./template.marko');

module.exports = {
  render(req, res) {
    const values = req.session.partner || {};
    const errors = false;
    template.render({errors, values}, res);
  },

  validate(req, res, next) {
    const errors = {};
    const values = req.body;
    const death = values.death || {};

    if (isEmpty(values.name)) {
      errors.name = req.t('partner:form.name.error');
    }

    if (isEmpty(values.nino)) {
      errors.nino = req.t('partner:form.nino.errorEmpty');
    } else if (!isValidNino(values.nino)) {
      errors.nino = req.t('partner:form.nino.errorInvalid');
    }

    if (isEmpty(death.day) || isEmpty(death.month) || isEmpty(death.year)) {
      errors.death = req.t('partner:form.death.error');
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      next();
    }
  },

  redirect(req, res) {
    const currentTime = new Date();
    const dateOfDeath = new Date(`${req.body['death-day']}/` +
      `${req.body['death-month']}/${req.body['death-year']}`
    );
    const daysSinceDeath = (currentTime - dateOfDeath) / (1000 * 60 * 60 * 24);

    if (daysSinceDeath > 365) {
      res.redirect('/not-eligible/y/y/y/n');
    } else {
      req.session.partner = req.body;
      res.redirect('/about-you');
    }
  }
};
