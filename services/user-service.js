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
