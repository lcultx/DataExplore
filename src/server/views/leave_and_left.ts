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

function getTheDayCreateUsers(mm,callback){

  qzone_collection.find({
    player_action: "创建角色",
    theday_str:mm.format("YYYY/MM/DD")
  }).toArray(function(err,results){

    getLeft(results,mm.clone().add(1, 'd'),function(number){
        callback([results.length,number]);
    });
  });
}

function userHasActiveInThisDay(user,mm,callback){
  var query = {
    player_name:user.player_name,
    server_name:user.server_name,
    theday_str:mm.format("YYYY/MM/DD")
  };
  console.log(query);
  qzone_collection.findOne(query,function(err,result){

    if(result && result.server_name){
      callback(true)
    }else{
      callback(false);
    }
  })
}

function getLeft(users,mm,callback){
 var left = 0;
 async.each(users,function(user,cb){
   userHasActiveInThisDay(user,mm,function(exist){
     if(exist){
       left = left + 1;
     }
     cb();
   });
 },function(){
   callback(left);
 });
}



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

  constructor(cfg){
    super(cfg);
  }


  public loadData(callback:(data)=>void){
    var start_day = moment('2015-07-12');
    var end_day = moment('2015-07-14');

    getTheDayCreateUsers(start_day,function(results){
      callback(results);
    });

  }

  public getChartOptions(data):any{
      return data;
  }

}

export = leave_and_left;
