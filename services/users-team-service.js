const fpl = require('fpl-api');
const playerService = require('../services/player-service');
let cachedPlayers;

/**
 * Authenticate a user via the FPL API
 * @param {*} userEmail
 * @param {*} userPassword
 */
const authUser = (userEmail, userPassword) => {
  try {
    return fpl.fetchSession(userEmail, userPassword)
      .then((cookie) => {
        return cookie
      })
  } catch (err) {
    throw new Error(err)
  }
}

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
      playerService.findAllPlayers()
      .then(allPlayers => {
        
        const userTeam = team.picks.map(userPlayer => {
          let tmp = allPlayers.filter(
            player => player.id === userPlayer.element)

          return tmp[0]
          })
            
        cachedPlayers = allPlayers;
        return userTeam;
      })
    );
};

module.exports = {
  findUserTeam,
  authUser,
};
