var express = require('express');


console.log('express library loaded ');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('env ' + env);

var app = express();

console.log('express instances created ');

var config = require('./server/config/config')[env];

console.log('config loaded ');

require('./server/config/express')(app, config);

console.log('express app loaded ');

require('./server/config/mongoose')(config);

console.log('mongoose loaded ');

require('./server/config/routes')(app, config);

console.log('routes loaded ');

//app.listen(config.port);
console.log('Listening on port ' + config.port + '...');

process.on('uncaughtException', function(err) {
  console.log(err);
});
