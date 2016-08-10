const isYesOrNo = require('../../utils/is-yes-or-no');
const template = require('./template.marko');

module.exports = {
  render(req, res) {
    const values = req.session.children || {};
    const errors = false;
    template.render({errors, values}, res);
  },

  validate(req, res) {
    const values = req.body || {};

    if (isYesOrNo(values.children)) {
      req.session.children = values;
      res.redirect('/payment');
    } else {
      template.render({
        errors: {children: req.t('children:question1.error')},
        values
      }, res);
    }
  }
};
