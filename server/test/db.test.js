/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/4/28.
 */


var mongoose = require('mongoose');

var config = require('../config/environment');

var db = mongoose.createConnection(
  'mongodb://' + config.db.host + ':' + config.db.port + '/dinner-database');
// 链接错误
db.on('error', function (error) {
  throw new Error(error);
});

// Schema 结构
var testSchema = new mongoose.Schema({
  title: {type: String}
}, {timestamps: {createdAt: 'created_at'}});

// model
var testModel = db.model('testdb', testSchema);
testModel.create({title: 'test'}, function (error, user) {
  if (error) {
    throw new Error(error);
  }
  process.exit();
});


