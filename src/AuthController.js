const User = require('./models/User.js')
const bcrypt = require('bcryptjs')
const generateAccessToken = require('./helpers/generateAccessToken')

const AuthController = {
    async register(req, res) {
        try {
            const {email, password} = req.body
            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: "User already exists"})
            }

            const hashedPassword = bcrypt.hashSync(password, 10)
            const user = new User({email, password: hashedPassword})
            await user.save()

            return res.json({message: "User was successfully created"})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: e.message})
        }
    },

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: `User with ${email} wasn't found`})
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) {
                return res.status(400).json({message: `Wrong credentials`})
            }

            const token = generateAccessToken(user._id, email )

            return res.json({message: "Logged in successfully", token: token})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: e.message})
        }
    },

    async getUsers(req, res) {
        try{
            const users = await User.find()

            return res.json(users)
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: e.message})
        }

    },
    async getSingleUser (req, res) {
        try{
            const {id} = req.params
            const user = await User.find({"_id": id})

            return res.json(user)
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: e.message})
        }

    },
    async deleteUser (req, res) {
        try{
            const {id} = req.params
            const result = await User.findByIdAndDelete(id)

            if (!result) {
                return res.status(404).json({message: `User with id ${id} cannot be found`})
            }

            return res.json({message: `User with id ${id} was successfully deleted`})
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: e.message})
        }

    },
    async updateUser (req, res) {
        try{
            const {id} = req.params

            const {email, password} = req.body

            const hashedPassword = bcrypt.hashSync(password, 10)

            const result = await User.findByIdAndUpdate(id, {email: email, password: hashedPassword})

            if (!result) {
                return res.status(404).json({message: `User with id ${id} cannot be found`})
            }

            return res.json({message: `User with id ${id} was successfully updated`})
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: e.message})
        }

    }, async addUser (req, res) {
        try{
            const {email, password} = req.body
            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: "User already exists"})
            }

            const hashedPassword = bcrypt.hashSync(password, 10)
            const user = new User({email, password: hashedPassword})
            await user.save()

            return res.json({message: "User was successfully created"})
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: e.message})
        }

    }
}

module.exports = AuthController