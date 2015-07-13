/// <reference path="../../components/collector/interfaces.d.ts"/>
var LocalLogDataCollector = require('../../components/collector/LocalLogDataCollector');
var ExecTime = require('exec-time');
var walk = require('fs-walk');
var path = require('path');
var querystring = require('querystring');
var get_pay_point = function (req, res) {
    var profiler = new ExecTime('getPayPointShower');
    profiler.beginProfiling();
    var obList = [];
    function calculatePayPoint() {
        var payPointList = [];
        for (var i = 0; i < obList.length; i++) {
            var ob = obList[i];
            if (ob.data && ob.data.req) {
                var req = ob.data.req;
                if (req.indexOf('buy_playzone_item') > -1) {
                    console.log(ob);
                    var url_parts = querystring.parse(req);
                    payPointList.push(url_parts);
                }
            }
        }
        return payPointList;
    }
    var logDir = '/Users/xuyang/src/DataExplore/resource/wanba_logs';
    walk.files(logDir, function (basedir, filename, stat, next) {
        if (filename == 'info.log') {
            var file = path.join(basedir, filename);
            console.log(file);
            var ldCollector = new LocalLogDataCollector();
            ldCollector.setLogURI(file);
            ldCollector.on('line', function (line) {
                obList.push(JSON.parse(line));
            });
            ldCollector.on('end', function (line) {
                console.log('recive end!!!');
                if (line) {
                    obList.push(JSON.parse(line));
                }
                console.log(obList.length);
                profiler.step('all record finish');
                res.json(calculatePayPoint());
            });
            ldCollector.run();
        }
        else {
            next();
        }
    }, function (err) {
        if (err)
            console.log(err);
    });
};
module.exports = get_pay_point;
//# sourceMappingURL=get_pay_point.js.map