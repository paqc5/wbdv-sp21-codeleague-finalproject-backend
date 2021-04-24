const axios = require('axios');
const configs = require('./api-configs');
let teams;

const findAllTeams = () => {
  if (teams === undefined) {
    return axios(configs.baseConfig)
      .then((response) => {
        teams = response.data.teams;
        return teams;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    return teams;
  }
};

const findTeamById = (teamId) => {
  let allTeams = findAllTeams();
  if (allTeams instanceof Promise) {
    // why do you return the whole call
    return allTeams.then((res) => {
      //   console.log('allTeams if:', res.slice(0, 1));
      //   console.log();
      //   console.log('playerTeam:', res[teamId - 1]);
      return res[teamId - 1];
    });
  } else {
    return allTeams[teamId - 1];
  }
};

module.exports = {
  findAllTeams,
  findTeamById,
};
