const mongoose = require('mongoose');

const playersSchema = mongoose.Schema(
  {
    player_id: String,
    users: [String]
  },
  { collection: 'players' }
);

module.exports = playersSchema;
