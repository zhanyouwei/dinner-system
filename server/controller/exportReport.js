/**
 * @author: Jason.占友伟 zhanyouwei@icloud.com
 * Created on 16/4/16.
 */

var fs = require('fs');
var xlsx = require('node-xlsx');

var data = [
	[1, 2, 3],
	[true, false, null, 'sheetjs'],
	['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
	['baz', null, 'qux']
];
var sheet1 = {name: "mySheetName1", data: data};
var sheet2 = {name: "mySheetName2", data: data};
var xlsxData = xlsx.build([sheet1, sheet2]);

function exportReport (callback){
	fs.writeFile('server/public/report/test.xlsx', xlsxData, callback);
}


exports.exportReport = exportReport;