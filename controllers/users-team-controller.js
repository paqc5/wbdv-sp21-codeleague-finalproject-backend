const usersTeamService = require('../services/users-team-service');

module.exports = (app) => {
  
  app.get('/api/user/team', function (req, res) {
    // read email and password from request body
      usersTeamService
      .findUserTeam('hluzinho@gmail.com', 'codeLeague123')
      .then((team) => {
        res.send(team);
      });
  });
}