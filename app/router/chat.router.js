const router = require('express').Router();
const chatController = require('../controller/chat.controller.js');

router.post('/send',chatController.sendMessage);
router.post('/getmessage',chatController.getConversationMessages);
router.get('/getconversations',chatController.getConversations);

module.exports = router