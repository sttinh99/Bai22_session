// server.js
require('dotenv').config()

// const sgMail = require('@sendgrid/mail');
// console.log(process.env.SENDGRID_API_KEY);
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'mail',
//   from: 'mail',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>OKKKKKKK</strong>',
// };
// sgMail.send(msg);

const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');

// var db = require('./db');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log("Connected to MongoDB..."))
.catch((err) => console.error(`Connection failed...`));
var useRoute = require('./routes/books.route');
var useRoute1 = require('./routes/users.route');
var useRoute2 = require('./routes/transactions.route');
// var useRouteProducts = require('./routes/products.route');
var useRouteProfile = require('./routes/profile.route');
var useRoute3 = require('./routes/auth.route');
var useRouteCart = require('./routes/cart.route');
var useRegister = require('./routes/register.route');

var cookieCount = require('./validation/cookiecount.validation');

var sessionMiddleWare = require('./middleware/session.middleware')
var getPermission = require('./middleware/permission.middleware');

var authMiddleWare = require('./middleware/auth.middleware');

var apiBookRoute = require('./api/routes/book.route')
var apiLoginRoute = require('./api/routes/auth.route')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api/postLogin',apiLoginRoute);

app.use(cookieParser(process.env.PROCESS_ENV));
app.use(sessionMiddleWare);



app.set("view engine", "pug"); // register the template engine
// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];
// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use("/books",/*cookieCount.cookies,*/useRoute);
app.use("/users",/*cookieCount.cookies,*/authMiddleWare.requireAuth,useRoute1);
app.use("/transactions",/*cookieCount.cookies,*/authMiddleWare.requireAuth,useRoute2)
app.use('/auth',useRoute3);
// app.use('/products',useRouteProducts);
app.use('/profile',authMiddleWare.requireAuth,useRouteProfile)
app.use('/cart', useRouteCart);
app.use('/',useRegister);
app.get('/',function(req,res){
  res.render('./index');
});

app.use('/api/books', apiBookRoute);
// app.get("/",function(req,res,next){
//   res.render('./index');
// });
// https://expressjs.com/en/starter/basic-routing.html
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + process.env.PORT);
});
