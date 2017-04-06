var mongoose = require('mongoose')
    mongoose.Promise = require('bluebird'),
    lookUpSchema = require('../models/locationsLookup'),
    locationsLookup = mongoose.model('locationsLookup', lookUpSchema,'locationsLookup'),
    cgiContactsLookup = mongoose.model('cgiContactsLookup', lookUpSchema,'cgiContactsLookup'),
    sectorsLookup = mongoose.model('sectorsLookup', lookUpSchema,'sectorsLookup'),
    skillsLookup = mongoose.model('skillsLookup', lookUpSchema,'skillsLookup')
    eventsLookup = mongoose.model('eventsLookup', lookUpSchema,'eventsLookup');
    

exports.get = function(req, res) {
     switch (req.params.name) {
        case 'locations':
           locationsLookup.find({}, {'_id':0, 'code':1,'name':1},function(err, result){
             if(err){
                    console.log("Error in getting locationsLookup err " + JSON.stringify(err));
                }else{
                    //console.log("Response locationsLookup " + JSON.stringify(results));
                    res.json(result);
                }
            });
           break;
        case 'cgiContacts':
           cgiContactsLookup.find({}, {'_id':0, 'code':1,'name':1},function(err, result){
             if(err){
                    console.log("Error in getting cgiContactsLookup err " + JSON.stringify(err));
                }else{
                    res.json(result);
                }
            });
           break;
        case 'sectors':
           sectorsLookup.find({}, {'_id':0, 'code':1,'name':1},function(err, result){
             if(err){
                    console.log("Error in getting sectorsLookup err " + JSON.stringify(err));
                }else{
                    res.json(result);
                }
            });
           break;  
        case 'skills':  
           skillsLookup.find({}, {'_id':0, 'id':1,'label':1},function(err, result){
             if(err){
                    console.log("Error in getting sectorsLookup err " + JSON.stringify(err));
                }else{
                    res.json(result);
                }
            });
           break; 
        case 'events':
           eventsLookup.find({},  {'_id':0, 'code':1,'name':1},function(err, result){
             if(err){
                    console.log("Error in getting eventsLookup err " + JSON.stringify(err));
                }else{
                    res.json(result);
                }
            });
           break; 
        default:
            console.log("Invalid lookup code")
            break;
     }
};