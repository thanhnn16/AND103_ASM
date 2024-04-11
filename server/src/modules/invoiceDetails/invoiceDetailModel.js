const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceDetailSchema = new Schema({
    invoice: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('InvoiceDetail', invoiceDetailSchema);
