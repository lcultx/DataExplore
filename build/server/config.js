/// <reference path="../../typings/node/node.d.ts"/>
var path = require('path');
exports.port = 8020;
function getQZoneLatteLogsDir() {
    return path.join(__dirname, '../../resource/qzone_logs');
}
exports.getQZoneLatteLogsDir = getQZoneLatteLogsDir;
function getWanbaSDKLogsDir() {
    return path.join(__dirname, '../../resource/wanba_logs');
}
exports.getWanbaSDKLogsDir = getWanbaSDKLogsDir;
//# sourceMappingURL=config.js.map