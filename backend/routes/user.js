const express = require('express')
const router = express.Router()
const { userValidRules, isDataValid } = require('../middlewares/userValidator')
const userCtrl = require('../controllers/user')


router.post('/signup', userValidRules(), isDataValid, userCtrl.signup)
router.post('/login', userValidRules(), isDataValid, userCtrl.login)

module.exports = router