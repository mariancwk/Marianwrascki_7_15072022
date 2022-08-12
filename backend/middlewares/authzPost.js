const Post = require('../models/post')

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

