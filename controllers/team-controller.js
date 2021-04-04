const teamService = require("../services/teams/team-service")

module.exports = (app) => {
    const findAllTeams = (req, res) => {
        const teams = teamService.findAllTeams()
        res.send(teams)
    }
    const findTeamById = (req, res) => {
        const teamId = parseInt(req.params['teamId'])
        const team = teamService.findTeamById(teamId)
        res.send(team)
    }

    app.get("/api/teams", findAllTeams)
    app.get("/api/teams/:teamId", findTeamById)
}