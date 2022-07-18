const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')


router.post('/post', postCtrl.uploadPost)
router.post('/post/:id', )
router.post('/post/:id/like', postCtrl.likePost)

module.exports = router