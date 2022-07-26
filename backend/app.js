const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cookieParser())

// Allow to connect mongoDB
mongoose.connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connection to MongoDB succed !'))
.catch(() => console.log('Connection to MongoDB failed !'))

// Allow to recieve CORS req
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next();
})

app.use('/api/auth', userRoutes)
app.use('/api', postRoutes)

module.exports = app