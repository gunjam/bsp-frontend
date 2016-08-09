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

    if (values.married !== 'yes' && values.married !== 'no') {
      errors.married = {msg: req.t('eligibility:question1.error')};
    }
    if (values['date-of-death'] !== 'yes' && values['date-of-death'] !== 'no') {
      errors['date-of-death'] = {msg: req.t('eligibility:question2.error')};
    }
    if (values['in-uk'] !== 'yes' && values['in-uk'] !== 'no') {
      errors['in-uk'] = {msg: req.t('eligibility:question3.error')};
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
