const fpl = require('fpl-api');
const playerService = require('../services/player-service');
var cachedPlayers;

const cached = () => cachedPlayers;
/**
 * Authenticate a user via the FPL API
 * @param {*} userEmail
 * @param {*} userPassword
 * @param {*} res
 */
const authenticate = (userEmail, userPassword, res) => {
  return fpl
    .fetchSession(userEmail, userPassword)
    .then((cookie) => cookie)
    .catch((error) => {
      throw 'authentication failed';
    });
};

/**
 * Find a user's team
 * @param {*} userEmail
 * @param {*} userPassword
 */
const findUserTeam = (userEmail, userPassword) => {
  // if (cachedPlayers)
  //   console.log('Team Service cachedPlayers:', cachedPlayers[0]);

  return fpl
    .fetchSession(userEmail, userPassword)
    .then((cookie) => {
      return fpl
        .fetchCurrentUser(cookie)
        .then((user) => fpl.fetchMyTeam(cookie, user.player.entry));
    })
    .then((team) =>
      playerService.findAllPlayers().then((allPlayers) => {
        const userTeam = team.picks.map((player) =>
          allPlayers.filter(
            (singlePlayer) => singlePlayer.id === player.element
          )
        );
        cachedPlayers = allPlayers;
        return userTeam;
      })
    );
};

module.exports = {
  findUserTeam,
  authenticate,
  cached,
};
