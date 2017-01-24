var Candidate = require('mongoose').model('Candidate');

exports.getCandidates = function(req, res) {
   Candidate.find(function(err, results){
        if(err){
            console.log("Error in getting Candidates err " + JSON.stringify(err));
        }else{
            //console.log("Response Candidates " + JSON.stringify(results ));
            res.json(results);
        }
    });
};