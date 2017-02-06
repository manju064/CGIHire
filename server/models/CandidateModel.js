var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
  

var candidateSchema = new Schema(
    {
        _id: Number,
        firstName:String,
        lastName:String,
        gender:String,
        phoneNumber:Number,
        emailId:String,
        highestQualification:String,
        linkedInUrl:String,
        comment:String,
        preferredLocations:{ type: Array, 'default': [] },
        roleInterestedId:Number,
        sectorId:Number,
        subscribeToNewsLetter:{ type: Boolean, default:false },
        privacyDisclaimer:{ type: Boolean, default:false },
        eventId:Number,
        cgiContactId:Number
    },
    { _id: false }
);

//module.exports = candidateModel;
var collectionName = 'candidates';
  
module.exports = mongoose.model('Candidate', candidateSchema, collectionName);