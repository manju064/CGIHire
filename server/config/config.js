var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    rootPath: rootPath,
    db:{
        user: process.env.DB_USER || "CGI",
        pwd: process.env.DB_PWD || "CGIEvents2017",
        url: process.env.DB_URL || 'mongodb://CGI:CGIEvents2017@ds117109.mlab.com:17109/recruitment'
    },
    port: process.env.PORT || 8081,
    apiUrl: 'http://localhost:' + process.env.PORT + '/api'
  },
  production: {
    rootPath: rootPath,
    //db: 'mongodb://CGI:CGIEvents2017@ds117109.mlab.com:17109/recruitment',
    db: {
        user: process.env.DB_USER || "CGI",
        pwd: process.env.DB_PWD || "CGIEvents2017",
        url: process.env.DB_URL || 'mongodb://CGI:CGIEvents2017@ds117109.mlab.com:17109/recruitment'
        // "mongodb://ds056419.mlab.com:56419/cgirecruitmentevent",
    },
    port: process.env.PORT || 80,
    apiUrl: process.env.API_URL 
  }
}