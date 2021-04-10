const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const session = require('express-session');
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'shhh, dont tell anyone',
  })
);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, X-Requested-With, Origin'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

require('./controllers/element-type-controller')(app);
require('./controllers/event-controller')(app);
require('./controllers/team-controller')(app);
require('./controllers/player-controller')(app);
require('./controllers/user-controller')(app);

app.listen(PORT);

console.log('App listening on ' + PORT);
