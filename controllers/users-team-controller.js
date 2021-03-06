const usersTeamService = require('../services/users-team-service');

module.exports = (app) => {
  // test route
  app.get('/api/user/cookie', function (req, res) {
    // TODO: read email and password from request body
    usersTeamService
      .viewCookie('hluzinho@gmail.com', 'codeLeague123')
      .then((cookie) => {
        res.send(cookie);
      });
  });

  app.get('/api/user/team', function (req, res) {
    // TODO: read email and password from request body
    usersTeamService
      .findUserTeam('hluzinho@gmail.com', 'codeLeague123')
      .then((team) => {
        res.send(team);
      });
  });
};
