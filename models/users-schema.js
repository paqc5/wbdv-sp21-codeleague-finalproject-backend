const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: {type: String, enum: ['ADMIN', 'USER']},
    firstName: String,
    lastName: String
}, {collection: 'users'});

module.exports = userSchema;
