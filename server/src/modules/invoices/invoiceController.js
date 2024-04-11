const Invoice = require('./invoiceModel');

const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createInvoice = async (req, res) => {
    const invoice = new Invoice({
        ...req.body
    });

    try {
        const newInvoice = await invoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);

        if (req.body.name) {
            invoice.name = req.body.name;
        }

        if (req.body.description) {
            invoice.description = req.body.description;
        }

        if (req.body.price) {
            invoice.price = req.body.price;
        }

        const updatedInvoice = await invoice.save();
        res.json(updatedInvoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        await invoice.remove();
        res.json({ message: 'Invoice removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
