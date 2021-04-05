const playerService = require('../services/player-service');

module.exports = (app) => {

    const findAllPlayers = (req, res) => {
        playerService.findAllPlayers().then((result) => {
            res.send(result);
        });
    };

    const findPlayer = (req, res) => {
        const playerId = parseInt(req.params['playerId']);
        playerService.findPlayer(playerId).then((result) => res.send(result));
    };

    const findPlayerPosition = (req, res) => {
        // const playerId = parseInt(req.params['playerId']);
        const elementTypeId = parseInt(req.params['elementTypeId']);
        playerService
            .findPlayerPosition(elementTypeId)
            .then((result) => res.send(result));
    };

    app.get('/api/players', findAllPlayers);
    app.get('/api/players/:playerId', findPlayer);
    app.get(
        '/api/players/:playerId/positions/:elementTypeId',
        findPlayerPosition
    );
};