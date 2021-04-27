const usersModel = require('../models/users-model');
const playersModel = require('../models/players-model');

const createUser = (user) => {
  return usersModel.create(user) 
};

const deleteUser = (user) => {
  usersModel.remove({ fplEmail: user.fplEmail });
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
    fplEmail: credentials.fplEmail,
  });
};

/**
 *
 * @param {*} userEmail
 * @param {*} userTeam
 */
const saveUserTeam = async function (userEmail, userTeam) {
  await usersModel.updateOne(
    { fplEmail: userEmail },
    { $set: { team: userTeam } }
  );
};

/**
 *
 * @param {*} user
 */
const findCommonPlayers = (playerId) => {
  return playersModel.findOne({player_id: playerId})
};

const findUserFollowing = (fplEmail) => {
  console.log("email:", fplEmail)
  return usersModel.find({ fplEmail: fplEmail }, { _id: 0, userFollowing: 1 });
};

const addOneFollowing = async function (fplEmail, followingUsername) {
  await usersModel.updateOne(
    { fplEmail: fplEmail },
    {
      $push: {
        userFollowing: followingUsername,
      },
    }
  );
};

const deleteOneFollowing = async function (fplEmail, followingUsername) {
  await usersModel.updateOne(
    { fplEmail: fplEmail },
    {
      $pull: {
        userFollowing: followingUsername,
      },
    }
  );
};

const findUserFollowers = (fplEmail) => {
  return usersModel.find({ fplEmail: fplEmail }, { _id: 0, userFollowers: 1 });
};

const addOneFollower = async function (fplEmail, followerUsername) {
  await usersModel.updateOne(
    { fplEmail: fplEmail },
    {
      $push: {
        userFollower: followerUsername,
      },
    }
  );
};

const deleteOneFollower = async function (fplEmail, followerUsername) {
  await usersModel.updateOne(
    { fplEmail: fplEmail },
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
  updateUserTeam,
  findAllUsers,
  findUserById,
  findUserFollowing,
  addOneFollowing,
  deleteOneFollowing,
  findUserFollowers,
  addOneFollower,
  deleteOneFollower,
  saveUserTeam,
  findCommonPlayers,
};
