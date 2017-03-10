var passport = require('passport')
LocalStrategy = require('passport-local').Strategy;

exports.authenticate = function(req, res, next) {
  req.body.username = req.body.username.toLowerCase();
  var auth = passport.authenticate('local', function(err, user) {
    if(err) { res.status(404).json(err); return;}
    if(!user) {  res.status(401).json(info); return}
    req.logIn(user, function(err) {
      if(err) {
         // If user is not found
         console.log('authentication failure user not found');
         res.status(401).json(info);
         return;
      }else {
         console.log('authentication success generating Jwt');
         var token = user.generateJwt();
         res.status(200);
         res.json({ "token" : token });
      }
    })
  })
  auth(req, res, next);
};

exports.requiresApiLogin = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
};

exports.requiresRole = function(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
}