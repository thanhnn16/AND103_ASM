const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'serviceTypes',
});

module.exports = mongoose.model('ServiceType', ServiceTypeSchema);
