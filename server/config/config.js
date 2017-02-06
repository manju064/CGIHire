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
    //db: 'mongodb://CGI:CGIEvents2017@ds117109.mlab.com:17109/recruitment',
    db: {
        url: process.env.DB_URL || 'mongodb://CGI:CGIEvents2017@ds056419.mlab.com:56419/cgirecruitmentevent'
        // "mongodb://ds056419.mlab.com:56419/cgirecruitmentevent",
    },
    port: process.env.PORT || 80,
  }
}