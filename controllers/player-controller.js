const playerService = require('../services/player-service');

module.exports = (app) => {
  app.get('/api/player', function (req, res) {
    playerService.getPlayerSummary().then((result) => {
      res.send(result);
    });
  });
};
