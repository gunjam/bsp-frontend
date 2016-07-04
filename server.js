require('marko/node-require').install();

const express = require('express');
const compression = require('compression');

// Configure Lasso.js
require('lasso').configure(require('./config/lasso'));

const app = express();
const port = 3000;

app.use(compression());
app.use(require('lasso/middleware').serveStatic());

app.get('/', require('./src/pages/index'));
app.get('/form', require('./src/pages/form'));
app.get('/radios', require('./src/pages/radios'));

app.listen(port, err => {
  if (err) {
    throw err;
  }

  console.log('Listening on port %d', port);
});
