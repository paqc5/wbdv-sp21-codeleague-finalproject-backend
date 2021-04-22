const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: {type: String, enum: ['ADMIN', 'USER']},
    firstName: String,
    lastName: String
}, {collection: 'users'});

module.exports = usersSchema;
