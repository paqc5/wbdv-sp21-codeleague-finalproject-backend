const mongoose = require('mongoose');

const usersSchema = mongoose.Schema(
  {
    fplEmail: String,
    role: { type: String, enum: ['ADMIN', 'USER'] },
    firstName: String,
    lastName: String,
    team: [{ id: Number, name: String }],
    userFollowing: [String],
    userFollowers: [String],
  },
  { collection: 'users' }
);

module.exports = usersSchema;
