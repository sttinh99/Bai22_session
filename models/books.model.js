var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    coverUrl: String,
    sl: Number,
    // id: String
})

var Book = mongoose.model('Book',bookSchema,'books');
module.exports = Book;