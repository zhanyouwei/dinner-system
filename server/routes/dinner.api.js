/**
 * @author: Jason.占友伟 zhanyouwei@meitunmama.com
 * Created on 16/4/16.
 */

var express = require('express');
var router = express.Router();
//var dinnerControl = require('../controller/dinner');

router.post('/dinner', function (req, res, next) {
	var data = {
		name: 'test',
		price: 26
	};
	dinnerControl.insert(data, function (err, result) {
		if (!err) {
			res.end();
		}
	});
});
router.get('/dinner', function (req, res, next) {
	dinnerControl.find(function (err, result) {
		if (!err) {
			res.send(result);
		}
	});
});
router.get('/dinner/:id', function (req, res, next) {
	dinnerControl.find(function (err, result) {
		if (!err) {
			res.send(result);
		}
	});
});

module.exports = router;















