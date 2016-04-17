/**
 * @author: Jason.占友伟 zhanyouwei@meitunmama.com
 * Created on 16/3/21.
 */
var express = require('express');
var router = express.Router();

var exportReport = require('../controller/exportReport');

router.get('/', function (req, res, next) {
	res.render('index', {dirname: __dirname});
});

router.post('/register', function (req, res, next) {
	console.log(req.body);
	res.end();
});

router.post('/login', function (req, res, next) {
	console.log(req.body);
	res.end();
});



router.get('/download', function (req, res, next) {
	exportReport.exportReport(function (err) {
		if (err) {
			next(err);
		}
		res.download('server/public/report/test.xlsx');
	});
});

module.exports = router;
