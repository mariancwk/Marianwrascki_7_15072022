const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')
const auth = require('../middlewares/auth')
const handlerUpload = require('../middlewares/multer-config')
const authzPost = require('../middlewares/authzPost')

router.get('/post',auth, postCtrl.getAllPosts)
router.post('/post', auth, handlerUpload, postCtrl.uploadPost)
router.post('/post/:id/like',auth, postCtrl.likePost)
router.put('/post/:id',auth, handlerUpload, postCtrl.modifyPost)
router.delete('/post/:id',auth, authzPost.ownerPost, postCtrl.deletePost)

module.exports = router