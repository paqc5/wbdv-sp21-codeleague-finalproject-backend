const teams = require("./teams.json")

const findAllTeams = () => {
    return teams
}

const findTeamById = (teamId) => {
    return teams.filter((team) => {
        return team.id === teamId
    })
}

module.exports = {
    findAllTeams, findTeamById
}