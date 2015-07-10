/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/moment/moment.d.ts"/>
/// <reference path="../../../typings/later/later.d.ts"/>
import Moment = require('moment');
import later = require('later');
import Downloader = require('./Downloader');
import path = require('path');
import config = require('../config');

class QZoneLatteLogs2Local implements ITask{
  run(){

    //每天4:45取得前一天的日志
    var sched = later.parse.text('at 4:45am every day');
    //var manualSched = <Later.IScheduleData>{ schedules: [ <Later.IRecurrence>{ M: [ 3 ], D: [ 21 ] } ] };

    console.log('管理员校对服务器时间...');
    var laterTime = later.date.localTime();
    console.log("Now:"+new Date());
    console.log("Later Time:" + laterTime);

    // later.setInterval(()=>{
    //   this.download();
    // },sched);

    this.download();
  }

  download(){
    var servers = [
      'http://121.201.8.151:8888/gm/getActiveLog?path=/server1',
      'http://121.201.8.151:8788/gm/getActiveLog?path=/server2',
      'http://121.201.8.151:8688/gm/getActiveLog?path=/server3',
      'http://121.201.8.151:8588/gm/getActiveLog?path=/server4',
      'http://121.201.8.151:8488/gm/getActiveLog?path=/server5',
      'http://121.201.8.151:8887/gm/getActiveLog?path=/server1'
    ];

    config.getQZoneLatteLogsDir()

    var yesterday = Moment().subtract(1, 'days');
    var url =  '/' +   yesterday.format('YYYY/MM/DD') + '.log';

    for(var i=0;i<servers.length;i++){
      var remote_url =  servers[i] + url;
      var local_path = path.join(config.getQZoneLatteLogsDir(),yesterday.format('YYYY/MM/DD')
       + '/' + servers[i].split('path=/')[1] + '.log');
      Downloader.download(remote_url,local_path,(status)=>{

      })
    }

  }
}

export = QZoneLatteLogs2Local;
