'use strict';

const renderForm = require('~/src/lib/render-form');
const hasErrors = require('~/src/utils/has-errors');
const isEmpty = require('~/src/utils/is-empty');
const isValidNino = require('~/src/utils/is-valid-nino');
const isValidDateObject = require('~/src/utils/is-valid-date-object');
const template = require('./template.marko');

module.exports = {
  get: renderForm('partner'),

  post(req, res) {
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
      errors.death = req.t('partner:form.death.errorEmpty');
    } else if (!isValidDateObject(death)) {
      errors.death = req.t('partner:form.death.errorInvalid');
    }

    if (hasErrors(errors)) {
      template.render({errors, values}, res);
    } else {
      const currentTime = new Date();
      const dateOfDeath = new Date(death.year, death.month - 1, death.day);
      const daysFromDeath = (currentTime - dateOfDeath) / (1000 * 60 * 60 * 24);
      const deathOver12m = daysFromDeath > 365;

      if (deathOver12m) {
        res.setSessionAndRedirect('exit', {deathOver12m}, '/not-eligible');
      } else {
        res.setSessionAndRedirect('partner', values, '/about-you');
      }
    }
  }
};
