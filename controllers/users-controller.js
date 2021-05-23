const HttpError = require('../models/http-error')
const utils = require('../utils/jwt-utils');
const User = require('../domain/users');

const DUMMY_USERS = [
    {
        username: 'clandero',
        mail: 'clandero@udec.cl',
        password: 'admin',
        role: 'admin'
    }
];

const getUsers = (req, res, next) => {
    res.json({ users:DUMMY_USERS });
}

const signup = (req, res, next) => {
    const {username,mail,password} = req.body;
    const newUser = new User(username, mail, password);
    DUMMY_USERS.push(newUser);
    res.status(201).json({newUser: newUser});
}

const login = (req, res, next) => {
    const { username, password } = req.body;
    const user = DUMMY_USERS.find(u => { return u.username === username && u.password === password });

    if (user) {
        const accessToken = utils.generateJWT(user);
        res.json({accessToken});        
    } else {
        return next(new HttpError('Username or password incorrect', 401));
    }
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;