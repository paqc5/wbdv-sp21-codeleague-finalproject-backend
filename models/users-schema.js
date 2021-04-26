const mongoose = require('mongoose');

const usersSchema = mongoose.Schema(
  {
    username: String,
    fplEmail: String,
    role: { type: String, enum: ['ADMIN', 'USER'] },
    firstName: String,
    lastName: String,
    userTeam: {
      Goalkeeper: [Object],
      Defender: [Object],
      Midfielder: [Object],
      Forward: [Object]
    },
    userFollowing: [String],
    userFollowers: [String],
  },
  { collection: 'users' }
);

module.exports = usersSchema;
