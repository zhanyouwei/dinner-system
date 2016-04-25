/**
 * @author: Jason.占友伟 zhanyouwei@meitunmama.com
 * Created on 16/3/21.
 */
var express = require('express');
var router = express.Router();
var userAgent = require('express-useragent');

var exportReport = require('../controller/exportReport');
var statistics = require('../controller/statistics.ctrl');

router.get('/', function (req, res, next) {
	var ua = userAgent.parse(req.headers['user-agent']);
	statistics.add(ua);
	res.render('index', {dirname: __dirname});
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
