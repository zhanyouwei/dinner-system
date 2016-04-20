/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/4/14.
 */


var mongoose = require('mongoose');
var db = require('../core/db.core').db;

// Schema 结构
var dishSchema = new mongoose.Schema({
	menuId: {type: String},
	name: {type: String},
	price: {type: String}
});

// model
var dishModel = db.model('dish', dishSchema);


function createDish(data, callback) {
	var dish = {
		name: data.name,
		price: data.price,
		menuId: data.menuId
	};
	dishModel.find({name: dish.name}, function (error, result) {
		if (error) {
			callback(error, null);
		}
		if (result.length > 0) {
			callback({code: 400, message: '菜名已存在!'}, null);
		} else {
			dishModel.create(dish, function (error, result) {
				if (error) {
					callback(error, null);
				} else {
					callback(null, result);
				}
			});
		}
	});
}

function findDishByMenuId(id, callback) {
	// mongoose find
	var criteria = {menuId: id}; // 查询条件
	var fields = {name: 'name', price: 'price'}; // 待返回的字段
	var options = {};
	dishModel.find(criteria, fields, options, function (error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
}

function removeDishById(id,callback) {
	dishModel.remove({ _id: id }, function (err) {
		callback(err);
	});
}

exports.createDish = createDish;
exports.findDishByMenuId = findDishByMenuId;
exports.removeDishById = removeDishById;
