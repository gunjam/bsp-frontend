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
      errors.name = {msg: req.t('partner:question1.error')};
    }

    if (values.nino.trim() === '') {
      errors.nino = {msg: req.t('partner:question2.errorEmpty')};
    } else if (values.nino.trim().match(ninex) === null) {
      errors.nino = {msg: req.t('partner:question2.errorInvalid')};
    }

    if (values['death-day'].trim() === '' ||
        values['death-month'].trim() === '' ||
        values['death-year'].trim() === '') {
      errors.death = {msg: req.t('partner:question3.error')};
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      next();
    }
  },

  redirect(req, res) {
    const currentTime = new Date();
    const dateOfDeath = new Date(`${req.body['death-day']}/` +
      `${req.body['death-month']}/${req.body['death-year']}`
    );
    const daysSinceDeath = (currentTime - dateOfDeath) / (1000 * 60 * 60 * 24);

    if (daysSinceDeath > 365) {
      res.redirect('not-eligible/y/y/y/n');
    } else {
      res.redirect('about-you');
    }
  }
};
