var mongoose = require('mongoose'),
    candidateModel = require('../models/CandidateModel');
    

module.exports = function(config) {
  console.log('Connecting to', config.db.url); 
 /* var conn = mongoose.connect(config.db.url, {user: config.db.user, pwd: config.db.pwd},
            function(err, db) {
                if (err) {
                    console.log('Unable to connect to the mongoDB server Err', err);
                } else {
                    //We are connected. :)
                    console.log('Connection established to', config.db.url); 
            }
    });
  */
  var db = mongoose.connection;
  mongoose.connect(config.db.url);
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('DB opened');
  });
  
};

