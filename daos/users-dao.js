const usersModel = require("../models/users-model")

const findAllUsers = () => {
    return usersModel.find();
}

const findUserById = (userId) => {
    return usersModel.findById(userId)
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

const deleteUser = (user) => {
    usersModel.remove({username: user.username})
};

const updateUser = (user, newUser) => {
    return usersModel.save({username: user.username}, newUser)
};

module.exports = {
    findUserByCredentials,
    createUser,
    deleteUser,
    updateUser,
    findAllUsers,
    findUserById
}