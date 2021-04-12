const playerService = require('../services/player-service');

module.exports = (app) => {
  const findAllPlayers = (req, res) => {
    let players = playerService.findAllPlayers();
    // console.log('players:');
    if (players instanceof Promise) {
      players.then((result) => {
        // console.log('if triggered');
        res.send(result);
      });
    } else {
      // console.log('else triggered');
      res.send(players);
    }
  };

  const findPlayerDetails = (req, res) => {
    let playerId = parseInt(req.params['playerId'])
    playerService
      .findPlayerDetails(playerId)
      .then((playerDetails) => res.send(playerDetails));
  };

  const findAndParseAllPlayers = (req, res) => {
    playerService.findAndParseAllPlayers().then((parsedPlayers) => {
      // console.log('players:', parsedPlayers);
      res.send(parsedPlayers);
    });
  };

  const findPlayerById = (req, res) => {
    const playerId = parseInt(req.params['playerId']);
    playerService.findPlayerById(playerId).then((result) => res.send(result));
  };

  const findPlayerByName = (req, res) => {
    let firstname =
      req.query.firstname === undefined ? '' : req.query.firstname;
    let lastname = req.query.lastname === undefined ? '' : req.query.lastname;
    playerService
      .findPlayerByName(firstname, lastname)
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
  app.get('/api/players', findAndParseAllPlayers);
  // app.get('/api/players/:playerId', findPlayerById);
  app.get('/api/player', findPlayerByName);
  app.get('/api/players/:playerId', findPlayerDetails);
  app.get(
    '/api/players/:playerId/positions/:elementTypeId',
    findPlayerPosition
  );
};
