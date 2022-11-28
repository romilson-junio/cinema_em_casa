const jwt = require('jsonwebtoken')
const enviroments = require('../utils/constants')
const messages = require('../utils/bundle')

const verifyToken = (req, res, next) => {
    try {
        const authorization = req.header('Authorization')
        let token = undefined
        if(authorization){
            const parts = authorization.split(' ')
            if (parts.length == 2 && parts[0] === 'Bearer') {
                token = parts[1]
            }
        }

        if(!token){
            throw new Error(messages.nauthenticated)
        }

        const decoded = jwt.verify(token, enviroments.secret)
        req.authenticated = decoded
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = verifyToken