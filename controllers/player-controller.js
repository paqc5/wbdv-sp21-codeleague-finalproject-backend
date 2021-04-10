const playerService = require('../services/player-service');

module.exports = (app) => {
  const findAllPlayers = (req, res) => {
    playerService.findAllPlayers().then((result) => {
      res.send(result);
    });
  };

  const findPlayerById = (req, res) => {
    const playerId = parseInt(req.params['playerId']);
    playerService.findPlayerById(playerId).then((result) => res.send(result));
  };

  const findPlayerByName = (req, res) => {
    let firstname = req.query.firstname === undefined ? "" : req.query.firstname
    let lastname = req.query.lastname === undefined ? "" :  req.query.lastname;
    playerService.findPlayerByName(firstname, lastname)
      .then((result) => res.send(result));
  };

  const findPlayerPosition = (req, res) => {
    // const playerId = parseInt(req.params['playerId']);
    const elementTypeId = parseInt(req.params['elementTypeId']);
    playerService
      .findPlayerPosition(elementTypeId)
      .then((result) => res.send(result));
  };

  // is it necessary to have playerId here?
  app.get('/api/players', findAllPlayers);
  app.get('/api/players/:playerId', findPlayerById);
  app.get('/api/player', findPlayerByName);
  app.get('/api/players/:playerId/positions/:elementTypeId', findPlayerPosition);
};
