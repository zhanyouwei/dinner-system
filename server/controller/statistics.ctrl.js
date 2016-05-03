/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/4/21.
 * 统计模块
 */

var mongoose = require('mongoose');
var db = require('../core/db.core').db;

// Schema 结构
var statisticsSchema = new mongoose.Schema({
	ua: {type: Object},
	date: {type: Date, default: Date.now}
});

// model
var statisticsModel = db.model('statistics', statisticsSchema);

function add(data, callback) {
	statisticsModel.create({ua: data}, function (error, user) {
		if (error) {
			callback && callback(error, null);
		} else {
			callback && callback(null, user);
		}
	});

}

exports.add = add;

