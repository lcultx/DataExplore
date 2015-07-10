/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/moment/moment.d.ts"/>
/// <reference path="../../../typings/later/later.d.ts"/>
import moment = require('moment');
import later = require('later');
import Downloader = require('./Downloader');
import path = require('path');
import config = require('../config');

class WanbaSDKLogs2Local implements IDailyLogs2Local{
  run(){


    var sched = later.parse.text('at 4:45am every day');
    //var manualSched = <Later.IScheduleData>{ schedules: [ <Later.IRecurrence>{ M: [ 3 ], D: [ 21 ] } ] };
    later.setInterval(()=>{
      this.download( moment().subtract(1, 'days'));
    },sched);
  }

  static getInstance(){
    return new WanbaSDKLogs2Local();
  }

  download(theday:moment.Moment){
    var theday_log_path  = path.join(config.getWanbaSDKLogsDir(),theday.format('YYYY/MM/DD'));
    Downloader.download('http://119.29.72.23:3000/info.log.0',path.join(theday_log_path,'info.log'),()=>{});
    Downloader.download('http://119.29.72.23:3000/warn.log.0',path.join(theday_log_path,'warn.log'),()=>{});
    Downloader.download('http://119.29.72.23:3000/error.log.0',path.join(theday_log_path,'error.log'),()=>{});
  }
}

export = WanbaSDKLogs2Local
