require('marko/node-require').install();

const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const i18next = require('i18next');
const FilesystemBackend = require('i18next-node-fs-backend');
const i18nextMiddleware = require('i18next-express-middleware');

// Configure Lasso.js
require('lasso').configure(require('./config/lasso'));

// Setup i18next
i18next
  .use(FilesystemBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(require('./config/i18next'));

const app = express();
const port = 3000;

// Serve static assets
app.use(require('lasso/middleware').serveStatic());

// Load Middleware
app.use(i18nextMiddleware.handle(i18next));
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));

// Page routes
app.get('/start', require('./src/pages/start'));
app.use('/eligibility', require('./src/pages/eligibility'));
app.use('/about-your-partner', require('./src/pages/partner'));
app.use('/about-you', require('./src/pages/you'));

app.listen(port, err => {
  if (err) {
    throw err;
  }

  console.log('Listening on port %d', port);
});
