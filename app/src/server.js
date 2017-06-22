var express = require('express');
var app = express();

// app.set('views', './src/views');
// app.set('view engine', 'ejs')
// app.use(express.static(__dirname + '/public'))

//your routes here
app.get('/', function (req, res) {
	res.send("Hello Hasura!");
});

app.get('/contact/', function (req, res) {
    res.send("Contact US!");
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
