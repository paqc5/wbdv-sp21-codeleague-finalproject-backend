const fpl = require('fpl-api');
const mongoose = require('mongoose');
const userSchema = require('../models/user-model');
const userModel = mongoose.model('UserModel', userSchema);

function findUserById(userId) { };
function findUserByUsername(username) { };
function findUserByCredentials(username, password) { };
function createUser(user) { };
function deleteUser(userId) { };
function updateUser(userId, newUser) { };

function getUserTeam(fplEmail, fplPassword, managerId) {
    return fpl
        .fetchSession(fplEmail, fplPassword)
        .then((cookie) => {
            //   console.log(cookie);
            return fpl.fetchMyTeam(cookie, managerId);
        });
};

module.exports = {
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getUserTeam: getUserTeam
};