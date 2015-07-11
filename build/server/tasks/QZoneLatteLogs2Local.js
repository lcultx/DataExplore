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
var QZoneLatteLogs2Local = (function () {
    function QZoneLatteLogs2Local() {
    }
    QZoneLatteLogs2Local.prototype.run = function () {
        var _this = this;
        later.date.localTime();
        var sched = { schedules: [{ h: [3], m: [35] }] };
        later.setInterval(function () {
            _this.download(moment().subtract(1, 'days'));
            require('./history_logs_track');
        }, sched);
    };
    QZoneLatteLogs2Local.getInstance = function () {
        return new QZoneLatteLogs2Local();
    };
    QZoneLatteLogs2Local.prototype.download = function (theday) {
        var servers = [
            'http://121.201.8.151:8888/gm/getActiveLog?path=/server1',
            'http://121.201.8.151:8788/gm/getActiveLog?path=/server2',
            'http://121.201.8.151:8688/gm/getActiveLog?path=/server3',
            'http://121.201.8.151:8588/gm/getActiveLog?path=/server4',
            'http://121.201.8.151:8488/gm/getActiveLog?path=/server5',
            'http://121.201.8.151:8887/gm/getActiveLog?path=/server1'
        ];
        config.getQZoneLatteLogsDir();
        var url = '/' + theday.format('YYYY/MM/DD') + '.log';
        for (var i = 0; i < servers.length; i++) {
            var remote_url = servers[i] + url;
            var local_path = path.join(this.getLogsDir(theday), '/' + servers[i].split('path=/')[1] + '.log');
            Downloader.download(remote_url, local_path, function (status) { });
        }
    };
    QZoneLatteLogs2Local.prototype.getLogsDir = function (theday) {
        return path.join(config.getQZoneLatteLogsDir(), theday.format('YYYY/MM/DD'));
    };
    QZoneLatteLogs2Local.prototype.exist = function (theday) {
        return fs.existsSync(this.getLogsDir(theday));
    };
    ;
    return QZoneLatteLogs2Local;
})();
module.exports = QZoneLatteLogs2Local;
//# sourceMappingURL=QzoneLatteLogs2Local.js.map