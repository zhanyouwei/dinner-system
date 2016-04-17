/**
 * @author: Jason.占友伟 zhanyouwei@icloud.com
 * Created on 16/4/16.
 */

var express = require('express');
var router = express.Router();
//var dinnerControl = require('../controller/dinner');

router.post('/order', function (req, res, next) {
	res.end('/order');
});
router.get('/order', function (req, res, next) {
	res.end();
});
router.get('/order/:id', function (req, res, next) {
	res.end();
});

module.exports = router;





