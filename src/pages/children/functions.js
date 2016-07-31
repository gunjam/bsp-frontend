const template = require('./template.marko');

module.exports = {
  render(req, res) {
    template.render({
      errors: false,
      values: false
    }, res);
  },

  validate(req, res) {
    const values = req.body || {};

    if (values.children === 'yes' || values.children === 'no') {
      res.redirect('/payment');
    } else {
      template.render({
        errors: {children: {msg: req.t('children:question1.error')}},
        values
      }, res);
    }
  }
};
