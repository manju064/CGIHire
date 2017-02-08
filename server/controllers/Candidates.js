var mongoose = require('mongoose')
    mongoose.Promise = require('bluebird'),
    Candidate = mongoose.model('Candidate'),
    apiBase = require('../controllers/ApiBase');

exports.get = function(req, res) {
   Candidate.find(function(err, results){
        if(err){
            console.log("Error in getting Candidates err " + JSON.stringify(err));
        }else{
            //console.log("Response Candidates " + JSON.stringify(results ));
            res.json(results);
        }
    });
};

exports.save = function(req, res) {
    console.log('Candidate Service - save');
    var newCandidate = new Candidate();
    
    //Set model values
    //TODO, don't we have better way ?
    
    apiBase.getNextSequence("candidateId").then(seq => {
        newCandidate._id = seq;
        newCandidate.firstName = req.body.firstName;
        newCandidate.lastName = req.body.lastName;
        newCandidate.gender = req.body.gender;
        newCandidate.phoneNumber = req.body.phoneNumber;
        newCandidate.emailId = req.body.emailId;
        newCandidate.highestQualification = req.body.highestQualification;
        newCandidate.linkedInUrl = req.body.linkedInUrl;
        newCandidate.comment = req.body.comment;
        newCandidate.preferredLocation = req.body.preferredLocation;
        newCandidate.roleId = req.body.roleId;
        newCandidate.sectorId = req.body.sectorId;
        newCandidate.subscribeToNewsLetter = req.body.subscribeToNewsLetter;
        newCandidate.privacyDisclaimer = req.body.privacyDisclaimer;
        newCandidate.eventId = 1;
        newCandidate.cgiContactId = req.body.cgiContactId;
        
        newCandidate
        .save()
        .then( user => {
            console.log('updated user: ' + user.firstName);
            res.json('Saved successfully');
        })
        .catch( err =>{
            // just need one of these
            console.log('error:', err);
        });
    });
   
};