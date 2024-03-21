const express = require('express');
const router = express.Router();
const productTypeController = require('./productTypeController');

router.get('/all', productTypeController.getProductTypes);
router.get('/products/:id', productTypeController.getProductByType);

router.get('/', productTypeController.index);

module.exports = router;
