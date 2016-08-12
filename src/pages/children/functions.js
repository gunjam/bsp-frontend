const isYesOrNo = require('../../utils/is-yes-or-no');
const renderForm = require('../../lib/render-form');
const template = require('./template.marko');

module.exports = {
  get: renderForm('children'),

  post(req, res) {
    const values = req.body;

    if (isYesOrNo(values.children)) {
      req.session.children = values;
      res.redirect('/payment');
    } else {
      template.render({
        errors: {children: req.t('children:form.haveChildren.error')},
        values
      }, res);
    }
  }
};
