var db = require('../db');
var valLogin = require('../validation/login.validation')
module.exports.login = function(req,res){
    res.render('auth/login');
}
module.exports.postLogin = valLogin.postLogin;