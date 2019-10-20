const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbUrl = 'mongodb://' + dbHost + ':' + dbPort + '/auth-service';

const mongoose = require('mongoose');
mongoose.connect(dbUrl, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
module.exports = mongoose;