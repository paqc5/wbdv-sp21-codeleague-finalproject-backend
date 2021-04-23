const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    fplEmail: String,
    role: {type: String, enum: ['ADMIN', 'USER']},
    firstName: String,
    lastName: String,
    userFollowing: [String],
    userFollowers: [String]
}, {collection: 'users'});

module.exports = usersSchema;