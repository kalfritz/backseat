const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/backseat', {
  useCreateIndex: true,
  useNewUrlParser: true,
});

module.exports = mongoose;
