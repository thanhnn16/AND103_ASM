const express = require('express');
const router = express.Router();

const invoiceDetailController = require('./invoiceDetailController');

router.get('/', invoiceDetailController.getInvoiceDetails);
router.get('/:id', invoiceDetailController.getInvoiceDetail);
router.post('/', invoiceDetailController.createInvoiceDetail);
router.put('/:id', invoiceDetailController.updateInvoiceDetail);

module.exports = router;
