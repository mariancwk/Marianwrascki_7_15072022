const Post = require('../models/post')

exports.uploadPost = async(req, res, next) => {
    const post = new Post({
        userId: req.body.userId,
        text: req.body.postText
    })

    try {
        await post.save()
        res.status(200).json({ message: 'Post accepted' })
    } catch (error) {
        res.status(400).json({ error })
    }
}

// Get all posts from database
exports.getAllPosts = async(req, res, next) => {
    try {
        let posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({ error })
    }
}

exports.likePost = async(req, res, next) => {
    const filter = req.params.id
    const updateUsersLiked = { usersLiked: req.body.userId }
    
    let post = await Post.findById(filter)

    if (!post) {
        return res.status(404).json({ error: "Post not found" })
    }
    
    const { like } = req.body
    const userHasLiked = post.usersLiked.includes(req.body.userId)

    if ([1].includes(like) && (userHasLiked)) {
        return res.status(401).json({ message: "Unauthorized action" })
    }

    try {
        switch (like) {
            case 1:
                await Post.findByIdAndUpdate(filter, {
                    $addToSet: updateUsersLiked
                })
                break
        
            case 0:
                await Post.findByIdAndUpdate(filter, {
                    $pull: updateUsersLiked
                })
                break
        }   
        return res.status(200).json({ message: 'like accepted' })
    } catch (error) {
        return res.status(400).json({ error })
    }
}