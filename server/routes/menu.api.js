/**
 * @author: Jason.占友伟 zhanyouwei@meitunmama.com
 * Created on 16/4/16.
 */

var express = require('express');
var router = express.Router();
var menuControl = require('../controller/menu.ctrl.js');
var dishControl = require('../controller/dish.ctrl');

/**
 * @api {post} /menu 添加菜单
 * @apiName AddMenu
 * @apiGroup Menu
 *
 * @apiParam {String} name 菜单名.
 * @apiParam {String} oper 操作员.
 *
 * @apiSuccess {String} id 菜单id.
 * @apiSuccess {String} name 菜单名.
 */
router.post('/menu', function (req, res, next) {
	menuControl.createMenu(req.body, function (err, data) {
		if (err) {
			next(err);
			res.sendStatus(500);
			res.send({code: 500, message: '服务器端错误'});
		} else {
			res.send({
				id: data._id,
				name: data.name
			});
		}
	});
});

/**
 * @api {get} /menu 获取菜单
 * @apiName GetMenu
 * @apiGroup Menu
 *
 * @apiSuccess {Object[]} menu 菜单.
 * @apiSuccess {String} menu.id 菜名.
 * @apiSuccess {String} menu.name 价格.
 */
router.get('/menu', function (req, res, next) {
	menuControl.findMenu(function (err, data) {
		if (err) {
			next(err);
		} else {
			res.send(data);
		}
	});
});

/**
 * @api {get} /menu/:id 获取菜单ById
 * @apiName GetMenuByName
 * @apiGroup Menu
 *
 * @apiParam {String} id 菜单id.
 *
 * @apiSuccess {String} id 菜单id.
 * @apiSuccess {String} name 菜单名.
 * @apiSuccess {Object[]} dishes 菜.
 * @apiSuccess {String} dishes.id 菜id.
 * @apiSuccess {String} dishes.name 菜名.
 * @apiSuccess {String} dishes.price 菜价格.
 */
router.get('/menu/:id', function (req, res, next) {
	console.log(req.params);
	menuControl.findMenuById(req.params.id, function (err, data) {
		console.log(data);
		if (err) {
			next(err);
		} else {
			res.send({
				id: data._id,
				name: data.name,
				dishes: data.dishes
			});
		}
	});
});

/**
 * @api {delete} /menu/:id 删除菜单
 * @apiName DelMenu
 * @apiGroup Menu
 *
 * @apiParam {String} id 菜单Id.
 *
 */
router.delete('/menu/:id', function (req, res, next) {
	res.sendStatus(500);
	res.send({code: 500, message: '接口尚未开放!'});
});

/**
 * @api {post} /dish 添加菜
 * @apiName AddDish
 * @apiGroup Dish
 *
 * @apiParam {String} menuId 菜单Id.
 * @apiParam {String} name 菜名.
 * @apiParam {String} price 价格.
 * @apiParam {String} oper 操作者Id.
 *
 * @apiSuccess {String} id 菜id.
 * @apiSuccess {String} name 菜名.
 * @apiSuccess {String} price 价格.
 */
router.post('/dish', function (req, res, next) {
	dishControl.createDish(req.body, function (err, data) {
		if (err) {
			next(err);
		} else {
			res.send({
				id: data._id,
				name: data.name,
				price: data.price
			});
		}
	});
});

/**
 * @api {delete} /dish/:id 删除菜
 * @apiName DelDish
 * @apiGroup Dish
 *
 * @apiParam {String} id 菜Id.
 *
 */
router.delete('/dish/:id', function (req, res, next) {
	dishControl.removeDishById(req.params.id, function (err) {
		if (err) {
			next(err);
		} else {
			res.send({});
		}
	});
});


module.exports = router;