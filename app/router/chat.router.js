const router = require('express').Router();
const chatController = require('../controller/chat.controller.js');

router.post('/send',chatController.sendMessage);

module.exports = router