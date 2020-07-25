var mongoose = require('mongoose');

var tranSchema = new mongoose.Schema({
    idBook: String,
    idUser: String,
    isComplete: Boolean
})

var Tran = mongoose.model('Tran',tranSchema,'trans');
module.exports = Tran;