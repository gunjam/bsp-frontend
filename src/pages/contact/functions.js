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

    if (values.address.line1.trim() === '' &&
        values.address.line2.trim() === '' &&
        values.address.line3.trim() === '') {
      errors.address = {msg: req.t('contact:question1.error')};
    }

    if (values.postcode.trim() === '') {
      errors.postcode = {msg: req.t('contact:question2.error')};
    }

    if (values.telephone.trim() === '') {
      errors.telephone = {msg: req.t('contact:question3.error')};
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      next();
    }
  },

  redirect(req, res) {
    res.redirect('dependent-children');
  }
};
