var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    candidateModel = require('../models/CandidateModel'),
    counterModel = require('../models/Counter'),
    userModel = require('../models/UserModel');
    
module.exports = function(config) {
  var db = mongoose.connection;
  mongoose.connect(config.db.url);
  db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
    console.log('DB opened');
  });
  //create default users
  userModel.createDefaultUsers();
};



