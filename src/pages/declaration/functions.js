'use strict';

const rp = require('request-promise');
const config = require('../../../config/app');
const sessionToClaimObject = require('../../lib/session-to-claim-object');
const template = require('./template.marko');

const method = 'PUT';
const uri = config.apiUrl;
const json = true;

module.exports = {
  get(req, res) {
    const {type} = req.getSession('payment');
    template.render({type}, res);
  },

  post(req, res, next) {
    const body = sessionToClaimObject(req.session);
    const request = {method, uri, json, body};

    rp(request)
      .then(() => {
        req.session.destroy();
        res.redirect('/end');
      })
      .catch(err => next(err));
  }
};
