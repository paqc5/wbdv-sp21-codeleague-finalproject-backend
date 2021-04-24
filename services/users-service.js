const usersDAO = require('../daos/users-dao');
const usersTeamService = require('../services/users-team-service');

const register = (newUser, res) => {
  // check if they have an fpl account

  return usersTeamService
    .authenticate(newUser.fplEmail, newUser.fplPassword, res)
    .catch((error) => {
      throw 'authenticaiton failed';
    })
    .then((cookie) =>
      // check if user has an account with us
      usersDAO.findUserByEmail(newUser.fplEmail).then((user) => {
        if (user) {
          return { registered: false, msg: 'user already exists' };
          // res.sendStatus(403);
        } else {
          usersDAO.createUser(newUser);
          return { registered: true, msg: 'user succesfully created' };
          // res.sendStatus(200);
        }
      })
    )
    .catch((error) => {
      return { registered: false, msg: 'user authentication failed' };
    });
};

const login = (credentials, res) => {
  let cache = usersTeamService.cached();
  // if (cache) console.log('cachedPlayers from login:', cache[0]);
  // else {
  //   console.log('cachedPlayers from login:', cache);
  // }
  return usersDAO.findUserByEmail(credentials.fplEmail).then((actualUser) => {
    let actualUserInfo = {};
    if (actualUser) {
      actualUserInfo.savedData = actualUser;
      return usersTeamService
        .findUserTeam(actualUser.fplEmail, credentials.fplPassword)
        .then((team) => {
          let teamToSave = team.map((player) => player[0].id);
          usersDAO.saveUserTeam(actualUser.fplEmail, teamToSave);
          actualUserInfo.team = team;
          return actualUserInfo;
        })
        .catch((error) => {
          return { loggedIn: false, msg: 'incorrect password' };
        });
    } else {
      return { loggedIn: false, msg: 'not registered' };
      //   res.sendStatus(403);
    }
  });
};

const updateUser = (newUser, currentUser, res) => {
  if (newUser._id === currentUser._id || currentUser.role === 'ADMIN') {
    const user = usersDAO.findUserById(newUser._id);
    return usersDAO.updateUser(user, newUser);
  } else {
    res.sendStatus(403);
  }
};

const deleteUser = (deleteUser, currentUser, res) => {
  // TODO: check logic
  if (deleteUser._id === currentUser._id || currentUser.role === 'ADMIN') {
    usersDAO.deleteUser(deleteUser);
    res.send('1');
  } else {
    res.sendStatus(403);
  }
};

const findAllUsers = (user, res) => {
  if (user.role === 'ADMIN') {
    return usersDAO.findAllUsers();
  } else {
    res.sendStatus(403);
  }
};

const findUserById = (userId) => {
  return usersDAO.findUserById(userId);
};

const findUserFollowing = (currentUser) => {
  const currentUserEmail = currentUser.fplEmail;
  return usersDAO.findUserFollowing(currentUserEmail);
};

const addUserFollowing = (currentUser, followingUsername) => {
  const currentUserEmail = currentUser.fplEmail;
  usersDAO.addOneFollowing(currentUserEmail, followingUsername);
  return usersDAO.findUserFollowing(currentUserEmail);
};

const deleteUserFollowing = (currentUser, followingUsername) => {
  const currentUserEmail = currentUser.fplEmail;
  usersDAO.deleteOneFollower(currentUserEmail, followingUsername);
  return usersDAO.findUserFollowing(currentUserEmail);
};

const findUserFollowers = (currentUser) => {
  const currentUserEmail = currentUser.fplEmail;
  return usersDAO.findUserFollowers(currentUserEmail);
};

const addUserFollower = (currentUser, followerUsername) => {
  const currentUserEmail = currentUser.fplEmail;
  usersDAO.addOneFollower(currentUserEmail, followerUsername);
  return usersDAO.findUserFollowers(currentUserEmail);
};

const deleteUserFollower = (currentUser, followerUsername) => {
  const currentUserEmail = currentUser.fplEmail;
  usersDAO.deleteOneFollower(currentUserEmail, followerUsername);
  return usersDAO.findUserFollowers(currentUserEmail);
};

module.exports = {
  register,
  login,
  findAllUsers,
  updateUser,
  deleteUser,
  findUserById,
  findUserFollowing,
  addUserFollowing,
  deleteUserFollowing,
  findUserFollowers,
  addUserFollower,
  deleteUserFollower,
};
