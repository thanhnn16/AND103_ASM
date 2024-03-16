const express = require('express');
const connectDb = require('./utils/db');
const cors = require('cors');
const app = express();
const authRouter = require('./routes/auth');

app.use(express.json());
app.use(cors());
// View engine setup (jade pug)
app.set('view engine', 'pug');
app.set('views', './views');

// Public folder
app.use(express.static('public'));

// Routes
app.use('/auth', authRouter);

// Connect to database
connectDb().then(r => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});
