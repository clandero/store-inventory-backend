const express = require('express')
const usersController = require('../controllers/users-controller');
const utils = require('../utils/jwt-utils')

const router = express.Router();

router.get('/', utils.authenticateJWT, usersController.getUsers);

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);

module.exports = router;