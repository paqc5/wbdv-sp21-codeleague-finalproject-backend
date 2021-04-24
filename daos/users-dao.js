const usersModel = require('../models/users-model');

const createUser = (user) => {
  return usersModel.create(user);
};

const deleteUser = (user) => {
  usersModel.remove({ fplEmail: user.fplEmail });
};

const updateUser = (user, newUser) => {
  return usersModel.save({ fplEmail: user.fplEmail }, newUser);
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
const findCommonPlayers = (user) => {
  return findUserFollowing(user.fplEmail).then((peopleFollowing) => {
    let allShared = [];
    // find and loop through documents of people user is following
    for (followingEmail of peopleFollowing[0].userFollowing) {
      findUserByEmail(followingEmail).then((personFollowing) => {
        /*
        find common players betwwen user's team and team of person 
        they are following
        */
        let commonPlayers = [];
        commonPlayers = user.team.filter((playerId) =>
          personFollowing.team.includes(playerId)
        );
        // TODO: add something to distinguish accounts of user with same name
        // TODO: could be user's team name
        /*
        put common player information in object with name of person user is following
        */
        let personName =
          personFollowing.firstName + ' ' + personFollowing.lastName;
        let shared = {};
        shared.followingName = personName;
        shared.followingEmail = personFollowing.fplEmail;
        shared.players = commonPlayers;
        allShared.push(shared);
      });
    }
    return allShared;
  });
};

const findUserFollowing = (fplEmail) => {
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
