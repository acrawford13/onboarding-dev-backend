const debug = require('debug')('error');

function handleErrors(err, req, res, next) {
  const status = err.status || (err.response && err.response.status) || 500;
  const message = err.stack || err.message;
  const data = (err.response && err.response.data);

  console.log(`Error handling: (${status}) ${message}`);
  res.status(status).json({ err: message, status, data }).end();
}

module.exports = handleErrors;
