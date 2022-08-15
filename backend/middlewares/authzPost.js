const Post = require('../models/post')

// Check if the user is the owner of the post or a admin
exports.ownerPost = async (req, res, next) => {
    let post
    
    try {
        post = await Post.findOne({ _id: req.params.id })

    } catch {
        return res.status(400).json({ error: "Post doesn't exist" })
    }
    if (req.userRole === 'admin' || req.authUserId === post.userId) {
        return next()
    }
    return res.status(400).json({ error: 'not allowed' })
}

