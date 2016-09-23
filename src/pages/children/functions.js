'use strict';

const isYesOrNo = require('../../utils/is-yes-or-no');
const renderForm = require('../../lib/render-form');
const template = require('./template.marko');

module.exports = {
  get: renderForm('children'),

  post(req, res) {
    const values = req.body;

    if (isYesOrNo(values.dependantChildren)) {
      res.setSessionAndRedirect('children', values, '/payment');
    } else {
      const errors = {children: req.t('children:form.haveChildren.error')};
      template.render({errors, values}, res);
    }
  }
};
