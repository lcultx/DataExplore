var LocalLogDataCollector = require('../../components/collector/LocalLogDataCollector');
var config = require('../config');
var path = require('path');
var mogHelper = require('../../library/mogHelper');
var moment = require('moment');
var walk = require('fs-walk');
var wbLogsDir = config.getWanbaSDKLogsDir();
function filelog2db(file, server_name) {
    var ldCollector = new LocalLogDataCollector();
    console.log(file);
    var theday_str = /.*wanba_logs\/(.*)\/[(info)|(error)|(warn)]*/.exec(file)[1];
    var mm = moment(theday_str, 'YYYY/MM/DD');
    var theday = mm.toDate();
    var nextday = mm.clone().add(1, 'd').toDate();
    console.log(theday);
    console.log(nextday);
    var wanba_collection = mogHelper.getWanbaLogEventCollection();
    wanba_collection.remove({
        server_name: server_name,
        time: {
            "$gte": theday,
            "$lt": nextday
        }
    }, {}, function (err, results) {
        ldCollector.setLogURI(file);
        ldCollector.on('line', function (line) {
            try {
                var ob = JSON.parse(line);
                ob.data.res = JSON.parse(ob.data.res);
                ob.server_name = server_name;
                ob.time = new Date(ob.time);
                wanba_collection.insert(ob, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            catch (e) {
                console.log(e);
                console.log(line);
            }
        });
        ldCollector.on('end', function () {
            console.log('finish');
        });
        ldCollector.run();
    });
}
function run() {
    walk.files(wbLogsDir, function (basedir, filename, stat, next) {
        var file = path.join(basedir, filename);
        if (filename.indexOf('info.log') > -1) {
            filelog2db(file, 'wanba_sdk_proxy');
        }
        next();
    });
}
mogHelper.init(function () {
    run();
});
//# sourceMappingURL=wanba_history_logs_import.js.map