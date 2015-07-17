/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/async/async.d.ts"/>
import baseChartView = require('./baseChartView');

import mogHelper = require('../../library/mogHelper');
import shuijing = require('../shuijing_config');
import querystring = require('querystring');
import moment = require('moment');
import async = require('async');


var wanba_collection = mogHelper.getWanbaLogEventCollection();
var qzone_collection = mogHelper.getQZoneLogEventCollection();



/*
2015-07-16T18:03:46.965+0800 I QUERY
 [conn16] query test.qzone_log_events query:
 { player_name: " 石", server_name: "server2", theday_str: "2015/07/13" }
  planSummary: IXSCAN { theday_str: 1.0 }
   ntoskip:0 nscanned:484843
   nscannedObjects:484843
   keyUpdates:0 writeConflicts:0
   numYields:3787 nreturned:0
   reslen:20
   locks:{ Global: { acquireCount: { r: 3788 } },
    MMAPV1Journal: { acquireCount: { r: 3788 } },
    Database: { acquireCount: { r: 3788 } },
     Collection: { acquireCount: { R: 3788 } } } 1424ms

*/

class leave_and_left extends baseChartView implements IChartView{



  private userHasActiveInThisDay(user,mm,callback){
    var query = {
      player_name:user.player_name,
      server_name:user.server_name,
      theday_str:mm.format("YYYY/MM/DD")
    };

    qzone_collection.findOne(query,(err,result)=>{
      this.query_profile(query);
      if(result && result.server_name){
        callback(true)
      }else{
        callback(false);
      }
    })
  }

  private getLeft(users,mm,callback){
   var left = 0;
   async.each(users,(user,cb)=>{
     this.userHasActiveInThisDay(user,mm,function(exist){
       if(exist){
         left = left + 1;
       }
       cb();
     });
   },function(){
     callback(left);
   });
  }


  constructor(cfg){
    super(cfg);
  }

  getThedayStr(mm){
    return mm.format("YYYY/MM/DD")
  }

  getTheDayLeaveAndLeft(callback,record){

    var mm = record.theday;
    var end_day = record.end_day;
    var query = {
      player_action: "创建角色",
      theday_str:this.getThedayStr(mm)
    };
    qzone_collection.find(query).toArray((err,results)=>{
      this.query_profile(query);

      var left_days = [];
      var lefts = [results.length];
      for(var theday=mm.clone().add(1,'d');theday.unix()<=end_day.unix();theday = theday.clone().add(1,'d')){
        left_days.push(theday);
      }



      async.each(left_days,(mm,cb)=>{
        this.getLeft(results,mm,(number)=>{
            lefts.push(number);
            cb();
        });
      },()=>{
        this.step('get day ' + this.getThedayStr(mm) + ' left_and_leave finish');
        console.log(lefts);
        callback(lefts);
      })


    });
  }


  public loadData(callback:(data)=>void){
    var start_day = moment('2015-07-12');
    var end_day = moment('2015-07-14');
    start_day.unix()

    var lefts = [];
    for(var theday=start_day;theday.unix()<=end_day.unix();theday = theday.clone().add(1,'d')){
      lefts.push({
        theday:theday,
        end_day:end_day
      });
    }

    async.each(lefts,(record,cb)=>{
      this.getTheDayLeaveAndLeft((result)=>{
        record.result = result;
        cb();
      },record);
    },()=>{
      callback(lefts);
    });

  }

  public getChartOptions(data):any{
      return data;
  }

}

export = leave_and_left;
