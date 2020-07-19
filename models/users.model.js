var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    pass: String,
    wrongLoginCount: Number,
    avatarUrl: String,
    isAdmin: Boolean
})

var User = mongoose.model('User',userSchema,'users');
module.exports = User;