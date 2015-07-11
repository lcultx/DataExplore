/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/moment/moment.d.ts"/>
/// <reference path="../../../typings/later/later.d.ts"/>
var moment = require('moment');
var later = require('later');
var Downloader = require('./Downloader');
var path = require('path');
var config = require('../config');
var fs = require('fs');
var WanbaSDKLogs2Local = (function () {
    function WanbaSDKLogs2Local() {
    }
    WanbaSDKLogs2Local.prototype.run = function () {
        var _this = this;
        later.date.localTime();
        var sched = { schedules: [{ h: [4], m: [35] }] };
        later.setInterval(function () {
            _this.download(moment().subtract(1, 'days'));
        }, sched);
    };
    WanbaSDKLogs2Local.getInstance = function () {
        return new WanbaSDKLogs2Local();
    };
    WanbaSDKLogs2Local.prototype.download = function (theday) {
        var log_dir = this.getLogsDir(theday);
        Downloader.download('http://119.29.72.23:3000/info.log.0', path.join(log_dir, 'info.log'), function () { });
        Downloader.download('http://119.29.72.23:3000/warn.log.0', path.join(log_dir, 'warn.log'), function () { });
        Downloader.download('http://119.29.72.23:3000/error.log.0', path.join(log_dir, 'error.log'), function () { });
    };
    WanbaSDKLogs2Local.prototype.getLogsDir = function (theday) {
        return path.join(config.getWanbaSDKLogsDir(), theday.format('YYYY/MM/DD'));
    };
    WanbaSDKLogs2Local.prototype.exist = function (theday) {
        return fs.existsSync(this.getLogsDir(theday));
    };
    ;
    return WanbaSDKLogs2Local;
})();
module.exports = WanbaSDKLogs2Local;
//# sourceMappingURL=WanbaSDKLogs2Local.js.map