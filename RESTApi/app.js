var express = require('express'),
    mongoose = require('mongoose');

var dbUrl = 'mongodb://localhost/recruitment';

var conn = mongoose.connect(dbUrl, {user: 'CGI', pwd: 'CGIEvents2017'},
                            function(err, db) {
                                if (err) {
                                    console.log('Unable to connect to the mongoDB server Err', err);
                                } else {
                                    //We are connected. :)
                                    console.log('Connection established to', dbUrl); 
                            }
                    });

var Candidate = require('./models/candidateModel');

//var Candidate = conn.model('Candidate', candidateSchema);

var app = express();
var port = process.env.PORT || 3000;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}

app.use(allowCrossDomain);

var candidateRouter = express.Router();

candidateRouter.route('/Candidates')
        .get(function(req,res){
            Candidate.find(function(err, results){
                if(err){
                    console.log("Error in getting Candidates err " + JSON.stringify(err));
                }else{
                    //console.log("Response Candidates " + JSON.stringify(results ));
                    res.json(results);
                }
            });
        });

app.use('/api', candidateRouter);

app.get('/', function(req, res){
    res.send('Candidae API Started');
});


app.listen(port, function(){
    console.log("Gulp is Running on PORT " + port);
});
