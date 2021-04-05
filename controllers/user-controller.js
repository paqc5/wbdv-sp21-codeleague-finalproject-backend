const userService = require('../services/user-service');

module.exports = (app) => {
  app.get('/api/user/team', function (req, res) {
    // read email and password from request body
    userService
      .findUserTeam('hluzinho@gmail.com', 'codeLeague123')
      .then((team) => {
        res.send(team);
      });
  });
};
