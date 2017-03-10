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
      var salt, hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'jolan165');
      User.create({firstName:'Jolanda',lastName:'Phillipson',username:'jolanda.phillipson@cgi.com', salt: salt, hashed_pwd: hash, roles: ['admin']});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'manju165');
      User.create({firstName:'Manjunath',lastName:'Keshava',username:'manjunath.keshava@cgi.com', salt: salt, hashed_pwd: hash, roles: ['admin']});
    }
  })
}

exports.createDefaultUsers = createDefaultUsers;