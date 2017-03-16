var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    jwt = require('jsonwebtoken'),
    encrypt = require('../utilities/encryption');

var userSchema = new Schema({
        firstName: {type:String, required:true},
        lastName: {type:String, required:true},
        username: {
          type: String,
          required: true,
          unique:true
        },
        salt: {type:String, required: true},
        hashed_pwd: {type:String, required:true},
        roles: [String]
      });

userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  },
  generateJwt : function() {
          var expiry = new Date();
          expiry.setDate(expiry.getDate() + process.env.TOKEN_EXP || 7);

          return jwt.sign({
            _id: this._id,
            username: this.username,
            displayName: this.firstName,
            exp: parseInt(expiry.getTime() / 1000),
          }, process.env.JWT || 'local'); // DO NOT KEEP YOUR SECRET IN THE CODE!
  }
};

var collectionName = 'users';
var User = mongoose.model('User', userSchema, collectionName);

function createDefaultUsers() {
  console.log('Create default user started');
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {

     var userAccounts = [
                        {code:"1",firstName:"Michael",lastName:"Matthijsen",email:"michael.matthijsen@cgi.com",roles:['admin']},
                        {code:"2",firstName:"Jolanda ",lastName:"Phillipson",email:"jolanda.phillipson@cgi.com",roles:['admin']},
                        {code:"3",firstName:"Romina ",lastName:"Spiess",email:"romina.spiess@cgi.com",roles:['user']},
                        {code:"4",firstName:"Lisette",lastName:"Klok ",email:"lisette.klok@cgi.com",roles:['user']},
                        {code:"5",firstName:"Nicolas",lastName:"Castellon",email:"nicolas.castellon@cgi.com",roles:['user']},
                        {code:"6",firstName:"Marnix de",lastName:"Bruin",email:"marnix.de.bruin@cgi.com",roles:['user']},
                        {code:"7",firstName:"Ronny",lastName:"Kooi",email:"ronny.kooi@cgi.com",roles:['user']},
                        {code:"8",firstName:"Jeroen van",lastName:"Olderen",email:"jeroen.van.olderen@cgi.com",roles:['user']},
                        {code:"9",firstName:"Mark",lastName:"Drost",email:"mark.drost@cgi.com",roles:['user']},
                        {code:"10",firstName:"Adjai ",lastName:"Narain",email:"adjai.s.narain@cgi.com",roles:['user']},
                        {code:"11",firstName:"Renk",lastName:"Stienstra",email:"renk.stienstra@cgi.com",roles:['user']},
                        {code:"12",firstName:"Tiemo",lastName:"Potze",email:"tiemo.potze@cgi.com",roles:['user']},
                        {code:"13",firstName:"Ana Paula ",lastName:"Waaijenberg",email:"ana.paula.waaijenberg@cgi.com",roles:['user']},
                        {code:"15",firstName:"Pim",lastName:"Waaijenberg",email:"pim.waaijenberg@cgi.com",roles:['user']},
                        {code:"17",firstName:"Idris",lastName:"Khan",email:"idris.khan@cgi.com",roles:['user']},
                        {code:"18",firstName:"Jamie de",lastName:"Jong",email:"jamie.de.jong@cgi.com",roles:['user']},
                        {code:"19",firstName:"Shrijay ",lastName:"Satam",email:"shrijay.satam@cgi.com",roles:['user']}
                        ];

     userAccounts.forEach(function(item){
                  var salt, hash;
                  salt = encrypt.createSalt();
                  var pwd = item.firstName.substring(0, 3) + item.lastName.substring(0, 2) + '165';
                  //console.log('user name ' + item.email + ' pwd ' + pwd);
                  hash = encrypt.hashPwd(salt, pwd);
                  User.create({
                              firstName:item.firstName,
                              lastName:item.lastName,
                              username:item.email,
                              salt: salt, 
                              hashed_pwd: hash, 
                              roles: item.roles
                            });
      });
      
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'manju165');
      User.create({firstName:'Manjunath',lastName:'Keshava',username:'manjunath.keshava@cgi.com', salt: salt, hashed_pwd: hash, roles: ['admin']});
    }
  })
}

exports.createDefaultUsers = createDefaultUsers;