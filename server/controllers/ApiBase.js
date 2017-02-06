var Counter = require('mongoose').model('Counter');

exports.getNextSequence = function getNextSequence (name) {
  // Return the Promise right away, unless you really need to
  // do something before you create a new Promise, but usually
  // this can go into the function below
  return new Promise((resolve, reject) => {
    // reject and resolve are functions provided by the Promise
    // implementation. Call only one of them.

    // Do your logic here - you can do WTF you want.:)
    Counter.findByIdAndUpdate({_id: name}, {$inc: { seq: 1} }, {new: true}, function(err, result) {
         if(err){
             // Reject the Promise with an error
            console.log("ApiBase getNextSequence " + err);  
            return reject(err)
         }

        console.log("Counter " + result.seq);    
        return resolve(result.seq); 
    });
  })
}