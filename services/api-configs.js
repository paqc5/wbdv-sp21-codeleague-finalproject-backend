const BASE_API_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';
const PLAYER_DETAILS_API_URL = 'https://fantasy.premierleague.com/api/element-summary';
const FIXTURES_API_URL = 'https://fantasy.premierleague.com/api/fixtures';
const PROXY_API_URL = 'https://codeleague-cors-proxy.herokuapp.com/';
const GAMEWEEK_SCORES_API_URL = 'https://fantasy.premierleague.com/api/event'

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
    }
  }
  return detailsConfig;
};

const buildGameweekScoresConfig = (gw) => {
  const detailsConfig = {
    url: PROXY_API_URL,
    method: 'GET',
    headers: {
      'target-url': `${GAMEWEEK_SCORES_API_URL}/${gw}/live`,
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
  buildGameweekScoresConfig
};
