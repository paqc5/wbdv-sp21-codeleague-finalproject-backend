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
    return allTeams.then((res) => {
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
