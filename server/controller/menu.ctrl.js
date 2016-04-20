/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/4/14.
 */


var mongoose = require('mongoose');
var db = require('../core/db.core').db;
var dishControl = require('./dish.ctrl');

// Schema 结构
var menuSchema = new mongoose.Schema({
	name: {type: String},
	oper: {type: String}
});

// model
var menuModel = db.model('menu', menuSchema);


function createMenu(data, callback) {
	menuModel.find({name: data.name}, function (error, result) {
		if (error) {
			callback(error, null);
		}
		if (result.length > 0) {
			callback({code: 400, message: '菜单已存在!'}, null);
		} else {
			menuModel.create(data, function (error, menu) {
				if (error) {
					callback(error, null);
				} else {
					callback(null, menu);
				}
			});
		}
	});
}

function findMenu(callback) {
	// mongoose find
	var criteria = {}; // 查询条件
	var fields = {name: 'name'}; // 待返回的字段
	var options = {};
	menuModel.find(criteria, fields, options, function (error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
}

function findMenuById(id, callback) {
	// mongoose find
	var criteria = {_id: id}; // 查询条件
	var fields = {name: 'name'}; // 待返回的字段
	var options = {};
	menuModel.findOne(criteria, fields, options, function (error, result) {
		if (error) {
			callback(error, null);
		} else {
			var menu = result;
			dishControl.findDishByMenuId(menu._id, function (err, dishes) {
				if (err) {
					callback(err, null);
				} else {
					menu.dishes = dishes;
					callback(null, menu);
				}
			});
		}
	});
}

exports.createMenu = createMenu;
exports.findMenu = findMenu;
exports.findMenuById = findMenuById;

