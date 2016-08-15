'use strict';

const renderForm = require('../../lib/render-form');
const isYesOrNo = require('../../utils/is-yes-or-no');
const template = require('./template.marko');

module.exports = {
  get: renderForm('eligibility'),

  post(req, res) {
    const errors = {};
    const values = req.body;

    if (!isYesOrNo(values.married)) {
      errors.married = req.t('eligibility:form.married.error');
    }
    if (!isYesOrNo(values['date-of-death'])) {
      errors['date-of-death'] = req.t('eligibility:form.diedAfter.error');
    }
    if (!isYesOrNo(values['in-uk'])) {
      errors['in-uk'] = req.t('eligibility:form.inUK.error');
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      const notMarried = (values.married === 'no');
      const deathOver12m = (values['date-of-death'] === 'no');
      const notInUK = (values['in-uk'] === 'no');
      const noCount = [notMarried, deathOver12m, notInUK].filter(i => i).length;

      if (noCount === 0) {
        res.setSessionAndRedirect('eligibility', values, '/about-your-partner');
      } else {
        const data = {notMarried, deathOver12m, notInUK, noCount};
        res.setSessionAndRedirect('exit', data, '/not-eligible');
      }
    }
  }
};
