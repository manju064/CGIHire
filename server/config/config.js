var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    rootPath: rootPath,
    db:{
        user:"CGI",
        pwd: "CGI",
        url:'mongodb://ds117109.mlab.com:17109/recruitment',
    },
    port: process.env.PORT || 80
  },
  production: {
    rootPath: rootPath,
    //db: 'mongodb://CGI:CGIEvents2017@ds117109.mlab.com:17109/recruitment',
    db: {
        user:"CGI",
        pwd: "CGIEvents2017",
        url:"mongodb://10.128.0.2/recruitment",
    },
    port: process.env.PORT || 80
  }
}