const BASE_API_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';
const PLAYER_DETAILS_API_URL =
  'https://fantasy.premierleague.com/api/element-summary';
const FIXTURES_API_URL = 'https://fantasy.premierleague.com/api/fixtures';
const API_URL_HISTORY =
  'https://fantasy.premierleague.com/api/element-summary/251/';
const PROXY_API_URL = 'https://codeleague-cors-proxy.herokuapp.com/';

const baseConfig = {
  url: PROXY_API_URL,
  method: 'GET',
  headers: {
    'target-url': BASE_API_URL,
    'content-type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
};

const buildDetailsConfig = (playerId) => {
  const detailsConfig = {
    url: PROXY_API_URL,
    method: 'GET',
    headers: {
      'target-url': `${PLAYER_DETAILS_API_URL}/${playerId}/`,
      'content-type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  };
  return detailsConfig;
};

const fixturesConfig = {
  url: PROXY_API_URL,
  method: 'GET',
  headers: {
    'target-url': FIXTURES_API_URL,
    'content-type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
};

module.exports = {
  baseConfig,
  fixturesConfig,
  buildDetailsConfig,
};
