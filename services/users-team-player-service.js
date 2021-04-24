const userTeamService = require('./users-team-service');

const shareCache = () => {
  if (userTeamService.cachedPlayers)
    console.log('cached:', userTeamService.cachedPlayers[0]);
};

module.exports({shareCache})