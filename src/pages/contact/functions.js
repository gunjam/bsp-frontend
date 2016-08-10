const isEmpty = require('../../utils/is-empty');
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
    const address = values.address || {};

    if (isEmpty(address.line1) &&
        isEmpty(address.line2) &&
        isEmpty(address.line3)) {
      errors.address = req.t('contact:question1.error');
    }

    if (isEmpty(values.postcode)) {
      errors.postcode = req.t('contact:question2.error');
    }

    if (isEmpty(values.telephone)) {
      errors.telephone = req.t('contact:question3.error');
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      req.session.contact = values;
      res.redirect('/dependent-children');
    }
  }
};
