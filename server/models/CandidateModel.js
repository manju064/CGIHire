var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;;

var candidateModel = new Schema(
    {
        firstName:String,
        lastName:String,
        gender:String,
        phone:Number,
        email:String,
        highestQualification:String,
        linkedInUrl:String,
        comment:String,
        PreferredLocations:{ type: Array, 'default': [] },
        RoleInterestedId:Number,
        SectorId:Number,
        SubscribeToNewsLetter:{ type: Boolean, default:false },
        PrivacyDisclaimer:{ type: Boolean, default:false },
        EventId:Number
    }
);
/*
candidateModel.virtual('candidateId').get(function() {
    return this._id;
});
*/
var collectionName = 'candidates'
module.exports = mongoose.model('Candidate', candidateModel,collectionName);