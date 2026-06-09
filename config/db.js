const mongoose = require('mongoose');

const mongodb_uri = process.env.MONGO_URI;

async function connection(){
    await mongoose.connect(mongodb_uri)
}

module.exports = connection;