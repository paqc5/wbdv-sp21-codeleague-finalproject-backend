const fpl = require('fpl-api');
const playerService = require('../services/player-service');

// implement authenticate user separately
// will use to log users into the site 

const findUserTeam = (userEmail, userPassword) => {
  return fpl
    .fetchSession(userEmail, userPassword)
    .then((cookie) =>
      fpl.fetchCurrentUser(cookie).then((user) =>
        // const user = res;
        fpl.fetchMyTeam(cookie, user.player.entry)
      )
    )
    .then((team) =>
      playerService.findAllPlayers().then((allPlayers) => {
        const userTeam = team.picks.map((player) =>
          allPlayers.filter(
            (singlePlayer) => singlePlayer.id === player.element
          )
        );
        return userTeam;
      })
    );
};

module.exports = { findUserTeam };

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
