// bring api data into service
// manipulate it in service
// const fpl = require('fpl-api');
const axios = require('axios');
const BASE_API_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';
const FIXTURES_API_URL = 'https://fantasy.premierleague.com/api/fixtures'
const API_URL_HISTORY =
    'https://fantasy.premierleague.com/api/element-summary/251/';
const PROXY_API_URL = 'https://codeleague-cors-proxy.herokuapp.com/';

// do one all api info call
// cache
let baseConfig = {
    url: PROXY_API_URL,
    method: 'GET',
    headers: {
        'target-url': BASE_API_URL,
        'content-type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
    }
};

let fixturesConfig = {
    url: PROXY_API_URL,
    method: 'GET',
    headers: {
        'target-url': FIXTURES_API_URL,
        'content-type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
    }
}

const findAllPlayers = () => {
    // Alternative approach
    // get all players
    // put in list with information we want
    // [{playerId:, name:, totalPoints..., team:}, {playerId:, name:, totalPoints...}]
    // a list of objects that is a hashmap where key is element code

    return axios(baseConfig)
        .then((response) => response.data.elements)
        .catch((error) => {
            console.log(error);
        });
};

// how do you put promise response in a variable for caching
// let allPlayers;
// return findAllPlayers().then((res) => res);

// can cache all players on the frontend or the backend
// why do I have to return the axios call
// axios-cache-adapter
const findPlayer = (playerId) =>
    findAllPlayers().then((res) =>
        res.filter((player) => player.id === playerId)
    );

const findPlayerPosition = (elementTypeId) => {
    return axios(baseConfig)
        .then((res) => {
            return res.data.element_types;
        })
        .then((res) =>
            res.filter((elementType) => elementType.id === elementTypeId)
        );
};


//TODO: Finish get all the games positions
// const findPlayersPositions = () => {
//     return axios(baseConfig)
//         .then(response => {
//             console.log("in service")
//             console.log(response.data.element_types)
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// };

module.exports = {
    findAllPlayers,
    findPlayer,
    findPlayerPosition,
    findPlayersPositions
};

// findAllPlayers

// call to api
// parsing it for desired player information
// return