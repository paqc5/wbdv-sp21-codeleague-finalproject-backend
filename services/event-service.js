const axios = require('axios');
const BASE_API_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';
const PROXY_API_URL = 'https://codeleague-cors-proxy.herokuapp.com/';

let getConfig = {
    method: 'get',
    url: PROXY_API_URL,
    headers: { 'Target-URL': BASE_API_URL, 'Content-Type': 'application/json' },
};

const findAllEvents = () => {
    return axios(getConfig)
        .then((response) => response.data.events)
        .catch((error) => {
            console.log(error);
        });
};

const findEventById = (eventId) =>
    findAllEvents().then((res) =>
        res.filter((event) => event.id === eventId)
    );

module.exports = {
    findAllEvents, findEventById
}