const express = require('express');
const connectDb = require('./utils/db');
const cors = require('cors');
const app = express();
const authRouter = require('./modules/users/auth/authRouter')
const userRouter = require('./modules/users/userRouter')
const productsRouter = require('./modules/products/productRouter');
const productTypesRouter = require('./modules/productTypes/productTypeRouter');
const index = require('./routes/index');

app.use(express.json());
app.use(cors());

// Public folder
app.use(express.static('public'));

// Q: how to use the public folder?
// A: You can use the public folder to store static files such as images, CSS, and JavaScript files.
// Q: How to use the public folder in other files?
// A: You can use the express.static() middleware to serve static files from the public folder.
// Q: How to use the express.static() middleware?
// A: The express.static() middleware takes one argument, which is the name of the folder to serve the static files from.


// Routes
app.use('/auth', authRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/product-types', productTypesRouter);
app.use('/', index);

// Connect to database
connectDb().then(r => {
    app.listen({
        port: 3000,
        // host: '192.168.1.3'
        host: '172.16.109.54'
    }, () => {
        console.log('Server is running on port 3000');
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});
