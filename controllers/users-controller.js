const usersService = require("../services/users-service")

module.exports = (app) => {

    const findAllUsers = (req, res) => {
        usersService.findAllUsers()
            .then((users) => {
                // console.log(users)
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
        // console.log('req:')
        // console.log(credentials)
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

    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }

    const updateUser = (req, res) => {
        const newUser = req.body;
        const currentUser = req.session['profile']
        if (newUser._id === currentUser._id || currentUser.role === 'ADMIN') {
            usersService.updateUser(newUser)
                .then(newUser => {
                    res.send(newUser)
                })
        }
    }

    // Unfinished
    const deleteUser = (req, res) => {
        const deleteUser = req.body;
        const currentUser = req.session['profile']
        if (deleteUser._id === currentUser._id || currentUser.role === 'ADMIN') {
            usersService.deleteUser(deleteUser)
        }

    }

    app.post("/api/users/profile", profile);
    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post('/api/users/logout', logout);
    app.get('/api/users', findAllUsers);
    app.put('/api/users/update', updateUser);
    app.delete('api/users/delete', deleteUser)
}