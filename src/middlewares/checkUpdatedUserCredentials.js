const updateUserSchema = require("../schemas/updateUserSchema");

module.exports = (req, res, next) => {

    if (!Object.keys(req.body).length) {
        return res.json({message: "Provide data to update user"})
    }

    const result = updateUserSchema.validate(req.body, {abortEarly: false, allowUnknown: false});

    if (result.error) {
        return res.status(400).json(result.error.details.map(error => error.message));
    }

    return next()
}