require('dotenv').config()

var User = require('../models/users.model')

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var db = require('../db');
var md5 = require('md5');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');
var saltRounds = 10;

module.exports.postLogin = async function(req,res,next){
    var email = req.body.email;
    var password = req.body.pass;
    //var hasdPass = md5(password);

    // var hasdPass = bcrypt.compareSync(password,hash)
    // console.log(hasdPass);
    // var user = db.get('users').find({email: email}).value();
    var user = await User.findOne({email: email})
    if(!user){
        res.render('auth/login',{errors:["user doesn't exists"]});
        return;
    }
    var hasdPass = bcrypt.compareSync(password,user.pass); 
    if(!hasdPass){
        await User.findOneAndUpdate({email:email},{wrongLoginCount:user.wrongLoginCount+1});
        // console.log(countError);
        if(user.wrongLoginCount>=3){
            const msg = {
                to: user.email,
                from: process.env.MAIL,
                subject: 'Password for You',
                text: 'and easy to do anywhere, even with Node.js',
                html: 'mat khau cua ban la: <strong>123123</strong>',
            };
            sgMail.send(msg);
            user.wrongLoginCount = 0;
            await user.save();
            res.render('auth/login',{errors:["Mat khau da duoc gui ve email "]});
            return;
        }
        res.render('auth/login',{errors:["Wrong password!!!"]});
        return;
    }
    res.cookie("user",user._id,{
        signed: true
    });
    res.redirect("/users");
}