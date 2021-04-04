const express = require('express')
const  app = express()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

require('./controllers/element-type-contrller')(app)
require('./controllers/team-contrller')(app)
require('./controllers/event-contrller')(app)

app.listen(3000)