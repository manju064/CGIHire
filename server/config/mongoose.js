var mongoose = require('mongoose'),
    candidateModel = require('../models/CandidateModel');
    

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('recruitment db opened');
  });
};

