/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/4/14.
 */


var mongoose = require('mongoose');
var db = require('../core/db.core').db;

// Schema 结构
var orderSchema = new mongoose.Schema({
	type: {type: Number, default: 0},
	dishList: [{name: String, price: String, id: String}],
	userList: Array,
	oper: String,
	orderDate: String
}, { timestamps: { createdAt: 'created_at' } });

// model
var orderModel = db.model('order', orderSchema);

function createOrder(data, callback) {
	var date = new Date();
	var order = {
		type: data.type,
		dishList: data.dishList,
		userList: data.userList,
		oper: data.oper,
		orderDate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
	};
	orderModel.find({
		oper: order.oper,
		orderDate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
	}, function (error, result) {
		if (error) {
			callback(error, null);
		}
		if (result.length > 0) {
			callback({code: 400, message: '您已点过!'}, null);
		} else {
			orderModel.create(order, function (error, result) {
				if (error) {
					callback(error, null);
				} else {
					callback(null, result);
				}
			});
		}
	});
}

function findOrderByUserId(id, callback) {
	// mongoose find
	var criteria = {oper: id}; // 查询条件
	var fields = {
		id: 1,
		oper: 1,
		createTime: 1,
		orderDate: 1,
		userList: 1,
		dishList: 1
	}; // 待返回的字段
	var options = {};
	orderModel.find(criteria, fields, options, function (error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
}

function findOrderByDate(date, callback) {
	// mongoose find
	var criteria = {orderDate: date}; // 查询条件
	var fields = {}; // 待返回的字段
	var options = {};
	orderModel.find(criteria, fields, options, function (error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
}

function removeDishById(id, callback) {
	orderModel.remove({_id: id}, function (err) {
		callback(err);
	});
}

exports.createOrder = createOrder;
exports.findOrderByUserId = findOrderByUserId;
exports.findOrderByDate = findOrderByDate;
