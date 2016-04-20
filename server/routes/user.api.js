/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/4/18.
 */


var express = require('express');
var router = express.Router();
var userControl = require('../controller/user.ctrl');

/**
 * @api {post} /register 注册
 * @apiName Register
 * @apiGroup User
 *
 * @apiParam {String} email 企业邮箱.
 * @apiParam {String} name 真实姓名.
 * @apiParam {String} password 密码.
 * @apiParam {String} department 部门.
 *
 */
router.post('/register', function (req, res, next) {
	userControl.register(req.body, function (err,data) {
		if(err) {
			next(err);
		}else{
			res.send(data);
		}
	});
});


/**
 * @api {post} /login 登录
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} email 企业邮箱.
 * @apiParam {String} password 密码.
 *
 * @apiSuccess {Object} userInfo 用户信息.
 * @apiSuccess {String} userInfo.id Id.
 * @apiSuccess {String} userInfo.name Name.
 *
 */
router.post('/login', function (req, res, next) {
	userControl.login(req.body, function (err,data) {
		if(err) {
			next(err);
		}else{
			res.send(data);
		}
	});
});

module.exports = router;




