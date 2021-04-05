const userService = require('../services/user-service');

module.exports = (app) => {
  app.get('/api/user/team', function (req, res) {
    userService.getTeam().then((team) => {
      res.send(team);
    });
  });
};
