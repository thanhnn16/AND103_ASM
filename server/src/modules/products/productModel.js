const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product = new Schema({
    name: {
        type: String, required: true,
    }, description: {
        type: String, required: true,
    }, price: {
        type: Number, required: true,
    }, images: {
        type: [String], required: true,
    }, productTypeId: {
        type: Schema.Types.ObjectId, ref: 'ProductType',
    },
}, {timestamps: true});

module.exports = mongoose.model('Product', Product);
