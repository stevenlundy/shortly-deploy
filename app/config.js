var path = require('path');
var mongoose = require('mongoose');
var connection = process.env.MONGO_DB || 'mongodb://localhost/test';
mongoose.connect(connection);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;
