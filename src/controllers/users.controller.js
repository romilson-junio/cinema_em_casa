const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')

const enviroments = require('../utils/constants')
const messages = require('../utils/bundle')

const save = async (req, res, next) => {
    try {
        const data = req.body
        const hash = await bcrypt.hash(data.password, 10)
        data.password = hash
        const user = new User(data)
        const savedUser = await user.save()
        if (!savedUser) {
            throw Error(messages.userNotSave)
        }
        res.status(HttpStatus.StatusCodes.CREATED).json({ message: messages.userCreated })
    } catch (err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const users = await User.find()
        for(let user of users) {
            user.password = undefined
        }
        res.json(users)
    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) {
            throw new Error(`User with id ${id} not found`)
        }

        user.password = undefined
        res.json(user)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body
        const user = await User.findById(id)
        if (!user) {
            throw new Error(`User with id ${id} not found`)
        }
        data.password = user.password
        const newUser = await User.findByIdAndUpdate(id, data, { new: true })
        newUser.password = undefined
        res.json(newUser)
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) {
            throw new Error(`User with id ${id} not found`)
        }
        await User.findByIdAndDelete(id)
        res.json({message: `User with id ${id} has deleted`})
    } catch(err) {
        next(err)
    }
}

const authenticated = async ( req, res, next ) => {
    try {
        
        const { username, password } = req.body
        if(!(username && password)) {
            throw new Error(messages.usernamePasswordRequired)
        }
        const user = await User.findOne({username})
        if (user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {
                    sub: user._id,
                    iss: enviroments.iss,
                    username: user.username,
                    name: user.name,
                    profiles: user.profiles
                },
                enviroments.secret,
                {
                    expiresIn: enviroments.expires
                }
            )
            res.status(HttpStatus.StatusCodes.OK).json(token)
            
        } else {
            throw new Error(messages.usernamePasswordInvalid)
        }

    } catch (err) {
        next(err)
    }
}

module.exports = {
    authenticated,
    save,
    getAll,
    getById,
    update,
    remove
}