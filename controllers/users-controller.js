const usersService = require("../services/users-service")

module.exports = (app) => {

    const findAllUsers = (req, res) => {
        const user = req.session['profile']
        usersService.findAllUsers(user, res)
            .then((users) => {
                res.send(users)
            })
    }

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
        const userId = req.params['userName']
        usersService.findUserByUsername(userId)
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

    app.post("/api/users/profile", profile);
    app.get("/api/users/profile/:userName", profileAfterLoggedIn);
    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post('/api/users/logout', logout);
    app.get('/api/users', findAllUsers);
    app.put('/api/users/update', updateUser);
    app.delete('api/users/delete', deleteUser)
}