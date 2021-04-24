const axios = require('axios');
const configs = require('./api-configs');
const teamService = require('./team-service');
const usersDAO = require('../daos/users-dao');

// parent to both

// const usersTeamService = require('./users-team-service');
// caches
// var cachedPlayers;
let teams;

const findAllPlayers = () => {
  // if (cachedPlayers) console.log('cachedPlayers:', cachedPlayers[0]);
  // if (usersTeamService.cachedPlayers)
  //   console.log('cachedPlayers:', usersTeamService.cachedPlayers[0]);
  let allParsedPlayers = [];

  // TODO: add live gameweek score to parsed player for easy search
  return axios(configs.baseConfig)
    .then((response) => {
      teams = response.data.teams;
      // current event
      ce = response.data.events.filter((event) => event.is_next === true);
      let allPlayers = response.data.elements;
      let playersPositions = response.data.element_types;
      let totalPlayers = allPlayers.length;

      // TODO: undo slice to parse all players
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

        // find element_type attribute in player object
        // use as index in element_types object to get player position
        let playerPosition = playersPositions[player.element_type - 1];
        spp.position_info = {
          id: playerPosition.id,
          player_position: playerPosition.singular_name,
          player_position_short_name: playerPosition.singular_name_short,
          total_players: playerPosition.element_count,
        };

        // find player team id in player object
        // use as index in teams object to get player team
        // caching teams data
        let team = response.data.teams[player.team - 1];
        spp.team_info = {
          id: team.id,
          team_name: team.name,
          team_short_name: team.short_name,
        };

        // Add the amount of players
        spp.total_players = totalPlayers;

        allParsedPlayers.push(spp);
      });
      return allParsedPlayers;
    })
    .then((players) => {
      // current event id
      let cei = ce[0].id;
      return axios(configs.buildGameweekScoresConfig(cei - 1)).then(
        (PlayerGameWeekStats) => {
          let playerPerformance = PlayerGameWeekStats.data.elements;
          for (i = 0; i < playerPerformance.length; i++) {
            players[i].total_points_previous =
              playerPerformance[i].stats.total_points;
          }

          cachedPlayers = players;
          return players;
          // stats.map(player =>)
          // players.map(player => {return {...player, total_points_previous: status.total_points}})
          // return PlayerGameWeekScores.data.elements
        }
      );
      // players.map(player => {return {...player, score: }})
    })
    .catch((error) => {
      console.log(error);
    });
};

const findPlayerDetails = (playerId, user) => {
  return axios(configs.baseConfig).then((response) => {
    let teams = response.data.teams;
    // is this where find common players would be called?
    // selectedBy = {}
    return usersDAO
      .findCommonPlayers(user)
      .then(
        (res) => res
        // console.log('common player array:', res);
      )
      .then((commonPlayers) => {
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
            details.commonUsers = commonPlayers;

            return details;
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

// find top 5 scoring players for each position
// TODO: use Mongo
const findTopFivePlayers = () => {
  /*
  this occurs before a user can look up a player
  currently finding and parsing all players
  but when does that happen
  probably shouldn't happen only when a user logs in
  we just need to have it ready to go
  and stored
  so should we have our player summary stored
  cost and selected by can be in fluctuation
  cost only updated once a day in fpl though
  not sure about selected - probably the same
  so we can have it stored
  and only run it like once a day
  sorting should be done in a database
  
  fact is, need to:
  - sort all positions by highest scores

  first step
  - adding gameweek score to findAndParsePlayers

  return dream team: https://fantasy.premierleague.com/api/dream-team/30/
  https://fantasy.premierleague.com/api/event/31/live
  live endpoint contains no element_type information
  use id to find information in allParsedPlayers cache
  
  filter out for goalkeepers 
  sort by gameweek points
  return top 5
  */
};

/*
  why do I have to return the axios calls?
*/

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
