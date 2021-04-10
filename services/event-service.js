const axios = require('axios');
const BASE_API_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';
const FIXTURES_API_URL = 'https://fantasy.premierleague.com/api/fixtures'
const PROXY_API_URL = 'https://codeleague-cors-proxy.herokuapp.com/';

let baseConfig = {
  url: PROXY_API_URL,
  method: 'GET',
  headers: {
    'target-url': BASE_API_URL,
    'content-type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
};

let fixturesConfig = {
  url: PROXY_API_URL,
  method: 'GET',
  headers: {
    'target-url': FIXTURES_API_URL,
    'content-type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
}

const findAllEvents = () => {
  return axios(baseConfig)
    .then(response => response.data.events)
    .catch((error) => {
      console.log(error);
    });
}

const findEventById = (eventId) =>
  findAllEvents().then((res) =>
    res.filter((event) => event.id === eventId)
  )

const findCurrentEvent = () => {
  return axios(baseConfig)
    .then(response =>
      response.data.events.filter(event => event.is_next === true))
    .catch((error) => {
      console.log(error);
    });
}

const findMatchesForEvent = (eventId) => {
  axios.get(PROXY_API_URL, fixturesConfig)
    .then(response => 
      response.data.filter(event => event.event === eventId))
        .catch((error) => {
          console.log(error);
        });
}

const findEventAndMatches = () => {

  let matches = {}

  // Get Json object from statis API
  return axios(baseConfig)
    .then(baseRs => {

      // Get the current event
      let rs = baseRs.data.events.filter(event => event.is_next === true)

      // Update matched object with the id and event name
      matches['event_id'] = rs[0].id
      matches['event_name'] = rs[0].name

      // Get Json object from fixture API
      return axios(fixturesConfig)
        .then(fixRs => {

          // Get all the matches that matches the event id
          rs = fixRs.data.filter(event => event.event === matches.event_id)

          // Put together Json object with event id, matches, and time
          return matches = {
            ...matches,
            matches: rs.map(item => {

              let teamH = baseRs.data.teams.filter(team =>
                team.id === item.team_h)

              let teamA = baseRs.data.teams.filter(team =>
                team.id === item.team_a)

              let tmpJson = {
                match_id: item.id,
                kickoff_time: item.kickoff_time,
                team_h: teamH[0].name,
                team_h_short: teamH[0].short_name,
                team_h_img: teamH[0].code,
                team_a: teamA[0].name,
                team_a_short: teamA[0].short_name,
                team_a_img: teamA[0].code,
              }
              return tmpJson
            })
          }
        })

        .catch((error) => {
          console.log(error);
        });

    }).catch((error) => {
      console.log(error);
    })
}

module.exports = {
  findAllEvents, findCurrentEvent, findEventById, findMatchesForEvent, findEventAndMatches
}