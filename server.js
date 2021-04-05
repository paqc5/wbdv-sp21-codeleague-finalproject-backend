const express = require('express');
const app = express();
PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

require('./controllers/element-type-contrller')(app);
require('./controllers/event-controller')(app);
require('./controllers/team-controller')(app);
require('./controllers/player-controller')(app);
// require('./controllers/user-controller')(app);

app.listen(PORT);

console.log('App listening on ' + PORT);