/// <reference path="../../components/collector/interfaces.d.ts"/>
import LocalLogDataCollector = require('../../components/collector/LocalLogDataCollector')
import LatteEventLogModel = require('../../components/data-models/LatteEventLogModel');

var ExecTime = require('exec-time');

export function getYesterdayEvents(req,res){

  var profiler = new ExecTime('getYesterdayEvents');

  profiler.beginProfiling();

  var hourStatusList:Array<any> = [];//分时统计
  function record(ob){
    var event = new LatteEventLogModel(ob);
    var hour = event.getEventHour();
    var event_name = event.getEventName();
    if(hourStatusList[hour]){
      var status = hourStatusList[hour];
      if(status[event_name]){
        status[event_name] =  status[event_name] + 1;
      }else{
        status[event_name] = 1;
      }
    }else{
      var status:any = {};
      status[event_name] = 1;
      hourStatusList[hour] = status;
    }
  }

  var logPath = '/Users/xuyang/src/DataExplore/resource/getActiveLog';
  var ldCollector:ILogCollector = new LocalLogDataCollector();

  ldCollector.setLogURI(logPath);
  ldCollector.setLogModelAsParser(new LatteEventLogModel({}));


  ldCollector.on('line',function(ob){
    record(ob);
  });

  ldCollector.on('end',function(ob){
    console.log('recive end!!!');
    if(ob){
        record(ob);
    }

    profiler.step('all record finish')
    res.json(hourStatusList);
  })


  ldCollector.run();
}
