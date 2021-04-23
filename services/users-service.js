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
                res.sendStatus(0)
            }
        })
}

const updateUser = (newUser, currentUser, res) => {
    if (newUser._id === currentUser._id || currentUser.role === "ADMIN") {
        const user = usersDAO.findUserById(newUser._id)
        return usersDAO.updateUser(user, newUser)
    } else {
        res.sendStatus(403)
    }
}

const deleteUser = (deleteUser, currentUser, res) => {
    if (deleteUser._id === currentUser._id || currentUser.role === 'ADMIN') {
        usersDAO.deleteUser(deleteUser)
        res.sendStatus(1)
    } else {
        res.sendStatus(403)
    }
}

const findAllUsers = (user, res) => {
    if (user.role === 'ADMIN') {
        return usersDAO.findAllUsers();
    } else {
        res.sendStatus(403)
    }
}

const findUserById = (userId) => {
    return usersDAO.findUserById(userId)
}

const findUserFollowing = (currentUser) => {
    const currentUserName = currentUser.username
    return usersDAO.findUserFollowing(currentUserName)
}

const addUserFollowing = (currentUser, followingUsername) => {
    const currentUserName = currentUser.username
    usersDAO.addOneFollowing(currentUserName, followingUsername)
    return usersDAO.findUserFollowing(currentUserName)
}

const deleteUserFollowing = (currentUser, followingUsername) => {
    const currentUserName = currentUser.username
    usersDAO.deleteOneFollower(currentUserName, followingUsername)
    return usersDAO.findUserFollowing(currentUserName)
}

const findUserFollowers = (currentUser) => {
    const currentUserName = currentUser.username
    return usersDAO.findUserFollowers(currentUserName)
}

const addUserFollower = (currentUser, followerUsername) => {
    const currentUserName = currentUser.username
    usersDAO.addOneFollower(currentUserName, followerUsername)
    return usersDAO.findUserFollowers(currentUserName)
}

const deleteUserFollower = (currentUser, followerUsername) => {
    const currentUserName = currentUser.username
    usersDAO.deleteOneFollower(currentUserName, followerUsername)
    return usersDAO.findUserFollowers(currentUserName)
}


module.exports = {
    register,
    login,
    findAllUsers,
    updateUser,
    deleteUser,
    findUserById,
    findUserFollowing,
    addUserFollowing,
    deleteUserFollowing,
    findUserFollowers,
    addUserFollower,
    deleteUserFollower
};