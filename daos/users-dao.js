const usersModel = require('../models/users-model');

const createUser = (user) => {
  return usersModel.create(user);
};

const deleteUser = (user) => {
  usersModel.remove({ username: user.username });
};

const updateUser = (user, newUser) => {
  return usersModel.save({ username: user.username }, newUser);
};

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

const findUserFollowing = (username) => {
  return usersModel.find({ username: username }, { _id: 0, userFollowing: 1 });
};

const addOneFollowing = (username, followingUsername) => {
  return usersModel.updateOne(
    { username: username },
    {
      $push: {
        userFollowing: followingUsername,
      },
    }
  );
};

const deleteOneFollowing = (username, followingUsername) => {
  return usersModel.updateOne(
    { username: username },
    {
      $pull: {
        userFollowing: followingUsername,
      },
    }
  );
};

const findUserFollowers = (username) => {
  return usersModel.find({ username: username }, { _id: 0, userFollowers: 1 });
};

const addOneFollower = (username, followerUsername) => {
  return usersModel.updateOne(
    { username: username },
    {
      $push: {
        userFollower: followerUsername,
      },
    }
  );
};

const deleteOneFollower = (username, followerUsername) => {
  return usersModel.updateOne(
    { username: username },
    {
      $pull: {
        userFollower: followerUsername,
      },
    }
  );
};

module.exports = {
  findUserByUsername,
  findUserByCredentials,
  findUserByEmail,
  createUser,
  deleteUser,
  updateUser,
  findAllUsers,
  findUserById,
  findUserFollowing,
  addOneFollowing,
  deleteOneFollowing,
  findUserFollowers,
  addOneFollower,
  deleteOneFollower,
};
