const usersModel = require("../models/users-model")

const findAllUsers = () => {
    return usersModel.find();
}

const findUserByUsername = (username) => {
    return usersModel.find({username})
}

const findUserByCredentials = (credentials) => {
    return usersModel.findOne({
        username: credentials.username,
        password: credentials.password
    })
}

const createUser = (user) => {
    return usersModel.create(user)
}

const deleteUser = (user) => {};

const updateUser = (user, newUser) => {};

module.exports = {
    findUserByUsername,
    findUserByCredentials,
    createUser,
    deleteUser,
    updateUser,
    findAllUsers
}