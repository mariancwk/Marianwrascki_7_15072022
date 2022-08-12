const Post = require('../models/post')
const fs = require('fs')

exports.uploadPost = async(req, res, next) => {
    const post = req.file ? new Post({
        ...req.body,
        userId: req.authUserId, 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }) : new Post({
        ...req.body,
        userId: req.authUserId, 
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

exports.modifyPost = async (req, res, next) => {
    let oldPost = await Post.findOne({ _id: req.params.id })

    let post = req.file ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body }

    if (req.body.isImgDeleted) {
        post = {
            ...req.body,
            imageUrl:""
        }
    }

    if (req.file) {
        if (oldPost.imageUrl) {
            const fileName = oldPost.imageUrl.split('/images/')[1]
            try {
                fs.unlink(`images/${fileName}`, (error) => {
                    if (error) throw error;
                });
                
            } catch (error) {
                return res.status(400).json({ error })
            }
        }
    }

    try {
        await Post.updateOne({ _id: req.params.id }, {...post, _id: req.params.id })
        return res.status(200).json({ message: 'Post modified' })

    } catch (error) {
        return res.status(400).json({ message: 'Cannot update' })
    }
}

exports.deletePost = async(req, res, next) => {
    let post

    try {
        post = await Post.findOne({ _id: req.params.id })
    } catch (error) {
        res.status(400).json({ error })
    }
    
    if (!post.imageUrl) {
        post.deleteOne()
        return res.status(200).json({ message: 'post deleted' })
    }
    
    const fileName = post.imageUrl.split('/images/')[1]

    try {
        fs.unlink(`images/${fileName}`, () => {
            post.deleteOne()
        })
        res.status(200).json({ message: 'post deleted' })
    } catch (error) {
        res.status(400).json({ error })
    }
}

exports.likePost = async(req, res, next) => {
    const filter = req.body.postId
    const updateUsersLiked = { usersLiked: req.authUserId }
    
    let post = await Post.findById(filter)

    if (!post) {
        return res.status(404).json({ error: "Post not found" })
    }
    
    const { like } = req.body
    const userHasLiked = post.usersLiked.includes(req.authUserId)

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