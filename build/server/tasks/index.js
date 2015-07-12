/// <reference path="./interface.d.ts"/>
var WanbaSDKLogs2Local = require('./WanbaSDKLogs2Local');
var QzoneLatteLogs2Local = require('./QZoneLatteLogs2Local');
function run() {
    console.log('管理员校对服务器时间...');
    console.log("Now:" + new Date());
    QzoneLatteLogs2Local.getInstance().run();
    WanbaSDKLogs2Local.getInstance().run();
}
exports.run = run;
//# sourceMappingURL=index.js.map