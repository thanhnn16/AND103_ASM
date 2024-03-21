const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/:id', userController.getUser);

router.post('/upload-avatar', userController.uploadAvatar);

module.exports = router;
