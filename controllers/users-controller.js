const usersService = require("../services/users-service")

module.exports = (app) => {

    const register = (req, res) => {
        const user = req.body;
        usersService.register(user, res)
            .then((newUser) => {
                req.session['profile'] = newUser
                res.send(newUser)
            })
    }

    const login = (req, res) => {
        const credentials = req.body;
        usersService.login(credentials)
            .then((actualUser) => {
                    req.session['profile'] = actualUser
                    res.send(actualUser)
            })
    }

    const profile = (req, res) => {
        const currentUser = req.session['profile']
        res.send(currentUser)
    }

    const profileAfterLoggedIn = (req, res) => {
        const userId = req.params['userId']
        usersService.findUserById(userId)
            .then(user => {
                return res.send(user)
            })
    }

    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }

    const updateUser = (req, res) => {
        const newUser = req.body;
        const currentUser = req.session['profile']
        usersService.updateUser(newUser, currentUser, res)
            .then(newUser => {
                res.send(newUser)
            })
    }

    const deleteUser = (req, res) => {
        const deleteUser = req.body;
        const currentUser = req.session['profile']
        usersService.deleteUser(currentUser, deleteUser, res)
    }

    const findAllUsers = (req, res) => {
        const user = req.session['profile']
        usersService.findAllUsers(user, res)
            .then((users) => {
                res.send(users)
            })
    }

    const findUserFollowing = (req, res) => {
        const currentUser = req.session['profile']
        usersService.findUserFollowing(currentUser)
            .then((userFollowing) => {
                res.send(userFollowing)
            })
    }

    const addUserFollowing = (req, res) => {
        const currentUser = req.session['profile']
        const followingUsername = res.body
        usersService.addUserFollowing(currentUser, followingUsername)
            .then((newUserFollowing) => {
                res.send(newUserFollowing)
            })
    }

    const deleteUserFollowing = (req, res) => {
        const currentUser = req.session['profile']
        const followingUsername = res.body
        usersService.deleteUserFollowing(currentUser, followingUsername)
            .then((newUserFollowing) => {
                res.send(newUserFollowing)
            })
    }

    const findUserFollowers = (req, res) => {
        const currentUser = req.session['profile']
        usersService.findUserFollowers(currentUser)
            .then((userFollower) => {
                res.send(userFollower)
            })
    }

    const addUserFollower = (req, res) => {
        const currentUser = req.session['profile']
        const followerUsername = res.body
        usersService.addUserFollower(currentUser, followerUsername)
            .then((newUserFollower) => {
                res.send(newUserFollower)
            })
    }

    const deleteUserFollower = (req, res) => {
        const currentUser = req.session['profile']
        const followerUsername = res.body
        usersService.deleteUserFollower(currentUser, followerUsername)
            .then((newUserFollower) => {
                res.send(newUserFollower)
            })
    }

    app.post("/api/users/profile", profile);
    app.get("/api/users/profile/:userId", profileAfterLoggedIn);
    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post('/api/users/logout', logout);
    app.get('/api/users', findAllUsers);
    app.put('/api/users/update', updateUser);
    app.delete('api/users/delete', deleteUser)
    app.get('/api/users/following', findUserFollowing);
    app.put('/api/users/following/add', addUserFollowing);
    app.put('/api/users/following/delete', deleteUserFollowing);
    app.get('/api/users/followers', findUserFollowers);
    app.put('/api/users/followers/add', addUserFollower);
    app.put('/api/users/followers/delete', deleteUserFollower);
}