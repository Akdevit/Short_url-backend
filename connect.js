const mongoose = require('mongoose');

async function connectTomongoDb(url) {
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}

// Correct export
module.exports = {
  connectTomongoDb,
};
