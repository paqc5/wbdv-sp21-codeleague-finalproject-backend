const usersDao = require("../daos/users-dao")

const register = (newUser, res) => {
    return usersDao.findUserByUsername(newUser.username)
        .then((user) => {
            if (user.length > 0) {
                res.send(403)
            } else {
                return usersDao.createUser(newUser);
            }
        })
}

const login = (credentials) => {
    return usersDao.findUserByCredentials(credentials)
        .then((actualUser) => {
            if (actualUser) {
                if(actualUser.password === credentials.password) {
                    return actualUser
                } else {
                    // Return -1 if credentials don't match
                    return "-1"
                }
            } else {
                // Return 0 if user not found in database
                return "0"
            }
        })
}

const updateUser = (newUser, currentUser, res) => {
    if (newUser._id === currentUser._id || currentUser.role === "ADMIN") {
        const user = usersDao.findUserById(newUser._id)
        return usersDao.updateUser(user, newUser)
    } else {
        res.sendStatus(403)
    }
}

const deleteUser = (userToDelete, currentUser, res) => {
    if (userToDelete._id === currentUser._id || currentUser.role === 'ADMIN') {
        usersDao.deleteUser(userToDelete)
        res.sendStatus(1)
    } else {
        res.sendStatus(403)
    }
}

const findAllUsers = (user, res) => {
    if (user.role === 'ADMIN') {
        return usersDao.findAllUsers();
    } else {
        res.sendStatus(403)
    }
}

const findUserById = (userId) => {
    return usersDao.findUserById(userId)
}

const findUserFollowing = (currentUser) => {
    const currentUserName = currentUser.username
    return usersDao.findUserFollowing(currentUserName)
}

const addUserFollowing = (currentUser, followingUsername) => {
    const currentUserName = currentUser.username
    usersDao.addOneFollowing(currentUserName, followingUsername)
    return usersDao.findUserFollowing(currentUserName)
}

const deleteUserFollowing = (currentUser, followingUsername) => {
    const currentUserName = currentUser.username
    usersDao.deleteOneFollower(currentUserName, followingUsername)
    return usersDao.findUserFollowing(currentUserName)
}

const findUserFollowers = (currentUser) => {
    const currentUserName = currentUser.username
    return usersDao.findUserFollowers(currentUserName)
}

const addUserFollower = (currentUser, followerUsername) => {
    const currentUserName = currentUser.username
    usersDao.addOneFollower(currentUserName, followerUsername)
    return usersDao.findUserFollowers(currentUserName)
}

const deleteUserFollower = (currentUser, followerUsername) => {
    const currentUserName = currentUser.username
    usersDao.deleteOneFollower(currentUserName, followerUsername)
    return usersDao.findUserFollowers(currentUserName)
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