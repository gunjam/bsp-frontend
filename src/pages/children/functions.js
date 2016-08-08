const template = require('./template.marko');

module.exports = {
  render(req, res) {
    const values = req.session.children || {};
    const errors = false;
    template.render({errors, values}, res);
  },

  validate(req, res) {
    const values = req.body || {};

    if (values.children === 'yes' || values.children === 'no') {
      req.session.children = values;
      res.redirect('/payment');
    } else {
      template.render({
        errors: {children: {msg: req.t('children:question1.error')}},
        values
      }, res);
    }
  }
};
