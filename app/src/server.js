var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })
// var cookieParser = require('cookie-parser');
// var session = require('express-session');
// var morgan = require('morgan');
// var User = require(__dirname + '/public/js/user.js');

var root = process.cwd();
// var router = express.Router();
var app = express();

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.use('/', express.static(__dirname + '/public'));

port = 8080;

var Pool = require('pg').Pool;
var config = {
  host: 'postgres.hasura:5432/hasuradb',
  user: 'admin',
  database: 'hasuradb',
  port: 8080,
  password: process.env.DB_PASSWORD
};

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));

// app.use('/assets', function (req, res, next) {
//     console.log(req.url);
//     next();
// });

// app.post('/login_register.html', urlencodedParser, function (req, res) {
//   console.log(req.body);
//   res.render('/public/index.html',{root});
// });

app.get('/webhook', function(req, res) {
	res.sendFile('/public/webhook.html', {root});
	$("#Done").click(function(){ 
	  if (req.query['hub.mode'] === 'subscribe' &&
	      req.query['hub.verify_token'] === "amulya_mulybot_token_verification_test_start") {
	    console.log("amulya_mulybot_token_verification_test_start");
	    res.status(200).send(req.query['hub.challenge']);
	  } else {
	    console.error("Failed validation. Make sure the validation tokens match.");
	    res.sendStatus(403);          
	  }
	});  
});

app.get('/', function (req, res) {
    res.sendFile('/index.html', {root});
});

app.get('/js/main.js', function (req, res) {
	res.sendFile('/js/' + main.js, {root});
});

app.get('/:name', function (req, res) {
    res.sendFile('/public/' + req.params.name, {root});
});

app.get('*', function(req, res){
    res.sendFile('/public/404.html',{root});
});

// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(session({
//     key: 'user_sid',
//     secret: 'somerandonstuffs',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 600000
//     }
// }));

// app.use(function(req, res, next){
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie('user_sid');
//     }
//     next();
// });

// var sessionChecker = function(req, res, next){
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/home');
//     } else {
//         next();
//     }
// };

// app.get('/signup', sessionChecker, function(req, res){
//     res.render('pages/signup');
// });

// // app.post('/signup', function(req, res){
// //     User.create({
// //         username: req.body.username,
// //         email: req.body.email,
// //         password: req.body.password
// //     })
// //     .then( function(user){
// //         req.session.user = user.dataValues;
// //         res.redirect('/home');
// //     })
// //     .catch( function(error){
// //         res.redirect('/signup');
// //     });
// // });

// app.get('/login', function(req, res){
//     res.render('pages/login');
// });

// app.post('/login', function(req, res){
//     var username = req.body.username,
//         password = req.body.password;

//     User.findOne({ where: { username: username } }).then(function (user) {
//         if (!user) {
//             res.redirect('/login');
//         } else if (!user.validPassword(password)) {
//             res.redirect('/login');
//         } else {
//             req.session.user = user.dataValues;
//             res.redirect('/home');
//         }
//     });
// });

// app.get('/home', function(req, res){
//     if (req.session.user && req.cookies.user_sid) {
// 		res.render('pages/home')
//     } else {
//         res.redirect('/login');
//     }
// });

// app.get('/about', function(req, res){
//     if (req.session.user && req.cookies.user_sid) {
// 		res.render('pages/about')
//     } else {
//         res.redirect('/login');
//     }
// });

// app.get('/contact', function(req, res){
//     if (req.session.user && req.cookies.user_sid) {
//         res.render('pages/contact')
//     } else {
//         res.redirect('/login');
//     }
// });

// app.get('/services', function(req, res){
//     if (req.session.user && req.cookies.user_sid) {
//         res.render('pages/services')
//     } else {
//         res.redirect('/login');
//     }
// });

// app.get('/cultural', function(req, res){
//     if (req.session.user && req.cookies.user_sid) {
//         res.render('pages/cultural')
//     } else {
//         res.redirect('/login');
//     }
// });

// app.get('/technical', function(req, res){
//     if (req.session.user && req.cookies.user_sid) {
//         res.render('pages/technical')
//     } else {
//         res.redirect('/login');
//     }
// });

// app.get('/sports', function(req, res){
//     if (req.session.user && req.cookies.user_sid) {
//         res.render('pages/sports')
//     } else {
//         res.redirect('/login');
//     }
// });

// app.get('/all_events', function(req, res){
//     if (req.session.user && req.cookies.user_sid) {
//         res.render('pages/all_events')
//     } else {
//         res.redirect('/login');
//     }
// });

// app.get('/logout', function(req, res){
//     if (req.session.user && req.cookies.user_sid) {
//         res.clearCookie('user_sid');
//         res.redirect('/');
//     } else {
//         res.redirect('/login');
//     }
// });

// app.get('*', function(req, res){
//   	res.render('404');
// });


app.listen(port, function(){
	console.log('Listening to port ' + port + ' ...');
});
