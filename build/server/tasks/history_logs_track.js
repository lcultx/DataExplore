/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/moment/moment.d.ts"/>
var WanbaSDKLogs2Local = require('./WanbaSDKLogs2Local');
var moment = require('moment');
function run() {
    console.log('管理员校对服务器时间...');
    console.log("Now:" + new Date());
    var theday = moment().subtract(1, 'days');
    var t = setInterval(function () {
        theday = theday.subtract(1, 'day');
        var wanbaLogs = WanbaSDKLogs2Local.getInstance();
        if (!wanbaLogs.exist(theday)) {
            wanbaLogs.download(theday);
            console.log('downlading logs of' + theday);
        }
    }, 1000 * 60 * 5);
}
exports.run = run;
run();
//# sourceMappingURL=history_logs_track.js.map