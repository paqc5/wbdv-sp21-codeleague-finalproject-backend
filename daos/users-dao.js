const usersModel = require('../models/users-model');

const findAllUsers = () => {
  return usersModel.find();
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
    // fplPassword: credentials.fplPassword,
  });
};

const createUser = (user) => {
  return usersModel.create(user);
};

const deleteUser = (user) => {
  usersModel.remove({ username: user.username });
};

const updateUser = (user, newUser) => {
  return usersModel.save({ username: user.username }, newUser);
};

module.exports = {
  findUserByCredentials,
  createUser,
  deleteUser,
  updateUser,
  findAllUsers,
  findUserById,
  findUserByEmail,
};
