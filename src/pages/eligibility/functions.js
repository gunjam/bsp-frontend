const isYesOrNo = require('../../utils/is-yes-or-no');
const template = require('./template.marko');

module.exports = {
  render(req, res) {
    const values = req.session.eligibility || {};
    const errors = false;
    template.render({errors, values}, res);
  },

  validate(req, res, next) {
    const errors = {};
    const values = req.body;

    if (!isYesOrNo(values.married)) {
      errors.married = req.t('eligibility:question1.error');
    }
    if (!isYesOrNo(values['date-of-death'])) {
      errors['date-of-death'] = req.t('eligibility:question2.error');
    }
    if (!isYesOrNo(values['in-uk'])) {
      errors['in-uk'] = req.t('eligibility:question3.error');
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      next();
    }
  },

  redirect(req, res) {
    const married = req.body.married;
    const dateOfDeath = req.body['date-of-death'];
    const inUK = req.body['in-uk'];
    const noCount = [married, dateOfDeath, inUK].filter(i => i === 'no').length;

    if (noCount === 0) {
      res.redirect('/about-your-partner');
    } else {
      req.session.exit = {noCount, married, dateOfDeath, inUK};
      res.redirect('/not-eligible');
    }
  }
};
