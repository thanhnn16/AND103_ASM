const express = require('express');
const router = express.Router();

const notificationController = require('./notificationController');

router.get('/', notificationController.getNotifications);
router.post('/', notificationController.createNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
