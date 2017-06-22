var express = require('express');
var app = express();

// app.set('views', './src/views');
// app.set('view engine', 'ejs')
// app.use(express.static(__dirname + '/public'))

var root = process.cwd();

//your routes here
app.get('/', function (req, res) {
	res.sendFile('public/index.html', {root});
});

// app.get('/bootstrap', function (req, res) {
// 	res.sendFile('startbootstrap-modern-business-gh-pages/index.html', {root});
// });

app.get('/details', function (req, res) {
	res.sendFile('public/go_tour_hasura.html', {root});
});
 
app.get('/contact/', function (req, res) {
    res.send("Contact US!");
});

app.listen(8000, function () {
  console.log('Example app listening on port 8080!');
});
