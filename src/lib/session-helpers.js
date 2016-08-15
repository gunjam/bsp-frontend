'use strict';

module.exports = function (req, res, next) {
  req.getSession = function (name) {
    return req.session[name] || {};
  };
  res.setSessionAndRedirect = function (name, data, url) {
    res.redirect(url);
    req.session[name] = data;
  };
  next();
};
