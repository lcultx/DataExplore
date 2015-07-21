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


class LatteEconomyLogs2Local implements IDailyLogs2Local{

  run(){
    later.date.localTime();
    var sched = <Later.IScheduleData>{ schedules: [ <Later.IRecurrence>{ h: [ 3 ], m: [ 45 ] } ] };
    later.setInterval(()=>{
      this.download(moment().subtract(1, 'd'));
    },sched);
  }

  static getInstance(){
    return new LatteEconomyLogs2Local();
  }


  download(theday:moment.Moment){
    var servers = [
      'http://121.201.8.151:8888/gm/getLog?path=/access/server1',
      'http://121.201.8.151:8788/gm/getLog?path=/access/server2',
      'http://121.201.8.151:8688/gm/getLog?path=/access/server3',
      'http://121.201.8.151:8588/gm/getLog?path=/access/server4',
      'http://121.201.8.151:8488/gm/getLog?path=/access/server5',
      'http://121.201.8.151:8887/gm/getLog?path=/access/server1'
    ];



    var url =  '/' +   theday.format('YYYY/MM/DD') + '.log';

    for(var i=0;i<servers.length;i++){
      var remote_url =  servers[i] + url;
      var local_path = path.join(this.getLogsDir(theday) ,'/' + servers[i].split('path=/access/')[1] + '.log');
      Downloader.download(remote_url,local_path,(status)=>{});
    }
  }

  getLogsDir(theday:moment.Moment):string{
    return path.join(config.getEconomyLogsDir(),theday.format('YYYY/MM/DD'));
  }

  exist(theday:moment.Moment){
    return fs.existsSync(this.getLogsDir(theday));
  };
}

export = LatteEconomyLogs2Local;
