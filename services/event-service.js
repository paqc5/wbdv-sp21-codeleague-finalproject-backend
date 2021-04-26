const axios = require('axios');
const configs = require('./api-configs');
<<<<<<< HEAD
const FIXTURES_API_URL = 'https://fantasy.premierleague.com/api/fixtures'
=======
>>>>>>> 14753f3c5f37cfbc5323c86a0a6bee112b1d54f3
const PROXY_API_URL = 'https://codeleague-cors-proxy.herokuapp.com/';
const userTeamService = require('./users-team-service');

const findAllEvents = () => {
  return axios(configs.baseConfig)
<<<<<<< HEAD
    .then(response => response.data.events)
=======
    .then((response) => response.data.events)
>>>>>>> 14753f3c5f37cfbc5323c86a0a6bee112b1d54f3
    .catch((error) => {
      console.log(error);
    });
};

const findEventById = (eventId) => {
<<<<<<< HEAD
  // if (userTeamService.cachedPlayers)
  //   console.log('cachedPlayers:', userTeamService.cachedPlayers[0]);
=======
>>>>>>> 14753f3c5f37cfbc5323c86a0a6bee112b1d54f3
  return findAllEvents().then((res) =>
    res.filter((event) => event.id === eventId)
  );
};
const findCurrentEvent = () => {
  return axios(configs.baseConfig)
    .then(response =>
      response.data.events.filter(event => event.is_next === true))
    .catch((error) => {
      console.log(error);
    });
};

const findMatchesForEvent = (eventId) => {
<<<<<<< HEAD
  return axios(configs.fixturesConfig)
    .then(response => response.data.filter(event => event.event == eventId))
=======
  axios
    .get(PROXY_API_URL, configs.fixturesConfig)
    .then((response) =>
      response.data.filter((event) => event.event === eventId)
    )
>>>>>>> 14753f3c5f37cfbc5323c86a0a6bee112b1d54f3
    .catch((error) => {
      console.log(error);
    });
}

const findEventAndMatches = () => {
  let matches = {};

  // Get Json object from statis API
  return axios(configs.baseConfig)
<<<<<<< HEAD
    .then(baseRs => {

=======
    .then((baseRs) => {
>>>>>>> 14753f3c5f37cfbc5323c86a0a6bee112b1d54f3
      // Get the current event
      let rs = baseRs.data.events.filter((event) => event.is_next === true);

      // Update matched object with the id and event name
      matches['event_id'] = rs[0].id;
      matches['event_name'] = rs[0].name;

      // TODO: explore using query parameter instead https://fantasy.premierleague.com/api/fixtures?event=31
      // Get Json object from fixture API
      return axios(configs.fixturesConfig)
<<<<<<< HEAD
        .then(fixRs => {

=======
        .then((fixRs) => {
>>>>>>> 14753f3c5f37cfbc5323c86a0a6bee112b1d54f3
          // Get all the matches that matches the event id
          rs = fixRs.data.filter((event) => event.event === matches.event_id);

          // Put together Json object with event id, matches, and time
          return (matches = {
            ...matches,
            matches: rs.map((item) => {
              let teamH = baseRs.data.teams.filter(
                (team) => team.id === item.team_h
              );

              let teamA = baseRs.data.teams.filter(
                (team) => team.id === item.team_a
              );

              let tmpJson = {
                match_id: item.id,
                kickoff_time: item.kickoff_time,
                team_h: teamH[0].name,
                team_h_short: teamH[0].short_name,
                team_h_img: teamH[0].code,
                team_a: teamA[0].name,
                team_a_short: teamA[0].short_name,
                team_a_img: teamA[0].code,
              };
              return tmpJson;
            }),
          });
        })

        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  findAllEvents,
  findCurrentEvent,
  findEventById,
  findMatchesForEvent,
  findEventAndMatches
}
