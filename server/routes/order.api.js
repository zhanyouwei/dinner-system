/**
 * @author: Jason.占友伟 zhanyouwei@icloud.com
 * Created on 16/4/16.
 */

var express = require('express');
var router = express.Router();
var orderControl = require('../controller/order.ctrl');

/**
 * @api {post} /order 点菜
 * @apiName AddOrder
 * @apiGroup Order
 *
 * @apiParam {Number} type 类型. `0`单点 `1` 合伙点
 * @apiParam {String[]} userList 点餐人员. user Id 数组
 * @apiParam {String[]} dishList 订单. dish Id 数组
 * @apiParam {String} oper 操作人Id.
 *
 */
router.post('/order', function (req, res, next) {
	orderControl.createOrder(req.body, function (err, data) {
		if (err) {
			res.status(500);
			res.send({code: 500, message: err.message});
			//next(err);
		} else {
			res.send({
				id: data._id
			});
		}
	})
});


/**
 * @api {get} /order 获取订单
 * @apiName GetMenuByName
 * @apiGroup Menu
 *
 * @apiParam {String} userId 用户id.
 *
 * @apiSuccess {String} id 订单id.
 * @apiSuccess {String} oper 下单人员id.
 * @apiSuccess {String} createTime 下单时间.
 * @apiSuccess {String} orderDate 下单日期.
 * @apiSuccess {String[]} userList 参与用户.
 * @apiSuccess {Object[]} dishList 参与用户(用户名).
 * @apiSuccess {String} dishList.id 菜id.
 * @apiSuccess {String} dishList.name 菜名.
 * @apiSuccess {String} dishList.price 菜价格.
 */
router.get('/order', function (req, res, next) {
	if (req.query.userId) {
		orderControl.findOrderByUserId(req.query.userId, function (err, data) {
			if (err) {
				res.status(500).send({code: 500, message: err.message});
			} else {
				res.send(data);
			}
		});
	} else {
		res.status(400).send({code: 400, message: 'userId required'});
	}
});
router.get('/order/:id', function (req, res, next) {
	res.end();
});

module.exports = router;





