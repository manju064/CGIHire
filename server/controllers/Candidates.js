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
    newCandidate._id = req.body._id;
    newCandidate.firstName = req.body.firstName;
    newCandidate.lastName = req.body.lastName;
    newCandidate.gender = req.body.gender;
    newCandidate.phoneNumber = req.body.phoneNumber;
    newCandidate.emailId = req.body.emailId;
    newCandidate.highestQualification = req.body.highestQualification;
    newCandidate.qualificationDate = req.body.qualificationDate;
    newCandidate.linkedInUrl = req.body.linkedInUrl;
    newCandidate.comment = req.body.comment;
    newCandidate.preferredLocation = req.body.preferredLocation;
    newCandidate.roleId = req.body.roleId;
    newCandidate.sectorId = req.body.sectorId;
    newCandidate.subscribeToNewsLetter = req.body.subscribeToNewsLetter;
    newCandidate.privacyDisclaimer = req.body.privacyDisclaimer;
    newCandidate.eventId = 1;
    newCandidate.cgiContactId = req.body.cgiContactId;

    if(newCandidate._id == null || newCandidate._id == undefined){
        Create(newCandidate);
    }else{
        update(newCandidate);
    }

    function Create(candidate){
        apiBase.getNextSequence("candidateId").then(seq => {
            candidate._id = seq;
            candidate
            .save()
            .then( user => {
                console.log('created user: ' + user.firstName);
                res.json( {id:user_id, message: 'User created successfully '});
            })
            .catch( err =>{
                // just need one of these
                console.log('error:', err);
            });
        });
    }

    function update(newCandidate){
        Candidate
        .update({ _id: newCandidate._id }, newCandidate, { upsert: true, new: true })
        .then( user => {
            console.log('updated user: ' + user.firstName);
            res.json({id:user._id, message: 'User Saved successfully '});
        })
        .catch( err =>{
            // just need one of these
            console.log('error:', err);
        });
    }
};