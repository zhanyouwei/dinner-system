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
 *
 */
router.post('/order', function (req, res, next) {
	orderControl.createOrder(req.body, function (err, data) {
		if(err) {
			next(err);
		}else{
			res.send({});
		}
	})
});


router.get('/order', function (req, res, next) {
	res.send({});
});
router.get('/order/:id', function (req, res, next) {
	res.end();
});

module.exports = router;





