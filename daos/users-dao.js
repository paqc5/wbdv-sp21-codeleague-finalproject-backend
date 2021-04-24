const usersModel = require("../models/users-model")

const createUser = (user) => {
    return usersModel.create(user)
}

const deleteUser = (user) => {
    usersModel.remove({username: user.username})
};

const updateUser = (user, newUser) => {
    return usersModel.save({username: user.username}, newUser)
};

const findAllUsers = () => {
    return usersModel.find();
}

const findUserByUsername = (username) => {
    return usersModel.find({username: username})
}

const findUserById = (userId) => {
    return usersModel
        .findById(userId)
}

const findUserByCredentials = (credentials) => {
    return usersModel.findOne({
        username: credentials.username,
        password: credentials.password
    })
}

const findUserFollowing = (fplEmail) => {
    return usersModel.find({fplEmail: fplEmail},{_id: 0, userFollowing: 1})
}

const addOneFollowing = (fplEmail, followingUsername) => {
    return usersModel.updateOne(
        {fplEmail: fplEmail},
        {
            $push: {
                userFollowing: followingUsername
            }
        }
    )
}

const deleteOneFollowing = (fplEmail, followingUsername) => {
    return usersModel.updateOne(
        {fplEmail: fplEmail},
        {
            $pull: {
                userFollowing: followingUsername
            }
        }
    )
}

const findUserFollowers = (fplEmail) => {
    return usersModel.find({fplEmail: fplEmail},{_id: 0, userFollowers: 1})
}

const addOneFollower = (fplEmail, followerUsername) => {
    return usersModel.updateOne(
        {fplEmail: fplEmail},
        {
            $push: {
                userFollower: followerUsername
            }
        }
    )
}

const deleteOneFollower = (fplEmail, followerUsername) => {
    return usersModel.updateOne(
        {fplEmail: fplEmail},
        {
            $pull: {
                userFollower: followerUsername
            }
        }
    )
}

module.exports = {
    findUserByUsername,
    findUserByCredentials,
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
}