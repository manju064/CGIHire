var express = require('express'),
    path    = require("path"),
    cons = require('consolidate'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 3001;

var app = express();

var _views = "/client/app/assets/views"; // "views"


app.use(bodyParser());

//app.use(express.favicon(__dirname + '/images/favicon.ico'));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/client/app/index.html'));
});

app.all('/api/*', function(req, res) {
    res.send(404);
});

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, _views));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '/client')));
app.use('/src', express.static(__dirname + '/client/app/src'));
app.use('/vendor', express.static(__dirname + '/client/app/vendor'));
app.use('/assets', express.static(__dirname + '/client/app/assets'));
app.use('/bin', express.static(__dirname + '/bin'));

app.listen(port, function(){
    console.log("Front end gulp is Running on PORT " + port);
});