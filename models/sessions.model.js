var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    cart: Object
})

var Session = mongoose.model('Session',bookSchema,'sessions');
module.exports = Session;