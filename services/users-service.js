const usersDAO = require("../daos/users-dao")

const findAllUsers = () => {
    return usersDAO.findAllUsers();
}

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
            // console.log(actualUser)
            if (actualUser) {
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