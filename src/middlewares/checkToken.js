const jwt = require("jsonwebtoken");
const generateAccessToken = require('../helpers/generateAccessToken')
const jwtDecode = require('jwt-decode')

module.exports = function checkToken (req, res, next) {

    let token = req.headers?.authorization?.split(' ')[1];

    const data = jwtDecode(token)

    const newToken = generateAccessToken(data.id, data.email)

    res.setHeader('token', newToken)
    try {
        const result = jwt.verify(token, 'some-secret-key')

        if (result) {
            return next()
        }

    }catch (e) {
        console.log(e)
        res.status(401).json({message: 'You are not authorized, please log in'})
    }
}
