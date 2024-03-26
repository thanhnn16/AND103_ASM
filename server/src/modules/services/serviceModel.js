const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    serviceTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'ServiceType',
        required: true
    },
    images: [],
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', ServiceSchema);
