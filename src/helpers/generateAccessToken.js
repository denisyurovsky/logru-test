const jwt = require("jsonwebtoken");

module.exports = function generateAccessToken(id, email) {
    const payload = {
        id: id,
        email: email
    }
    return jwt.sign(payload, 'some-secret-key', {expiresIn: 60 * 15})
}

