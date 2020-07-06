require('dotenv').config()

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var db = require('../db');
var md5 = require('md5');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');
var saltRounds = 10;

module.exports.postLogin = function(req,res,next){
    var email = req.body.email;
    var password = req.body.pass;
    //var hasdPass = md5(password);

    // var hasdPass = bcrypt.compareSync(password,hash)
    // console.log(hasdPass);
    var user = db.get('users').find({email: email}).value();
    var countError;
    if(!user){
        res.render('auth/login',{errors:["user doesn't exists"]});
        countError++;
        return;
    }
    var hasdPass = bcrypt.compareSync(password,user.pass); 
    if(!hasdPass){
        countError = ++user.wrongLoginCount;
        // console.log(countError);
        if(countError>=3){
            const msg = {
                to: user.email,
                from: '17110381@student.hcmute.edu.vn',
                subject: 'Sending with Twilio SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: 'mat khau cua ban la: <strong>123123</strong>',
            };
            sgMail.send(msg);
            res.render('auth/login',{errors:["Mat khau da duoc gui ve email "]});
            return;
        }
        res.render('auth/login',{errors:["Wrong password!!!"]});
        return;
    }
    res.cookie("user",user.id,{
        signed: true
    });
    res.redirect("/users");
}