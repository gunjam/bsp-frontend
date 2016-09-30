'use strict';

const renderForm = require('~/src/lib/render-form');
const hasErrors = require('~/src/utils/has-errors');
const isYesOrNo = require('~/src/utils/is-yes-or-no');
const template = require('./template.marko');

module.exports = {
  get: renderForm('eligibility'),

  post(req, res) {
    const errors = {};
    const values = req.body;

    if (!isYesOrNo(values.married)) {
      errors.married = req.t('eligibility:form.married.error');
    }
    if (!isYesOrNo(values.dateOfDeath)) {
      errors.dateOfDeath = req.t('eligibility:form.diedAfter.error');
    }
    if (!isYesOrNo(values.inUK)) {
      errors.inUK = req.t('eligibility:form.inUK.error');
    }

    if (hasErrors(errors)) {
      template.render({errors, values}, res);
    } else {
      const notMarried = (values.married === 'no');
      const deathOver12m = (values.dateOfDeath === 'no');
      const notInUK = (values.inUK === 'no');
      const noCount = [notMarried, deathOver12m, notInUK].filter(i => i).length;

      if (noCount === 0) {
        res.setSessionAndRedirect('eligibility', values, '/about-your-partner');
      } else {
        const data = {notMarried, deathOver12m, notInUK, noCount};
        req.session.eligibility = values;
        res.setSessionAndRedirect('exit', data, '/not-eligible');
      }
    }
  }
};
