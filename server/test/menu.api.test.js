/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/4/20.
 */

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var superagent = require('superagent');
var config = require('../config/environment');

var baseUrl = 'http://localhost:9000/api/';

var user,
	ajaxHeader,
	userId,
	menuId,
	dishId,
	dishName,
	dishPrice;
describe('menu.api', function () {
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
	describe('注册-register', function () {
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

	describe('登录-login', function () {
		it('should return user info', function (done) {
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
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.all.keys('id', 'name');
					userId = res.body.id;
					done();
				});
		});
	});

	describe('添加菜单-menu', function () {
		it('should return menu info', function (done) {
			superagent
				.post(baseUrl + 'menu')
				.set(ajaxHeader)
				.send({
					name: 'testMenu' + parseInt(Math.random() * 10000),
					oper: userId
				})
				.end(function (err, res) {
					if (err) {
						console.log(err);
					}
					assert(res.ok);
					assert(res.status == 200);
					res.body.should.be.an('object');
					expect(res.body).to.have.all.keys('id', 'name');
					menuId = res.body.id;
					done();
				});
		});
	});

	describe('查询菜单-menu', function () {
		it('should return menu List', function (done) {
			superagent
				.get(baseUrl + 'menu')
				.set(ajaxHeader)
				.end(function (err, res) {
					if (err) {
						console.log(err);
					}
					assert(res.ok);
					assert(res.status == 200);
					expect(res.body).to.be.a('array');
					expect(res.body).to.not.be.empty;
					done();
				});
		});
	});

	describe('添加菜-dish', function () {
		it('should return menu info', function (done) {
			dishName = 'testDish' + parseInt(Math.random() * 10000);
			dishPrice = parseInt(Math.random() * 10);
			superagent
				.post(baseUrl + 'dish')
				.set(ajaxHeader)
				.send({
					name: dishName,
					menuId: menuId,
					oper: userId,
					price: dishPrice
				})
				.end(function (err, res) {
					if (err) {
						console.log(err);
					}
					assert(res.ok);
					assert(res.status == 200);
					res.body.should.be.an('object');
					expect(res.body).to.have.all.keys('id', 'name', 'price');
					dishId = res.body.id;
					done();
				});
		});
	});

	describe('查询菜单-menu/:id', function () {
		it('should return menu info', function (done) {
			superagent
				.get(baseUrl + 'menu/' + menuId)
				.set(ajaxHeader)
				.end(function (err, res) {
					if (err) {
						console.log(err);
					}
					assert(res.ok);
					assert(res.status == 200);
					expect(res.body).to.be.a('object');
					done();
				});
		});
	});

	describe('下单-order', function () {
		it('should return order id', function (done) {
			superagent
				.post(baseUrl + 'order')
				.set(ajaxHeader)
				.send({
					type: '0',
					oper: userId,
					userList: [userId],
					dishList: [{name: dishName, price: dishPrice, id: dishId}]
				})
				.end(function (err, res) {
					if (err) {
						console.log(res.body);
					}
					assert(res.ok);
					assert(res.status == 200);
					res.body.should.be.an('object');
					expect(res.body).to.have.all.keys('id');
					done();
				});
		});
	});

	describe('查询菜单-order', function () {
		it('should return order List', function (done) {
			superagent
				.get(baseUrl + 'order')
				.set(ajaxHeader)
				.query({
					userId: userId
				})
				.end(function (err, res) {
					if (err) {
						console.log(err);
					}
					assert(res.ok);
					assert(res.status == 200);
					expect(res.body).to.be.a('array');
					console.log(res.body[0].id);
					done();
				});
		});
	});
});