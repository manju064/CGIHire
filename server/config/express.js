var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cons = require('consolidate'),
    path    = require("path"),
    session = require('express-session'),
    favicon = require('serve-favicon');


module.exports = function(app, config) {
  function compile(str, path) {
    return stylus(str).set('filename', path);
  }

  var clientAppPath = path.normalize(__dirname + '/../../public/client/');

  console.log('express clientAppPath ' + clientAppPath);

  app.set('views', config.rootPath + '/client/app/assets/views');
  app.engine('html', cons.swig)
  app.set('view engine', 'html');

  console.log('express view path config complete');

  app.set('port', process.env.PORT || config.port);
  app.set('base url', process.env.URL || 'http://localhost');

  console.log('express port and url config complete');

  app.use(express.static(path.join(__dirname, '/../../public/client')));
  //app.use(express.static(__dirname + '/../../public'));
  app.use('/src', express.static(clientAppPath + '/app/src'));
  app.use('/vendor', express.static(clientAppPath + '/vendor')); 
  app.use('/assets', express.static(clientAppPath + '/app/assets'));
  app.use('/bin', express.static(__dirname + '/../../public/bin'));
  //app.use(favicon(config.clientAppPath  + '/assets/images/favicon.ico'));
  
  console.log('express static config complete');
  
  app.use(logger('dev'));
  app.use(cookieParser());

  console.log('express static config complete');
  
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());

  //TODO, required?
  /*var allowCrossDomain = function(req, res, next) {
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                        next();
                      };

  app.use(allowCrossDomain);
  */
}
