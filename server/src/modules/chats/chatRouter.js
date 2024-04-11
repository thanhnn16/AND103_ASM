const express = require('express');
const router = express.Router();

const chatController = require('./chatController');

router.get('/', chatController.getChats);
router.post('/', chatController.createChat);

router.get('/:id', chatController.getChat);
router.put('/:id', chatController.updateChat);

router.get('/user/:id', chatController.getChatsByUser);
router.post('/user/:id', chatController.createChatByUser);

router.delete('/:id', chatController.deleteChat);

module.exports = router;
