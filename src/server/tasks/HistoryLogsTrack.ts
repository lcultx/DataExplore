/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/moment/moment.d.ts"/>
import WanbaSDKLogs2Local = require('./WanbaSDKLogs2Local');
import QZoneLatteLogs2Local = require('./QZoneLatteLogs2Local');
import LatteEconomyLogs2Local = require('./LatteEconomyLogs2Local');

import moment = require('moment');

class HistoryLogsTrack implements ITask{
  run(theday_str?:string,type?:string,callback?:Function){
    console.log('管理员校对服务器时间...');
    console.log("Now:"+new Date());

    var logs:IDailyLogs2Local = null;
    if(type == 'wanba'){
      logs = WanbaSDKLogs2Local.getInstance();
    }else if(type == 'qzone'){
      logs = QZoneLatteLogs2Local.getInstance();
    }else if(type == 'economy'){
      logs = LatteEconomyLogs2Local.getInstance();
    }

    if(theday_str == "all"){
      var theday = moment().subtract(1, 'days');
      var t = setInterval(()=>{
      theday = theday.subtract(1,'day');

        if(!logs.exist(theday)){
          logs.download(theday);
          console.log('downlading logs of' + theday.toDate());
        }
      },1000*60*5);
    }else if(theday_str == 'yesterday'){
      var theday = moment().subtract(1, 'days');
      logs.download(theday);
      console.log('downlading logs of' + theday.toDate());
    }else{
      var theday = moment(theday_str,'YYYY/MM/DD')
      logs.download(theday);
      console.log('downlading logs of' + theday.toDate());
    }

  }
}



if(require.main === module){
  var logsTrack = new HistoryLogsTrack();
  var theday_str = process.argv[2];
  var log_type = process.argv[3];
  logsTrack.run(theday_str,log_type);
}
