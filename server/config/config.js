var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/recruitment',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://CGI:CGIEvents2017@ds053178.mongolab.com/recruitment',
    port: process.env.PORT || 80
  }
}