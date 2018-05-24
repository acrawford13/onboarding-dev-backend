const cors = require('cors');

const corsOptions = {
  origin: (origin, callback) => {
    console.log('>>>>>', origin, process.env.NODE_ENV);

    if (process.env.NODE_ENV !== 'production') return callback(null, true);

    if (!origin || origin.match(process.env.ALLOWED_ORIGIN)) {
      return callback(null, true);
    }

    callback({ status: 401, message: 'Origin not allowed' });
  },
};

module.exports = () => cors(corsOptions);
