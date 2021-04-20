const usersDAO = require("../daos/users-dao")

const register = (newUser, res) => {
    return usersDAO.findUserByUsername(newUser.username)
        .then((user) => {
            if (user.length > 0) {
                res.send(403)
            } else {
                return usersDAO.createUser(newUser);
            }
        })
}

const login = (credentials, res) => {
    return usersDAO.findUserByCredentials(credentials)
        .then((actualUser) => {
            if (actualUser) {
                return actualUser
            } else {
                res.send(0)
            }
        })
}

const updateUser = (newUser, currentUser, res) => {
    if (newUser._id === currentUser._id || currentUser.role === "ADMIN") {
        const user = usersDAO.findUserById(newUser._id)
        return usersDAO.updateUser(user, newUser)
    } else {
        res.send(403)
    }
}

const deleteUser = (deleteUser, currentUser, res) => {
    if (deleteUser._id === currentUser._id || currentUser.role === 'ADMIN') {
        usersDAO.deleteUser(deleteUser)
        res.send(1)
    } else {
        res.send(403)
    }
}

const findAllUsers = (user, res) => {
    if (user.role === 'ADMIN') {
        return usersDAO.findAllUsers();
    } else {
        res.send(403)
    }
}

const findUserByUsername = (userName) => {
    return usersDAO.findUserByUsername(userName)
}

module.exports = {
    register,
    login,
    findAllUsers,
    updateUser,
    deleteUser,
    findUserByUsername
};