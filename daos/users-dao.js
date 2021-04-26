const usersModel = require('../models/users-model');

const createUser = (user) => {
  return usersModel.create(user) 
};

const deleteUser = (user) => {
  usersModel.remove({ username: user.username });
};

const updateUser = (newUser) => {
  return usersModel.updateOne({ fplEmail: newUser.fplEmail }, newUser);
}

const updateUserTeam = (userId, userTeam) => {
  return usersModel.updateOne({_id:userId}, {$set: {userTeam: userTeam}})
}

const findAllUsers = () => {
  return usersModel.find();
};

const findUserByUsername = (username) => {
  return usersModel.find({ username: username });
};

const findUserById = (userId) => {
  return usersModel.findById(userId);
};

const findUserByEmail = (userEmail) => {
  return usersModel.findOne({ fplEmail: userEmail });
};

const findUserByCredentials = (credentials) => {
  return usersModel.findOne({
    fplUsername: credentials.fplEmail,
  });
};

const findUserFollowing = (fplEmail) => {
    return usersModel.find({fplEmail: fplEmail},{_id: 0, userFollowing: 1})
}

const addOneFollowing = (fplEmail, followingUsername) => {
    return usersModel.updateOne(
        {fplEmail: fplEmail},
        {
            $push: {
                userFollowing: followingUsername
            }
        }
    )
}

const deleteOneFollowing = (fplEmail, followingUsername) => {
    return usersModel.updateOne(
        {fplEmail: fplEmail},
        {
            $pull: {
                userFollowing: followingUsername
            }
        }
    )
}

const findUserFollowers = (fplEmail) => {
    return usersModel.find({fplEmail: fplEmail},{_id: 0, userFollowers: 1})
}

const addOneFollower = (fplEmail, followerUsername) => {
    return usersModel.updateOne(
        {fplEmail: fplEmail},
        {
            $push: {
                userFollower: followerUsername
            }
        }
    )
}

const deleteOneFollower = (fplEmail, followerUsername) => {
    return usersModel.updateOne(
        {fplEmail: fplEmail},
        {
            $pull: {
                userFollower: followerUsername
            }
        }
    )
}

module.exports = {
  findUserByUsername,
  findUserByCredentials,
  findUserByEmail,
  createUser,
  deleteUser,
  updateUser,
  updateUserTeam,
  findAllUsers,
  findUserById,
  findUserFollowing,
  addOneFollowing,
  deleteOneFollowing,
  findUserFollowers,
  addOneFollower,
  deleteOneFollower,
};
