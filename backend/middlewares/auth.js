const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()

// Check if the json web token is valid  
module.exports = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
        const userId = decodedToken.userId
        const user = await User.findById({ _id: userId })

        if (!user) {
            return res.status(401).json({ error: 'Auth : Invalid user!' })
        }
        
        // auth user id & Role from database not from client
        req.authUserId = userId
        req.userRole = user.role

        next()
    } catch (error) {
        res.status(400).json({ error: 'Auth : Invalid request!' })
    }
}