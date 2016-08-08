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

    if (typeof values.married === 'undefined') {
      errors.married = {msg: req.t('eligibility:question1.error')};
    }
    if (typeof values['date-of-death'] === 'undefined') {
      errors['date-of-death'] = {msg: req.t('eligibility:question2.error')};
    }
    if (typeof values['in-uk'] === 'undefined') {
      errors['in-uk'] = {msg: req.t('eligibility:question3.error')};
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      req.session.eligibility = values;
      next();
    }
  },

  redirect(req, res) {
    const path =
      `${req.body.married === 'yes' ? 'y' : 'n'}/` +
      `${req.body['date-of-death'] === 'yes' ? 'y' : 'n'}/` +
      `${req.body['in-uk'] === 'yes' ? 'y' : 'n'}`;

    if (path === 'y/y/y') {
      res.redirect('/about-your-partner');
    } else {
      res.redirect(`/not-eligible/${path}`);
    }
  }
};
