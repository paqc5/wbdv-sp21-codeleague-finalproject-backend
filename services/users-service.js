const usersDao = require('../daos/users-dao');
const usersTeamService = require('../services/users-team-service');

const authUser = (email, password) => {
  return usersTeamService
    .authUser(email, password)
    .then(cookie => cookie)
}

const getUserTeam = (email, password) => {
  return usersTeamService
    .findUserTeam(email, password)
    .then((team) => {
      let teamLayout =
      {
        Goalkeeper: [],
        Defender: [],
        Midfielder: [],
        Forward: []
      }

      team.forEach(player =>
        teamLayout[player.position_info.player_position].push({
          id: player.id,
          now_cost: player.now_cost,
          first_name: player.first_name,
          second_name: player.second_name,
          image_code: player.team_info.team_image_code,
          team_name: player.team_info.team_short_name
        }))
      return teamLayout
    })
}
const updateUserTeam = (userId, updatedTeam) => {
  return usersDao.updateUserTeam(userId, updatedTeam)
    .then(result => result)
}
const register = (newUser) => {
  // Check if email is already in the system
  return usersDao.findUserByEmail(newUser.fplEmail)
    .then(response => {

      // If email not in system, authenticate credentials with the api
      if (response === null) {
        return authUser(newUser.fplEmail, newUser.fplPassword)
          .then(cookie => {
            if (cookie) {
              // If user authenticated, then create the account
              return usersDao.createUser(newUser)
                .then(createdUser => {

                  // Retrieve the user's team from the api
                  return getUserTeam(newUser.fplEmail, newUser.fplPassword)
                    .then(team => {

                      Object.values(team).forEach(entry => {
                        entry.map(player => addUserToPlayer(player.id, createdUser.username))
                      })

                      // Storage the team in the database
                      return updateUserTeam(createdUser._id, team)
                        .then(rs => "200")

                    })
                })
            }
          }).catch((error) => {
            if (error) {
              return "404"
            } else {
              return "200"
            }
            
          })
      } else {
        return "409"
      }
    })
}

const login = (credentials) => {
  // Check email exist in the system
  return usersDao.findUserByEmail(credentials.fplEmail)
    .then(user => {
      // Authenticate user
      if (user !== null) {
        return authUser(credentials.fplEmail, credentials.fplPassword)
          .then(cookie => {

              
            // If user authenticated, then update team and login
            if (cookie) {
              return getUserTeam(credentials.fplEmail, credentials.fplPassword)
                .then(team => {

                  // Storage the team in the database
                  return updateUserTeam(user._id, team)
                    .then(rs => {
                      return user
                    })

                })
            }
          }).catch((error) => "409")
      } else {
        return "404"
      }
    })
}

const updateUser = (newUser, currentUser) => {
  if (newUser._id === currentUser._id || currentUser.role === 'ADMIN') {
    return usersDao.updateUser(newUser);
  } else {
    return "500";
  }
}

const deleteUser = (userToDelete, currentUser, res) => {
  if (userToDelete._id === currentUser._id || currentUser.role === 'ADMIN') {
    usersDao.deleteUser(userToDelete);
    res.send('1');
  } else {
    res.sendStatus(403);
  }
};

const findAllUsers = (user) => {
  if (user.role === 'ADMIN') {
    return usersDao.findAllUsers()
  } else {
    return "403";
  }
};

const findUserByName = (inputNameOne, inputNameTwo) => {
  return findAllUsers({ role: 'ADMIN' })
    .then(res => {
      return res.filter((user) => {
        let firstName =
          user.firstName !== undefined ? user.firstName.toLowerCase() : '';
        let lastName =
          user.lastName !== undefined
            ? user.lastName.toLowerCase()
            : '';
        if (inputNameTwo === 'noLastname') {
          if (firstName === inputNameOne || lastName === inputNameOne) {
            return true;
          }
          return false;
        } else {
          if (firstName === inputNameOne && lastName === inputNameTwo) {
            return true;
          }
          return false;
        }
      })
    }
    );
};

const findUserById = (userId) => {
  return usersDao.findUserById(userId);
}
const findUserByUsername = (username) => {
  return usersDao.findUserByUsername(username);
};

const findUserFollowing = (currentUser) => {
  const currentUserEmail = currentUser.fplEmail
  return usersDao.findUserFollowing(currentUserEmail)
}

const addUserFollowing = (currentUserEmail, followingUsername) => {
  return usersDao.addOneFollowing(currentUserEmail, followingUsername)
}

const deleteUserFollowing = (currentUser, followingUsername) => {
  return usersDao.deleteOneFollowing(currentUser, followingUsername)
}

const findUserFollowers = (currentUser) => {
  const currentUserEmail = currentUser.fplEmail
  return usersDao.findUserFollowers(currentUserEmail)
}

const addUserFollower = (currentUser, followerUsername) => {
  return usersDao.addOneFollower(currentUser, followerUsername)
}

const deleteUserFollower = (currentUser, followerUsername) => {
  return usersDao.deleteOneFollower(currentUser, followerUsername)
}
const addUserToPlayer = (playerId, username) => {
  return usersDao.addUserToPlayer(playerId, username)
}


module.exports = {
  register,
  login,
  findAllUsers,
  updateUser,
  updateUserTeam,
  deleteUser,
  findUserById,
  findUserByName,
  findUserFollowing,
  addUserFollowing,
  deleteUserFollowing,
  findUserFollowers,
  addUserFollower,
  deleteUserFollower,
  findUserByUsername,
  addUserToPlayer
};
