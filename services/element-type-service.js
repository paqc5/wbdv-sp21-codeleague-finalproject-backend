const axios = require('axios');
const BASE_API_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';
const PROXY_API_URL = 'https://codeleague-cors-proxy.herokuapp.com/';

let getConfig = {
    method: 'get',
    url: PROXY_API_URL,
    headers: { 'Target-URL': BASE_API_URL, 'Content-Type': 'application/json' },
};

const findAllTypes = () => {
    return axios(getConfig)
        .then((res) => {
            return res.data.element_types;
        })
};

const findTypeById = (typeId) => {
    return findAllTypes().then((res) =>
        res.filter((type) => type.id === typeId)
    );
};

module.exports = {
    findAllTypes, findTypeById
}