var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    candidateNodel = require('../models/CandidateModel'),
    CounterModel = require('../models/Counter');
    
module.exports = function(config) {
  //console.log('Connecting to', config.db.url); 
  var db = mongoose.connection;
  mongoose.connect(config.db.url);
  db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
    console.log('DB opened');
  });

  
};



