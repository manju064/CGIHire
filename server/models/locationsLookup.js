var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
  

var lookUpSchema = new Schema(
    {
        code: Number,
        name:String
    },
     { _id: false });

var collectionName = 'locationsLookup';
  
exports = lookUpSchema;