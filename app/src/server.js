var express = require('express');
// var bodyParser = require('body-parser');
var app = express();

// var urlencodedParser = bodyParser.urlencoded({ extended: false })

var root = process.cwd();

// var Pool = require('pg').Pool;
// var config = {
//   host: 'localhost',
//   user: 'foo',
//   database: 'bar',
//   password: process.env.DB_PASSWORD
// };

// var dropdown = document.getElementById('dropdown_menu');
// dropdown.onclick = function(){
	
// };
app.get('/submit-name:name', function(req,res){
	var name = req.query.name;

	res.send(JSON.stringify(name));
});

app.set('view engine', 'ejs');
app.use('/assets', function (req, res, next) {
	console.log(req.url);
	next();
});

app.post('/login_register.html', urlencodedParser, function (req, res) {
  console.log(req.body);
  res.render('index.html',{root});
});

app.get('/portfolio-1-col/:ename', function (req, res) {
	res.render('portfolio-1-col', {event_name: req.params.ename});
});

// app.get('/portfolio-item/:pname', function (req, res) {
// 	res.render('portfolio-item', {p_name: req.params.pname});
// });

// app.get('/about/:aname', function (req, res) {
// 	res.render('about', {a_name: req.params.aname});
// });

// app.get('/contact/:cname', function (req, res) {
// 	res.render('contact', {c_name: req.params.cname});
// });

// app.get('/template/:name', function (req, res) {
// 	res.render('template', {file: req.params.name});
// });

app.get('/:name', function (req, res) {
	//if(res.status === 404){res.sendFile('/404.html', {root});}
	res.sendFile('/' + req.params.name, {root});
});

app.get('/main.js', function (req, res) {
	res.sendFile('/' + main.js, {root});
});

app.get('/', function (req, res) {
	res.sendFile('/index.html', {root});
});

// app.get('*', function(req, res){
//   	res.sendFile('/404.html', {root});
// });

app.listen(8080, function () {
  console.log('Example app listening on port 8000!');
});
