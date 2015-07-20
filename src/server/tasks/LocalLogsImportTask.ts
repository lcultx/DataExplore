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

import QZoneLogsImport = require('./QZoneLogsImport');
import WanbaLogsImport = require('./WanbaLogsImport');
class LocalLogsImportTask implements ITask{

  run(){


    later.date.localTime();
    var sched1 = <Later.IScheduleData>{ schedules: [ <Later.IRecurrence>{ h: [ 4 ], m: [ 15 ] } ] };
    later.setInterval(()=>{
      var qzoneImport = new QZoneLogsImport();
      qzoneImport.dailyLogfiles2db(moment().subtract(1, 'd'),()=>{
        console.log('qzone logs import success!')
      });
    },sched1);
    var sched2 = <Later.IScheduleData>{ schedules: [ <Later.IRecurrence>{ h: [ 4 ], m: [ 30 ] } ] };
    later.setInterval(()=>{
      var wanbaImport = new WanbaLogsImport();
      wanbaImport.dailyLogfiles2db(moment().subtract(1,'d'),()=>{
        console.log('wanba logs import success!');
      })
    },sched2);

  }

  static getInstance(){
    return new LocalLogsImportTask();
  }

}

export = LocalLogsImportTask;
