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

  var userAccounts = [ 
                  {code:"1",firstName:"Jolanda ",lastName:"Phillipson",email:"jolanda.phillipson@cgi.com",roles:['admin'],create:true},
                  {code:"2",firstName:"Manjunath",lastName:"Keshava",email:"manjunath.keshava@cgi.com",roles:['admin'],create:true},
                  {code:"3",firstName:"Tim",lastName:"Hogenboom",email:"tim.hogenboom@cgi.com",roles:['admin'],create:true},
                  {code:"4",firstName:"Felix",lastName:"Timmerman",email:"felix.timmerman@cgi.com",roles:['admin'],create:true},
                  {code:"5",firstName:"Chris de",lastName:"Jong",email:"chris.de.jong@cgi.com",roles:['admin'],create:true},

                  {code:"6",firstName:"Romina ",lastName:"Spiess",email:"romina.spiess@cgi.com",roles:['user'],create:false},
                  {code:"7",firstName:"Patrick",lastName:"Smit",email:"pat.smit@cgi.com",roles:['user'],create:true},
                  {code:"8",firstName:"Benjamin",lastName:"Fresco",email:"benjamin.fresco@cgi.com",roles:['user'],create:true},


                  {code:"9",firstName:"Stefan van der",lastName:"Wal",email:"stefan.van.der.wal@cgi.com",roles:['user'],create:true},
                  {code:"10",firstName:"Satish",lastName:"Bansidhar",email:"satish.bansidhar@cgi.com",roles:['user'],create:true},
                  {code:"11",firstName:"Jarno",lastName:"Houkes",email:"jarno.houkes@cgi.com",roles:['user'],create:true},
                  {code:"12",firstName:"Idris",lastName:"Khan",email:"idris.khan@cgi.com",roles:['user'],create:true},

                  {code:"13",firstName:"Alexander",lastName:"Chatzizacharias",email:"alexander.chatzizacharias@cgi.com",roles:['user'],create:true},
                  {code:"14",firstName:"Joep",lastName:"Kokkeler",email:"joep.kokkeler@cgi.com",roles:['user'],create:true},
                  {code:"15",firstName:"Erwin",lastName:"Hoeckx",email:"erwin.hoeckx@cgi.com",roles:['user'],create:true},
                  {code:"16",firstName:"Jan wouter",lastName:"Broekhuijsen",email:"jan.wouter.broekhuijsen@cgi.com",roles:['user'],create:true},
                  {code:"17",firstName:"Remco",lastName:"Siemonsma",email:"remco.siemonsma@cgi.com",roles:['user'],create:true},

      {code:"18",firstName:"Gerard ",lastName:"Mulder",email:"g.mulder@cgi.com",roles:['user'],create:true},
      {code:"19",firstName:"Erwin",lastName:"Hoeckx",email:"erwin.hoeckx@cgi.com",roles:['user'],create:true},
      {code:"20",firstName:"Joep",lastName:"Kokkeler",email:"Joep.Kokkeler@cgi.com",roles:['user'],create:true},
      {code:"21",firstName:"Alexander",lastName:"Chatzizacharias",email:"alexander.chatzizacharias@cgi.com",roles:['user'],create:true},
      {code:"22",firstName:"Joeri",lastName:"Taelman",email:"joeri.taelman@cgi.com",roles:['user'],create:true},
      {code:"23",firstName:"Siemonsma",lastName:"Remco",email:"Remco.Siemonsma@cgi.com",roles:['user'],create:true},
      {code:"24",firstName:"Mandy",lastName:"Sepers",email:"Mandy.Sepers@cgi.com",roles:['user'],create:true},
      {code:"25",firstName:"Joeri",lastName:"Taelman",email:"Joeri.Taelman@cgi.com",roles:['user'],create:true},


      {code:"26",firstName:"Luc",lastName:"Kuiphuis",email:"luc.kuiphuis@cgi.com",roles:['user'],create:true},
      {code:"27",firstName:"Taco",lastName:"Hoekstra",email:"taco.hoekstra@cgi.com",roles:['user'],create:true},
      {code:"28",firstName:"Rony",lastName:"Kooi",email:"ronny.kooi@cgi.com",roles:['user'],create:true},
      {code:"29",firstName:"Frank",lastName:"van Aavezaath",email:"frank.van.avezaath@cgi.com",roles:['user'],create:true},
      {code:"30",firstName:"Jouke",lastName:"de Vries",email:"jouke.de.vries@cgi.com",roles:['user'],create:true},
      {code:"31",firstName:"Meindert",lastName:"Jilderda",email:"meindert.jilderda@cgi.com",roles:['user'],create:true},
      {code:"32",firstName:"Jan",lastName:"van den Hof",email:"jan.van.den.hof@cgi.com>; ",roles:['user'],create:true},
      {code:"33",firstName:"Tiemo",lastName:"Potze",email:"tiemo.potze@cgi.com",roles:['user'],create:true},
      {code:"34",firstName:"Ronald",lastName:"ten Have",email:"ronald.ten.have@cgi.com",roles:['user'],create:true}
              ];

     userAccounts.forEach(function(item){
          if(item.create){
             User.find({username:item.email}).exec(function(err, collection) {
                    if (!collection.length){
                        var salt, hash;
                        salt = encrypt.createSalt();
                        var pwd = item.firstName.substring(0, 3) + item.lastName.substring(0, 2) + '165';
                        console.log('user name ' + item.email + ' pwd ' + pwd);
                        hash = encrypt.hashPwd(salt, pwd);
                        User.create({
                                    firstName:item.firstName,
                                    lastName:item.lastName,
                                    username:item.email,
                                    salt: salt, 
                                    hashed_pwd: hash, 
                                    roles: item.roles
                                  });
                    }
                  });
             }
        });
}

exports.createDefaultUsers = createDefaultUsers;