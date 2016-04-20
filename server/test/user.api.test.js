/**
 * Copyright 2015 kaiheiwang Corporation. All rights reserved.
 * Created by Youwei on 15/10/14.
 * 用户相关API测试
 */

var assert = require('chai').assert;
var superagent = require('superagent');
var config = require('../config/environment');

var baseUrl = 'http://localhost:9000/api/';

var user,
	ajaxHeader;
describe('user.api', function () {
	before(function () {
		user = {
			"email": '152' + parseInt(Math.random() * 100000000) + '@meitunmama.com',
			'password': '123123',
			'name': 'unitTest',
			'department': 'unitTest'
		};
		ajaxHeader = {
			'Content-Type': 'application/json'
		};
	});
	describe('注册', function () {
		it('should return user info', function (done) {
			superagent
				.post(baseUrl + 'register')
				.set(ajaxHeader)
				.send(user)
				.end(function (err, res) {
					if (err) {
						console.log(err);
					}
					assert(res.ok);
					assert(res.status == 200);
					done();
				});
		});
	});

	describe('登录', function () {
		it('should return user id', function (done) {
			superagent
				.post(baseUrl + 'login')
				.set(ajaxHeader)
				.send({
					email: user.email,
					password: user.password
				})
				.end(function (err, res) {
					if (err) {
						console.log(err);
					}
					assert(res.ok);
					assert(res.status == 200);
					assert(res.body.email);
					done();
				});
		});
	});


});