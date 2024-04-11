const InvoiceDetail = require('./invoiceDetailModel');

const getInvoiceDetails = async (req, res) => {
    try {
        const invoiceDetails = await InvoiceDetail.find();
        res.json(invoiceDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getInvoiceDetail = async (req, res) => {
    try {
        const invoiceDetail = await InvoiceDetail.findById(req.params.id);
        res.json(invoiceDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createInvoiceDetail = async (req, res) => {
    const invoiceDetail = new InvoiceDetail({
        ...req.body
    });

    try {
        const newInvoiceDetail = await invoiceDetail.save();
        res.status(201).json(newInvoiceDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateInvoiceDetail = async (req, res) => {
    try {
        const invoiceDetail = await InvoiceDetail.findById(req.params.id);

        if (req.body.name) {
            invoiceDetail.name = req.body.name;
        }

        if (req.body.description) {
            invoiceDetail.description = req.body.description;
        }

        if (req.body.price) {
            invoiceDetail.price = req.body.price;
        }

        const updatedInvoiceDetail = await invoiceDetail.save();
        res.json(updatedInvoiceDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteInvoiceDetail = async (req, res) => {
    try {
        const invoiceDetail = await InvoiceDetail.findById(req.params.id);
        await invoiceDetail.remove();
        res.json({ message: 'Invoice detail deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getInvoiceDetails,
    getInvoiceDetail,
    createInvoiceDetail,
    updateInvoiceDetail,
    deleteInvoiceDetail
}
