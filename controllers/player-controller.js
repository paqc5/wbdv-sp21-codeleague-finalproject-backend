const playerService = require('../services/player-service');
const usersService = require('../services/users-service');

module.exports = (app) => {

  const findPlayerDetails = (req, res) => {
    let currentUser = req.session['profile']
    console.log("current user:", currentUser.savedData)
    currentUser = currentUser.savedData 
    let playerId = req.params['playerId']
    playerService.findPlayerDetails(playerId)
        .then((playerDetails) => {
          res.send(playerDetails)
        });
  };

  const findAllPlayers = (req, res) => {
    playerService.findAllPlayers().then((response) => {
      res.send(response);
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
    playerService.findPlayerByName(firstname, lastname)
      .then((result) => res.send(result));
  };

  const findPlayerPosition = (req, res) => {
    const elementTypeId = parseInt(req.params['elementTypeId']);
    playerService
      .findPlayerPosition(elementTypeId)
      .then((result) => res.send(result));
  };

  const findTopTenPlayers = (req, res) => {
    playerService
      .findTopTenPlayers()
      .then((result) => res.send(result));
  };

  // is it necessary to have playerId here?
  app.get('/api/players', findAllPlayers);
  app.get('/api/players/:playerId', findPlayerById);
  app.get('/api/search/players', findPlayerByName);
  app.get('/api/players/:playerId/details', findPlayerDetails);
  app.get('/api/players/:playerId/positions/:elementTypeId',findPlayerPosition);
  app.get('/api/search/players/top-ten',findTopTenPlayers);
};
