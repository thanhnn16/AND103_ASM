const express = require('express');
const router = express.Router();

const productController = require('./productController');

router.get('/all', productController.getProducts);

router.post('/ids', productController.getProductsByIds);

router.get('/:id', productController.getProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);


router.get('/', productController.index);

router.post('/', productController.createProduct);


module.exports = router;
