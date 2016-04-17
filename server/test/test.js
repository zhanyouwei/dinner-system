/**
 * @author: Jason.占友伟 zhanyouwei@meitunmama.com
 * Created on 16/2/29.
 */
var expect = require('chai').expect;
var get = require('../http.get').get;
describe('HTTP request', function () {
	describe('Get', function () {
		it('should return Obj without error', function (done) {
			get('http://192.168.16.20/finplat/insurance/item/recommend.htm?oem=IOS&osversion=8.0%20&screenwidth=414&screenheight=736&apptype=1&appversion=1.0.1&nettype=unknown&regcode=250&provcode=264&partner=babytree', function (err, data) {
				if (err) throw err;
				expect(JSON.parse(data)).to.be.an('object');
				done();
			});
		});
	});
});