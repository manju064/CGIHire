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
    newCandidate.firstName = req.body.firstName;
    newCandidate.lastName = req.body.lastName;
    newCandidate.gender = req.body.gender;
    newCandidate.phoneNumber = req.body.phoneNumber;
    newCandidate.emailId = req.body.emailId;
    newCandidate.highestQualification = req.body.highestQualification;
    newCandidate.qualificationDate = req.body.qualificationDate;
    newCandidate.linkedInUrl = req.body.linkedInUrl;
    newCandidate.comment = req.body.comment;
    newCandidate.preferredLocation = req.body.preferredLocation !=null && req.body.preferredLocation !=undefined ? 
                                     req.body.preferredLocation:2; 
    newCandidate.roleId = req.body.roleId !=null && req.body.roleId !=undefined ? req.body.roleId:142; //Find better coding
    newCandidate.sectorId = req.body.sectorId !=null && req.body.sectorId !=undefined ? req.body.sectorId:17;
    newCandidate.subscribeToNewsLetter = req.body.subscribeToNewsLetter;
    newCandidate.privacyDisclaimer = req.body.privacyDisclaimer;
    newCandidate.eventId = 1;
    newCandidate.cgiContactId = req.body.cgiContactId;

    if( req.params.Candidate_Id == null || req.params.Candidate_Id == undefined){
        Create(newCandidate);
    }else{
        newCandidate._id = req.params.Candidate_Id;
        update(newCandidate);
    }

    function Create(candidate){
        apiBase.getNextSequence("candidateId").then(seq => {
            candidate._id = seq;
            candidate
            .save()
            .then( user => {
                console.log('created user: ' + user.firstName);
                res.json( {id:user._id, message: 'User created successfully '});
            })
            .catch( err =>{
                // just need one of these
                console.log('error:', err);
            });
        });
    }

    function update(newCandidate){
        console.log('update ' + req.params.Candidate_Id);

        newCandidate._id = req.params.Candidate_Id;

        Candidate
        .update({ _id: parseInt(req.params.Candidate_Id) }, newCandidate, { upsert: true, new: true })
        .then( user => {
            console.log('updated user: ' + user.firstName);
            res.json({id:user._id, message: 'User Saved successfully '});
        })
        .catch( err =>{
            // just need one of these
            console.log('error:', err);
            res.json(err);
        });
    }
};

exports.remove = function(req, res) {
    Candidate.remove({ _id: req.params.Candidate_Id }
        )
        .then(result => {
            res.json({ message: 'Successfully deleted' });
        })  
        .catch( err =>{
            // just need one of these
            console.log('error:', err);
            res.json(err);
        });
};

exports.getFormatedData = function(req, res){
    Candidate.aggregate(
             [ 
                { 
                    $lookup: { from: "locationsLookup",  localField: "preferredLocation",
                                foreignField: "code", as: "locationMap"},
                },
                { 
                    $lookup: { from: "rolesLookup",  localField: "roleId",
                                foreignField: "code", as: "roleMap"}
                },
                { 
                    $lookup: { from: "sectorsLookup",  localField: "sectorId",
                                foreignField: "code", as: "sectorMap"}
                },
                 { 
                    $lookup: { from: "cgiContactsLookup",  localField: "cgiContactId",
                                foreignField: "code", as: "cgiContactMap"}
                },
                { $unwind: "$locationMap"},
                { $unwind: "$roleMap"},
                { $unwind: "$sectorMap"},
                { $unwind: "$cgiContactMap"},

                { $project: {  "firstName":1,
                               "lastName":2,
                               "emailId":3,
                               "gender":4,
                               "phoneNumber":{ $ifNull: [ "$phoneNumber", "" ] },
                               "highestQualification":{ $ifNull: [ "$highestQualification", "" ] },
                               "qualificationDate":{ $ifNull: [ "$qualificationDate", "" ] },
                               "linkedInUrl":{ $ifNull: [ "$linkedInUrl", "" ] },
                               "preferredLocation": { $ifNull: [ "$locationMap.name", "" ] },
                               "role": { $ifNull: [ "$roleMap.name", "" ] },
                               "sector":{ $ifNull: [ "$sectorMap.name", "" ] },
							   "cgiContact":"$cgiContactMap.name",
							   "privacyDisclaimer":13,
                               "subscribeToNewsLetter":{ $ifNull: [ "$subscribeToNewsLetter", "" ] },	
                               "comment":{ $ifNull: [ "$comment", "" ] },
                                _id:0 
                            } 
                }
            ],function(err, results){
                if(err){
                    console.log("Error in getting Candidates err " + JSON.stringify(err));
                }else{
                    console.log("Response formatted Candidates " + JSON.stringify(results ));
                    res.json(results);
                }
            });
};
