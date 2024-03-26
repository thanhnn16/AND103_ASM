const mongoose = require('mongoose');
const ServiceType = require('./serviceTypeModel');
const Service = require('../services/serviceModel')


const index = (req, res) => {
 res.send('Hello service types')
}

const getServicesByServiceType = async (req, res) => {
    try {
        const serviceType = await ServiceType.findById(req.params.id);
        if (!serviceType) {
            return res.send({status: 'not_found', message: 'Service type not found'});
        }
        const services = await Service.find({serviceTypeId: req.params.id});
        res.send(services);
    } catch (e) {
        return res.send({status: 'error', message: e.message});
    }
}

const getAllServiceTypes = async(req, res) => {
    try {
        const serviceTypes = await ServiceType.find();
        res.send(serviceTypes);
    } catch (e) {
        return res.send({status: 'error', message: e.message});
    }
}

module.exports = {
    getServicesByServiceType,
    getAllServiceTypes,
    index
}
