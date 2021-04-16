const usersModel = require("../models/users-model")

const findUserByUsername = (username) => {
    return usersModel.find({username})
}

const findUserByCredentials = (credetials) => {
    return usersModel.findOne({
        username: credetials.username,
        password: credetials.password
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
    updateUser
}