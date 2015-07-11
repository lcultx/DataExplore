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


class QZoneLatteLogs2Local implements IDailyLogs2Local{

  run(){
    later.date.localTime();
    var sched = <Later.IScheduleData>{ schedules: [ <Later.IRecurrence>{ h: [ 3 ], m: [ 35 ] } ] };
    later.setInterval(()=>{
      this.download(moment().subtract(1, 'days'));
      require('./history_logs_track');
    },sched); 
  }

  static getInstance(){
    return new QZoneLatteLogs2Local();
  }


  download(theday:moment.Moment){
    var servers = [
      'http://121.201.8.151:8888/gm/getActiveLog?path=/server1',
      'http://121.201.8.151:8788/gm/getActiveLog?path=/server2',
      'http://121.201.8.151:8688/gm/getActiveLog?path=/server3',
      'http://121.201.8.151:8588/gm/getActiveLog?path=/server4',
      'http://121.201.8.151:8488/gm/getActiveLog?path=/server5',
      'http://121.201.8.151:8887/gm/getActiveLog?path=/server1'
    ];

    config.getQZoneLatteLogsDir()

    var url =  '/' +   theday.format('YYYY/MM/DD') + '.log';

    for(var i=0;i<servers.length;i++){
      var remote_url =  servers[i] + url;
      var local_path = path.join(this.getLogsDir(theday) ,'/' + servers[i].split('path=/')[1] + '.log');
      Downloader.download(remote_url,local_path,(status)=>{});
    }
  }

  getLogsDir(theday:moment.Moment):string{
    return path.join(config.getQZoneLatteLogsDir(),theday.format('YYYY/MM/DD'));
  }

  exist(theday:moment.Moment){
    return fs.existsSync(this.getLogsDir(theday));
  };
}

export = QZoneLatteLogs2Local;
