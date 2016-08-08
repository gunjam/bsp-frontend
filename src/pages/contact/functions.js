const template = require('./template.marko');

module.exports = {
  render(req, res) {
    const values = req.session.contact || {};
    const errors = false;
    template.render({errors, values}, res);
  },

  validate(req, res) {
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
      req.session.contact = values;
      res.redirect('/dependent-children');
    }
  }
};
