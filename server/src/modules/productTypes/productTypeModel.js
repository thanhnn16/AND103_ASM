const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductType = new Schema({
    name: {
        type: String, required: true,
    },
}, {timestamps: true, collection: 'productTypes'});

module.exports = mongoose.model('ProductType', ProductType);
