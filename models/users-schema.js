const mongoose = require('mongoose');

const usersSchema = mongoose.Schema(
  {
    username: String,
    // fplPassword: String,
    fplEmail: String,
    role: { type: String, enum: ['ADMIN', 'USER'] },
    firstName: String,
    lastName: String,
    team: [{id:Number,name:String}],
  },
  { collection: 'users' }
);

module.exports = usersSchema;
