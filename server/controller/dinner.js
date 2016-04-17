/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/4/14.
 */


var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/dinner-database');
// 链接错误
db.on('error', function (error) {
  console.log(error);
});

// Schema 结构
var menuSchema = new mongoose.Schema({
  name: {type: String},
  price: {type: String}
});

// model
var mongooseModel = db.model('menu', menuSchema);


function insert(data, callback) {
  mongooseModel.create(data, function (error) {
    if (error) {
      callback(error);
    } else {
      callback(null);
    }
  });
}

function find(callback) {
  // mongoose find
  var criteria = {}; // 查询条件
  var fields = {}; // 待返回的字段
  var options = {};
  mongooseModel.find(criteria, fields, options, function (error, result) {
    if (error) {
      console.log(error);
      throw Error(error);
    }
    if (callback) {
      callback(error, result);
    }
    //关闭数据库链接
    db.close();
  });
}

exports.insert = insert;
exports.find = find;

