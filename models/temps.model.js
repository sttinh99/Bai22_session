var mongoose = require('mongoose');

var tempSchema = new mongoose.Schema({
    title: String,
    description: String,
    coverUrl: String,
    sl: Number
})

var Temp = mongoose.model('Temp',tempSchema,'temps');
module.exports = Temp;