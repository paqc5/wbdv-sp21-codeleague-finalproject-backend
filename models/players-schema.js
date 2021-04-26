const mongoose = require('mongoose');

const playersSchema = mongoose.Schema(
  {
    users: [String]
  },
  { collection: 'players' }
);

module.exports = playersSchema;
