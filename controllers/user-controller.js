const userService = require('../services/user-service');

module.exports = (app) => {
  app.get('/api/user/team', function (req, res) {
    // read email and password from request body
    userService
      .findUserTeam('hluzinho@gmail.com', 'codeLeague123')
      .then((team) => {
        res.send(team);
      });
  });
function register(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = {
    username: username,
    password: password
  };

  userService
      .findUserByUsername(username)
      .then(function (user) {
        if(!user) {
          return userModel
              .createUser(newUser)}})
      .then(function (user) {
        req.session['currentUser'] = user;
        res.send(user);
      });
};

function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  userService
      .findUserByCredentials(username, password)
      .then(function (user) {
        if(user) {
          req.session['currentUser'] = user;
          res.send(user);
        } else {
          res.send(0);
        }});
};

function logout(req, res) {
  req.session.destroy();
  res.send(200);
};

function profile(req, res) { }

function getUserTeam(req, res) {
  const fplEmail = req.params['fplEmail'];
  const fplPassword = req.params['fplPassword'];
  const managerId = req.params['managerId'];
  userService.
    getUserTeam(fplEmail, fplPassword, managerId).then((team) => {
      res.send(team);
    });
};

module.exports = function (app) {
  app.post('/api/login', login);
  app.post('/api/register', register);
  app.post('/api/logout', logout);
  app.get('/api/profile', profile);
  app.get('/api/:fplEmail/:fplPassword/:managerId', getUserTeam);
}