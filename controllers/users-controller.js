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
    .then(users => {
      res.send(users);
    })
  };

  const findUserByName = (req, res) => {
    let firstname =
      req.query.firstname === undefined ? '' : req.query.firstname;
    let lastname = req.query.lastname === undefined ? '' : req.query.lastname;
    usersService.findUserByName(firstname, lastname)
      .then((result) => {
        res.send(result)
      });
  };

  const findUserFollowing = (req, res) => {
    const currentUser = req.body
    usersService.findUserFollowing(currentUser).then((userFollowing) => {
      res.send(userFollowing);
    });
  };

  const addUserFollowing = (req, res) => {
    const info = req.body
    usersService.addUserFollowing(info.user, info.username)
      .then((newUserFollowing) => {
        res.send(newUserFollowing);
        if(newUserFollowing) {
          usersService.findUserByUsername(info.username)
            .then(rs => {
              const followerUsername = info.user.split('@')
              const userEmail = rs[0].fplEmail
              addUserFollower({
                body: { user: userEmail, username: followerUsername[0]}
              })
            })
        }
      });
  };

  const deleteUserFollowing = (req, res) => {
    const info = req.body
    usersService
      .deleteUserFollowing(info.user, info.username)
      .then((response) => {
        res.send(response)
        if(response) {
          usersService.findUserByUsername(info.username)
            .then(rs => {
              const followerUsername = info.user.split('@')
              const userEmail = rs[0].fplEmail
              deleteUserFollower({
                body: { user: userEmail, username: followerUsername[0] }
              })
            })
        }
      });
  };

  const findUserFollowers = (req, res) => {
    const currentUser = req.body
    usersService.findUserFollowers(currentUser)
    .then((userFollower) => {
      res.send(userFollower);
    });
  };
  const findUserById = (req, res) => {
    const id = req.params['id'];
    usersService.findUserById(id)
    .then(response => {
      res.send(response.userTeam);
    });
  };

  const addUserFollower = (req, res) => {
    const info = req.body
    usersService.addUserFollower(info.user, info.username)
      .then((newUserFollower) => {
        console.log(newUserFollower)
      });
  };

  const deleteUserFollower = (req, res) => {
    const info = req.body
    usersService.deleteUserFollower(info.user, info.username)
      .then((newUserFollower) => {
        console.log(newUserFollower)
      });
  };

  app.get('/api/team/:id', findUserById);
  app.post('/api/users/profile', profile);
  app.get('/api/users/profile/:username', findUserProfile);
  app.post('/api/users/register', register);
  app.post('/api/users/login', login);
  app.post('/api/users/logout', logout);
  app.post('/api/users', findAllUsers);
  app.get('/api/search/users', findUserByName);
  app.put('/api/users/update', updateUser);
  app.delete('api/users/delete', deleteUser);
  app.post('/api/users/following', findUserFollowing);
  app.post('/api/users/following/add', addUserFollowing);
  app.put('/api/users/following/delete', deleteUserFollowing);
  app.post('/api/users/followers', findUserFollowers);
  app.put('/api/users/followers/add', addUserFollower);
  app.put('/api/users/followers/delete', deleteUserFollower);
};
