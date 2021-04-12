const axios = require('axios');
const configs = require('./api-configs');
const teamService = require('./team-service');

// caches
let players;
let teams;

const findPlayerDetails = (playerId) => {
  return axios(configs.buildDetailsConfig(playerId))
    .then((playerDetails) => {
      let details = {};
      let seasonHistory = playerDetails.data.history_past;
      let n = seasonHistory.length;
      let recentSeasonHistory = seasonHistory.slice(n - 2, n);

      let fixtureHistory = playerDetails.data.history;
      n = fixtureHistory.length;
      let recentFixtureHistory = playerDetails.data.history.slice(n - 5, n);
      let parsedFixtureHistory = [];
      // for setting fixture gameweek in map
      n -= 4;
      recentFixtureHistory.map((fixture) => {
        // spf: singleParsedFixture
        spf = {};
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
      i = 0;
      while (upcomingFixtures[i] && i != 10) {
        spuf = {};
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

      return details;
    })
    .catch((error) => {
      console.log(error);
    });
};

const findAndParseAllPlayers = () => {
  let allParsedPlayers = [];
  // TODO: add live gameweek score to parsed player for easy search
  return axios(configs.baseConfig)
    .then((response) => {
      allPlayers = response.data.elements;
      positions = response.data.element_types;
      teams = response.data.teams;

      // TODO: undo slice to parse all players
      allPlayers.map((player) => {
        // spp: singleParsedPlayer
        spp = {};
        spp.id = player.id;
        spp.first_name = player.first_name;
        spp.second_name = player.second_name;
        spp.now_cost = player.now_cost;
        spp.total_points = player.total_points;
        spp.photo = player.photo.split('.')[0];
        spp.selected_by_percent = player.selected_by_percent;

        // find element_type attribute in player object
        // use as index in element_types object to get player position
        spp.position = positions[player.element_type - 1].singular_name_short;

        // find player team id in player object
        // use as index in teams object to get player team
        // caching teams data
        team = response.data.teams[player.team - 1];
        spp.team = { name: team.name, short_name: team.short_name };

        allParsedPlayers.push(spp);
      });
      players = allParsedPlayers;
      return players;
    })
    .catch((error) => {
      console.log(error);
    });
};

// find top 5 scoring players for each position
// TODO: use Mongo
const findTopFive = () => {
  /*
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
  return axios(baseConfig)
    .then((res) => {
      return res.data.element_types;
    })
    .then((res) =>
      res.filter((elementType) => elementType.id === elementTypeId)
    );
};

const findPlayerByName = (inputNameOne, inputNameTwo) => {
  return axios(baseConfig).then((res) =>
    res.data.elements.filter((player) => {
      let firstName =
        player.first_name !== undefined ? player.first_name.toLowerCase() : '';
      let lastName =
        player.second_name !== undefined
          ? player.second_name.toLowerCase()
          : '';
      if (
        firstName === inputNameOne ||
        firstName === inputNameTwo ||
        lastName === inputNameOne ||
        lastName === inputNameTwo
      ) {
        return true;
      }
      return false;
    })
  );
};

module.exports = {
  findAndParseAllPlayers,
  findPlayerById,
  findPlayerByName,
  findPlayerPosition,
  findPlayerDetails,
};
