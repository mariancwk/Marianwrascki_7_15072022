const mongoose = require('mongoose')

// User mongoose schema 
const postSchema = mongoose.Schema({
    userId: {type: String, required: true},
    text: {type: String, required: true},
    imageUrl: {type: String},
    usersLiked: { type: Array },
    uploadTime: { type: Date, required: true }
})

module.exports = mongoose.model('Post', postSchema)