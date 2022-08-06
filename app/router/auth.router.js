const router = require('express').Router()
const authController = require('../controller/auth.contoller')

router.post('/auth', authController.auth)

module.exports = router
