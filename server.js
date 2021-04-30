require('dotenv').config()

const mongodbUsername = process.env.mongodbAtlasUsername
const mongodbPassword = process.env.mongodbAtlasPassword

console.log("username:", process.env.mongodbAtlasUsername)
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

const mongoose = require('mongoose');
mongoose.connect(
    `mongodb+srv://${mongodbUsername}:${mongodbPassword}@cluster0.95dme.mongodb.net/codeleague`,
    {useNewUrlParser: true, useUnifiedTopology: true});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, X-Requested-With, Origin'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.header(
    "Access-Control-Allow-Credentials",
    "true");
  next();
});

const apiExplanation = (req, res) => {
  let result = `
  <h3>Welcome to CodeLeague Api, <br/>you can use the following paths in order access the data:</h3>
  
  <h4>-- Players Info --</h4>
  <p>/api/players</p>
  <p>/api/players/:playerId</p>
  <p>/api/search/players</p>
  <p>/api/players/:playerId/details</p>
  <p>/api/players/:playerId/positions/:elementTypeId</p>
  <p>/api/search/players/top-ten</p>

  <h4>-- Events Info --</h4>
  <p>/api/events</p>
  <p>/api/events/:eventId</p>
  <p>/api/events/:eventId/matches</p>
  <p>/api/matchweek</p>

  <h4>-- Players' Positions Info --</h4>
  <p>/api/types<p>
  <p>/api/types/:typeId<p>
  
  `
  res.send(result)
};

app.get('/', apiExplanation);

require('./controllers/element-type-controller')(app);
require('./controllers/event-controller')(app);
require('./controllers/team-controller')(app);
require('./controllers/player-controller')(app);
require('./controllers/users-team-controller')(app);
require('./controllers/users-controller')(app);

app.listen(PORT);

console.log('App listening on ' + PORT);
