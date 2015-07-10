/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/moment/moment.d.ts"/>
/// <reference path="../../../typings/later/later.d.ts"/>
import moment = require('moment');
import later = require('later');
import Downloader = require('./Downloader');
import path = require('path');
import config = require('../config');

class QZoneLatteLogs2Local implements IDailyLogs2Local{
  run(){

    var sched = later.parse.text('at 4:35am every day');
    later.setInterval(()=>{
      this.download(moment().subtract(1, 'days'));
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
      var local_path = path.join(config.getQZoneLatteLogsDir(),theday.format('YYYY/MM/DD')
       + '/' + servers[i].split('path=/')[1] + '.log');
      Downloader.download(remote_url,local_path,(status)=>{});
    }

  }
}

export = QZoneLatteLogs2Local;
