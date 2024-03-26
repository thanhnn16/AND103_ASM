const express = require('express');
const router = express.Router();

const serviceTypeController = require('./serviceTypeController');

router.get('/all', serviceTypeController.getAllServiceTypes);

router.get('/services/:id', serviceTypeController.getServicesByServiceType);

router.get('/', serviceTypeController.index);

module.exports = router;
