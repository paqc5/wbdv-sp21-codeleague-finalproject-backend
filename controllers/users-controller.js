const usersService = require('../services/users-service');

module.exports = (app) => {

  const register = (req, res) => {
    const user = req.body
    usersService.register(user)
      .then(rs => {
        res.send(rs)
      })
  }

  const login = (req, res) => {
    const credentials = req.body;
    usersService.login(credentials)
      .then(actualUser => {
        res.send(actualUser)
      });
  };

  const profile = (req, res) => {
    const currentUser = req.session['profile']
    res.send(currentUser)
  };

  // Change findById to findByUsername (Some privacy risks exist)
  const findUserProfile = (req, res) => {
    const username = req.params.username
    usersService.findUserByUsername(username)
    .then((user) => {
      res.send(user);
    });
  };

  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const updateUser = (req, res) => {
    const newUser = req.body;
    usersService.updateUser(newUser, newUser)
    .then((updatedUser) => {
      res.send(`${updatedUser.ok}`);
    });
  };

  const deleteUser = (req, res) => {
    const userToDelete = req.body;
    usersService.deleteUser(currentUser, userToDelete, res);
  };

  const findAllUsers = (req, res) => {
    const user = req.body
    usersService.findAllUsers(user)
    .then((users) => {
      res.send(users);
    });
  };

  const findUserByName = (req, res) => {
    let firstname =
      req.query.firstname === undefined ? '' : req.query.firstname;
    let lastname = req.query.lastname === undefined ? '' : req.query.lastname;
    usersService.findUserByName(firstname, lastname)
      .then((result) => res.send(result));
  };

  const findUserFollowing = (req, res) => {
    const currentUser = req.session['profile'];
    usersService.findUserFollowing(currentUser).then((userFollowing) => {
      res.send(userFollowing);
    });
  };

  const addUserFollowing = (req, res) => {
    const currentUser = req.session['profile'];
    const followingEmail = req.body.followingEmail;
    usersService
      .addUserFollowing(currentUser, followingEmail)
      .then((newUserFollowing) => {
        res.send(newUserFollowing);
      });
  };

  const deleteUserFollowing = (req, res) => {
    const currentUser = req.session['profile'];
    const followingEmail = req.body.followingEmail;
    usersService
      .deleteUserFollowing(currentUser, followingEmail)
      .then((newUserFollowing) => {
        res.send(newUserFollowing);
      });
  };

  const findUserFollowers = (req, res) => {
    const currentUser = req.session['profile'];
    usersService.findUserFollowers(currentUser).then((userFollower) => {
      res.send(userFollower);
    });
  };
  const findUserById = (req, res) => {
    const id = req.params['id'];
    console.log(id)
    usersService.findUserById(id)
    .then(response => {
      res.send(response.userTeam);
    });
  };

  const addUserFollower = (req, res) => {
    const currentUser = req.session['profile'];
    const followerUsername = res.body;
    usersService
      .addUserFollower(currentUser, followerUsername)
      .then((newUserFollower) => {
        res.send(newUserFollower);
      });
  };

  const deleteUserFollower = (req, res) => {
    const currentUser = req.session['profile'];
    const followerUsername = res.body;
    usersService
      .deleteUserFollower(currentUser, followerUsername)
      .then((newUserFollower) => {
        res.send(newUserFollower);
      });
  };

  app.get('/api/team/:id', findUserById);
  app.post('/api/users/profile', profile);
  app.get('/api/users/profile/:username', findUserProfile);
  app.post('/api/users/register', register);
  app.post('/api/users/login', login);
  app.post('/api/users/logout', logout);
  app.post('/api/users', findAllUsers);
  app.get('/api/profile/search/users', findUserByName);
  app.put('/api/users/update', updateUser);
  app.delete('api/users/delete', deleteUser);
  app.get('/api/users/following', findUserFollowing);
  app.post('/api/users/following/add', addUserFollowing);
  app.put('/api/users/following/delete', deleteUserFollowing);
  app.get('/api/users/followers', findUserFollowers);
  app.put('/api/users/followers/add', addUserFollower);
  app.put('/api/users/followers/delete', deleteUserFollower);
};
