const axios = require('axios');
const configs = require('./api-configs');
// const BASE_API_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';
// const PROXY_API_URL = 'https://codeleague-cors-proxy.herokuapp.com/';

// let getConfig = {
//     method: 'get',
//     url: PROXY_API_URL,
//     headers: { 'Target-URL': BASE_API_URL, 'Content-Type': 'application/json' },
// };
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
    // console.log('allTeams else:', allTeams.slice(0, 1));
    // console.log();
    // console.log('playerTeam:', allTeams[teamId - 1]);
    return allTeams[teamId - 1];
  }
  // findAllTeams().then((res) => res.filter((team) => team.id === teamId));
};

module.exports = {
  findAllTeams,
  findTeamById,
};
