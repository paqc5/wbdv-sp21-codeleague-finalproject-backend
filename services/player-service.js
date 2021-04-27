const axios = require('axios');
const configs = require('./api-configs');
const teamService = require('./team-service');
const usersDAO = require('../daos/users-dao');

//TODO: cache team data

/*
cache players
resolve cyclic dependency
create new service that acts as parent to both
imports both users-team-service and player-service
use cachedPlayers in that service
create new controller for that service
*/

const findAllPlayers = () => {

  let allParsedPlayers = [];

  // TODO: add live gameweek score to parsed player for easy search
  return axios(configs.baseConfig)
    .then((response) => {

      // Storage teams data
      let teams = response.data.teams;
      // Storage current event data
      let currentEvent = response.data.events.filter((event) => event.is_next === true);
      // Storage players data
      let allPlayers = response.data.elements;
      // Storage players positions data
      let playersPositions = response.data.element_types;
      // Storage the total number of players
      let totalPlayers = allPlayers.length;

      return axios(configs.buildGameweekScoresConfig(currentEvent[0].id - 1))
        .then(rs => {
          // Storage the players stats
          let playerEventStats = rs.data.elements

          allPlayers.map((player) => {
            // spp: singleParsedPlayer
            let spp = {};
            spp.id = player.id;
            spp.first_name = player.first_name;
            spp.second_name = player.second_name;
            spp.form = player.form;
            spp.event_points = player.event_points;
            spp.selected_by_percent = player.selected_by_percent;
            spp.influence_rank_type = player.influence_rank_type;
            spp.creativity_rank_type = player.creativity_rank_type;
            spp.threat_rank_type = player.threat_rank_type;
            spp.ict_index_rank_type = player.ict_index_rank_type;
            spp.ict_index_rank = player.ict_index_rank;
            spp.now_cost = player.now_cost;
            spp.total_points = player.total_points;
            spp.photo = player.photo.split('.')[0];
            spp.selected_by_percent = player.selected_by_percent;

            // Get position of the player 
            // Use as index in element_types object to get player position
            let playerPosition = playersPositions[player.element_type - 1];
            spp.position_info = {
              id: playerPosition.id,
              player_position: playerPosition.singular_name,
              player_position_short_name: playerPosition.singular_name_short,
              total_players: playerPosition.element_count,
            };

            // Get the team of the player
            // Use the player's team id to get team's data
            let team = teams[player.team - 1];
            spp.team_info = {
              id: team.id,
              team_image_code: team.code,
              team_name: team.name,
              team_short_name: team.short_name,
            };

            // Get players stats from previous game
            let playerStats = playerEventStats[player.id - 1]
            spp.stats_info = {
              total_previous_points: playerStats.stats.total_points
            }

            // Add the amount of players
            spp.total_players = totalPlayers;

            allParsedPlayers.push(spp);
          });
          // Return parsed players data
          return allParsedPlayers;
        })
    })
};

const findPlayerDetails = (playerId) => {
  return axios(configs.baseConfig).then((response) => {
    // Get teams data
    let teams = response.data.teams;
    return axios(configs.buildDetailsConfig(playerId)).then(
      (playerDetails) => {
        let details = {};
        let seasonHistory = playerDetails.data.history_past;
        let n = seasonHistory.length;
        let recentSeasonHistory = seasonHistory.slice(n - 2, n);
        let fixtureHistory = playerDetails.data.history;
        n = fixtureHistory.length;
        let recentFixtureHistory = playerDetails.data.history.slice(
          n - 5,
          n
        );
        let parsedFixtureHistory = [];

        // for setting fixture gameweek in map
        n -= 4;
        recentFixtureHistory.map((fixture) => {
          // spf: singleParsedFixture
          let spf = {};
          spf.opponent_team = teams[fixture.opponent_team - 1].name;
          // n referencing fixedHistory.length - 4
          spf.gameweek = n++;
          spf.score = fixture.total_points;
          spf.minutes_played = fixture.minutes;
          spf.was_home = fixture.was_home;

          // injury status for past fixtures not available
          // TODO: keep track of injurty status going forward

          parsedFixtureHistory.push(spf);
        });

        // next 10 fixtures or remaining fixtures
        let upcomingFixtures = playerDetails.data.fixtures;
        let parsedUpcomingFixtures = [];
        let i = 0;
        while (upcomingFixtures[i] && i != 10) {
          // spuf: singleParsedUpcomingFixture
          let spuf = {};
          spuf.event_name = upcomingFixtures[i].event_name;
          spuf.team_h = teams[upcomingFixtures[i].team_h - 1].short_name;
          spuf.team_a = teams[upcomingFixtures[i].team_a - 1].short_name;
          spuf.is_home = upcomingFixtures[i].is_home;
          spuf.difficulty = upcomingFixtures[i].difficulty;
          parsedUpcomingFixtures.push(spuf);
          i++;
        }

        // transfer activity from most recent gameweek
        n = recentFixtureHistory.length;
        let lastFixture = recentFixtureHistory[n - 1];
        details.transfers = {
          in: lastFixture.transfers_in,
          out: lastFixture.transfers_out,
          balance: lastFixture.transfers_balance,
        };

        details.season_history = recentSeasonHistory;
        details.fixture_history = parsedFixtureHistory;
        details.upcoming_fixtures = parsedUpcomingFixtures;

        return usersDAO.findCommonPlayers(playerId)
          .then(common => {
            if(common) {
              details.common_users = common.users
            } else {
              details.common_users = ["None"]
            }
            
            return details;
          })
        
      }
    );
  })
    .catch((error) => {
      console.log(error);
    });
}

const findPlayerById = (playerId) =>
  findAllPlayers().then((res) =>
    res.filter((player) => player.id === playerId)
  );

const findPlayerPosition = (elementTypeId) => {
  return axios(configs.baseConfig)
    .then((res) => {
      return res.data.element_types;
    })
    .then((res) =>
      res.filter((elementType) => elementType.id === elementTypeId)
    );
};

const findPlayerByName = (inputNameOne, inputNameTwo) => {
  return findAllPlayers().then((res) =>
    res.filter((player) => {
      let firstName =
        player.first_name !== undefined ? player.first_name.toLowerCase() : '';
      let lastName =
        player.second_name !== undefined
          ? player.second_name.toLowerCase()
          : '';
      if (inputNameTwo === 'noLastname') {
        if (firstName === inputNameOne || lastName === inputNameOne) {
          return true;
        }
        return false;
      } else {
        if (firstName === inputNameOne && lastName === inputNameTwo) {
          return true;
        }
        return false;
      }
    })
  );
};

const findTopTenPlayers = () => {
  return findAllPlayers().then((response) => {
    let sortedArr;
    let topTen = [];

    sortedArr = response.sort((a, b) => {
      if (parseFloat(a.total_points) > parseFloat(b.total_points)) {
        return -1;
      }
      if (parseFloat(a.total_points) < parseFloat(b.total_points)) {
        return 1;
      }
      return 0;
    });

    for (let i = 0; i < 10; i++) {
      topTen[i] = sortedArr[i];
    }

    return topTen;
  });
};

module.exports = {
  findAllPlayers,
  findPlayerById,
  findPlayerByName,
  findPlayerPosition,
  findPlayerDetails,
  findTopTenPlayers,
};
