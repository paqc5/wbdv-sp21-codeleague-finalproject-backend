// bring api data into service
// manipulate it in service
const fpl = require('fpl-api');
const axios = require('axios');

const BASE_API_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';
const API_URL_HISTORY =
  'https://fantasy.premierleague.com/api/element-summary/251/';
const API_URL = 'https://codeleague-cors-proxy.herokuapp.com/';

const getPlayerSummary = () => {
  // get all players
  // put in list with information we want
  // [{playerId:, name:, totalPoints..., team:}, {playerId:, name:, totalPoints...}]
  //
  // a list of objects that is a hashmap where key is element code

  let config = {
    method: 'get',
    url: API_URL,
    headers: { 'Target-URL': BASE_API_URL, 'Content-Type': 'application/json' },
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  getPlayerSummary,
};
// findAllPlayers

// call to api
// parsing it for desired player information
// return
