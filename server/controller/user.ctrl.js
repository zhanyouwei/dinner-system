/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/4/18.
 */


var mongoose = require('mongoose');
var db = require('../core/db.core').db;

// Schema 结构
var userSchema = new mongoose.Schema({
	email: {type: String},
	name: {type: String},
	password: {type: String},
	department: {type: String}
});

// model
var userModel = db.model('user', userSchema);

function register(data, callback) {
	var emailFilter = /^([a-zA-Z0-9_\.\-])+\@((meitunmama)+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (emailFilter.test(data.email)) {
		userModel.find({email: data.email}, function (error, result) {
			if (error) {
				callback(error, null);
			}
			if (result.length > 0) {
				callback({code: 400, message: '邮箱已注册!'}, null);
			} else {
				userModel.create(data, function (error, user) {
					if (error) {
						callback(error, null);
					} else {
						callback(null, user);
					}
				});
			}
		});
	} else {
		callback({code: 400, message: '邮箱格式不正确,请使用美囤妈妈企业邮箱注册'}, null);
	}

}

function login(data, callback) {
	// mongoose find
	userModel.findOne({email: data.email}, function (error, user) {
		if (error) {
			callback(error, null);
		}
		if (user) {
			if (data.password === user.password) {
				callback(null, user);
			} else {
				callback({code: 400, message: '密码错误!'}, null);
			}
		} else {
			callback({code: 400, message: '用户不存在!'}, null);
		}
	});
}

exports.register = register;
exports.login = login;

