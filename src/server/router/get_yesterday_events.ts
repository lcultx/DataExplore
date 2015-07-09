/// <reference path="../../components/collector/interfaces.d.ts"/>
import LocalLogDataCollector = require('../../components/collector/LocalLogDataCollector')
import LogLineParser = require('../../components/collector/LogLineParser');

var ExecTime = require('exec-time');

var getYesterdayEvents = function(req,res){

  var profiler = new ExecTime('getYesterdayEvents');

  profiler.beginProfiling();

  class ObEvent{
    ob:any;
    constructor(ob:any){
      this.ob = ob;
    }

    getEventHour():number{
      var time = this.ob.time;
      return time.split(':')[0]*1;
    }

    getEventName():string{
      return this.ob.player_action;
    }
  }

  var hourStatusList:Array<any> = [];//分时统计
  function record(ob){
    var event = new ObEvent(ob);
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






  var logUrl = 'http://121.201.8.151:8888/gm/getActiveLog?path=/server1/2015/07/06.log';
   var logPath = '/Users/xuyang/src/DataExplore/resource/getActiveLog';
  var ldCollector:ILogCollector = new LocalLogDataCollector();
  var logParser:ILogParser = new LogLineParser();
  ldCollector.setLogURI(logPath);
  ldCollector.setParser(logParser);




  // 直接将结果返回给前端
  // res.type('application/json');
  //
  // ldCollector.on('line',function(ob){
  //   console.log(ob);
  //   res.write(JSON.stringify(ob));
  // });
  //
  // ldCollector.on('end',function(ob){
  //   res.write(JSON.stringify(ob));
  //   console.log('last item');
  //   console.log(ob);
  //   res.end();
  // })

  ldCollector.on('line',function(ob){
    //profiler.step('one record start')
    record(ob);

    //console.log(hourStatusList);
    //profiler.step('one record finish')
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

export = getYesterdayEvents;
