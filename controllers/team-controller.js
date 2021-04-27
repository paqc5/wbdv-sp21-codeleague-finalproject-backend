const teamService = require("../services/team-service")

module.exports = (app) => {

    const findAllTeams = (req, res) => {
        let teams = teamService.findAllTeams();
        if (teams instanceof Promise) {
          teams.then((result) => {
            res.send(result);
          });
        } else {
          res.send(teams);
        }
    };

    const findTeamById = (req, res) => {
        const teamId = parseInt(req.params['teamId']);
        teamService.findTeamById(teamId).then((result) => {
            res.send(result)
        });
    };

    app.get("/api/teams", findAllTeams)
    app.get("/api/teams/:teamId", findTeamById)
}