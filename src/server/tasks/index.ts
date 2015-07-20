/// <reference path="./interface.d.ts"/>
import WanbaSDKLogs2Local = require('./WanbaSDKLogs2Local');
import QzoneLatteLogs2Local = require('./QZoneLatteLogs2Local');
import LocalLogsImportTask = require('./LocalLogsImportTask');
export function run(){
  console.log('管理员校对服务器时间...');
  console.log("Now:"+new Date());


  QzoneLatteLogs2Local.getInstance().run();
  WanbaSDKLogs2Local.getInstance().run();
  LocalLogsImportTask.getInstance().run();
}
