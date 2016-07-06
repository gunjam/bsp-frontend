const template = require('./template.marko');

const ninex = /^(?!BG|GB|NK|KN|TN|NT|ZZ)[ABCEGHJ-PRSTW-Z][ABCEGHJ-NPRSTW-Z]\d{6}[A-D]$/;

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

    if (values.name.trim() === '') {
      errors.name = {msg: req.t('you:question1.error')};
    }

    if (values.nino.trim() === '') {
      errors.nino = {msg: req.t('you:question2.errorEmpty')};
    } else if (values.nino.trim().match(ninex) === null) {
      errors.nino = {msg: req.t('you:question2.errorInvalid')};
    }

    if (values['birth-day'].trim() === '' ||
        values['birth-month'].trim() === '' ||
        values['birth-year'].trim() === '') {
      errors.death = {msg: req.t('you:question3.error')};
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      next();
    }
  },

  redirect(req, res) {
    res.redirect('contact-details');
  }
};
