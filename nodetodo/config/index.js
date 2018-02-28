var configValues = require('./config');

module.exports = {
    
    getDbConnectionString: function() {
        return 'mongodb://' + configValues.uname + ':' + configValues.pw + '@ds119524.mlab.com:19524/nodetodosample';
    }

}