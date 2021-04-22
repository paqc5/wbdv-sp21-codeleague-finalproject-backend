const fpl = require('fpl-api');
const playerService = require('../services/player-service');

// implement authenticate user separately
// will use to log users into the site

// test method
const viewCookie = (userEmail, userPassword) => {
  return fpl
    .fetchSession(userEmail, userPassword)
    .then((cookie) => cookie)
    .catch((error) => {
      // authentication note
      let authNote = { authenticated: false, api_msg: error.message };
      console.log(error);
      return authNote;
    });
};

// TODO: import cached players from player service
const findUserTeam = (userEmail, userPassword) => {
  //   console.log('players:', playerService.players);
  return fpl
    .fetchSession(userEmail, userPassword)
    .then((cookie) => {
      console.log('cookie:', cookie);
      return fpl.fetchCurrentUser(cookie).then((user) =>
        // const user = res;
        fpl.fetchMyTeam(cookie, user.player.entry)
      );
    })
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

function getUserTeam(fplEmail, fplPassword, managerId) {
  return fpl.fetchSession(fplEmail, fplPassword).then((cookie) => {
    //   console.log(cookie);
    return fpl.fetchMyTeam(cookie, managerId);
  });
}

module.exports = {
  getUserTeam: getUserTeam,
  findUserTeam: findUserTeam,
  viewCookie: viewCookie,
};