const express = require('express');
const connectDb = require('./utils/db');
const cors = require('cors');
const app = express();
const authRouter = require('./modules/users/auth/authRouter')
const userRouter = require('./modules/users/userRouter')
const notificationRouter = require('./modules/notifications/notificationRouter')
const chatRouter = require('./modules/chats/chatRouter')
const invoiceRouter = require('./modules/invoices/invoiceRouter')
const invoiceDetailRouter = require('./modules/invoiceDetails/invoiceDetailRouter')
const favoriteRouter = require('./modules/favorites/favoriteRouter')

const productsRouter = require('./modules/products/productRouter');
const productTypesRouter = require('./modules/productTypes/productTypeRouter');
const servicesRouter = require('./modules/services/serviceRouter');
const serviceTypesRouter = require('./modules/serviceTypes/serviceTypeRouter');
const index = require('./routes/index');
const morgan = require('morgan');

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));


// Public folder
app.use(express.static('public'));

// Routes
app.use('/auth', authRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/product-types', productTypesRouter);
app.use('/api/services', servicesRouter);
app.use('/api/service-types', serviceTypesRouter);
app.use('/api/notifications', serviceTypesRouter);
app.use('/api/chat', serviceTypesRouter);
app.use('/api/invoices', serviceTypesRouter);
app.use('/api/invoice-detail', serviceTypesRouter);
app.use('/api/favorites', serviceTypesRouter);

app.use('/', index);

// Connect to database
connectDb().then(r => {
    app.listen({
        port: 3000,
        // host: '192.168.2.100'
    }, () => {
        console.log('Server is running on port 3000');
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});
