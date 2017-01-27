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
    db: 'mongodb://localhost/recruitment',//mongodb://CGI:CGIEvents2017@ds117109.mongolab.com:17109/recruitment',
    port: process.env.PORT || 80
  }
}