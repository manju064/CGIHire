var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var collectionName ='counters';

module.exports = mongoose.model('Counter', CounterSchema, collectionName);
