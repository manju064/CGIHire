var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    rootPath: rootPath,
    db:{
        url: process.env.DB_URL || 'mongodb://CGI:CGIEvents2017@localhost/recruitment'
    },
    port: process.env.PORT || 8081,
  },
  production: {
    rootPath: rootPath,
    
    db: {
        url: process.env.DB_URL
    },
    port: process.env.PORT || 80,
  }
}