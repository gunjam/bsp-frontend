const template = require('./template.marko');

module.exports = {
  render(req, res) {
    template.render({
      errors: false,
      values: false
    }, res);
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
      next();
    }
  },

  redirect(req, res) {
    const path =
      `${req.body.married === 'yes' ? 'y' : 'n'}/` +
      `${req.body['date-of-death'] === 'yes' ? 'y' : 'n'}/` +
      `${req.body['in-uk'] === 'yes' ? 'y' : 'n'}`;

    res.redirect(`not-eligible/${path}`);
  }
};
