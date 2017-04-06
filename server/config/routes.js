var candidateService = require('../controllers/Candidates'),
    mongoose = require('mongoose'),
    userService = require('../controllers/Users'),
    authService = require('../controllers/authentication'),
    dataLookUp = require('../controllers/dataLookUp'),
    path    = require("path");

module.exports = function(app, config) {

    //Candidates
    app.get('/api/candidates', candidateService.get);
    app.post('/api/candidates', candidateService.save);
    app.post('/api/candidates/:Candidate_Id', candidateService.save);
    app.delete('/api/candidates/:Candidate_Id', candidateService.remove);

    //For Report of registered candidates
    app.get('/api/candidates/format', candidateService.getFormatedData);
   
   //For drop down lookup
    app.get('/api/dataLookUp/:name', dataLookUp.get);

    //For users    
    app.get('/api/users', authService.requiresRole('admin'), userService.getUsers);
    app.post('/api/users', userService.createUser);
    app.put('/api/users', userService.updateUser);

    //For authentication
    app.post('/api/auth/login', authService.authenticate);
    
    app.post('/api/auth/logout', function(req, res) {
      req.logout();
      res.end();
    });

    app.all('/api/*', function(req, res) {
      res.send(404);
    });

    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/../../public/client/app/index.html'));
    });
}