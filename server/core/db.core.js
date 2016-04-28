/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/4/18.
 */

var mongoose = require('mongoose');

var config = require('./config/environment');

var db = mongoose.createConnection(
  'mongodb://' + config.db.host + ':' + config.db.port + '/dinner-database');
// 链接错误
db.on('error', function (error) {
  console.log(error);
});

exports.db = db;
