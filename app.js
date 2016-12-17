var express = require('express');
var bodyParser = require("body-parser");
var app = new express();

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'html');
app.use('./index', function(req, res){
	debugger
	res.render('index')
})
app.post('./openNewsBox', function(req, res, err){
	console.log(req.body);
	if (err) {
		console.log(err)
	}
	res.sendfile('./popup/newsBox.html');
});
app.listen(8080)