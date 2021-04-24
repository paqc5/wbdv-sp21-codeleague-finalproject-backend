const mongoose = require('mongoose');

const usersSchema = mongoose.Schema(
  {
    fplEmail: String,
    role: { type: String, enum: ['ADMIN', 'USER'] },
    firstName: String,
    lastName: String,
    team: [Number],
    userFollowing: [String],
    userFollowers: [String],
  },
  { collection: 'users' }
);

module.exports = usersSchema;
