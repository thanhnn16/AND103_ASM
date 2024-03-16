const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect('mongodb://localhost:27017/btt_dev');
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
        process.exit(1);
    }
}

module.exports = connectDb;
