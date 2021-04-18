const usersDAO = require("../daos/users-dao")

const findAllUsers = () => {
    return usersDAO.findAllUsers();
}

const register = (user, res) => {
    return usersDAO.findUserByUsername(user.username)
        .then((user) => {
            if (user.length > 0) {
                res.send(403)
            } else {
                return usersDAO.createUser(user);
            }
        })
}

const login = (credentials, res) => {
    return usersDAO.findUserByCredentials(credentials)
        .then((actualUser) => {
            if (actualUser.length > 0) {
                return actualUser
            } else {
                res.send(0)
            }
        })
}

module.exports = {
    register,
    login,
    findAllUsers
};