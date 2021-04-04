const fpl = require('fpl-api');

// split into authenticate user

const getTeam = () => {
  return fpl
    .fetchSession('ndabemahluza@gmail.com', '8Mum*Fled')
    .then((cookie) => {
      //   console.log(cookie);
      return fpl.fetchMyTeam(cookie, 1349618);
    });
};

module.exports = { getTeam };
