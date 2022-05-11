const express = require("express");
const router = express.Router();
const AuthController = require('./AuthController')
const checkUserCredentials = require('./middlewares/checkUserCredentials')
const checkUpdatedUserCredentials = require('./middlewares/checkUpdatedUserCredentials')
const checkToken = require("./middlewares/checkToken");

router.route('/login')
    .post(AuthController.login)

router.route('/register')
    .post(checkUserCredentials, AuthController.register)

router.route('/users')
    .get(checkToken,
         AuthController.getUsers)
    .post(checkToken,
        checkUserCredentials,
        AuthController.addUser)

router.route('/users/:id')
    .get(checkToken,
     AuthController.getSingleUser)
    .delete(checkToken,
        AuthController.deleteUser)
    .patch(checkToken,
        checkUpdatedUserCredentials,
        AuthController.updateUser)

router.route('*')
    .all((req, res) => res.status(404).json({message: 'page not found'}))

module.exports = router