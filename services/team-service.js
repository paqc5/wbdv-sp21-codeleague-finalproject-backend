const axios = require('axios');
const BASE_API_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';
const PROXY_API_URL = 'https://codeleague-cors-proxy.herokuapp.com/';

let getConfig = {
    method: 'get',
    url: PROXY_API_URL,
    headers: { 'Target-URL': BASE_API_URL, 'Content-Type': 'application/json' },
};

const findAllTeams = () => {
    return axios(getConfig)
        .then((response) => response.data.teams)
        .catch((error) => {
            console.log(error);
        });
};

const findTeamById = (teamId) =>
    findAllTeams().then((res) =>
        res.filter((team) => team.id === teamId)
    );


module.exports = {
    findAllTeams, findTeamById
}