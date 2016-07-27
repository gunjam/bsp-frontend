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

    if (typeof values.children === 'undefined') {
      errors.children = {msg: req.t('children:question1.error')};
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      next();
    }
  },

  redirect(req, res) {
    res.redirect('bank-details');
  }
};
