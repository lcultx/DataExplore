/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/moment/moment.d.ts"/>
/// <reference path="../../../typings/later/later.d.ts"/>
import moment = require('moment');
import later = require('later');
import Downloader = require('./Downloader');
import path = require('path');
import config = require('../config');
import fs = require('fs');
class WanbaSDKLogs2Local implements IDailyLogs2Local{
  run(){
    later.date.localTime();
    var sched = <Later.IScheduleData>{ schedules: [ <Later.IRecurrence>{ h: [ 4 ], m: [ 0 ] } ] };
    later.setInterval(()=>{
      this.download( moment().subtract(1, 'd'));
  },sched);
  }

  static getInstance(){
    return new WanbaSDKLogs2Local();
  }

  download(theday:moment.Moment){
    var log_dir = this.getLogsDir(theday);
    Downloader.download('http://119.29.72.23:3000/info.log.0',path.join(log_dir,'info.log'),()=>{});
    Downloader.download('http://119.29.72.23:3000/warn.log.0',path.join(log_dir,'warn.log'),()=>{});
    Downloader.download('http://119.29.72.23:3000/error.log.0',path.join(log_dir,'error.log'),()=>{});
  }

  getLogsDir(theday:moment.Moment):string{
    return path.join(config.getWanbaSDKLogsDir(),theday.format('YYYY/MM/DD'));
  }

  exist(theday:moment.Moment){
    return fs.existsSync(this.getLogsDir(theday));
  };
}

export = WanbaSDKLogs2Local
