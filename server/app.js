/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/4/15.
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var userAgent = require('express-useragent');

var config = require('./config/environment');
var routes = require('./routes/index');
var statistics = require('./controller/statistics.ctrl');

var app = express();

// 设置模板路径及模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/h5')));

//配置视图路由
app.use('/', routes);
//region 配置 API 路由
//设置跨域访问
var corsOptions = {
	origin: ["http://localhost:9000", "http://192.168.16.110:4000", "http://localhost:4000"],
	allowedHeaders: "Origin, Content-Type, Content-Length, Accept, X-Requested-With",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
	credentials: true
};
app.options('*', cors(corsOptions), function (req, res, next) {
	res.sendStatus(200);
});
app.use(cors(corsOptions));
app.all('*', function (req, res, next) {
	var ua = userAgent.parse(req.headers['user-agent']);
	statistics.add(ua);
	next();
});

app.use('/api', require('./routes/user.api.js'));
app.use('/api', require('./routes/menu.api.js'));
app.use('/api', require('./routes/order.api.js'));

//endregion
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//endregion

// development error handler will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		if (err.status === 404) {
			res.render('error', {
				message: err.message,
				error: err
			});
		} else {
			res.status(err.status);
			res.send({code: err.status, message: err.message});
		}
	});
}

// production error handler ,no stacktraces leaked to user
if (app.get('env') === 'production') {
	app.use(function (err, req, res, next) {
		if (err.status === 404) {
			res.render('error', {
				message: err.message,
				error: {}
			});
		} else {
			res.status(err.status);
			res.send({code: err.status, message: err.message});
		}
	});
}

module.exports = app;