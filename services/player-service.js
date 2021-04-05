// bring api data into service
// manipulate it in service
<<<<<<< HEAD
// const fpl = require('fpl-api');
const axios = require('axios');
const BASE_API_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';
// const API_URL_HISTORY =
//     'https://fantasy.premierleague.com/api/element-summary/251/';
=======
const fpl = require('fpl-api');
const axios = require('axios');
const BASE_API_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';
const API_URL_HISTORY =
  'https://fantasy.premierleague.com/api/element-summary/251/';
>>>>>>> af8343222a3b6b577689616bf9450f69cd106a53
const PROXY_API_URL = 'https://codeleague-cors-proxy.herokuapp.com/';

// do one all api info call
// cache
let getConfig = {
<<<<<<< HEAD
    method: 'get',
    url: PROXY_API_URL,
    headers: { 'Target-URL': BASE_API_URL, 'Content-Type': 'application/json' },
};

const findAllPlayers = () => {
    // Alternative approach
    // get all players
    // put in list with information we want
    // [{playerId:, name:, totalPoints..., team:}, {playerId:, name:, totalPoints...}]
    // a list of objects that is a hashmap where key is element code

    return axios(getConfig)
        .then((response) => response.data.elements)
        .catch((error) => {
            console.log(error);
        });
=======
  method: 'get',
  url: PROXY_API_URL,
  headers: { 'Target-URL': BASE_API_URL, 'Content-Type': 'application/json' },
};

const findAllPlayers = () => {
  // Alternative approach
  // get all players
  // put in list with information we want
  // [{playerId:, name:, totalPoints..., team:}, {playerId:, name:, totalPoints...}]
  // a list of objects that is a hashmap where key is element code

  return axios(getConfig)
    .then((response) => response.data.elements)
    .catch((error) => {
      console.log(error);
    });
>>>>>>> af8343222a3b6b577689616bf9450f69cd106a53
};

// how do you put promise response in a variable for caching
// let allPlayers;
// return findAllPlayers().then((res) => res);

// can cache all players on the frontend or the backend
// why do I have to return the axios call
// axios-cache-adapter
const findPlayer = (playerId) =>
<<<<<<< HEAD
    findAllPlayers().then((res) =>
        res.filter((player) => player.id === playerId)
    );

const findPlayerPosition = (elementTypeId) => {
    return axios(getConfig)
        .then((res) => {
            return res.data.element_types;
        })
        .then((res) =>
            res.filter((elementType) => elementType.id === elementTypeId)
        );
};

module.exports = {
    findAllPlayers,
    findPlayer,
    findPlayerPosition,
=======
  findAllPlayers().then((res) =>
    res.filter((player) => player.id === playerId)
  );

const findPlayerPosition = (elementTypeId) => {
  return axios(getConfig)
    .then((res) => {
      return res.data.element_types;
    })
    .then((res) =>
      res.filter((elementType) => elementType.id === elementTypeId)
    );
};

module.exports = {
  findAllPlayers,
  findPlayer,
  findPlayerPosition,
>>>>>>> af8343222a3b6b577689616bf9450f69cd106a53
};

// findAllPlayers

// call to api
// parsing it for desired player information
<<<<<<< HEAD
// return
=======
// return
>>>>>>> af8343222a3b6b577689616bf9450f69cd106a53
