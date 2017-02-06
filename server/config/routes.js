var candidateService = require('../controllers/Candidates'),
    mongoose = require('mongoose'),
    path    = require("path");

module.exports = function(app, config) {

  app.get('/api/Candidates', candidateService.get);
 
  app.post('/api/Candidates', candidateService.save);

  app.all('/api/*', function(req, res) {
    res.send(404);
  });

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../../public/client/app/index.html'));
  });
}