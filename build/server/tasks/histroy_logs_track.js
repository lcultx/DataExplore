/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/moment/moment.d.ts"/>
var WanbaSDKLogs2Local = require('./WanbaSDKLogs2Local');
var moment = require('moment');
function run() {
    console.log('管理员校对服务器时间...');
    console.log("Now:" + new Date());
    var theday = moment().subtract(1, 'days');
    var t = setInterval(function () {
        var wanbaLogs = WanbaSDKLogs2Local.getInstance();
        if (!wanbaLogs.exist(theday)) {
            console.log('downlading logs of' + theday);
        }
    }, 60 * 5);
}
exports.run = run;
run();
//# sourceMappingURL=histroy_logs_track.js.map