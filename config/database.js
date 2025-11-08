const mongoose = require('mongoose'); //import mongoose library
const config = require('./index'); //

const db = mongoose.connect(config.mongo_uri)
    .then(() => console.log('Connect To Database'))
    .catch((err) => console.error('An Error Has Occured', err));

module.exports = db;